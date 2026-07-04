import {Button, Input, message, Popconfirm, Select, Space, Spin, Switch} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {MonacoEditor} from "../../NewEditor/index.jsx";
import {readLevelServerLogApi, sendCommandApi} from "../../../api/level.jsx";
import {useTheme} from "../../../hooks/useTheme";
import style from "../../DstServerList/index.module.css";
import {useLevelsStore} from "../../../store/useLevelsStore.tsx";
import {ProCard} from "@ant-design/pro-components";

export default () => {
    const { t } = useTranslation()
    const {theme} = useTheme();
    const {cluster} = useParams()
    const [spinLoading, setSpinLoading] = useState(false)

    const levels = useLevelsStore((state) => state.levels)

    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const defaultLevelName = useMemo(() => {
        if (notHasLevels) return ""
        return (levels.find(level => level.status)?.key) || levels[0].key
    }, [levels, notHasLevels])
    const [levelName, setLevelName] = useState(defaultLevelName)
    const levelNameRef = useRef(defaultLevelName)
    const editorRef = useRef()
    const inputRef = useRef(null);

    const [command, setCommand] = useState('');

    const onchange = (e) => {
        console.log("e", e)
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
        console.log(levelNameRef.current, escapeString(command))
        setSpinLoading(true)
        sendCommandApi(cluster, levelNameRef.current, escapeString(command))
            .then(resp => {
                if (resp.code === 200) {
                    message.success("发送指令成功")
                } else {
                    message.error("发送指令失败")
                }
                setSpinLoading(false)
            })
    }

    useEffect(() => {
        if (!levelName && defaultLevelName) {
            levelNameRef.current = defaultLevelName
            setLevelName(defaultLevelName)
        }
    }, [defaultLevelName, levelName])

    const pullLog = useCallback((lineCount) => {
        const currentLevelName = levelNameRef.current
        if (!currentLevelName) return
        const linesCount = lineCount ?? inputRef.current?.input?.value ?? 100
        readLevelServerLogApi(cluster, currentLevelName, linesCount)
            .then(resp => {
                if (resp.code === 200) {
                    let logs = ""
                    const lines = resp.data || []
                    lines.reverse()
                    lines.forEach(line => {
                        logs += `${line}\n`
                    })
                    editorRef?.current?.current?.setValue(logs)
                    editorRef?.current?.current?.revealLine(editorRef?.current?.current?.getModel()?.getLineCount());
                } else {
                    editorRef?.current?.current?.setValue("")
                }
            })
    }, [cluster])

    useEffect(() => {
        pullLog(100)
    }, [pullLog, levelName])

    useEffect(()=>{
        const id = setInterval(() => {
            pullLog(); // 每次请求最新日志
        }, 3000)
        return()=>{
            clearInterval(id)
        }
    }, [pullLog])


    const handleChange = (value) => {
        levelNameRef.current = value
        setLevelName(value)
    }

    return <>
        <Spin spinning={spinLoading}>
            <ProCard>
                    <Space.Compact style={{width: '100%', marginBottom: 12}}>
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            value={levelName}
                            options={levels.map(level=>{
                                return {
                                    value: level.key,
                                    label: level.levelName,
                                }
                            })}
                        />
                        <Input defaultValue="100" ref={inputRef}/>
                        <Button type="primary" onClick={() => pullLog()}>{t('panel.pull')}</Button>
                    </Space.Compact>
                    <br/>
                    <MonacoEditor
                        className={style.icon}
                        ref={editorRef}
                        style={{
                            "height": "370px",
                            "width": "100%",
                        }}
                        options={{
                            readOnly: true,
                            language: 'java',
                            theme: theme === 'dark'?'vs-dark':''
                        }}
                    />
                    <br/>
                    <Space align={"baseline"} size={16} wrap>
                        <Button onClick={()=>{
                            window.location.href = `/api/game/level/server/download?fileName=server_log.txt&levelName=${levelNameRef.current}`
                        }}
                                icon={<DownloadOutlined />} type={'link'}>
                            {t('panel.download.log')}
                        </Button>
                    </Space>
                    <br/>
                    <Space.Compact
                        style={{
                            width: '100%',
                            marginBottom: 12
                        }}
                    >
                        <Input defaultValue="" onChange={onchange} />
                        <Button type="primary" onClick={() => sendInstruct(command)}>{t('panel.send')}</Button>
                    </Space.Compact>
                    <Space size={8} wrap>
                        <Button size={'small'} type={"primary"} onClick={() => {sendInstruct("c_save()")}} >{t('panel.c_save()')}</Button>
                        <Popconfirm
                            title={t('panel.regenerate')}
                            description="请保存好数据"
                            onConfirm={()=>{sendInstruct("c_regenerateworld()")}}
                            onCancel={()=>{}}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button size={'small'} type={"primary"} danger>{t('panel.regenerate')}</Button>
                        </Popconfirm>
                        <Button size={'small'} onClick={() => { sendInstruct("c_rollback(1)") }} >{t('panel.rollback1')}</Button>
                        <Button size={'small'} onClick={() => { sendInstruct("c_rollback(2)") }} >{t('panel.rollback2')}</Button>
                        <Button size={'small'} onClick={() => { sendInstruct("c_rollback(3)") }} >{t('panel.rollback3')}</Button>
                        <Button size={'small'} onClick={() => { sendInstruct("c_rollback(4)") }} >{t('panel.rollback4')}</Button>
                        <Button size={'small'} onClick={() => { sendInstruct("c_rollback(5)") }} >{t('panel.rollback5')}</Button>
                        <Button size={'small'} onClick={() => { sendInstruct("c_rollback(6)") }} >{t('panel.rollback6')}</Button>
                    </Space>
            </ProCard>
        </Spin>
    </>
}