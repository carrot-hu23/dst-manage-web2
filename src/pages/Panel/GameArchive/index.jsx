import {Alert, Space, Tag, Tooltip} from 'antd';

import {QuestionCircleOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';

import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {archiveApi} from '../../../api/gameApi.jsx';

import style from "../../DstServerList/index.module.css";
import HiddenText from "../../Home/HiddenText/HiddenText.jsx";
import {dstSeason, dstSegs, getDstMod} from "../../../utils/dst.js";
import {usePlayerListStore} from "../../../store/usePlayerListStore.tsx";
import {ProDescriptions} from "@ant-design/pro-components";
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

    return (
        <>
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
            <ProDescriptions
                column={2}
            >
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    contentStyle={{
                        maxWidth: '80%',
                    }}
                    ellipsis
                    label={t('panel.clusterName')}
                >
                    <span className={style.icon}>
                        {dstConfig.beta === 1 &&(
                            <Tag color={'orange'}>{t('panel.beta')}</Tag>
                        )}{archive.clusterName}
                    </span>
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('panel.gameMod')}
                >
                    {getDstMod("", archive.gameMod)}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('panel.mods')}
                >
                    {archive.mods}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('panel.season')}
                >
                     <span translate="no">
                        {lang === "en" && <span>
                            {archive?.meta?.Clock?.Cycles + 1}/{archive?.meta?.Clock?.Phase}{" "}{getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{" "}{archive?.meta?.Seasons?.Season}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                        </span>}
                         {lang !== "en" && <span>
                            {archive?.meta?.Clock?.Cycles + 1}天/{dstSegs[archive?.meta?.Clock?.Phase]} {getTimeStatus(archive?.meta?.Seasons?.ElapsedDaysInSeason, archive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[archive?.meta?.Seasons?.Season]}({archive?.meta?.Seasons?.ElapsedDaysInSeason}/{archive?.meta?.Seasons?.ElapsedDaysInSeason + archive?.meta?.Seasons?.RemainingDaysInSeason})
                        </span>}

                    </span>
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('panel.players')}
                >
                    <span>{`${playerList?.length}/${archive.maxPlayers}`}</span>
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('panel.version')}
                >
                    {archive.version} / {archive.lastVersion}
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('panel.ipConnect')}
                >
                    <Space size={8}>
                        <HiddenText text={archive.ipConnect}/>
                        <Tooltip placement="topLeft"
                                 title={`请开放对应的 ${archive.port} udp 端口，已开放请忽略`}>
                            <QuestionCircleOutlined/>
                        </Tooltip>
                    </Space>
                </ProDescriptions.Item>
                <ProDescriptions.Item
                    span={2}
                    valueType="text"
                    label={t('panel.password')}
                >
                    <HiddenText text={archive?.clusterPassword}/>
                </ProDescriptions.Item>
            </ProDescriptions>

        </>
    )
}