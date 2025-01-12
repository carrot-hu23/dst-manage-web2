import React, {useEffect, useState} from "react";

import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Radio,
    Switch,
    Tooltip,
    Skeleton,
    Modal,
    Typography
} from "antd";

import {useTranslation} from "react-i18next";

import {dstGameMod} from "../../../utils/dst";
import {getClusterIniApi, saveClusterIniApi} from "../../../api/level.jsx";

import style from '../../DstServerList/index.module.css'
import {FooterToolbar, ProCard} from "@ant-design/pro-components";
import DstEmoji from "../../DstServerList/DstEmoji/index.jsx";

const {TextArea} = Input;
const {Paragraph, Text } = Typography;

export default () => {

    const {t} = useTranslation()
    const {i18n} = useTranslation();
    const [lang, setLang] = useState( 'zh')

    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setLang(lng)
        };

        i18n.on("languageChanged", handleLanguageChange);

        // 清理事件监听器
        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n]);


    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const [choose, setChoose] = useState("survival");
    const onRadioChange = (e) => {
        setChoose(e.target.value);
    }

    const onFinish = () => {

        form.validateFields().then(() => {
            const body = {
                cluster: form.getFieldValue(),
                token: form.getFieldValue().cluster_token
            }
            body.cluster.cluster_description = body.cluster.cluster_description.replace(/\n/g, "")
            console.log('body:', body);
            saveClusterIniApi("", body)
                .then(resp => {
                    if (resp.code === 200) {
                        message.success(t('cluster.save.ok'))
                    } else {
                        message.warning(t('cluster.save.error'))
                        message.warning(resp.msg)
                    }
                })
        }).catch(err => {
            // 验证不通过时进入
            message.error(err.errorFields[0].errors[0])
        });

    }

    useEffect(() => {
        setLoading(true)
        getClusterIniApi("")
            .then(resp => {
                if (resp.code === 200) {
                    form.setFieldsValue({...resp.data.cluster, ...{cluster_token: resp.data.token}})
                } else {
                    message.warning(t('cluster.fetch.error'))
                }
                setLoading(false)
            })
    }, [])

    const [open, setOpen] = useState(false)

    const Description = ({text})=>{
        return(
            <div style={{
                paddingTop: 12,
            }}>
                <Text>
                    {text}
                </Text>
            </div>
        )
    }

    return (
        <>
            <div className={`${style.antInput}`}>
                <Modal title="Emoj" open={open} onCancel={() => setOpen(false)} footer={null}>
                    <DstEmoji/>
                </Modal>

                <Skeleton loading={loading} active>
                    <Form
                        form={form}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        layout="horizontal"
                        initialValues={{
                            pvp: false,
                            vote_enabled: true,
                            players: 8,
                            steam_group_only: false,
                            tick_rate: 15,
                            max_snapshots: 6,
                            bind_ip: '127.0.0.1'
                        }}
                    >
                        <ProCard
                            title={`${t('cluster.BaseSetting')}`}
                            tooltip={"房间一些基础的设置，比如房间名称，密码，最大人数等设置"}
                        >
                            <Form.Item
                                label={t('cluster.cluster_name')}
                                name='cluster_name'
                                tooltip={"已经支持了 + | [] \\ 等特殊字符了"}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入房间名',
                                    },
                                ]}>
                                <Input rootClassName={style.icon} placeholder="请输入房间名称" allowClear
                                />
                            </Form.Item>

                            <Form.Item label="-">
                                <Button type={'link'} onClick={() => setOpen(true)}>emoji</Button>

                            </Form.Item>

                            <Form.Item label={t('cluster.cluster_description')} name='cluster_description'>
                                <TextArea className={style.icon} rows={3} placeholder="请输入房间描述"/>

                            </Form.Item>
                            <Form.Item
                                label={t('cluster.game_mode')}
                                name='game_mode'
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择游戏模式',
                                    },
                                ]}
                                tooltip={"游戏风格\n" +
                                    "主要有社交、合作、竞争、疯狂四种。\n" +
                                    "展示该房间的游戏倾向，是友好社交还是兵戎相见。但不会影响游戏内容。\n"}
                                onChange={onRadioChange}
                            >
                                <Radio.Group>
                                    {dstGameMod.map(item =>
                                        <Tooltip key={item.name} title={item.description}>
                                            <Radio key={item.name} value={item.name}>
                                                {lang !== 'zh' && (<>{item.name}</>)}
                                                {lang === 'zh' && (<>{item.cn}</>)}
                                            </Radio>
                                        </Tooltip>)}
                                </Radio.Group>
                            </Form.Item>
                            {choose === 'customization' &&
                                <Form.Item label={t('cluster.customization_mode')}
                                           tooltip="当只有选择了“自定义模式” 这个值才会生效"
                                           name='customization_mode'>
                                    <Input placeholder="自定义游戏模式" maxLength={20}/>
                                </Form.Item>
                            }
                            <Form.Item
                                label={t('cluster.max_players')}
                                tooltip="人数越多，服务器压力越大。对云服而言，1c2g推荐4人，2c4g推荐6-8人。"
                                name='max_players'
                            >
                                <InputNumber/>
                            </Form.Item>
                            <Form.Item label={t('cluster.cluster_password')} name='cluster_password'>
                                <Input.Password placeholder="最大长度20"/>
                                {/*<Description text={'房间密码'}/>*/}
                            </Form.Item>
                            <Form.Item
                                label={t('cluster.cluster_token')}
                                name='cluster_token'
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入令牌',
                                    },
                                ]}
                                tooltip={"服务器令牌\n" +
                                    "维持服务器独立运行的凭证，符合要求的令牌才可以开启服务器。创建令牌的玩家将自动成为使用该令牌开启的服务器的管理员"}
                            >
                                <Input.Password placeholder="科雷token令牌"/>
                                {/*<Description text={'服务器令牌维持服务器独立运行的凭证，符合要求的令牌才可以开启服务器。创建令牌的玩家将自动成为使用该令牌开启的服务器的管理员'} />*/}
                            </Form.Item>
                            <Form.Item label={t('cluster.pvp')} valuePropName="checked" tooltip="是否开启玩家对战"
                                       name='pvp'>
                                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}
                                        defaultChecked/>
                                {/*<Description text={'是否开启玩家对战'} />*/}
                            </Form.Item>
                            <Form.Item label={t('cluster.vote_enabled')} valuePropName="checked"
                                       tooltip="开启后可通过投票进行踢出玩家、回档、重置世界操作。"
                                       name='vote_enabled'>
                                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}
                                        defaultChecked/>
                                {/*<Description text={'开启后可通过投票进行踢出玩家、回档、重置世界操作'} />*/}
                            </Form.Item>
                            <Form.Item label={t('cluster.pause_when_nobody')} valuePropName="checked"
                                       tooltip="世界没人时将自动暂停"
                                       name='pause_when_nobody'>
                                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}
                                        defaultChecked/>
                                {/*<Description text={'世界没人时将自动暂停'} />*/}
                            </Form.Item>
                            <Form.Item label={t('cluster.console_enabled')} valuePropName="checked"
                                       tooltip="关闭后世界不能使用控制台"
                                       name='console_enabled'>
                                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}
                                        defaultChecked/>
                                {/*<Description text={'关闭后世界不能使用控制台'} />*/}
                            </Form.Item>
                            <Form.Item
                                label={t('cluster.whitelist_slots')}
                                name='whitelist_slots'
                                tooltip={"为白名单内玩家保留的位置数量设置后，该数量的位置只允许白名单内玩家占据，其他玩家共享剩余的位置。\n" +
                                    "关于保留栏位与白名单，实际保留栏位并不等于设置的保留栏位，而是设置保留栏位与白名单中ID数量两者中较小的那个值。"}
                            >
                                <InputNumber placeholder="预留位" maxLength={200}/>
                                {/*<Description text={"为白名单内玩家保留的位置数量设置后，该数量的位置只允许白名单内玩家占据，其他玩家共享剩余的位置。\n" +*/}
                                {/*    "关于保留栏位与白名单，实际保留栏位并不等于设置的保留栏位，而是设置保留栏位与白名单中ID数量两者中较小的那个值。"} />*/}
                            </Form.Item>
                            <Form.Item
                                label={t('cluster.tick_rate')}
                                name='tick_rate'
                                tooltip={"客户端与服务器之间每秒通信的次数\n" +
                                    "性能满足的情况下，通信频率越高，游戏越流畅、体验越好，但会大幅提高服务器的运行压力。取值应为可被60整除的值，如15、20、30、60等。"}
                            >
                                <InputNumber placeholder="通信次数" maxLength={200}/>
                                {/*<Description text={"客户端与服务器之间每秒通信的次数\n" +*/}
                                {/*    "性能满足的情况下，通信频率越高，游戏越流畅、体验越好，但会大幅提高服务器的运行压力。取值应为可被60整除的值，如15、20、30、60等。"} />*/}
                            </Form.Item>
                            <Form.Item
                                label={t('cluster.offline_cluster')}
                                name='offline_cluster'
                                valuePropName="checked"
                                tooltip={"创建一个离线服务器。此服务器不会在公共服务器列表展示，只有本地用户可以加入，所有steam相关的功能无效"}
                            >
                                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}/>
                                {/*<Description text={"创建一个离线服务器。此服务器不会在公共服务器列表展示，只有本地用户可以加入，所有steam相关的功能无效。"} />*/}
                            </Form.Item>
                            <Form.Item
                                label={t('cluster.lan_only_cluster')}
                                name='lan_only_cluster'
                                valuePropName="checked"
                                tooltip={"如果设置为true，服务器仅允许同一个局域网的玩家进入"}
                            >
                                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}/>
                                {/*<Description text={"如果设置为true，服务器仅允许同一个局域网的玩家进入"} />*/}
                            </Form.Item>
                            <Form.Item
                                label={t('cluster.max_snapshots')}
                                name='max_snapshots'
                                tooltip={"服务器保留的快照数量上限\n" +
                                    "默认情况下，服务器会在新的一天开始时对服务器存档，生成一份快照。保留的快照数量决定了可回档的天数上限。\n" +
                                    "在世界内有玩家存在时，服务器不会清理该世界的快照。"}
                            >
                                <InputNumber placeholder="max_snapshots" maxLength={200}/>
                                {/*<Description text={"服务器保留的快照数量上限\n" +*/}
                                {/*"默认情况下，服务器会在新的一天开始时对服务器存档，生成一份快照。保留的快照数量决定了可回档的天数上限。\n" +*/}
                                {/*"在世界内有玩家存在时，服务器不会清理该世界的快照。"} />*/}
                            </Form.Item>
                            <Form.Item
                                label={t('cluster.cluster_language')}
                                name='cluster_language'
                                tooltip={"服务器内信息使用的语言，如人物台词等。"}
                            >
                                <Input placeholder="zh"/>
                            </Form.Item>
                        </ProCard>
                        <br/>
                        <ProCard title={t('cluster.ShardSetting')}
                                 subTitle={"世界串联"}
                        >

                            <Form.Item label={t('cluster.shard_enabled')} valuePropName="checked" tooltip="shard_enabled。是否为多世界模式。
对于饥荒而言，一个世界代表一个独立的服务器进程，所以地上加地下一共两个世界也是多服务器模式。
多世界时会根据玩家设置,将某个世界作为主世界，其他世界为从世界。
仅在确定只需要开启单世界时关闭。"
                                       name='shard_enabled'>
                                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}
                                        defaultChecked/>
                            </Form.Item>


                            <Form.Item
                                label={t('cluster.bind_ip')}
                                name='bind_ip'
                                tooltip="bind_ip。从服务器IP
从服务器的IPv4地址，主服务器监听此IP并与其连接。
主从服务器都在同一计算机上时，填127.0.0.1(表示本机);否则填0.0.0.0(表示所有IP ) 。
只需要为主服务器设置此项。"
                            >
                                <Input.Password placeholder="bind_ip" maxLength={200}/>
                            </Form.Item>

                            <Form.Item
                                label={t('cluster.master_ip')}
                                name='master_ip'
                                tooltip="master_ip。主服务器IP
主服务器的IPv4地址，从服务器请求此IP并与其连接。
主从服务器都在同一计算机上时，填127.0.0.1 ;否则填主服务器IP只需要为从服务器设置此项"
                            >
                                <Input.Password placeholder="master_ip" maxLength={200}/>
                            </Form.Item>

                            <Form.Item
                                label={t('cluster.master_port')}
                                name='master_port'
                                tooltip={"世界通信端口\n" +
                                    "主服务器将监听/从服务器请求与主服务器连接的UDP端口。\n" +
                                    "主从服务器应设为相同值"}
                            >
                                <InputNumber placeholder="master_port" maxLength={200}/>
                            </Form.Item>

                            <Form.Item
                                label={t('cluster.cluster_key')}
                                name='cluster_key'
                                tooltip={"世界验证密码\n" +
                                    "多服务器开服时，服务器间的验证密码"}
                            >
                                <Input placeholder="cluster_key" maxLength={200}/>
                            </Form.Item>
                        </ProCard>
                        <br/>
                        <ProCard title={t('cluster.SteamSetting')}>

                            <Form.Item
                                label={t('cluster.steam_group_id')}
                                name='steam_group_id'
                                tooltip={"steam群组编号\n" +
                                    "每个steam群组都有唯一的一串数字与其对应，在这里填写群组编号用于绑定steam群组。\n" +
                                    "绑定后服务器将在群组成员的大厅中优先显示，并附有红色、黄色或白色小旗子标志。"}
                            >
                                <Input placeholder="cluster.steam_group_id"/>
                            </Form.Item>

                            <Form.Item label={t('cluster.steam_group_only')} valuePropName="checked"
                                       name='steam_group_only'
                                       tooltip={"是否仅允许steam群组成员加入\n" +
                                           "开启后只有群组成员才可加入，其他玩家不可加入。"}
                            >
                                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}/>
                            </Form.Item>

                            <Form.Item
                                valuePropName="checked"
                                label={t('cluster.steam_group_admins')}
                                name='steam_group_admins'
                                tooltip={"是否将steam群组管理员设为游戏管理员\n" +
                                    "                            开启后，steam群组的管理员将会自动拥有游戏内管理员身份。"}
                            >
                                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}/>
                            </Form.Item>
                        </ProCard>
                    </Form>
                    <br/>
                </Skeleton>
            </div>

            <FooterToolbar>
                <Button type="primary" onClick={() => onFinish()}>
                    {t('cluster.save')}
                </Button>
            </FooterToolbar>
        </>
    )
}