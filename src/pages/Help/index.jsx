import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import CollapseWithMarkdown from "./CollapseWithMarkdown.jsx";
import MarkdownRender from "./MarkdownRender.jsx";

export default ()=>{

    const [markdownContent, setMarkdownContent] = useState("")
    useEffect(()=>{
        fetch('misc/FQA.md')
            .then(response => response.text())
            .then(data => {
                setMarkdownContent(data)
            })
            .catch(error => {
                console.error('无法加载config配置文件', error);
            });
    },[])

    const items = [
        {
            key: '0',
            label: "部署教程",
            children: <MarkdownRender url={`/api/dst-static/dst-get-start.md`} decode={true} />,
        },
        {
            key: '1',
            label: "常见问题",
            children: <CollapseWithMarkdown markdownContent={markdownContent} />,
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
        {
            key: '4',
            label: "docker-compose.yml 参考",
            children: <MarkdownRender url={'misc/Docker-compose.md'}/>,
        },
    ];

    return<>
        <Tabs defaultActiveKey="0" items={items}/>
    </>
}