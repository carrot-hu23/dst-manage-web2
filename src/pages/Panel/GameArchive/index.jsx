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

    const {cluster} = useParams()
    const [archive, setArchive] = useState({})

    const playerList = usePlayerListStore((state) => state.playerList)

    useEffect(() => {
        archiveApi(cluster)
            .then(data => {
                setArchive(data.data)
            }).catch(error => console.log(error))

    }, [])

    function getTimeStatus(daysElapsedInSeason, daysLeftInSeason) {
        const totalDays = daysElapsedInSeason + daysLeftInSeason;
        const thresholdEarly = totalDays / 3;

        if (daysElapsedInSeason <= thresholdEarly) {
            return t('panel.dayPhase.early');
        }
        if (daysLeftInSeason < thresholdEarly) {
            return t('panel.dayPhase.late');
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
                {t('panel.archive.dayCount', {day: archive?.meta?.Clock?.Cycles + 1})}/{dstSegs[archive?.meta?.Clock?.Phase]} {getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[archive?.meta?.Seasons?.Season]}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
            </span>
        )
    }

    return (
        <>
            <ProCard
                title={t('panel.serverInfo')}
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
                        label={t('panel.roomName')}
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
                        label={t('panel.gameMod')}
                    >
                        {getDstMod(archive.gameMod)}
                    </ProFormText>
                    <ProFormText
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="modCount"
                        label={t('panel.mods')}
                    >
                        {archive.mods || 0}
                    </ProFormText>
                    <ProFormText
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="daysProgress"
                        label={t('panel.dayProgress')}
                    >
                        {getSeasonInfo()}
                    </ProFormText>
                    <ProFormText
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="playerCount"
                        label={t('panel.playerCount')}
                    >
                        <span>{`${playerList?.length}/${archive.maxPlayers}`}</span>
                    </ProFormText>
                    <ProFormText
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="gameVersion"
                        label={t('panel.version')}
                    >
                        {archive.version || "--"} / {archive.lastVersion || "--"}
                    </ProFormText>
                    <ProFormText.Password
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="ipConnect"
                        label={t('panel.ipConnect')}
                    >
                        <Space size={8}>
                            <HiddenText text={archive.ipConnect}/>
                            <Tooltip placement="topLeft"
                                     title={t('panel.portTooltip', {port: archive.port})}>
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </Space>
                    </ProFormText.Password>
                    <ProFormText.Password
                        colProps={{xs: 12, xl: 12, md: 12}}
                        name="clusterPassword"
                        label={t('panel.password')}
                    >
                        <HiddenText text={archive?.clusterPassword}/>
                    </ProFormText.Password>
                </ProForm>
            </ProCard>
        </>
    )
}