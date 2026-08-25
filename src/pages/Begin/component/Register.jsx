import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,Tooltip } from 'antd';
import {useTranslation} from "react-i18next";
import {ProCard} from "@ant-design/pro-components";

const Register = (props) => {
    const { t } = useTranslation()
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    return (
        <ProCard>
            <h3>{t('begin.register.title')}</h3>
            <br />
            <Form
                // eslint-disable-next-line react/prop-types
                form={props.form || {}}
                // name="normal_login"
                // className="login-form"
                onFinish={onFinish}
                style={{
                    margin: '24px',
                }}
                layout={'vertical'}
            >
                <Form.Item
                    label={t('init.username')}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: t('init.username.required'),
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('init.username.placeholder')} />
                </Form.Item>
                <Form.Item
                    label={t('init.password')}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t('init.password.required'),
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={t('init.password.placeholder')} maxLength={20} />
                </Form.Item>

                <Form.Item
                    label={t('init.displayName')}
                    name="displayName"
                    rules={[
                        {
                            required: true,
                            message: t('init.displayName.required'),
                        },
                    ]}
                >
                    <Input  placeholder={t('init.displayName.placeholder')} />
                </Form.Item>
                <Form.Item
                    label={t('init.photoURL')}
                    name="photoURL"
                    rules={[
                        {
                            required: false,
                            message: t('init.photoURL.required'),
                        },
                    ]}
                >
                    <Input placeholder={t('init.photoURL.placeholder')} />
                </Form.Item>

                <Form.Item>
                <Tooltip placement="top" title={t('init.forgotPassword.tooltip')}>
                    <Button type="link">
                        {t('login.forgotPassword.button')}
                    </Button>
                </Tooltip>
                </Form.Item>
            </Form>
        </ProCard>
    )
}
export default Register