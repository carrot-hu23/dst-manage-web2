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
import i18next from "../../../locales/i18n.tsx";

import {readDstConfigSync, writeDstConfigSync} from "../../../api/dstConfigApi.jsx";
import MarkdownRender from "../../Help/MarkdownRender.jsx";

const onFinishFailed = (errorInfo) => {
    message.error(i18next.t('setting.dstConfig.save.error'))
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
            setActiveTab(lng === "en" ? "all" : "default");
        };

        i18n.on("languageChanged", handleLanguageChange);

        // 清理事件监听器
        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n]);

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true)

    const [activeTab, setActiveTab] = useState(lang === 'en' ? 'custom' : 'default');
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
                    message.success(t('setting.dstConfig.save.ok'))
                } else {
                    message.warning(resp.msg)
                }
        })
    };

    const [open, setOpen] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);

    return (
        <div>
            <Drawer title={t('setting.dstConfig.dockerPathReference.title')} placement="right" onClose={() => setOpen(false)} open={open}>
                <Typography>
                    <Title level={4}>{t('setting.dstConfig.pathReference')}</Title>
                    <Title level={5}>{t('setting.dstConfig.docker.savePath')}</Title>
                    <Paragraph>
                        <pre>{'/root/.klei/DoNotStarveTogether'}</pre>
                    </Paragraph>
                    <Title level={5}>{t('setting.dstConfig.docker.backupPath')}</Title>
                    <Paragraph>
                        <pre>{'/app/backup'}</pre>
                    </Paragraph>
                    <Title level={5}>{t('setting.dstConfig.docker.modPath')}</Title>
                    <Paragraph>
                        <pre>{'/app/mod'}</pre>
                    </Paragraph>
                    <Title level={5}>{t('setting.dstConfig.docker.playerLogPath')}</Title>
                    <Paragraph>
                        <pre>{'/app/dst-db'}</pre>
                    </Paragraph>
                    <Title level={5}>{t('setting.dstConfig.docker.serviceLogPath')}</Title>
                    <Paragraph>
                        <pre>{'/app/dst-admin-go.log'}</pre>
                    </Paragraph>
                    <Title level={5}>{t('setting.dstConfig.docker.gameStartPath')}</Title>
                    <Paragraph>
                        <pre>{'/app/dst-dedicated-server'}</pre>
                    </Paragraph>
                    <Title level={5}>{t('setting.dstConfig.docker.steamcmdPath')}</Title>
                    <Paragraph>
                        <pre>{'/app/steamcmd'}</pre>
                    </Paragraph>
                    <Title level={4}>{t('setting.dstConfig.startCommandReference')}</Title>
                    <Paragraph>
                        <pre>{'docker run -d -p8082:8082 -v /root/dstsave:/root/.klei/DoNotStarveTogether -v /root/dstsave/backup:/app/backup -v /root/steamcmd:/app/steamcmd -v /root/dst-dedicated-server:/app/dst-dedicated-server  hujinbo23/dst-admin-go:1.2.6'}</pre>
                    </Paragraph>

                </Typography>
            </Drawer>

            <Drawer title={t('setting.dstConfig.dedicatedServerGuide.title')} placement="right" width={720} onClose={() => setGuideOpen(false)} open={guideOpen}>
                <MarkdownRender url={'misc/dst-dedicated-server-guide.es.md'} />
            </Drawer>

                <Alert style={{marginBottom: '12px'}}
                       message={t('setting.dstConfig.tips1')}
                       type="info" showIcon/>
                {data.container_mode && (
                    <Alert style={{marginBottom: '12px'}}
                           message={t('setting.dstConfig.containerMode.tips')}
                           type="warning" showIcon/>
                )}
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
                                    options={[
                                        {label: t('setting.timedTask.mode.default'), value: 'default'},
                                        {label: t('setting.timedTask.mode.custom'), value: 'custom'},
                                    ]}
                                />
                            </>)}
                            <Button
                                    size={"small"}
                                    type={'primary'}
                                    onClick={()=>{
                                setOpen(true)
                            }}>{t('setting.dstConfig.dockerPathReference.button')}</Button>
                            {lang === 'es' && (
                                <Button
                                    size={"small"}
                                    onClick={()=>{
                                        setGuideOpen(true)
                                    }}>{t('setting.dstConfig.dedicatedServerGuide.button')}</Button>
                            )}
                            <a target={'_blank'} href={'https://steamcommunity.com/sharedfiles/filedetails/?id=1616647350'} rel="noreferrer" >{t('setting.dstConfig.dedicatedServerDocs')}</a>
                        </Space>
                        <br/>
                        <Form.Item
                            label={t('setting.dstConfig.steamcmd')}
                            name="steamcmd"
                            rules={[
                                {
                                    required: true,
                                    message: t('setting.dstConfig.steamcmd.required'),
                                },
                            ]}
                        >
                            <Input disabled={data.container_mode}/>
                        </Form.Item>
                        <Form.Item
                            label={t('setting.dstConfig.force_install_dir')}
                            name="force_install_dir"
                            rules={[
                                {
                                    required: true,
                                    message: t('setting.dstConfig.force_install_dir.required'),
                                },
                            ]}
                        >
                            <Input disabled={data.container_mode}/>
                        </Form.Item>
                        <Form.Item
                            label={t('setting.dstConfig.backup')}
                            name="backup"
                            rules={[
                                {
                                    required: true,
                                    message: t('setting.dstConfig.backup.required'),
                                },
                            ]}
                            tooltip={t('setting.dstConfig.backup.tooltip')}
                        >
                            <Input placeholder={t('setting.dstConfig.backup.placeholder')}/>
                        </Form.Item>
                        <Form.Item
                            label={t('setting.dstConfig.mod_download_path')}
                            name="mod_download_path"
                            tooltip={t('setting.dstConfig.mod_download_path.tooltip')}
                            rules={[
                                {
                                    required: true,
                                    message: t('setting.dstConfig.mod_download_path.required'),
                                },
                            ]}
                        >
                            <Input placeholder={t('setting.dstConfig.mod_download_path.placeholder')}/>
                        </Form.Item>
                        <Form.Item
                            label={t('setting.dstConfig.cluster')}
                            name="cluster"
                            rules={[
                                {
                                    required: true,
                                    message: t('setting.dstConfig.cluster.required'),
                                },
                            ]}
                            tooltip={t('setting.dstConfig.cluster.tooltip')}
                        >
                            <Input placeholder={t('setting.dstConfig.cluster.placeholder')} disabled={data.container_mode}/>
                        </Form.Item>
                        {activeTab === 'custom' && <div>
                            <Form.Item
                                label={t('setting.dstConfig.persistent_storage_root')}
                                name='persistent_storage_root'
                                tooltip={t('setting.dstConfig.persistent_storage_root.tooltip')}
                            >
                                <Input placeholder={t('setting.dstConfig.persistent_storage_root.placeholder')}/>
                            </Form.Item>
                        </div>}
                        {activeTab === 'custom' && <div>
                            <Form.Item
                                label={t('setting.dstConfig.conf_dir')}
                                name='conf_dir'
                                tooltip={t('setting.dstConfig.conf_dir.tooltip')}
                            >
                                <Input placeholder={t('setting.dstConfig.conf_dir.placeholder')}/>
                            </Form.Item>
                        </div>}
                        {activeTab === 'custom' && <div>
                            <Form.Item
                                label={t('setting.dstConfig.ugc_directory')}
                                name='ugc_directory'
                                tooltip={t('setting.dstConfig.ugc_directory.tooltip')}
                            >
                                <Input placeholder={t('setting.dstConfig.ugc_directory.placeholder')}/>
                            </Form.Item>
                        </div>}
                        <Form.Item
                            label={t('setting.dstConfig.beta.label')}
                            name="beta"
                            rules={[
                                {
                                    required: true,
                                    message: t('setting.dstConfig.beta.required'),
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={0}>{t('setting.dstConfig.beta.false')}</Radio>
                                <Radio value={1}>{t('setting.dstConfig.beta.true')}</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label={t('setting.dstConfig.bin')}
                            name="bin"
                            rules={[
                                {
                                    required: true,
                                    message: t('setting.dstConfig.bin.required'),
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={32}>{t('setting.dstConfig.bin.32')}</Radio>
                                <Radio value={64}>{t('setting.dstConfig.bin.64')}</Radio>
                                <Tooltip title={t('setting.dstConfig.bin.luajit.tooltip')}>
                                    <Radio value={100}>luajit</Radio>
                                </Tooltip>
                                <Tooltip title={t('setting.dstConfig.bin.box86.tooltip')}>
                                    <Radio value={86}>box86</Radio>
                                </Tooltip>
                                <Tooltip title={t('setting.dstConfig.bin.arm64.tooltip')}>
                                    <Radio value={2664}>arm64</Radio>
                                </Tooltip>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                {t('setting.dstConfig.save')}
                            </Button>
                        </Form.Item>
                    </Skeleton>
                </Form>

        </div>
    )
}