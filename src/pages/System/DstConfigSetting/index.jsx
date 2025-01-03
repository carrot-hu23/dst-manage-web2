import React, {useEffect, useState} from 'react';
import {
    Button,
    Form,
    Input,
    message,
    Skeleton,
    Radio,
    Segmented,
    Drawer,
    Space,
    Typography,
    Tooltip,
    Alert, Card
} from 'antd';
import {useTranslation} from "react-i18next";

import {readDstConfigSync, writeDstConfigSync} from "../../../api/dstConfigApi.jsx";

const onFinishFailed = (errorInfo) => {
    message.error("保存配置失败")
    console.log('Failed:', errorInfo);
};

const { Title, Paragraph} = Typography;

export default () => {

    const {t} = useTranslation()
    const {i18n} = useTranslation();
    const [lang, setLang] = useState('zh')

    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setLang(lng)
            setActiveTab(lng === "en" ? "全部" : "默认");
        };

        i18n.on("languageChanged", handleLanguageChange);

        // 清理事件监听器
        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n]);

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)

    const [activeTab, setActiveTab] = useState(lang === 'en' ? '自定义' : '默认');
    const handleTabChange = (value) => {
        setActiveTab(value);
    };
    const [data, setData] = useState({})
    useEffect(() => {
        // 获取配置文件
        readDstConfigSync()
            .then(data => {
                console.log('dst_config', data);
                form.setFieldsValue(data.data)
                setData(data.data)
                setLoading(false)
            })
    }, [form])


    const onFinish = (values) => {
        if (values.persistent_storage_root === undefined  && data.persistent_storage_root !== "") {
            values.persistent_storage_root = data.persistent_storage_root
        }
        if (values.conf_dir === undefined  && data.conf_dir !== "") {
            values.conf_dir = data.conf_dir
        }
        if (values.ugc_directory === undefined  && data.ugc_directory !== "") {
            values.ugc_directory = data.ugc_directory
        }
        setData(values)
        writeDstConfigSync(values)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("保存配置成功")
                } else {
                    message.warning(resp.msg)
                }
        })
    };

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Drawer title="Docker 路径参考" placement="right" onClose={() => setOpen(false)} open={open}>
                <Typography>
                    <Title level={4}>路径参考:</Title>
                    <Title level={5}>容器存档启动路径</Title>
                    <Paragraph>
                        <pre>{'/root/.klei/DoNotStarveTogether'}</pre>
                    </Paragraph>
                    <Title level={5}>容器存档备份路径</Title>
                    <Paragraph>
                        <pre>{'/app/backup'}</pre>
                    </Paragraph>
                    <Title level={5}>容器存档模组路径</Title>
                    <Paragraph>
                        <pre>{'/app/mod'}</pre>
                    </Paragraph>
                    <Title level={5}>容器玩家日志路径</Title>
                    <Paragraph>
                        <pre>{'/app/dst-db'}</pre>
                    </Paragraph>
                    <Title level={5}>容器服务日志路径</Title>
                    <Paragraph>
                        <pre>{'/app/dst-admin-go.log'}</pre>
                    </Paragraph>
                    <Title level={5}>容器启动饥荒路径</Title>
                    <Paragraph>
                        <pre>{'/app/dst-dedicated-server'}</pre>
                    </Paragraph>
                    <Title level={5}>容器启steamcmd</Title>
                    <Paragraph>
                        <pre>{'/app/steamcmd'}</pre>
                    </Paragraph>
                    <Title level={4}>启动命令参考:</Title>
                    <Paragraph>
                        <pre>{'docker run -d -p8082:8082 -v /root/dstsave:/root/.klei/DoNotStarveTogether -v /root/dstsave/backup:/app/backup -v /root/steamcmd:/app/steamcmd -v /root/dst-dedicated-server:/app/dst-dedicated-server  hujinbo23/dst-admin-go:1.2.6'}</pre>
                    </Paragraph>

                </Typography>
            </Drawer>

                <Alert style={{marginBottom: '12px'}}
                       message={t('setting.dstConfig.tips1')}
                       type="info" showIcon/>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    labelAlign={'left'}
                    form={form}
                >
                    <Skeleton loading={loading} active>
                        <Space size={16} wrap>
                            {lang === 'zh' && (<>
                                <Segmented
                                    value={activeTab}
                                    onChange={handleTabChange}
                                    options={['默认', '自定义']}
                                />
                            </>)}
                            <Button
                                    size={"small"}
                                    type={'primary'}
                                    onClick={()=>{
                                setOpen(true)
                            }}>docker映射路径参考</Button>
                            <a target={'_blank'} href={'https://steamcommunity.com/sharedfiles/filedetails/?id=1616647350'} rel="noreferrer" >Dedicated Server配置项和命令行参数详解</a>
                        </Space>
                        <br/>
                        <Form.Item
                            label={t('setting.dstConfig.steamcmd')}
                            name="steamcmd"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input steam cmd install path',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={t('setting.dstConfig.force_install_dir')}
                            name="force_install_dir"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server_nullrenderer.exe path',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={t('setting.dstConfig.backup')}
                            name="backup"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input backup path',
                                },
                            ]}
                            tooltip={"这个路径是放你创建存档备份的路径"}
                        >
                            <Input placeholder="游戏存档备份路径"/>
                        </Form.Item>
                        <Form.Item
                            label={t('setting.dstConfig.mod_download_path')}
                            name="mod_download_path"
                            tooltip={"这个路径是面板下载的模组路径和游戏的模组路径没有关系"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input mod_download_path',
                                },
                            ]}
                        >
                            <Input placeholder="服务器文件夹名"/>
                        </Form.Item>
                        <Form.Item
                            label={t('setting.dstConfig.cluster')}
                            name="cluster"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input cluster',
                                },
                            ]}
                            tooltip={"设置此服务器将使用的存档目录的名称\n" +
                                "    服务器将期望在以下位置找到 cluster.ini 文件\n" +
                                "    <persistent_storage_root>/<conf_dir>/<cluster>/cluster.ini\n" +
                                "    默认值为：Cluster_1"}
                        >
                            <Input placeholder="服务器文件夹名"/>
                        </Form.Item>
                        {activeTab === '自定义' && <div>
                            <Form.Item
                                label={t('setting.dstConfig.persistent_storage_root')}
                                name='persistent_storage_root'
                                tooltip={"设置游戏配置目录的路径。路径需要是绝对路径。\n" +
                                    "    用户文件的完整路径是\n" +
                                    "    <persistent_storage_root>/<conf_dir>/\n" +
                                    "    <conf_dir> 是通过 -conf_dir 设置的值\n" +
                                    "    该值的默认值取决于平台：\n" +
                                    "        Windows: <你的文档文件夹>/Klei\n" +
                                    "        Mac OSX: <你的主文件夹>/Documents/Klei\n" +
                                    "        Linux: ~/.klei"}
                            >
                                <Input placeholder="persistent_storage_root"/>
                            </Form.Item>
                        </div>}
                        {activeTab === '自定义' && <div>
                            <Form.Item
                                label={t('setting.dstConfig.conf_dir')}
                                name='conf_dir'
                                tooltip={"更改配置目录的名称，不包含斜杠\n" +
                                    "    用户文件的完整路径是\n" +
                                    "    <persistent_storage_root>/<conf_dir>/\n" +
                                    "    <persistent_storage_root> 是通过 -persistent_storage_root 设置的值\n" +
                                    "    默认值为：DoNotStarveTogether"}
                            >
                                <Input placeholder="conf_dir"/>
                            </Form.Item>
                        </div>}
                        {activeTab === '自定义' && <div>
                            <Form.Item
                                label={t('setting.dstConfig.ugc_directory')}
                                name='ugc_directory'
                                tooltip={"专用服务器现在将 v2 mods 存储在 <install_directory>/ugc_mods/<ClusterDirectory>/<ShardDirectory>\n" +
                                    "    （ClusterDirectory 和 ShardDirectory 分别是通过 -cluster 和 -shard 定义的值）\n" +
                                    "    如果你想改变这个，你可以添加命令行参数\n" +
                                    "    -ugc_directory <存储 v2 mods 的目录路径>"}
                            >
                                <Input placeholder="ugc_directory"/>
                            </Form.Item>
                        </div>}
                        {/*
                        <Form.Item
                            label="beta"
                            name="beta"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server beta',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={0}>false</Radio>
                                <Radio value={1}>true</Radio>
                            </Radio.Group>
                        </Form.Item>
                        */}
                        <Form.Item
                            label={t('setting.dstConfig.bin')}
                            name="bin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server bin',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={32}>{t('setting.dstConfig.bin.32')}</Radio>
                                <Radio value={64}>{t('setting.dstConfig.bin.64')}</Radio>
                                <Tooltip title={'luajit是一种特殊的启动方式，目前只是兼容这种启动方式。环境需要自己安装，详细参考: https://github.com/CN-DST-DEVELOPER/Faster_DST'}>
                                    <Radio value={100}>luajit</Radio>
                                </Tooltip>

                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Button style={{margin: "0 auto", display: "block"}} type="primary" htmlType="submit">
                                {t('setting.dstConfig.save')}
                            </Button>
                        </Form.Item>
                    </Skeleton>
                </Form>

        </div>
    )
}