import React, {useState, useEffect, useRef} from "react";

import {Button, Spin, Space, Input, message, Typography, Grid, Card} from "antd";

import {useNavigate} from "react-router-dom";
import {ArrowLeftOutlined} from '@ant-design/icons';

import {useTheme} from "../../../hooks/useTheme";

import {addModInfoFileApi} from "../../../api/modApi.jsx";
import {MonacoEditor} from "../../NewEditor/index.jsx";

const {Title} = Typography;

export default () => {
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
                    message.success("添加成功")
                } else {
                    message.error("添加失败")
                }
                setSpinLoading(false)
            })
    }


    useEffect(() => {

    }, [])


    return <>
        <Spin spinning={spinLoading} description={"正在添加模组"}>
            <Space size={8} wrap>
                <Button type={"link"} icon={<ArrowLeftOutlined/>}
                        onClick={() => navigate(`/mod`)}>
                    返回
                </Button>
                <Button type="primary" onClick={() => {
                    saveModinfo()
                }}>
                    保存
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
                模组id，如果是自定义模组请填写模组文件名称（文件名称不要是纯数字）
            </div>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Input onChange={wrokShopOnChange} placeholder={'模组id'}/>
            <br/><br/>
            <div style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                maxWidth: '100%',
                height: '32px',
                color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
                fontSize: '14px',
            }}>modinfo.lua 文件内容:
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
            <Title level={4}>怎么找到本地电脑的模组?</Title>
            <div>找到本地电脑 Steam 安装的路径，\steam\steamapps\workshop\content\322330 路径</div>
            <br/>
            <div>这个路径就是你本地饥荒联机版的mod位置</div>
            <br/>
            <div>在 模组id 哪里填写文件名 ，然后把 modinfo.lua 文件内容复制到第二个输入框</div>
            <br/>
            <div>点击保存即可</div>
        </Spin>
    </>
}