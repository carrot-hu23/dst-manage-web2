import React, {useState} from "react";
import {Button, Col, Dropdown, message, Modal, Popconfirm, Row, Space, Tag, Typography} from "antd";
import {useNavigate} from "react-router-dom";

import style from "../../DstServerList/index.module.css";
import {dstSeason, dstSegs, getDstMod, getTimeStatus} from "../../../utils/dst";
import {UpdateServer} from "./index";
import {deleteCluster} from "../../../api/clusterApi.ts";
import {ProCard, ProDescriptions} from "@ant-design/pro-components";
import {useTranslation} from "react-i18next";
import HiddenText from "../../Home/HiddenText/HiddenText";

const {Title, Link} = Typography;

export default ({cluster, showAddBtn, serverList, updateServerList, removeServerList}) => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const [openUpdate, setOpenUpdate] = useState(false)

    function deleteServer(server) {
        deleteCluster(server.clusterName)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('clusterList.deleteSuccess'))
                    removeServerList(server)
                } else {
                    message.error(t('clusterList.deleteError'))
                }
            })
    }

    const items = [
        {
            label: (
                <div>
                    {showAddBtn && (
                        <Popconfirm
                            title={t('clusterList.deleteConfirmTitle')}
                            description={t('clusterList.deleteConfirmDesc')}
                            okText={t('panel.y')}
                            cancelText={t('panel.n')}
                            onConfirm={() => {
                                deleteServer(cluster)
                            }}
                        >
                            <Button size={"small"} color="danger" variant="filled">{t('clusterList.delete')}</Button>
                        </Popconfirm>
                    )}
                </div>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div>
                    {showAddBtn && (
                        <Button size={"small"} color="primary" variant="filled" onClick={() => {
                            setOpenUpdate(true)
                        }}>{t('clusterList.edit')}</Button>
                    )}
                </div>
            ),
            key: '2',
        },
    ];

    return (<>

        <Modal width={860} title={t('clusterList.updateConfigTitle')} open={openUpdate} onOk={() => setOpenUpdate(false)}
               onCancel={() => setOpenUpdate(false)}
               footer={null}>
            <UpdateServer server={cluster}
                          serverList={serverList}
                          updateServerList={updateServerList}
                          setOpen={setOpenUpdate}
            />
        </Modal>
        <ProCard
            bordered={false}
            style={{marginBottom: 16}}
        >
            <div style={{
                display: 'flex',
            }}>
                <Tag color={'gold'} bordered={false}>{cluster.clusterType}</Tag>
                {cluster.clusterType !== '本地' && <span>
                                 <Tag color={'blue'} bordered={false}>{cluster.ip}</Tag>
                            </span>}
                {cluster.status && (<Tag bordered={false} color={'green'}>{t('clusterList.started')}</Tag>)}
                {!cluster.status && (<Tag bordered={false} color={'red'}>{t('clusterList.stopped')}</Tag>)}
                <Title
                    level={3}
                    style={{
                        margin: 0,
                        fontSize: 16
                    }}
                    ellipsis
                >
                    <Link onClick={() => {
                        navigate(`/${cluster.clusterName}/${cluster.name}/panel`)
                    }}>
                        {cluster.name}
                    </Link>
                </Title>
            </div>
            <br/>
            <div>
                <ProDescriptions
                    column={2}
                >
                    <ProDescriptions.Item
                        editable={false}
                        span={2}
                        valueType="text"
                        label={t('clusterList.field.clusterName')}
                    >
                        {cluster?.gameArchive?.clusterName}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        span={2}
                        valueType="text"
                        label={t('clusterList.field.gameDays')}
                    >
                                    <span>
                                        {cluster?.gameArchive?.meta?.Clock?.Cycles + 1}天/{dstSegs[cluster?.gameArchive?.meta?.Clock?.Phase]} {getTimeStatus("zh", cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason, cluster?.gameArchive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[cluster?.gameArchive?.meta?.Seasons?.Season]}({cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason}/{cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason + cluster?.gameArchive?.meta?.Seasons?.RemainingDaysInSeason})
                                    </span>
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        editable={false}
                        span={2}
                        valueType="text"
                        label={t('clusterList.field.modCount')}
                    >
                        {cluster?.gameArchive?.mods}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        editable={false}
                        span={2}
                        valueType="text"
                        label={t('clusterList.field.maxPlayers')}
                    >
                        {cluster?.gameArchive?.maxPlayers}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        editable={false}
                        span={2}
                        valueType="text"
                        label={t('clusterList.field.directIp')}
                    >
                        <HiddenText text={cluster?.gameArchive?.ipConnect}/>
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        editable={false}
                        span={2}
                        valueType="text"
                        label={t('clusterList.field.version')}
                    >
                        {cluster?.gameArchive?.version} / {cluster?.gameArchive?.lastVersion}
                    </ProDescriptions.Item>
                </ProDescriptions>
            </div>
            <p>
                {showAddBtn && (
                    <Button style={{marginRight: 12}} type="primary"  onClick={() => {
                        setOpenUpdate(true)
                    }}>{t('clusterList.edit')}</Button>
                )}
                {showAddBtn && (
                    <Popconfirm
                        title={t('clusterList.deleteConfirmTitle')}
                        description={t('clusterList.deleteConfirmDesc')}
                        okText={t('panel.y')}
                        cancelText={t('panel.n')}
                        onConfirm={() => {
                            deleteServer(cluster)
                        }}
                    >
                        <Button type="primary" danger>{t('clusterList.delete')}</Button>
                    </Popconfirm>
                )}
            </p>
        </ProCard>
    </>)
}