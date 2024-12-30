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
            <h3>初始化账号</h3>
            <h3>init account</h3>
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
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名/username" />
                </Form.Item>
                <Form.Item
                    label={t('init.password')}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码/password" maxLength={20} />
                </Form.Item>

                <Form.Item
                    label={t('init.displayName')}
                    name="displayName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your displayName!',
                        },
                    ]}
                >
                    <Input  placeholder="显示名称/displayName" />
                </Form.Item>
                <Form.Item
                    label={t('init.photoURL')}
                    name="photoURL"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your photoURL!',
                        },
                    ]}
                >
                    <Input placeholder="头像url/photoURL" />
                </Form.Item>

                <Form.Item>
                <Tooltip placement="top" title={"可以在dst-admin-go目录下的password文件直接修改"}>
                    <Button type="link">
                        不记得密码了
                    </Button>
                </Tooltip>
                </Form.Item>
            </Form>
        </ProCard>
    )
}
export default Register