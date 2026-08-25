import React, { useEffect, useState } from "react";

import {
    Button,
    message,
    Skeleton,
    Modal,
    Tabs
} from "antd";
import type { RadioChangeEvent } from "antd/es/radio";

import { useTranslation } from "react-i18next";


import { getClusterIniApi, saveClusterIniApi } from "../../../api/levelApi";
import type { ClusterIniFormValues, ClusterIniResponse } from "../../../type";

import style from '../../DstServerList/index.module.css'
import {
    ProCard,
    ProForm,
    ProFormRadio,
    ProFormText,
    ProFormTextArea,
    ProFormDigit,
    ProFormSwitch,
    FooterToolbar
} from "@ant-design/pro-components";

import { useParams } from "react-router-dom";
import DstEmojiList from "../DstEomj/DstEmojiList.tsx";
import { dstGameMod } from "../../../types/dst.ts";

const gameModeI18nKey: Record<string, string> = {
    endless: 'dst.gameMode.endless',
    survival: 'dst.gameMode.survival',
    wilderness: 'dst.gameMode.wilderness',
    lightsout: 'dst.gameMode.lightsout',
    lavaarena: 'dst.gameMode.lavaarena',
    quagmire: 'dst.gameMode.quagmire',
    OceanFishing: 'dst.gameMode.oceanFishing',
    starvingfloor: 'dst.gameMode.starvingFloor',
    customization: 'dst.gameMode.customization',
}

const ClusterIni: React.FC = () => {

    const { t } = useTranslation()

    const { cluster } = useParams<{ cluster?: string }>()
    // const { has } = usePermission(cluster)
    const has = () => {
        return true
    }

    const [loading, setLoading] = useState<boolean>(false)
    const [formRef] = ProForm.useForm<ClusterIniFormValues>()
    const [choose, setChoose] = useState<string>("survival");

    const tabPaneStyle: React.CSSProperties = {
        height: 'calc(100vh - 300px)',
        minHeight: '400px',
        maxHeight: '800px',
        overflowY: 'auto',
    }
    const tabContentStyle: React.CSSProperties = {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        paddingRight: 8,
    }

    const isKnownGameMode = (mode: string) => dstGameMod.some(item => item.name === mode)

    const onRadioChange = (e: RadioChangeEvent) => {
        setChoose(e.target.value);
    }

    const onFinish = async (values: ClusterIniFormValues) => {
        const clusterValues = { ...values }
        if (clusterValues.customization_mode) {
            clusterValues.game_mode = clusterValues.customization_mode
        }
        const body = {
            cluster: clusterValues,
            token: values.cluster_token
        }
        if (body.cluster.cluster_description) {
            body.cluster.cluster_description = body.cluster.cluster_description.replace(/\n/g, "")
        }
        const resp = await saveClusterIniApi("", body)
        if (resp.code === 200) {
            message.success(t('cluster.save.ok'))
        } else {
            message.warning(t('cluster.save.error'))
            if (resp.msg) {
                message.warning(resp.msg)
            }
        }
        return true
    }

    useEffect(() => {
        setLoading(true)
        getClusterIniApi(cluster || "")
            .then((resp: ClusterIniResponse) => {
                if (resp.code === 200) {
                    const serverData = resp.data.cluster
                    let formValues: ClusterIniFormValues = {
                        ...serverData,
                        cluster_token: resp.data.token,
                    }
                    if (!isKnownGameMode(serverData.game_mode)) {
                        formValues = {
                            ...formValues,
                            customization_mode: serverData.game_mode,
                            game_mode: 'customization',
                        }
                    }
                    formRef?.setFieldsValue(formValues)
                    setChoose(formValues.game_mode)
                } else {
                    message.warning(t('cluster.fetch.error'))
                }
                setLoading(false)
            })
    }, [cluster, formRef, t])

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className={`${style.antInput}`}>
            <Modal title={t('cluster.emoji.title')} open={open} onCancel={() => setOpen(false)} footer={null}>
                <DstEmojiList />
            </Modal>

            <Skeleton loading={loading} active>
                <ProCard
                    className={'scrollbar'}
                    style={{
                        height: 'calc(100vh - 120px)',
                        minHeight: '400px',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Tabs
                            style={{ flex: 1, minHeight: 0 }}
                            destroyInactiveTabPane={false}
                            // type="card"
                            items={[
                                {
                                    key: 'base',
                                    label: t('cluster.BaseSetting'),
                                    forceRender: true,
                                    children: (
                                        <div style={tabPaneStyle}>
                                            <div style={tabContentStyle}>
                                                <ProForm
                                                    form={formRef}
                                                    onFinish={onFinish}
                                                    grid
                                                    rowProps={{
                                                        gutter: [16, 0],
                                                    }}
                                                    initialValues={{
                                                        pvp: false,
                                                        vote_enabled: true,
                                                        max_players: 8,
                                                        steam_group_only: false,
                                                        tick_rate: 15,
                                                        max_snapshots: 6,
                                                        bind_ip: '127.0.0.1',
                                                        pause_when_nobody: false,
                                                        console_enabled: true
                                                    }}
                                                    submitter={{
                                                        render: () => null
                                                    }}
                                                >
                                                    <ProFormText
                                                        colProps={{ md: 24, xl: 24 }}
                                                        label={t('cluster.cluster_name')}
                                                        name='cluster_name'
                                                        tooltip={t('cluster.tooltip.cluster_name')}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: t('cluster.required.cluster_name'),
                                                            },
                                                        ]}
                                                        placeholder={t('cluster.placeholder.cluster_name')}
                                                        fieldProps={{
                                                            className: style.icon
                                                        }}
                                                        extra={(
                                                            <Button type="link" size="small" onClick={() => setOpen(true)}>{t('cluster.emoji.title')}</Button>
                                                        )}
                                                    />
                                                    <ProFormTextArea
                                                        colProps={{ md: 24, xl: 24 }}
                                                        label={t('cluster.cluster_description')}
                                                        name='cluster_description'
                                                        placeholder={t('cluster.placeholder.cluster_description')}
                                                        fieldProps={{
                                                            rows: 2,
                                                            className: style.icon
                                                        }}
                                                    />

                                                    <ProFormRadio.Group
                                                        colProps={{ md: 24, xl: 24 }}
                                                        label={t('cluster.game_mode')}
                                                        name='game_mode'
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: t('cluster.required.game_mode'),
                                                            },
                                                        ]}
                                                        tooltip={t('cluster.tooltip.game_mode')}
                                                        fieldProps={{ onChange: onRadioChange }}
                                                        options={dstGameMod.map((item: { name: string, cn: string, description: string }) => ({
                                                            label: t(gameModeI18nKey[item.name] || item.name),
                                                            value: item.name,
                                                        }))}
                                                    />

                                                    {choose === 'customization' &&
                                                        <ProFormText
                                                            colProps={{ md: 12, xl: 12 }}
                                                            label={t('cluster.customization_mode')}
                                                            tooltip={t('cluster.tooltip.customization_mode')}
                                                            name='customization_mode'
                                                            placeholder={t('cluster.placeholder.customization_mode')}
                                                            fieldProps={{ maxLength: 20 }}
                                                        />
                                                    }

                                                    <ProFormDigit
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.max_players')}
                                                        tooltip={t('cluster.tooltip.max_players')}
                                                        name='max_players'
                                                    />

                                                    <ProFormText.Password
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.cluster_password')}
                                                        name='cluster_password'
                                                        placeholder={t('cluster.placeholder.cluster_password')}
                                                        fieldProps={{ maxLength: 20 }}
                                                    />

                                                    <ProFormText.Password
                                                        colProps={{ md: 24, xl: 24 }}
                                                        label={t('cluster.cluster_token')}
                                                        name='cluster_token'
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: t('cluster.required.cluster_token'),
                                                            },
                                                        ]}
                                                        tooltip={t('cluster.tooltip.cluster_token')}
                                                        placeholder={t('cluster.placeholder.cluster_token')}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.pvp')}
                                                        tooltip={t('cluster.tooltip.pvp')}
                                                        name='pvp'
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.vote_enabled')}
                                                        tooltip={t('cluster.tooltip.vote_enabled')}
                                                        name='vote_enabled'
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.pause_when_nobody')}
                                                        tooltip={t('cluster.tooltip.pause_when_nobody')}
                                                        name='pause_when_nobody'
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.console_enabled')}
                                                        tooltip={t('cluster.tooltip.console_enabled')}
                                                        name='console_enabled'
                                                        extra={<span>{t('cluster.alert.console_enabled.disabled')}</span>}
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.offline_cluster')}
                                                        name='offline_cluster'
                                                        tooltip={t('cluster.tooltip.offline_cluster')}
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.lan_only_cluster')}
                                                        name='lan_only_cluster'
                                                        tooltip={t('cluster.tooltip.lan_only_cluster')}
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormDigit
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.whitelist_slots')}
                                                        name='whitelist_slots'
                                                        tooltip={t('cluster.tooltip.whitelist_slots')}
                                                        placeholder={t('cluster.placeholder.whitelist_slots')}
                                                    />

                                                    <ProFormDigit
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.tick_rate')}
                                                        name='tick_rate'
                                                        tooltip={t('cluster.tooltip.tick_rate')}
                                                        placeholder={t('cluster.placeholder.tick_rate')}
                                                    />

                                                    <ProFormDigit
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.max_snapshots')}
                                                        name='max_snapshots'
                                                        tooltip={t('cluster.tooltip.max_snapshots')}
                                                        placeholder={t('cluster.max_snapshots')}
                                                    />

                                                    <ProFormText
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.cluster_language')}
                                                        name='cluster_language'
                                                        tooltip={t('cluster.tooltip.cluster_language')}
                                                        placeholder="zh"
                                                    />
                                                </ProForm>
                                            </div>
                                        </div>
                                    ),
                                },
                                ...(has() ? [{
                                    key: 'shard',
                                    label: t('cluster.ShardSetting'),
                                    forceRender: true,
                                    children: (
                                        <div style={tabPaneStyle}>
                                            <div style={tabContentStyle}>
                                                <ProForm
                                                    form={formRef}
                                                    onFinish={onFinish}
                                                    grid
                                                    rowProps={{
                                                        gutter: [16, 0],
                                                    }}
                                                    submitter={{
                                                        render: () => null
                                                    }}
                                                >
                                                    <ProFormDigit
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.master_port')}
                                                        name='master_port'
                                                        tooltip={t('cluster.tooltip.master_port')}
                                                        extra={<span>{t('cluster.alert.master_port.info')}</span>}
                                                        placeholder={t('cluster.master_port')}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.shard_enabled')}
                                                        tooltip={t('cluster.tooltip.shard_enabled')}
                                                        name='shard_enabled'
                                                        extra={<span>{t('cluster.alert.shard_enabled.disabled')}</span>}
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormText.Password
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.bind_ip')}
                                                        name='bind_ip'
                                                        tooltip={t('cluster.tooltip.bind_ip')}
                                                        extra={<span>{t('cluster.alert.bind_ip.info')}</span>}
                                                        placeholder={t('cluster.bind_ip')}
                                                    />

                                                    <ProFormText.Password
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.master_ip')}
                                                        name='master_ip'
                                                        tooltip={t('cluster.tooltip.master_ip')}
                                                        extra={<span>{t('cluster.alert.master_ip.info')}</span>}
                                                        placeholder={t('cluster.master_ip')}
                                                    />

                                                    <ProFormText
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.cluster_key')}
                                                        name='cluster_key'
                                                        tooltip={t('cluster.tooltip.cluster_key')}
                                                        placeholder={t('cluster.cluster_key')}
                                                    />
                                                </ProForm>
                                            </div>
                                        </div>
                                    ),
                                }] : []),
                                ...(has() ? [{
                                    key: 'steam',
                                    label: t('cluster.SteamSetting'),
                                    forceRender: true,
                                    children: (
                                        <div style={tabPaneStyle}>
                                            <div style={tabContentStyle}>
                                                <ProForm
                                                    form={formRef}
                                                    onFinish={onFinish}
                                                    grid
                                                    rowProps={{
                                                        gutter: [16, 0],
                                                    }}
                                                    submitter={{
                                                        render: () => null
                                                    }}
                                                >
                                                    <ProFormText
                                                        colProps={{ md: 24, xl: 24 }}
                                                        label={t('cluster.steam_group_id')}
                                                        name='steam_group_id'
                                                        tooltip={t('cluster.tooltip.steam_group_id')}
                                                        placeholder={t('cluster.steam_group_id')}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.steam_group_only')}
                                                        name='steam_group_only'
                                                        tooltip={t('cluster.tooltip.steam_group_only')}
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.steam_group_admins')}
                                                        name='steam_group_admins'
                                                        tooltip={t('cluster.tooltip.steam_group_admins')}
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />
                                                </ProForm>
                                            </div>
                                        </div>
                                    ),
                                }] : []),
                            ]}
                        />
                        <div>
                            <Button type="primary" onClick={() => formRef.submit()}>
                                {t('cluster.save')}
                            </Button>
                        </div>
                    </div>
                </ProCard>

            </Skeleton>
        </div>
    )
}

export default ClusterIni
