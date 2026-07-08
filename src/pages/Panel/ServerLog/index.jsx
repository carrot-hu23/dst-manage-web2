import {Button, Input, message, Popconfirm, Select, Space, Spin, Typography} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {MonacoEditor} from "../../NewEditor/index.jsx";
import {readLevelServerLogPageApi, sendCommandApi} from "../../../api/level.jsx";
import {useTheme} from "../../../hooks/useTheme";
import style from "../../DstServerList/index.module.css";
import {useLevelsStore} from "../../../store/useLevelsStore.tsx";
import {ProCard} from "@ant-design/pro-components";
import {useLogStream} from "../../../hooks/useLogStream";
import {
    appendLogLines,
    DEFAULT_LOG_SEGMENT_SIZE,
    DEFAULT_MAX_VISIBLE_LOG_LINES,
    isPinnedToBottom,
    prependLogLines,
    shouldLoadPreviousSegment,
} from "../../../utils/logWindow.mjs";

const ConfirmButton = ({title, description, onConfirm, children, ...buttonProps}) => {
    return (
        <Popconfirm
            title={title}
            description={description}
            onConfirm={onConfirm}
            okText="Yes"
            cancelText="No"
        >
            <Button {...buttonProps}>{children}</Button>
        </Popconfirm>
    );
};

const RollbackButtons = ({onRollback, t}) => {
    const rollbackDays = [1, 2, 3, 4, 5, 6];

    return (
        <Space size={8} wrap>
            {rollbackDays.map(day => (
                <ConfirmButton
                    key={day}
                    title={t('panel.rollback')}
                    description={`确认回档 ${day} 天？请先保存数据`}
                    onConfirm={() => onRollback(day)}
                    size="small"
                >
                    {t(`panel.rollback${day}`)}
                </ConfirmButton>
            ))}
        </Space>
    );
};

const getEditor = (editorRef) => editorRef?.current?.current

export default () => {
    const {t} = useTranslation()
    const {theme} = useTheme();
    const {cluster} = useParams()
    const [spinLoading, setSpinLoading] = useState(false)

    const levels = useLevelsStore((state) => state.levels)
    const safeLevels = levels || []

    const notHasLevels = safeLevels.length === 0
    const defaultLevelName = useMemo(() => {
        if (notHasLevels) return ""
        return (safeLevels.find(level => level.status)?.key) || safeLevels[0].key
    }, [safeLevels, notHasLevels])
    const [currentLevelName, setCurrentLevelName] = useState(defaultLevelName)
    const editorRef = useRef()
    const lineWindowRef = useRef([])
    const pageRef = useRef({start: 0, end: 0, total: 0})
    const pinnedToBottomRef = useRef(true)
    const loadingPreviousRef = useRef(false)
    const liveBufferRef = useRef([])
    const liveFlushTimerRef = useRef(null)
    const scrollSubscriptionRef = useRef(null)
    const [logStats, setLogStats] = useState({start: 0, end: 0, total: 0, visible: 0, dropped: 0, pending: 0})
    const currentLevel = useMemo(() => safeLevels.find(level => level.key === currentLevelName), [safeLevels, currentLevelName])
    const processElapsed = currentLevel?.Ps?.elapsed || currentLevel?.ps?.elapsed

    const renderEditorLines = useCallback((lines, revealBottom = false) => {
        const editor = getEditor(editorRef)
        if (!editor) return
        editor.setValue(lines.join('\n'))
        if (revealBottom) {
            editor.revealLine(editor.getModel()?.getLineCount() || 1)
        }
    }, [])

    const updateStats = useCallback((extra = {}) => {
        setLogStats(prev => ({
            ...prev,
            start: pageRef.current.start,
            end: pageRef.current.end,
            total: pageRef.current.total,
            visible: lineWindowRef.current.length,
            ...extra,
        }))
    }, [])

    const loadTailSegment = useCallback(async (levelName) => {
        if (!levelName) return
        const resp = await readLevelServerLogPageApi(cluster || 'Cluster_1', levelName, {limit: DEFAULT_LOG_SEGMENT_SIZE})
        if (resp.code !== 200) {
            lineWindowRef.current = []
            pageRef.current = {start: 0, end: 0, total: 0}
            renderEditorLines([])
            updateStats({pending: 0, dropped: 0})
            return
        }
        const page = resp.data || {lines: [], start: 0, end: 0, total: 0}
        lineWindowRef.current = page.lines || []
        pageRef.current = {start: page.start || 0, end: page.end || 0, total: page.total || 0}
        renderEditorLines(lineWindowRef.current, true)
        updateStats({pending: 0, dropped: 0})
    }, [cluster, renderEditorLines, updateStats])

    const loadPreviousSegment = useCallback(async () => {
        if (loadingPreviousRef.current || !currentLevelName || pageRef.current.start <= 1) return
        loadingPreviousRef.current = true
        try {
            const nextStart = Math.max(1, pageRef.current.start - DEFAULT_LOG_SEGMENT_SIZE)
            const limit = pageRef.current.start - nextStart
            const resp = await readLevelServerLogPageApi(cluster || 'Cluster_1', currentLevelName, {offset: nextStart, limit})
            if (resp.code !== 200) return
            const page = resp.data || {lines: [], start: nextStart, end: nextStart - 1, total: pageRef.current.total}
            const previousTopLine = getEditor(editorRef)?.getTopForLineNumber?.(Math.max(1, pageRef.current.start)) || 0
            const result = prependLogLines(page.lines || [], lineWindowRef.current, DEFAULT_MAX_VISIBLE_LOG_LINES)
            lineWindowRef.current = result.lines
            pageRef.current = {
                start: page.start || nextStart,
                end: (page.start || nextStart) + result.lines.length - 1,
                total: page.total || pageRef.current.total,
            }
            renderEditorLines(lineWindowRef.current, false)
            const editor = getEditor(editorRef)
            if (editor && previousTopLine > 0) {
                editor.setScrollTop(previousTopLine)
            }
            updateStats({dropped: result.droppedFromBottom})
        } finally {
            loadingPreviousRef.current = false
        }
    }, [cluster, currentLevelName, renderEditorLines, updateStats])

    const flushLiveBuffer = useCallback(() => {
        const incoming = liveBufferRef.current.splice(0)
        if (incoming.length === 0) return
        const result = appendLogLines(lineWindowRef.current, incoming, DEFAULT_MAX_VISIBLE_LOG_LINES, {
            pinnedToBottom: pinnedToBottomRef.current,
        })
        lineWindowRef.current = result.lines
        if (result.pendingNewLines === 0) {
            pageRef.current.end += incoming.length
            pageRef.current.total = Math.max(pageRef.current.total + incoming.length, pageRef.current.end)
            if (result.droppedFromTop > 0) {
                pageRef.current.start += result.droppedFromTop
            }
            renderEditorLines(lineWindowRef.current, pinnedToBottomRef.current)
        }
        updateStats({
            dropped: result.droppedFromTop,
            pending: result.pendingNewLines ? (logStats.pending || 0) + result.pendingNewLines : 0,
        })
    }, [logStats.pending, renderEditorLines, updateStats])

    useEffect(() => {
        if (!currentLevelName && defaultLevelName) {
            setCurrentLevelName(defaultLevelName)
        }
    }, [currentLevelName, defaultLevelName])

    useEffect(() => {
        lineWindowRef.current = []
        pageRef.current = {start: 0, end: 0, total: 0}
        liveBufferRef.current = []
        updateStats({pending: 0, dropped: 0})
        loadTailSegment(currentLevelName)
    }, [currentLevelName, loadTailSegment, updateStats])

    useEffect(() => {
        const timer = setInterval(() => {
            const editor = getEditor(editorRef)
            if (!editor || scrollSubscriptionRef.current) return
            scrollSubscriptionRef.current = editor.onDidScrollChange((e) => {
                const layout = editor.getLayoutInfo?.()
                pinnedToBottomRef.current = isPinnedToBottom({
                    scrollTop: e.scrollTop,
                    scrollHeight: e.scrollHeight,
                    clientHeight: layout?.height || 0,
                })
                if (shouldLoadPreviousSegment({scrollTop: e.scrollTop})) {
                    loadPreviousSegment()
                }
            })
        }, 200)
        return () => {
            clearInterval(timer)
            scrollSubscriptionRef.current?.dispose?.()
            scrollSubscriptionRef.current = null
        }
    }, [loadPreviousSegment])

    useEffect(() => {
        return () => {
            if (liveFlushTimerRef.current) {
                clearTimeout(liveFlushTimerRef.current)
            }
        }
    }, [])

    const [command, setCommand] = useState('');

    const onchange = (e) => {
        setCommand(e.target.value);
    };

    function escapeString(str) {
        return str.replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    }

    function sendInstruct(command) {
        if (command === "") {
            message.warning("请填写指令在发送")
            return
        }
        setSpinLoading(true)
        sendCommandApi(cluster, currentLevelName, escapeString(command))
            .then(resp => {
                if (resp.code === 200) {
                    message.success("发送指令成功")
                } else {
                    message.error("发送指令失败")
                }
                setSpinLoading(false)
            })
    }

    useLogStream({
        clusterName: cluster || 'Cluster_1',
        levelName: currentLevelName,
        onLog: (line) => {
            liveBufferRef.current.push(line)
            if (!liveFlushTimerRef.current) {
                liveFlushTimerRef.current = setTimeout(() => {
                    liveFlushTimerRef.current = null
                    flushLiveBuffer()
                }, 250)
            }
        },
        onError: (err) => {
            console.error('Log stream error:', err)
        },
        onOpen: () => {
            console.log('Log stream connected')
        }
    })

    const handleChange = (value) => {
        setCurrentLevelName(value)
    }

    return <>
        <Spin spinning={spinLoading}>
            <ProCard
                title={'服务器日志'}
                bodyStyle={{paddingBottom: 12}}
                extra={<Space>
                    <Select
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        value={currentLevelName || (notHasLevels ? "" : safeLevels[0].levelName)}
                        options={safeLevels.map(level => {
                            return {
                                value: level.key,
                                label: level.levelName,
                            }
                        })}
                    />
                    <Button style={{float: "right"}}
                            onClick={() => {
                                window.location.href = `/api/game/level/server/download?fileName=server_log.txt&clusterName=${cluster}&levelName=${currentLevelName}`
                            }}
                            icon={<DownloadOutlined/>}
                            type={'primary'}
                    >
                        {t('panel.download.log')}
                    </Button>
                </Space>}
            >
                <Typography.Text type="secondary" style={{display: 'block', marginBottom: 12}}>
                    进程运行时长：{processElapsed || '未运行/未知'}；
                    当前仅保留可视窗口 {logStats.start || 0}-{logStats.end || 0}/{logStats.total || 0} 行
                    {logStats.pending ? `；有 ${logStats.pending} 行新日志，滚到底部后继续加载` : ''}
                </Typography.Text>
                <MonacoEditor
                    className={style.icon}
                    ref={editorRef}
                    style={{
                        "height": "260px",
                        "maxHeight": "260px",
                        "minHeight": "220px",
                        "width": "100%",
                        "overflow": "hidden",
                    }}
                    options={{
                        readOnly: true,
                        language: 'java',
                        theme: theme === 'dark' ? 'vs-dark' : '',
                        scrollBeyondLastLine: false,
                        minimap: {enabled: false},
                        scrollbar: {
                            alwaysConsumeMouseWheel: false,
                        },
                    }}
                />
                <Space.Compact
                    style={{
                        width: '100%',
                        marginBottom: 12
                    }}
                >
                    <Input defaultValue="" onChange={onchange}/>
                    <Button type="primary" onClick={() => sendInstruct(command)}>{t('panel.send')}</Button>
                </Space.Compact>
                <Space size={8} wrap>
                    <ConfirmButton
                        title={t('panel.c_save()')}
                        description="确认保存当前游戏数据？"
                        onConfirm={() => {
                            sendInstruct("c_save()")
                        }}
                        size="small"
                        type="primary"
                    >
                        {t('panel.c_save()')}
                    </ConfirmButton>
                    <ConfirmButton
                        title={t('panel.regenerate')}
                        description="请保存好数据"
                        onConfirm={() => {
                            sendInstruct("c_regenerateworld()")
                        }}
                        size="small"
                        type="primary"
                        danger
                    >
                        {t('panel.regenerate')}
                    </ConfirmButton>
                    <RollbackButtons
                        onRollback={(day) => sendInstruct(`c_rollback(${day})`)}
                        t={t}
                    />
                </Space>
            </ProCard>
        </Spin>
    </>
}