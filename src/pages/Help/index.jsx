import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import MarkdownRender from "./MarkdownRender.jsx";
import {ProCard} from "@ant-design/pro-components";

export default () => {

    const [markdownContent, setMarkdownContent] = useState("")
    useEffect(() => {
        fetch('misc/FQA.md')
            .then(response => response.text())
            .then(data => {
                setMarkdownContent(data)
            })
            .catch(error => {
                console.error('无法加载config配置文件', error);
            });
    }, [])

    const items = [
        {
            key: '0',
            label: "部署教程",
            children: <MarkdownRender url={`/api/dst-static/dst-get-start.md`} decode={true}/>,
        },
        {
            key: '2',
            label: "多层世界教程",
            children: <MarkdownRender url={'misc/DontStarveMultiWorldTotorial.md'}/>,
        },
        {
            key: '3',
            label: "多台服务器串联",
            children: <MarkdownRender url={'misc/DontStarveServerMultipleMachinesSeriesTutorial.md'}/>,
        },
    ];

    return <>
        <ProCard>
            <Tabs defaultActiveKey="0" items={items}/>
        </ProCard>
    </>
}