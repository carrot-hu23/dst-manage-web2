/* eslint-disable no-unused-vars */
import {Button, Form, message} from 'antd';

import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next";

import Welcome from './component/Welcome.jsx';
import Register from './component/Register.jsx';
import End from './component/End.jsx';

import {http} from '../../utils/http';
import {ProCard, ProConfigProvider} from "@ant-design/pro-components";
import {useTheme} from "../../hooks/useTheme/index.jsx";

const mainCss = {
    textAlign: 'center',
    borderRadius: '20px',
    width: '400px',
    height: '600px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
}

// eslint-disable-next-line no-unused-vars
const Begin = (props) => {
    const {t} = useTranslation()
    const {theme} = useTheme()

    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const next = () => {
        console.log(form.getFieldValue())
        form.validateFields().then(value => {
            // 验证通过后进入
            // const { name, age } = value;
            // console.log(name, age); // dee 18
            setCurrent(current + 1);
        }).catch(err => {
            message.error(err.errorFields[0].errors[0])
        })
    }
    const prev = () => {
        setCurrent(current - 1);
    }

    const getInitData = () => {
        const userInfo = {
            username: form.getFieldValue("username"),
            password: form.getFieldValue("password"),
            displayName: form.getFieldValue("displayName"),
            photoURL: form.getFieldValue("photoURL")
        }
        const dstConfig = {
            steamcmd: form.getFieldValue("steamcmd"),
            force_install_dir: form.getFieldValue("force_install_dir"),
            cluster: form.getFieldValue("cluster"),
            backup: form.getFieldValue("backup"),
            mod_download_path: form.getFieldValue("mod_download_path"),
        }
        const data = {
            userInfo,
            // dstConfig
        }
        return data
    }

    const navigate = useNavigate()
    const goIndex = async () => {
        const initData = getInitData()

        // 1.保存初始化数据
        console.log('initData', initData);
        const response = await http.post("/api/init", initData)
        const responseData = response.data
        if (responseData.code !== 200) {
            message.error("初始化数据失败")
            return
        }

        // 2.登录
        const loginResponse = await http.post("/api/login", initData.userInfo)
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

    useEffect(() => {
        document.body.style.backgroundColor = theme === 'dark' ? 'black' : '#F9FAFB'
    }, [theme])

    const Content = ()=>{
        return (
            <div style={mainCss}>
                {current < 1 && (
                    <Welcome/>
                )}
                {current === 1 && (
                    <Register form={form}/>
                )}
                {current === 2 && (
                    <End form={form}/>
                )}
                <br/>
                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        {t('init.previous')}
                    </Button>
                )}
                {current >= 0 && current < 2 && (
                    <Button type="primary" onClick={() => next()}>
                        {t('init.next')}
                    </Button>
                )}
                {current === 2 && (
                    <Button type="primary" onClick={goIndex}>
                        {t('init.go')}
                    </Button>
                )}
            </div>
        )
    }

    return (
        <>
            {theme === 'dark' && (
                <ProConfigProvider dark={theme === 'dark'}>
                    <Content/>
                </ProConfigProvider>
            )}
            {theme != 'dark' && (
                <ProConfigProvider>
                    <Content/>
                </ProConfigProvider>
            )}
        </>
    )
}

export default Begin