/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {Image, Skeleton, Col, Button, Space, Spin, Select, List, Tag, Row} from 'antd';

import {dstRoles} from '../../../utils/dst';
import style from "../../DstServerList/index.module.css";
import HiddenText from "../../Home/HiddenText/HiddenText";
import {useLevelsStore} from "../../../store/useLevelsStore.tsx";
import {usePlayerListStore} from "../../../store/usePlayerListStore.tsx";
import {getAllOnlinePlayersApi, getOnlinePlayersApi} from "../../../api/onlinPlayerApi";
import PlayerBtn from "./PlayerBtn.jsx";
import {ProCard} from "@ant-design/pro-components";


const Online = () => {
    const {t} = useTranslation()

    const {cluster} = useParams()
    const [loading, setLoading] = useState(true)
    const [spin, setSpin] = useState(false)

    const levels = useLevelsStore((state) => state.levels)
    const playerList = usePlayerListStore((state) => state.playerList)
    const setPlayerList = usePlayerListStore((state) => state.setPlayerList)

    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels ? "" : levels[0].key)

    useEffect(() => {
        setLoading(true)
        getAllOnlinePlayersApi(cluster)
            .then(resp => {
                if (resp.code === 200) {
                    setPlayerList(resp.data)
                }
                setLoading(false)
            })
    }, [])


    function queryPlayers() {
        setSpin(true)
        getOnlinePlayersApi(cluster, levelName)
            .then(resp => {
                if (resp.code === 200) {
                    setPlayerList(resp.data)
                }
                setSpin(false)
            })
    }

    function queryAllPlayers() {
        setSpin(true)
        getAllOnlinePlayersApi(cluster)
            .then(resp => {
                if (resp.code === 200) {
                    setPlayerList(resp.data)
                }
                setSpin(false)
            })
    }

    const handleChange = (value) => {
        setLevelName(value)
    }

    return (
        <ProCard
            title={'🎯 玩家列表'}
            extra={<Space size={8}>
                <Select
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    defaultValue={notHasLevels ? "" : levels[0].levelName}
                    options={levels.map(level => ({
                        value: level.key,
                        label: level.levelName,
                    }))}
                />
                <Button type={'primary'} size={'small'} onClick={() => {
                    queryPlayers()
                }}>{t('panel.query')}</Button>
                <Button type={'primary'} size={'small'} onClick={() => {
                    queryAllPlayers()
                }}>{t('panel.query_all')}</Button>
                <Tag color={'green'}>{playerList.length}</Tag>
            </Space>}>
            {notHasLevels && (
                <span>当前暂无世界</span>
            )}

            {!notHasLevels && (
                <Spin spinning={spin}>
                    <Skeleton loading={loading} active>
                        <List
                            pagination={{
                                position: "bottom",
                                align: "end",
                                showSizeChanger: true,
                                total: playerList.length,
                                pageSizeOptions: [5, 10, 20, 50, 100]
                            }}
                            dataSource={playerList}
                            renderItem={(item) => (
                                <List.Item>
                                    <Space align="center" size={'middle'}>
                                        <div>
                                            <Image preview={false} width={48}
                                                   src={dstRoles[item.role] || dstRoles.mod}/>
                                        </div>
                                        <div className={style.icon}>
                                            {item.name}
                                        </div>
                                        <div>
                                                <span style={{color: '#1677ff'}}>
                                                    <HiddenText text={item.kuId}/>
                                                </span>
                                        </div>
                                    </Space>
                                    <div>{item.day}{t('day')}</div>
                                    <PlayerBtn player={item} levelName={levelName}/>

                                </List.Item>
                            )}
                        />
                    </Skeleton>
                </Spin>
            )}

        </ProCard>

    )
}

export default Online