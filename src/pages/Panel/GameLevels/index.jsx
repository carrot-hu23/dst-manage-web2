import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, message, Popconfirm, Progress, Space, Spin, Switch, Table, Tag, Tooltip} from 'antd';
import {ClearOutlined} from '@ant-design/icons';

import {parse} from "lua-json";

import {cleanAllLevelApi, cleanLevelApi, getLevelStatusApi, startAllLevelApi, startLevelApi} from "../../../api/level.jsx";
import {useLevelsStore} from "../../../store/useLevelsStore.jsx";


function formatData(data, num) {
    return data.toFixed(num)
}


export default () => {

    const levels = useLevelsStore((state) => state.levels)
    const setLevels = useLevelsStore((state) => state.setLevels)

    useEffect(() => {
        const timerId = setInterval(() => {
            getLevelStatusApi()
                .then(resp => {
                    if (resp.code === 200) {
                        const levels = resp.data
                        const items = []
                        levels.forEach(level => {
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
                                const data = parse(level.leveldataoverride)
                                item.location = data.location
                            } catch (error) {
                                console.log(error)
                            }
                            items.push(item)
                        })
                        setLevels(items)
                    }
                })
        }, 3000)

        return () => {
            clearInterval(timerId); // 组件卸载时清除定时器
        };
    }, [])

    const {cluster} = useParams()
    const [spin, setSpin] = useState(false)
    const {t} = useTranslation()

    const statusOnClick = (checked, event, levelName, uuid) => {
        let prefix
        if (checked) {
            prefix = t('panel.start.up')
        } else {
            prefix = t('panel.start.down')
        }
        setSpin(true)
        startLevelApi("", uuid, checked).then(resp => {
            if (resp.code !== 200) {
                message.error(`${prefix} ${levelName}失败${resp.msg}`)
            } else {
                message.success(`${prefix} ${levelName}`)
            }
            setSpin(false)
        })
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
                                     <Progress percent={record.Ps.memUage} size={'small'}/>
                                 </div>
                                 <div>
                                     cpu: <Progress type="circle" percent={record.Ps.cpuUage} size={40}/>
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

                    <Switch checked={record.status}
                            checkedChildren={t('panel.run')}
                            unCheckedChildren={t('panel.stop')}
                            onClick={(checked, event) => {
                                statusOnClick(checked, event, record.levelName, record.uuid)
                            }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Space style={{
                paddingTop: '16px',
                padding: '8px'
            }} size={12} wrap>
                <Popconfirm
                    title={t('panel.start.all')}
                    onConfirm={() => {
                        setSpin(true)
                        startAllLevelApi("", true)
                            .then(resp => {
                                if (resp.code === 200) {
                                    message.success("启动成功")
                                } else {
                                    message.error("启动成功")
                                }
                                setSpin(false)
                            })
                    }}
                    onCancel={() => {
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        size={'middle'}
                        type="primary"
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
                            })
                    }}
                    onCancel={() => {
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        size={'middle'}
                    >
                        {t('panel.stop.all')}
                    </Button>
                </Popconfirm>

                <Popconfirm
                    title={`一键清理世界`}
                    description={"此操作将会删除存档的 save session 等文件，请做好备份"}
                    onConfirm={() => {
                        setSpin(true)
                        cleanAllLevelApi("", false)
                            .then(resp => {
                                if (resp.code === 200) {
                                    message.success("清理成功")
                                } else {
                                    message.error("清理失败")
                                }
                                setSpin(false)
                            })
                    }}
                    onCancel={() => {
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        danger
                        type={"primary"}
                        size={'middle'}
                    >
                        {t('panel.delete')}
                    </Button>
                </Popconfirm>
            </Space>
            <Spin spinning={spin}>
                <Table
                    scroll={{
                        x: 300,
                    }}
                    columns={columns}
                    dataSource={levels}
                />
            </Spin>
        </>
    )
}