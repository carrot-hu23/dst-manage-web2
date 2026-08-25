import React, {useState, useEffect, useRef} from "react";

import {Button, Spin, Space, Input, message, Typography, Grid, Card} from "antd";

import {useNavigate} from "react-router-dom";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";

import {useTheme} from "../../../hooks/useTheme";

import {addModInfoFileApi} from "../../../api/modApi.jsx";
import {MonacoEditor} from "../../NewEditor/index.jsx";

const {Title} = Typography;

export default () => {
    const {t} = useTranslation()
    const {theme} = useTheme()
    const navigate = useNavigate();
    const [spinLoading, setSpinLoading] = useState(false)

    const [workshopId, setWorkshopId] = useState("")

    const editorRef = useRef()

    function wrokShopOnChange(e) {
        setWorkshopId(e.target.value)
    }

    function saveModinfo() {
        const data = {
            workshopId,
            modinfo: editorRef.current.current.getValue()
        }
        setSpinLoading(true)
        addModInfoFileApi("", data)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('mod.add.success'))
                } else {
                    message.error(t('mod.add.error'))
                }
                setSpinLoading(false)
            })
    }


    useEffect(() => {

    }, [])


    return <>
        <Spin spinning={spinLoading} description={t('mod.add.loading')}>
            <Space size={8} wrap>
                <Button type={"link"} icon={<ArrowLeftOutlined/>}
                        onClick={() => navigate(`/mod`)}>
                    {t('mod.back')}
                </Button>
                <Button type="primary" onClick={() => {
                    saveModinfo()
                }}>
                    {t('mod.save')}
                </Button>
            </Space>
            <br/>
            <div style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                maxWidth: '100%',
                height: '32px',
                color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
                fontSize: '14px'
            }}>
                {t('mod.add.workshopId.tips')}
            </div>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Input onChange={wrokShopOnChange} placeholder={t('mod.add.workshopId.placeholder')}/>
            <br/><br/>
            <div style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                maxWidth: '100%',
                height: '32px',
                color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
                fontSize: '14px',
            }}>{t('mod.add.modinfo.label')}
            </div>

            <MonacoEditor
                ref={editorRef}
                style={{
                    "height": "370px",
                    "width": "100%",
                }}
                options={{
                    language: 'lua',
                    theme: theme === 'dark' ? 'vs-dark' : ''
                }}
            />
            <Title level={4}>{t('mod.add.help.title')}</Title>
            <div>{t('mod.add.help.step1')}</div>
            <br/>
            <div>{t('mod.add.help.step2')}</div>
            <br/>
            <div>{t('mod.add.help.step3')}</div>
            <br/>
            <div>{t('mod.add.help.step4')}</div>
        </Spin>
    </>
}