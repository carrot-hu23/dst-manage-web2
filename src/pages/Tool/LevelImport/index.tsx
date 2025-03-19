// @ts-ignore
import React, {useEffect, useRef, useState} from "react";
import {Level} from "../../../types";
import {getLevelListApi, importLevelsApi} from "../../../api/clusterLevelApi2.ts";

import MonacoEditor2, {MonacoEditorRef} from "../../NewEditor2";
import {Alert, Button, Divider, message, Space, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";


const LevelImport = () => {

    const editorRef = useRef<MonacoEditorRef>(null);
    // @ts-ignore
    const [levels, setLevels] = useState<Level[]>([])

    useEffect(() => {
        fetchLevel()
    }, [editorRef])

    const fetchLevel = async () => {
        const resp = await getLevelListApi();
        setLevels(resp.data)
    }

    // 处理文件上传
    const handleUpload = (file: File) => {
        // 仅允许上传 JSON 文件
        if (file.type !== "application/json") {
            message.warning("请上传 JSON 文件");
            return false; // 阻止上传
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            const parsedData = JSON.parse(result); // 解析 JSON
            editorRef.current?.setValue(JSON.stringify(parsedData, null, 2))
            message.success("JSON 文件上传成功");
            console.log("上传的 JSON 数据:", parsedData);
        };
        reader.readAsText(file); // 以文本形式读取 JSON 文件
        return false; // 阻止默认上传行为
    };

    const importLevel = () => {
        const newLevels = JSON.parse(editorRef.current?.getValue() || '[]')
        importLevelsApi(newLevels)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("导入成功")
                }
            })
    }

    return (
        <>
            <Alert type={'info'} message={'注: 导入直接会删除之前的世界，请不要同时操作'}/>
            <br/>
            <Space size={16} wrap>
                <Upload beforeUpload={handleUpload} showUploadList={false}>
                    <Button type={'primary'} icon={<UploadOutlined/>}>上传世界 JSON 文件</Button>
                </Upload>
                <Button type={'primary'} onClick={importLevel}>导入</Button>
            </Space>
            <Divider/>
            <MonacoEditor2
                ref={editorRef}
                language="javascript"
                value="[]"
                style={{
                    "height": "52vh",
                    "width": "100%"
                }}
            />


        </>
    )
}

export default LevelImport