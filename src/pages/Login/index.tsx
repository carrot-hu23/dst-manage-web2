import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, message, Space, Tooltip, Typography} from 'antd';

import {Navigate, useNavigate} from "react-router-dom"
import {http} from '../../utils/http';

import './index.css';
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useTheme} from "../../hooks/useTheme";
import {ProCard, ProConfigProvider} from "@ant-design/pro-components";
import ToggleTheme from "../../layout/ToggleTheme";
import {isFirstApi} from "../../api/InitApi";
import type {ApiResponse} from "../../types";

const {Title} = Typography;

// 登录表单值类型
interface LoginFormValues {
    username: string;
    password: string;
    remember?: boolean;
}

// 登录 API 响应数据类型
interface LoginResponseData {
    username: string;
    displayName?: string;
    photoURL?: string;
}

// 记住的凭证类型
interface RememberedCredentials {
    username: string;
    password: string;
}

const StyledContent = {
    maxWidth: 380,
    margin: 'auto',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column' as const,
    alignItems: 'center'
}

// Base64 编码函数
const encodeCredentials = (credentials: RememberedCredentials): string => {
    return btoa(JSON.stringify(credentials));
}

// Base64 解码函数
const decodeCredentials = (encoded: string): RememberedCredentials | null => {
    try {
        return JSON.parse(atob(encoded));
    } catch (error) {
        console.error('Failed to decode credentials:', error);
        return null;
    }
}

const Login: React.FC = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [form] = Form.useForm<LoginFormValues>();

    const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

    useEffect(() => {
        isFirstApi().then(data => {
            if (data.code === 200) {
                setIsFirstTime(true)
            } else {
                setIsFirstTime(false)
            }
        })
        setIsFirstTime(false)
    }, [])

    // 加载记住的凭证
    useEffect(() => {
        try {
            const remembered = localStorage.getItem('remembered-credentials');
            if (remembered) {
                const credentials = decodeCredentials(remembered);
                if (credentials) {
                    form.setFieldsValue({
                        username: credentials.username,
                        password: credentials.password,
                        remember: true
                    });
                }
            }
        } catch (error) {
            console.error('Failed to load remembered credentials:', error);
            localStorage.removeItem('remembered-credentials');
        }
    }, [form]);

    const onFinish = async (values: LoginFormValues) => {
        // 2.登录
        const loginResponse = await http.post<ApiResponse<LoginResponseData>>("/api/login", {
            username: values.username,
            password: values.password
        })
        const loginResponseData = loginResponse.data
        if (loginResponseData.code !== 200) {
            message.error("登录失败")
            return
        }
        console.log("values", values)
        // 处理记住密码
        if (values.remember) {
            const credentials: RememberedCredentials = {
                username: values.username,
                password: values.password
            };
            localStorage.setItem('remembered-credentials', encodeCredentials(credentials));
        } else {
            localStorage.removeItem('remembered-credentials');
        }

        localStorage.setItem("token", loginResponseData.data!.username)
        localStorage.setItem("user", JSON.stringify(loginResponseData.data))
        // 3.跳转
        navigate('/')
    }

    const {theme} = useTheme()

    useEffect(() => {
        document.body.style.backgroundColor = theme === 'dark' ? 'black' : '#F9FAFB'
    }, [theme])

    useEffect(() => {

        document.body.style.backgroundImage = theme === 'dark'? "url('./assets/dark-bg.png')":"url('./assets/light-bg.png')";
        document.body.style.backgroundSize = 'cover'; // 背景图覆盖整个页面
        document.body.style.backgroundPosition = 'center'; // 背景图居中显示
        document.body.style.backgroundRepeat = 'no-repeat'; // 背景图不重复

        // 清理函数，组件卸载时调用
        return () => {
            // document.body.style.backgroundColor = ''; // 恢复默认背景颜色
            document.body.style.backgroundImage = ''; // 移除背景图
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundRepeat = '';
        };

    }, [theme])

    const Content = () => {
        return (
            <div style={StyledContent}>
                <ProCard>
                    <Title level={3}>{t('loginTitle')}</Title>
                    <br/>
                    <Form
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>
                                <Tooltip title={'记住账号密码，下次自动填充'}>
                                    <span>{t('login.remember.me')}</span>
                                </Tooltip>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <div
                                style={{
                                    marginBlockEnd: 36,
                                }}
                            >
                                <Tooltip title={'在部署目录下找到password.txt文件修改'}>
                                    <a style={{float: 'left',}}>
                                        忘记密码
                                    </a>
                                </Tooltip>
                                <Space wrap style={{float: 'right',}}>
                                    <ToggleTheme/>
                                </Space>
                            </div>
                            <br/>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {t('web.login')}
                            </Button>
                        </Form.Item>
                    </Form>
                </ProCard>
            </div>
        )
    }

    return (
        <>
            {!isFirstTime ?(
                <>
                    {theme === 'dark' && (
                        <ProConfigProvider dark={theme === 'dark'}>
                            <Content/>
                        </ProConfigProvider>
                    )}
                    {theme !== 'dark' && (
                        <ProConfigProvider dark={false}>
                            <Content/>
                        </ProConfigProvider>
                    )}
                </>
            ) : <Navigate to="/init"/>}
        </>

    );
};
export default Login;
