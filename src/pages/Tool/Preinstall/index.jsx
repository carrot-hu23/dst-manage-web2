import {Col, Row, Avatar, Alert, Button, Form, Space, message, Spin, Skeleton} from "antd";
import {
    CheckCard,
} from '@ant-design/pro-components';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {usePreinstallApi} from "../../../api/preinstallApi.jsx";

export default ({reload}) => {
    const {t} = useTranslation()
    const {cluster} = useParams()

    const [form] = Form.useForm();
    const [name, setName] = useState("default")
    const [spin, setSpin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [preinstalls, setPreinstalls] = useState([]);

    useEffect(() => {
        setLoading(true)
        fetch('/misc/preinstall.json')
            .then(response => response.json())
            .then(data => {
                setPreinstalls(data)
                setLoading(false)
            }).catch(error => {
            console.error('无法加载配置文件', error)
        })
    }, [])

    function save() {
        setSpin(true)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        usePreinstallApi(cluster, name)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('tool.preinstall.setSuccess'))
                    if (reload) {
                        reload()
                    }
                } else {
                    message.error(`${t('tool.preinstall.setError')} ${resp.msg}`)
                }
                setSpin(false)
            })
    }

    return (
        <>
            <Skeleton loading={loading}>
                <Spin spinning={spin} tip={t('tool.preinstall.replacing')}>
                    <Form form={form} layout="vertical">
                        <Form.Item name="template" label={t('tool.preinstall.worldTemplate')}>
                            <CheckCard.Group
                                style={{width: '100%'}}
                                onChange={(value) => {
                                    console.log('value', value);
                                    setName(value)
                                }}
                                defaultValue="default"
                            >
                                <Row gutter={[16,16]}>
                                    {preinstalls.map((item, index) => (
                                        <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                                            <div key={index}>
                                                <CheckCard
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                    avatar={
                                                        <Avatar
                                                            src={item.src}
                                                            size="large"
                                                        />
                                                    }
                                                    title={item.key ? t(`tool.preinstall.preset.${item.key}.name`) : item.name}
                                                    description={item.key ? t(`tool.preinstall.preset.${item.key}.description`) : item.description}
                                                    value={item.value}/>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>

                            </CheckCard.Group>
                        </Form.Item>
                    </Form>

                    <Alert message={t('tool.preinstall.windowsPathWarning')}
                           type="warning" showIcon/>
                    <Alert style={{marginTop: '8px'}}
                           message={t('tool.preinstall.riskWarning')}
                           type="warning" showIcon/>
                    <br/>
                    <Alert style={{marginTop: '8px'}}
                           message={t('tool.preinstall.templateInfoNote')}
                           type="info" showIcon/>
                    <br/><br/>
                    <Space size={8} wrap>
                        <Button type="primary" onClick={() => save()}>{t('cluster.save')}</Button>
                    </Space>
                </Spin>
            </Skeleton>
        </>
    )
}