import {Button, Form, Input, message, Skeleton, Typography} from 'antd';
import {useEffect, useState} from "react";
import {ProCard} from "@ant-design/pro-components";
import {getUserInfoApi, updateUserApi} from "../api/userApi.jsx";
import {useTranslation} from "react-i18next";

export default () => {
    const {t} = useTranslation();

    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true)
        getUserInfoApi()
            .then(resp => {
                if (resp.code === 200) {
                    form.setFieldsValue(resp.data)
                }
                setLoading(false)
            })
    }, [])

    function updateUserInfo() {
        form.validateFields().then(() => {
            const data = form.getFieldsValue()
            updateUserApi("", data)
                .then(resp => {
                    if (resp.code === 200) {
                        message.success(t('userProfile.save.ok'))
                    } else {
                        message.error(t('userProfile.save.error'), resp.msg)
                    }
                })
        }).catch(err => {
            // 验证不通过时进入
            message.error(err.errorFields[0].errors[0])
        });

    }

    return <>
        <ProCard>
            <Typography.Title level={4}>{t('userProfile.title')}</Typography.Title>
            <Skeleton loading={loading} active>
                <Form
                    form={form}
                    initialValues={{}}
                    layout="vertical"
                >
                    <Form.Item
                        label={t('init.photoURL')}
                        name="photoURL"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={t('init.username')}
                        name="username"
                        rules={[{required: true, message: t('userProfile.username.required'),},]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={t('init.displayName')}
                        name="displayName"
                        rules={[{required: true, message: t('userProfile.displayName.required'),},]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={t('init.password')}
                        name="password"
                        rules={[{required: true, message: t('userProfile.password.required'),},]}
                    >
                        <Input/>
                    </Form.Item>

                </Form>
                <Button style={{margin: "0 auto", display: "block"}} type="primary" onClick={() => {
                    updateUserInfo()
                }}>
                    {t('cluster.save')}
                </Button>
            </Skeleton>
        </ProCard>
    </>
}