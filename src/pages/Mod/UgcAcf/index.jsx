import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {Alert, Button, Image, message, Popconfirm, Select, Skeleton, Space, Spin, Table, Tag} from "antd";

import {deleteUgcModAcfFileApi, getUgcModAcfApi} from "../../../api/modApi.jsx";
import {getLevelStatusApi} from "../../../api/level.jsx";
import {formatTimestamp} from "../../../utils/dateUitls";



export default () => {
    const {cluster} = useParams()
    const { t } = useTranslation()


    const [acfworkshops, setAcfworkshops] = useState([])
    const [levels, setLevels] = useState(["Master"])
    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels?"":levels[0])

    const [spin, setSpin] = useState(false)
    const [loading, setLoading] = useState(false)

    async function init() {
        setLoading(true)
        const levelStatusResp = await  getLevelStatusApi()
        if (levelStatusResp.code === 200) {
            const levels = levelStatusResp.data
            const items = []
            levels.forEach(level=>{
                const item = {
                    key: level.uuid,
                    uuid: level.uuid,
                    levelName: level.levelName,
                }
                items.push(item)
            })
            setLevels(items)
        }
        const UgcModAcfResp = await getUgcModAcfApi(cluster, levelName)
        if (UgcModAcfResp.code === 200) {
            setAcfworkshops(UgcModAcfResp.data)
        } else {
            message.error(t('mod.fetch.error'))
        }
        setLoading(false)
    }

    function queryAcf() {
        setSpin(true)
        getUgcModAcfApi(cluster, levelName)
            .then(resp=>{
                if (resp.code === 200) {
                    setAcfworkshops(resp.data)
                } else {
                    message.error(t('mod.fetch.error'))
                }
                setSpin(false)
            })
    }

    useEffect( () => {
        init()
    }, [])

    const handleChange = (value) => {
        console.log(value)
        setLevelName(value)
    }

    const columns = [
        {
            title: t('mod.ugc.image'),
            dataIndex: 'img',
            key: 'img',
            render:  (_, record) => (<Image preview={false} width={48} src={record.img} />),
        },
        {
            title: t('mod.ugc.name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('mod.ugc.workshopId'),
            dataIndex: 'workshopId',
            key: 'workshopId',
            render: (_, record) => (
                <a
                    target={'_blank'}
                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${record.workshopId}`}
                    rel="noreferrer"
                >
                    {record.workshopId}
                </a>
            )
        },
        {
            title: t('mod.ugc.timeUpdated'),
            dataIndex: 'timeupdated',
            key: 'timeupdated',
            render: (_, record)=>(
                <>{formatTimestamp(record.timeupdated)}</>
            )
        },
        {
            title: t('mod.ugc.timeLast'),
            dataIndex: 'timelast',
            key: 'timelast',
            render: (_, record)=>(
                <>{formatTimestamp(record.timelast)}</>
            )
        },
        {
            title: t('mod.ugc.needUpdate'),
            key: 'tags',
            dataIndex: 'tags',
            render: (_,  record) => (
                <>
                    {record.timelast > record.timeupdated && (
                        <Tag color={'red'}>
                            <span>{t('panel.y')}</span>
                        </Tag>
                    )}
                    {record.timelast <= record.timeupdated && (
                        <Tag >
                            <span>{t('panel.n')}</span>
                        </Tag>
                    )}
                </>
            ),
        },
        {
            title: t('panel.action'),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title={t('mod.ugc.delete.title')}
                        description={t('mod.ugc.delete.desc')}
                        onConfirm={()=>{
                            deleteUgcModAcfFileApi(cluster, levelName, record.workshopId)
                                .then(resp=>{
                                    if (resp.code === 200) {
                                        message.success(t('mod.ugc.delete.success'))
                                    } else {
                                        message.warning(t('mod.delete.error'))
                                    }
                                })
                        }}
                        onCancel={()=>{}}
                        okText={t('panel.y')}
                        cancelText={t('panel.n')}
                    >
                        <Button type="link">{t('mod.ugc.delete.title')}</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Skeleton loading={loading}>

                {notHasLevels && (
                    <span>{t('mod.ugc.no.levels')}</span>
                ) }

                {!notHasLevels && (
                    <Spin spinning={spin}>
                        <Skeleton loading={loading} active>
                            <Alert style={{
                                marginBottom: '4px'
                            }} message={t('mod.ugc.restart.tips')} type="info" showIcon closable />
                            <br/>
                            <Space size={8}>
                                <span>{t('mod.ugc.level')}</span>
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleChange}
                                    defaultValue={notHasLevels?"":levels[0].levelName}
                                    options={levels.map(level=>({
                                            value: level.key,
                                            label: level.levelName,
                                        }))}
                                />
                                <Button type={'primary'} onClick={() => queryAcf()}>{t('panel.query')}</Button>
                            </Space>
                            <br/><br/>
                            <Table scroll={{x: 500}} columns={columns} dataSource={acfworkshops} />
                        </Skeleton>
                    </Spin>
                )}
            </Skeleton>
        </>
    )
}