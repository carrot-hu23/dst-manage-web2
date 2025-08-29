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
import {isFirstApi} from "../../api/InitApi.jsx";

const {Title} = Typography;

const StyledContent = {
    maxWidth: 380,
    margin: 'auto',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // textAlign: 'center',
    alignItems: 'center'
}

const Login = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()

    const [isFirstTime, setIsFirstTime] = useState(false);
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

    const onFinish = async (values) => {
        // 2.登录
        const loginResponse = await http.post("/api/login", values)
        const loginResponseData = loginResponse.data
        if (loginResponseData.code !== 200) {
            message.error("登录失败")
            return
        }

        localStorage.setItem("token", loginResponseData.data.username)
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
                        // name="normal_login"
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
                        {/*
                        <Form.Item name="remember" valuePropName="checked" label={null}>
                            <Tooltip title={'七天内免登录'}>
                                <Checkbox>{t('login.remember.me')}</Checkbox>
                            </Tooltip>
                        </Form.Item>
                        */}
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