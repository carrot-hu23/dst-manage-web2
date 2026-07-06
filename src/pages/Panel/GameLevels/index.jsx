import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    Avatar, Button,
    Card,
    Flex,
    List,
    message,
    Popconfirm,
    Progress,
    Space,
    Spin,
    Switch,
    Tag,
    Tooltip
} from 'antd';
import {ClearOutlined, PlayCircleOutlined, PoweroffOutlined} from '@ant-design/icons';

import {parse} from "lua-json";

import {cleanLevelApi, getLevelStatusApi, startAllLevelApi, startLevelApi} from "../../../api/level.jsx";
import {useLevelsStore} from "../../../store/useLevelsStore.tsx";
import {ProCard} from "@ant-design/pro-components";
import {useThemeConfigStore} from "../../../store/useThemeConfigStore.tsx";


function formatData(data, num) {
    const numValue = Number(data)
    return Number.isFinite(numValue) ? numValue.toFixed(num) : (0).toFixed(num)
}

function roundTo(value, digits = 1) {
    const numValue = Number(value)
    if (!Number.isFinite(numValue)) return 0
    const factor = 10 ** digits
    return Math.round(numValue * factor) / factor
}


export default () => {

    const levels = useLevelsStore((state) => state.levels)
    const setLevels = useLevelsStore((state) => state.setLevels)

    const normalizeLevels = (data) => {
        return data.map(level => {
            const item = {
                key: level.uuid,
                uuid: level.uuid,
                levelName: level.levelName,
                location: '未知',
                ps: level.ps,
                Ps: level.Ps,
                status: level.status
            }
            try {
                const parsed = parse(level.leveldataoverride)
                item.location = parsed.location
            } catch (error) {
                console.log(error)
            }
            return item
        })
    }

    const refreshLevelStatus = () => {
        return getLevelStatusApi()
                .then(resp => {
                    if (resp.code === 200) {
                        const items = normalizeLevels(resp.data)
                        setLevels(items)
                        return items
                    }
                    return []
                })
                .catch(error => {
                    console.log(error)
                    message.error('刷新世界状态失败')
                    return []
                })
    }

    useEffect(() => {
        refreshLevelStatus()
        const timerId = setInterval(() => {
            refreshLevelStatus()
        }, 3000)

        return () => {
            clearInterval(timerId); // 组件卸载时清除定时器
        };
    }, [])

    const {cluster} = useParams()
    const [spin, setSpin] = useState(false)
    const [pendingActions, setPendingActions] = useState({})
    const {t} = useTranslation()

    const setLevelPending = (uuid, action) => {
        setPendingActions(prev => {
            const next = {...prev}
            if (action) {
                next[uuid] = action
            } else {
                delete next[uuid]
            }
            return next
        })
    }

    const waitForLevelStatus = async (uuid, expectedStatus, attempts = 12) => {
        for (let i = 0; i < attempts; i++) {
            const items = await refreshLevelStatus()
            const level = items.find(item => item.uuid === uuid)
            if (level && level.status === expectedStatus) {
                return true
            }
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        return false
    }

    const statusOnClick = async (checked, event, levelName, uuid) => {
        const prefix = checked ? t('panel.start.up') : t('panel.start.down')
        setLevelPending(uuid, checked ? 'starting' : 'stopping')
        try {
            const resp = await startLevelApi(cluster || "", uuid, checked)
            if (resp.code !== 200) {
                message.error(`${prefix} ${levelName}失败 ${resp.msg || ''}`)
                await refreshLevelStatus()
                return
            }

            const ok = await waitForLevelStatus(uuid, checked)
            if (ok) {
                message.success(`${prefix} ${levelName}`)
            } else {
                message.error(`${prefix} ${levelName}失败：进程状态未确认`)
            }
        } catch (error) {
            console.log(error)
            message.error(`${prefix} ${levelName}失败`)
            await refreshLevelStatus()
        } finally {
            setLevelPending(uuid, null)
        }
    }

    const columns = [
        {
            title: t('panel.levelName'),
            dataIndex: 'levelName',
            key: 'levelName',
            hideInSearch: true,
            render: (text, record) => (
                <div style={{wordWrap: 'break-word', wordBreak: 'break-word'}}>
                    <Tooltip placement="rightTop"
                             title={(<div>
                                 <div>
                                     <Space size={8}>
                                         <span>{`内存: ${formatData((record.Ps !== undefined ? record.Ps.RSS : 0) / 1024, 2)}MB`}</span>
                                         <span>{`虚拟内存: ${formatData((record.Ps !== undefined ? record.Ps.VSZ : 0) / 1024, 2)}MB`}</span>
                                     </Space>
                                     <Progress percent={roundTo(record.Ps.memUage, 1)} size={'small'}/>
                                 </div>
                                 <div>
                                     cpu: <Progress type="circle" percent={roundTo(record.Ps.cpuUage, 1)} size={40}/>
                                 </div>
                             </div>)}>
                        {record.status && <Tag color={'green'}>{text}</Tag>}
                        {!record.status && <Tag color={'default'}>{text}</Tag>}
                    </Tooltip>
                </div>
            ),
        },
        {
            title: t('panel.mem'),
            dataIndex: 'mem',
            key: 'mem',
            render: (_, record) => (
                <>
                    <span>{`${formatData((record.Ps !== undefined ? record.Ps.RSS : 0) / 1024, 2)}MB`}</span>
                </>
            ),
        },
        {
            title: t('panel.action'),
            key: 'action',
            hideInSearch: true,
            render: (_, record) => (
                <Space size="middle" wrap>
                    <Popconfirm
                        title={`清理 ${record.levelName} 世界`}
                        description="将会删除 save session 文件等内容，请自行做好备份"
                        onConfirm={() => {
                            const levels = []
                            levels.push(record.uuid)
                            cleanLevelApi(cluster, levels)
                                .then(resp => {
                                    if (resp.code === 200) {
                                        message.success("清理成功")
                                    } else {
                                        message.error("清理失败")
                                    }
                                })
                                .catch(error => {
                                    console.log(error)
                                    message.error("清理失败")
                                })
                        }}
                        onCancel={() => {

                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<ClearOutlined/>} danger size={'small'}>{t('panel.clear')}</Button>
                    </Popconfirm>

                    <Switch checked={pendingActions[record.uuid] === 'starting' ? true : pendingActions[record.uuid] === 'stopping' ? false : record.status}
                            loading={Boolean(pendingActions[record.uuid])}
                            disabled={Boolean(pendingActions[record.uuid])}
                            checkedChildren={pendingActions[record.uuid] === 'starting' ? '启动中' : t('panel.run')}
                            unCheckedChildren={pendingActions[record.uuid] === 'stopping' ? '停止中' : t('panel.stop')}
                            onClick={(checked, event) => {
                                statusOnClick(checked, event, record.levelName, record.uuid)
                            }}
                    />
                </Space>
            ),
        },
    ];


    function getLevelObject(value) {
        value = value.replace(/\n/g, "")
        try {
            return parse(value)
        } catch (error) {
            return {}
        }
    }

    const {themeConfig} = useThemeConfigStore();

    function GetLevelIcon(level) {

        const levelObject = getLevelObject(level?.leveldataoverride || '');
        const location = levelObject?.location
        if (location === 'forest') {
            return(
                <Avatar
                    style={{
                        backgroundColor: "#2E7D32",
                    }}
                    shape="square"
                    size={32}
                >
                    🌲
                </Avatar>
            )
        } else if (location === 'cave') {
            return(
                <Avatar
                    style={{
                        backgroundColor: "#ECEFF1",
                    }}
                    size={32}
                >
                    🕳️
                </Avatar>
            )
        }
        return (
            <Avatar
                style={{
                    backgroundColor: themeConfig.colorPrimary,
                }}
                shape="square"
                size={32}
            >
                {level.levelName[0]}
            </Avatar>
        )
    }

    return (
        <ProCard title={'世界列表'}
                 extra={<Space wrap>
                     <Popconfirm
                         title={t('panel.start.all')}
                         onConfirm={() => {
                             setSpin(true)
                             startAllLevelApi("", true)
                                 .then(resp => {
                                     if (resp.code === 200) {
                                         message.success("启动成功")
                                     } else {
                                         message.error("启动失败")
                                     }
                                     setSpin(false)
                                     setTimeout(refreshLevelStatus, 800)
                                 })
                                 .catch(error => {
                                     console.log(error)
                                     message.error("启动失败")
                                     setSpin(false)
                                     setTimeout(refreshLevelStatus, 800)
                                 })
                         }}
                         onCancel={() => {
                         }}
                         okText="Yes"
                         cancelText="No"
                     >
                         <Button
                             type="primary"
                             icon={<PlayCircleOutlined/>}
                         >
                             {t('panel.start.all')}
                         </Button>
                     </Popconfirm>

                     <Popconfirm
                         title={t('panel.stop.all')}
                         onConfirm={() => {
                             setSpin(true)
                             startAllLevelApi("", false)
                                 .then(resp => {
                                     if (resp.code === 200) {
                                         message.success("关闭成功")
                                     } else {
                                         message.error("关闭失败")
                                     }
                                     setSpin(false)
                                     setTimeout(refreshLevelStatus, 800)
                                 })
                                 .catch(error => {
                                     console.log(error)
                                     message.error("关闭失败")
                                     setSpin(false)
                                     setTimeout(refreshLevelStatus, 800)
                                 })
                         }}
                         onCancel={() => {
                         }}
                         okText="Yes"
                         cancelText="No"
                     >
                         <Button
                             type="primary"
                             icon={<PoweroffOutlined/>}
                         >
                             {t('panel.stop.all')}
                         </Button>
                     </Popconfirm>
                 </Space>}
        >

            <Spin spinning={spin}>
                <List
                    pagination={{
                        position: "bottom",
                        align: "end",
                        showSizeChanger: true,
                        total: levels?.length,
                        pageSizeOptions: [5, 10, 20, 50, 100]
                    }}
                    dataSource={levels}
                    renderItem={(record) => (
                        <List.Item>
                            <Card style={{width: '100%'}} className={'dst'}>
                                <div>
                                    <Flex justify={"space-between"}>
                                        <div>
                                            <Space>
                                                <div>
                                                    <Tooltip placement="rightTop"
                                                             title={(<div>
                                                                 <div>
                                                                     <Space size={8}>
                                                                         <span>{`内存: ${formatData((record.Ps !== undefined ? record.Ps.RSS : 0) / 1024, 2)}MB`}</span>
                                                                         <span>{`虚拟内存: ${formatData((record.Ps !== undefined ? record.Ps.VSZ : 0) / 1024, 2)}MB`}</span>
                                                                     </Space>
                                                                     <Progress percent={record.Ps.memUage}
                                                                               size={'small'}/>
                                                                 </div>
                                                                 <div>
                                                                     cpu: <Progress type="circle"
                                                                                    percent={record.Ps.cpuUage}
                                                                                    size={40}/>
                                                                 </div>
                                                             </div>)}>
                                                        {GetLevelIcon(record)}
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    {record.status && <Tag color={'green'} bordered={false}>{record.levelName}</Tag>}
                                                    {!record.status && <Tag color={'default'} bordered={false}>{record.levelName}</Tag>}
                                                    <div style={{fontSize: 12}}>
                                                        <>
                                                            <span>{`${formatData((record.Ps !== undefined ? record.Ps.RSS : 0) / 1024, 2)}MB`}</span>
                                                        </>
                                                    </div>
                                                </div>
                                            </Space>
                                        </div>
                                        <div>
                                            <Space size="middle" wrap>
                                                <Popconfirm
                                                    title={`清理 ${record.levelName} 世界`}
                                                    description="将会删除 save session 文件等内容，请自行做好备份"
                                                    onConfirm={() => {
                                                        const levels = []
                                                        levels.push(record.uuid)
                                                        cleanLevelApi(cluster, levels)
                                                            .then(resp => {
                                                                if (resp.code === 200) {
                                                                    message.success("清理成功")
                                                                } else {
                                                                    message.error("清理失败")
                                                                }
                                                            })
                                                            .catch(error => {
                                                                console.log(error)
                                                                message.error("清理失败")
                                                            })
                                                    }}
                                                    onCancel={() => {

                                                    }}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button icon={<ClearOutlined/>} danger
                                                            type={'text'}>{t('panel.clear')}</Button>
                                                </Popconfirm>

                                                <Switch checked={pendingActions[record.uuid] === 'starting' ? true : pendingActions[record.uuid] === 'stopping' ? false : record.status}
                                                        loading={Boolean(pendingActions[record.uuid])}
                                                        disabled={Boolean(pendingActions[record.uuid])}
                                                        checkedChildren={pendingActions[record.uuid] === 'starting' ? '启动中' : t('panel.run')}
                                                        unCheckedChildren={pendingActions[record.uuid] === 'stopping' ? '停止中' : t('panel.stop')}
                                                        onClick={(checked, event) => {
                                                            statusOnClick(checked, event, record.levelName, record.uuid)
                                                        }}
                                                />
                                            </Space>
                                        </div>
                                    </Flex>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </Spin>
        </ProCard>
    )
}