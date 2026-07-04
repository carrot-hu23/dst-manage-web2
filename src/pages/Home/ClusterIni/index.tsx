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

const ClusterIni: React.FC = () => {

    const { t } = useTranslation()
    const { i18n } = useTranslation();
    const [lang, setLang] = useState<'zh' | 'en' | 'jp' | 'kr'>('zh')

    const { cluster } = useParams<{ cluster?: string }>()
    // const { has } = usePermission(cluster)
    const has = () => {
        return true
    }

    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            setLang(lng as 'zh' | 'en' | 'jp' | 'kr')
        };

        i18n.on("languageChanged", handleLanguageChange);

        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n, cluster]);


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
            <Modal title="Emoj" open={open} onCancel={() => setOpen(false)} footer={null}>
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
                                                        tooltip={"已经支持了 + | [] \\ 等特殊字符了"}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '请输入房间名',
                                                            },
                                                        ]}
                                                        placeholder="请输入房间名称"
                                                        fieldProps={{
                                                            className: style.icon
                                                        }}
                                                        extra={(
                                                            <Button type="link" size="small" onClick={() => setOpen(true)}>emoji</Button>
                                                        )}
                                                    />
                                                    <ProFormTextArea
                                                        colProps={{ md: 24, xl: 24 }}
                                                        label={t('cluster.cluster_description')}
                                                        name='cluster_description'
                                                        placeholder="请输入房间描述"
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
                                                                message: '请选择游戏模式',
                                                            },
                                                        ]}
                                                        tooltip={"游戏风格\n主要有社交、合作、竞争、疯狂四种。\n展示该房间的游戏倾向，是友好社交还是兵戎相见。但不会影响游戏内容。"}
                                                        fieldProps={{ onChange: onRadioChange }}
                                                        options={dstGameMod.map((item: { name: string, cn: string, description: string }) => ({
                                                            label: lang !== 'zh' ? item.name : item.cn,
                                                            value: item.name,
                                                        }))}
                                                    />

                                                    {choose === 'customization' &&
                                                        <ProFormText
                                                            colProps={{ md: 12, xl: 12 }}
                                                            label={t('cluster.customization_mode')}
                                                            tooltip="当只有选择了「自定义模式」这个值才会生效"
                                                            name='customization_mode'
                                                            placeholder="自定义游戏模式"
                                                            fieldProps={{ maxLength: 20 }}
                                                        />
                                                    }

                                                    <ProFormDigit
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.max_players')}
                                                        tooltip="人数越多，服务器压力越大。对云服而言，1c2g推荐4人，2c4g推荐6-8人。"
                                                        name='max_players'
                                                    />

                                                    <ProFormText.Password
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.cluster_password')}
                                                        name='cluster_password'
                                                        placeholder="最大长度20"
                                                        fieldProps={{ maxLength: 20 }}
                                                    />

                                                    <ProFormText.Password
                                                        colProps={{ md: 24, xl: 24 }}
                                                        label={t('cluster.cluster_token')}
                                                        name='cluster_token'
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: '请输入令牌',
                                                            },
                                                        ]}
                                                        tooltip={"服务器令牌\n维持服务器独立运行的凭证，符合要求的令牌才可以开启服务器。创建令牌的玩家将自动成为使用该令牌开启的服务器的管理员"}
                                                        placeholder="科雷token令牌"
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.pvp')}
                                                        tooltip="是否开启玩家对战"
                                                        name='pvp'
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.vote_enabled')}
                                                        tooltip="开启后可通过投票进行踢出玩家、回档、重置世界操作。"
                                                        name='vote_enabled'
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.pause_when_nobody')}
                                                        tooltip="世界没人时将自动暂停"
                                                        name='pause_when_nobody'
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.console_enabled')}
                                                        tooltip="关闭后世界不能使用控制台"
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
                                                        tooltip={"创建一个离线服务器。此服务器不会在公共服务器列表展示，只有本地用户可以加入，所有steam相关的功能无效"}
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 8 }}
                                                        label={t('cluster.lan_only_cluster')}
                                                        name='lan_only_cluster'
                                                        tooltip={"如果设置为true，服务器仅允许同一个局域网的玩家进入"}
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormDigit
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.whitelist_slots')}
                                                        name='whitelist_slots'
                                                        tooltip={"为白名单内玩家保留的位置数量设置后，该数量的位置只允许白名单内玩家占据，其他玩家共享剩余的位置。\n关于保留栏位与白名单，实际保留栏位并不等于设置的保留栏位，而是设置保留栏位与白名单中ID数量两者中较小的那个值。"}
                                                        placeholder="预留位"
                                                    />

                                                    <ProFormDigit
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.tick_rate')}
                                                        name='tick_rate'
                                                        tooltip={"客户端与服务器之间每秒通信的次数\n性能满足的情况下，通信频率越高，游戏越流畅、体验越好，但会大幅提高服务器的运行压力。取值应为可被60整除的值，如15、20、30、60等。"}
                                                        placeholder="通信次数"
                                                    />

                                                    <ProFormDigit
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.max_snapshots')}
                                                        name='max_snapshots'
                                                        tooltip={"服务器保留的快照数量上限\n默认情况下，服务器会在新的一天开始时对服务器存档，生成一份快照。保留的快照数量决定了可回档的天数上限。\n在世界内有玩家存在时，服务器不会清理该世界的快照。"}
                                                        placeholder="max_snapshots"
                                                    />

                                                    <ProFormText
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.cluster_language')}
                                                        name='cluster_language'
                                                        tooltip={"服务器内信息使用的语言，如人物台词等。"}
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
                                                        tooltip={"世界通信端口\n主服务器将监听/从服务器请求与主服务器连接的UDP端口。\n主从服务器应设为相同值"}
                                                        extra={<span>{t('cluster.alert.master_port.info')}</span>}
                                                        placeholder="master_port"
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.shard_enabled')}
                                                        tooltip="shard_enabled。是否为多世界模式。对于饥荒而言，一个世界代表一个独立的服务器进程，所以地上加地下一共两个世界也是多服务器模式。多世界时会根据玩家设置,将某个世界作为主世界，其他世界为从世界。仅在确定只需要开启单世界时关闭。"
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
                                                        tooltip="bind_ip。从服务器IP\n从服务器的IPv4地址，主服务器监听此IP并与其连接。\n主从服务器都在同一计算机上时，填127.0.0.1(表示本机);否则填0.0.0.0(表示所有IP ) 。\n只需要为主服务器设置此项。"
                                                        extra={<span>{t('cluster.alert.bind_ip.info')}</span>}
                                                        placeholder="bind_ip"
                                                    />

                                                    <ProFormText.Password
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.master_ip')}
                                                        name='master_ip'
                                                        tooltip="master_ip。主服务器IP\n主服务器的IPv4地址，从服务器请求此IP并与其连接。\n主从服务器都在同一计算机上时，填127.0.0.1 ;否则填主服务器IP只需要为从服务器设置此项"
                                                        extra={<span>{t('cluster.alert.master_ip.info')}</span>}
                                                        placeholder="master_ip"
                                                    />

                                                    <ProFormText
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.cluster_key')}
                                                        name='cluster_key'
                                                        tooltip={"世界验证密码\n多服务器开服时，服务器间的验证密码"}
                                                        placeholder="cluster_key"
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
                                                        tooltip={"steam群组编号\n每个steam群组都有唯一的一串数字与其对应，在这里填写群组编号用于绑定steam群组。\n绑定后服务器将在群组成员的大厅中优先显示，并附有红色、黄色或白色小旗子标志。"}
                                                        placeholder="cluster.steam_group_id"
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.steam_group_only')}
                                                        name='steam_group_only'
                                                        tooltip={"是否仅允许steam群组成员加入\n开启后只有群组成员才可加入，其他玩家不可加入。"}
                                                        fieldProps={{
                                                            checkedChildren: t('switch.open'),
                                                            unCheckedChildren: t('switch.close')
                                                        }}
                                                    />

                                                    <ProFormSwitch
                                                        colProps={{ md: 12, xl: 12 }}
                                                        label={t('cluster.steam_group_admins')}
                                                        name='steam_group_admins'
                                                        tooltip={"是否将steam群组管理员设为游戏管理员\n开启后，steam群组的管理员将会自动拥有游戏内管理员身份。"}
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
