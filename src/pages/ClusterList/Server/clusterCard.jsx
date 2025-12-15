import React, {useState} from "react";
import {Button, Col, Dropdown, message, Modal, Popconfirm, Row, Space, Tag, Typography} from "antd";
import {useNavigate} from "react-router-dom";

import style from "../../DstServerList/index.module.css";
import {dstSeason, dstSegs, getDstMod, getTimeStatus} from "../../../utils/dst";
import {UpdateServer} from "./index";
import {deleteCluster} from "../../../api/clusterApi";
import {ProCard, ProDescriptions} from "@ant-design/pro-components";
import {useTranslation} from "react-i18next";
import HiddenText from "../../Home/HiddenText/HiddenText.jsx";

const {Title, Link} = Typography;

export default ({cluster, showAddBtn, serverList, updateServerList, removeServerList}) => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const [openUpdate, setOpenUpdate] = useState(false)

    function deleteServer(server) {
        deleteCluster(server.clusterName)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("删除成功")
                    removeServerList(server)
                } else {
                    message.error("删除失败")
                }
            })
    }

    const items = [
        {
            label: (
                <div>
                    {showAddBtn && (
                        <Popconfirm
                            title="是否删除房间"
                            description="请自行做好备份"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                                deleteServer(cluster)
                            }}
                        >
                            <Button size={"small"} color="danger" variant="filled">删除</Button>
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
                        }}>编辑</Button>
                    )}
                </div>
            ),
            key: '2',
        },
    ];

    return (<>

        <Modal width={860} title="更新房间配置" open={openUpdate} onOk={() => setOpenUpdate(false)}
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
                {cluster.status && (<Tag bordered={false} color={'green'}>启动</Tag>)}
                {!cluster.status && (<Tag bordered={false} color={'red'}>停止</Tag>)}
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
                        span={2}
                        valueType="text"
                        label={t('游戏天数')}
                    >
                                    <span>
                                        {cluster?.gameArchive?.meta?.Clock?.Cycles + 1}天/{dstSegs[cluster?.gameArchive?.meta?.Clock?.Phase]} {getTimeStatus("zh", cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason, cluster?.gameArchive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[cluster?.gameArchive?.meta?.Seasons?.Season]}({cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason}/{cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason + cluster?.gameArchive?.meta?.Seasons?.RemainingDaysInSeason})
                                    </span>
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        editable={false}
                        span={2}
                        valueType="text"
                        label={t('模组数量')}
                    >
                        {cluster?.gameArchive?.mods}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        editable={false}
                        span={2}
                        valueType="text"
                        label={t('最大人数')}
                    >
                        {cluster?.gameArchive?.maxPlayers}
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        editable={false}
                        span={2}
                        valueType="text"
                        label={t('直连 IP')}
                    >
                        <HiddenText text={cluster?.gameArchive?.ipConnect}/>
                    </ProDescriptions.Item>
                    <ProDescriptions.Item
                        editable={false}
                        span={2}
                        valueType="text"
                        label={t('游戏版本')}
                    >
                        {cluster?.gameArchive?.version} / {cluster?.gameArchive?.lastVersion}
                    </ProDescriptions.Item>
                </ProDescriptions>
            </div>
            <p>
                {showAddBtn && (
                    <Button style={{marginRight: 12}} type="primary"  onClick={() => {
                        setOpenUpdate(true)
                    }}>编辑</Button>
                )}
                {showAddBtn && (
                    <Popconfirm
                        title="是否删除房间"
                        description="请自行做好备份"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            deleteServer(cluster)
                        }}
                    >
                        <Button type="primary" danger>删除</Button>
                    </Popconfirm>
                )}
            </p>
        </ProCard>
    </>)
}