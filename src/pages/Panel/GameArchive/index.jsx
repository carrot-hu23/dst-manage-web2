import {Alert, Button, Col, Row, Space, Tag, Tooltip} from 'antd';

import {QuestionCircleOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';

import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {archiveApi} from '../../../api/gameApi.jsx';

import style from "../../DstServerList/index.module.css";
import HiddenText from "../../Home/HiddenText/HiddenText";
import {dstSeason, dstSegs, getDstMod} from "../../../utils/dst.js";
import {usePlayerListStore} from "../../../store/usePlayerListStore.tsx";
import {ProCard, ProForm, ProFormText} from "@ant-design/pro-components";
import OpBtnGroup from "../OpBtnGroup/index.jsx";
import {readDstConfigSync} from "../../../api/dstConfigApi.jsx";


export default () => {

    const {t} = useTranslation()
    const {i18n} = useTranslation()
    const lang = i18n.language

    const {cluster} = useParams()
    const [archive, setArchive] = useState({})

    const playerList = usePlayerListStore((state) => state.playerList)

    useEffect(() => {
        archiveApi(cluster)
            .then(data => {
                console.log(data.data);
                setArchive(data.data)
            }).catch(error => console.log(error))

    }, [])

    function getTimeStatus(daysElapsedInSeason, daysLeftInSeason) {
        const totalDays = daysElapsedInSeason + daysLeftInSeason;
        const thresholdEarly = totalDays / 3;

        if (daysElapsedInSeason <= thresholdEarly) {
            if (lang === "en") {
                return "morning"
            }
            return '早';
        }
        if (daysLeftInSeason < thresholdEarly) {
            if (lang === "en") {
                return "evening"
            }
            return '晚';
        }
        return '';
    }

    const [dstConfig, setDstConfig] = useState({})
    useEffect(() => {
        // 获取配置文件
        readDstConfigSync()
            .then(data => {
                setDstConfig(data.data)
            })
    }, [])

    function getSeasonInfo() {
        return (
            <span translate="no">
                        {lang === "en" && <span>
                            {archive?.meta?.Clock?.Cycles + 1}/{archive?.meta?.Clock?.Phase}{" "}{getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{" "}{archive?.meta?.Seasons?.Season}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                        </span>}
                {lang !== "en" && <span>
                            {archive?.meta?.Clock?.Cycles + 1}天/{dstSegs[archive?.meta?.Clock?.Phase]} {getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[archive?.meta?.Seasons?.Season]}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                        </span>}

                    </span>
        )
    }

    return (
        <>
            <ProCard
                // style={{borderRadius: 12}}
                // bordered
                title="🏛️ 服务器信息"
            >
                <OpBtnGroup/>
                <br/>
                {dstConfig.beta !== 1 && archive?.version !== archive?.lastVersion && archive?.version !== 0 &&
                    <Alert
                        action={[
                            <>
                                <a target={'_blank'}
                                   href={'https://forums.kleientertainment.com/game-updates/dst/'}
                                   key="list-loadmore-edit"
                                   rel="noreferrer">
                                    {t('panel.new.version.read')}
                                </a>
                            </>
                        ]}
                        message={t('panel.has.new.version')} type="warning" showIcon closable/>}
                {archive?.version === 0 &&
                    <Alert
                        action={[]}
                        message={t('panel.dst.install.fail')} type="warning" showIcon closable/>
                }

                <ProForm readonly grid submitter={false}>
                    <ProFormText
                        colProps={{xs: 24, xl: 12, md: 12}}
                        name="roomName"
                        label="房间名称"
                    >
                        <span className={style.icon}>
                        {dstConfig.beta === 1 && (
                            <Tag color={'orange'}>{t('panel.beta')}</Tag>
                        )}{archive.clusterName}
                    </span>
                    </ProFormText>
                    <ProFormText
                        colProps={{xs: 24, xl: 12, md: 12}}
                        name="gameMode"
                        label="游戏模式"
                    >
                        ⛺ {getDstMod("", archive.gameMod)}
                    </ProFormText>
                    <ProFormText
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="modCount"
                        label="模组数量"
                    >
                        📦 {archive.mods || 0}
                    </ProFormText>
                    <ProFormText
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="daysProgress"
                        label="天数进度"
                    >
                        📅 {getSeasonInfo()}
                    </ProFormText>
                    <ProFormText
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="playerCount"
                        label="玩家数量"
                    >
                        👥 {archive.maxPlayers ? `${archive.maxPlayers}人` : "0/0"}
                    </ProFormText>
                    <ProFormText
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="gameVersion"
                        label="游戏版本"
                    >
                        🎯 {archive.version || "--"} / {archive.lastVersion || "--"}
                    </ProFormText>
                    <ProFormText.Password
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="ipConnect"
                        label="🔒 IP连接"
                    >
                        <Space size={8}>
                            <HiddenText text={archive.ipConnect}/>
                            <Tooltip placement="topLeft"
                                     title={`请开放对应的 ${archive.port} udp 端口，已开放请忽略`}>
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </Space>
                    </ProFormText.Password>
                    <ProFormText.Password
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="clusterPassword"
                        label="🏠 房间密码"
                    >
                        <HiddenText text={archive?.clusterPassword}/>
                    </ProFormText.Password>
                </ProForm>
            </ProCard>
        </>
    )
}