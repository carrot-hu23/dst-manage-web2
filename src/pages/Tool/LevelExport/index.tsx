// @ts-ignore
import React, {useEffect, useRef, useState} from "react";
import {HomeLevel, Level} from "../../../types";
import {getClusterIniApi, getLevelListApi} from "../../../api/clusterLevelApi2.ts";

import MonacoEditor2, {MonacoEditorRef} from "../../NewEditor2";
import {Button, Divider, Space} from "antd";

const LevelExport = () => {

    // const [levels, setLevels] = useState<Level[]>([])
    const [clusterIni, setClusterIni] = useState<Record<string, object>>({})

    const editorRef = useRef<MonacoEditorRef>(null);

    useEffect(() => {
        fetchLevel()
        fetchClusterIni()
    }, [])

    const fetchLevel = async () => {
        const levelResponse = await getLevelListApi();
        // setLevels(levelResponse.data)
        editorRef.current?.setValue(stringifyHomeLevels(levelResponse.data))
    }

    const fetchClusterIni = async () => {
        const resp = await getClusterIniApi();
        setClusterIni(resp.data.cluster)
    }

    const stringifyHomeLevels = (levels: Level[]) => {
        const homeLevel: HomeLevel = {
            levels
        }
        return JSON.stringify(homeLevel, null, 2)
    }

    const handleDownload = () => {
        // 转换为 JSON 字符串，并添加缩进格式
        const jsonString = editorRef.current?.getValue() || '';
        // 创建 Blob 对象
        const blob = new Blob([jsonString], {type: "application/json"});
        // 创建 URL 对象
        const url = URL.createObjectURL(blob);
        // 创建一个隐藏的 <a> 标签用于下载
        const a = document.createElement("a");
        a.href = url;
        a.download = `${clusterIni?.cluster_name}-房间配置.json`; // 设置文件名
        document.body.appendChild(a);
        a.click(); // 触发下载
        // 清理 DOM
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <MonacoEditor2
                ref={editorRef}
                language="javascript"
                value="console.log('Hello, world!');"
                style={{
                    "height": "52vh",
                    "width": "100%"
                }}
                // onChange={(value: string) => console.log('Editor content changed:', value)}
            />
            <Divider/>
            <div>
                <Space size={16} wrap>
                    <Button type={'primary'} onClick={handleDownload}>下载</Button>
                </Space>
            </div>
        </>
    )
}

export default LevelExport