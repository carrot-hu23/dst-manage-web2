import {Button, Input, message, Popconfirm, Select, Space, Spin, Typography} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {MonacoEditor} from "../../NewEditor/index.jsx";
import {sendCommandApi} from "../../../api/level.jsx";
import {useTheme} from "../../../hooks/useTheme";
import style from "../../DstServerList/index.module.css";
import {useLevelsStore} from "../../../store/useLevelsStore.tsx";
import {ProCard} from "@ant-design/pro-components";
import {useLogStream} from "../../../hooks/useLogStream";

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

const formatRuntime = (totalSeconds) => {
    if (!Number.isFinite(totalSeconds)) return "未知"
    const seconds = Math.max(0, Math.floor(totalSeconds))
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainSeconds = seconds % 60
    const pad = (value) => String(value).padStart(2, '0')
    return `${pad(hours)}:${pad(minutes)}:${pad(remainSeconds)}`
}

const extractLatestRuntimeSeconds = (lines) => {
    let latest = null
    lines.forEach(line => {
        const match = /^\[(\d+):(\d+):(\d+)\]/.exec(line)
        if (!match) return
        const totalSeconds = Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3])
        if (latest === null || totalSeconds > latest) {
            latest = totalSeconds
        }
    })
    return latest
}

export default () => {
    const {t} = useTranslation()
    const {theme} = useTheme();
    const {cluster} = useParams()
    const [spinLoading, setSpinLoading] = useState(false)

    const levels = useLevelsStore((state) => state.levels)

    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const defaultLevelName = useMemo(() => {
        if (notHasLevels) return ""
        return (levels.find(level => level.status)?.key) || levels[0].key
    }, [levels, notHasLevels])
    const [currentLevelName, setCurrentLevelName] = useState(defaultLevelName)
    const editorRef = useRef()
    const [runtimeSeconds, setRuntimeSeconds] = useState(null)
    const currentLevel = useMemo(() => levels.find(level => level.key === currentLevelName), [levels, currentLevelName])
    const processElapsed = currentLevel?.Ps?.elapsed || currentLevel?.ps?.elapsed

    // 当 levels 加载完成后，默认选择正在运行的世界，否则选择第一个世界
    useEffect(() => {
        if (!currentLevelName && defaultLevelName) {
            setCurrentLevelName(defaultLevelName)
        }
    }, [currentLevelName, defaultLevelName])

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
        console.log(currentLevelName, escapeString(command))
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

    // 使用 useLogStream 处理实时日志流
    useLogStream({
        clusterName: cluster || 'Cluster_1',
        levelName: currentLevelName,
        onLog: (line) => {
            const currentLogs = editorRef?.current?.current?.getValue() || ""
            editorRef?.current?.current?.setValue(currentLogs + `${line}\n`)
            editorRef?.current?.current?.revealLine(editorRef?.current?.current?.getModel()?.getLineCount())
            const latestRuntime = extractLatestRuntimeSeconds([line])
            if (latestRuntime !== null) {
                setRuntimeSeconds(latestRuntime)
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
        setRuntimeSeconds(null)
        editorRef?.current?.current?.setValue("")
    }

    return <>
        <Spin spinning={spinLoading}>
            <ProCard
                title={'服务器日志'}
                extra={<Space>
                    <Select
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        defaultValue={notHasLevels ? "" : levels[0].levelName}
                        options={levels.map(level => {
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
                    日志行首的 [HH:MM:SS] 是 DST 分片进程启动后的日志相对时间，不是系统时间；进程运行时长：{processElapsed || '未运行/未知'}；日志最新时间：{formatRuntime(runtimeSeconds)}
                </Typography.Text>
                <MonacoEditor
                    className={style.icon}
                    ref={editorRef}
                    style={{
                        "height": "304px",
                        "width": "100%",
                    }}
                    options={{
                        readOnly: true,
                        language: 'java',
                        theme: theme === 'dark' ? 'vs-dark' : ''
                    }}
                />
                <br/>
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