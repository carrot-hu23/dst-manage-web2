import {useTranslation} from "react-i18next";
import React, {useEffect, useRef, useState} from "react";
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Skeleton,
    Space,
    Switch,
    Tabs,
    TabsProps,
    Upload
} from "antd";
import MonacoEditor2, {MonacoEditorRef} from "../NewEditor2";
import {useTheme} from "../../hooks/useTheme";
import axios from "axios";
import LevelViewer from "./LevelViewer.tsx";

interface Cluster {
    name: string,
    description?: string,
    levels: Level[]
}

interface ServerIni {
    server_port: number,
    is_master: boolean,
    name: string,
    id: number,
    encode_user_path: boolean,
    authentication_port: number,
    master_server_port: number
}

interface Level {
    levelName: string,
    uuid?: string,
    leveldataoverride: string,
    modoverrides: string,
    server_ini: ServerIni
}

interface LevelItemProps {
    dstWorldSetting?: Record<string, object>
    levelName: string,
    level: Level,
    changeLevel: (levelName: string, newValue: Record<string, any>) => void,
    permission: Record<string, object>
}

const LevelItem: React.FC<LevelItemProps> = ({dstWorldSetting, levelName, level, changeLevel, permission}) => {
    const {t} = useTranslation();
    useEffect(() => {
    }, [level]);
    const height = '64vh'
    const items: any = [
        {
            label: t('level.leveldataoverride'),
            children: <div className={'scrollbar'} style={{
                height: height,
                overflowY: 'auto',
            }}>
                <Leveldataoverride dstWorldSetting={dstWorldSetting}
                                   levelName={levelName}
                                   level={level} changeLevel={changeLevel} permission={permission}/>
            </div>,
            key: 1,
        },
        {
            label: t('level.modoverrides'),
            children: <div className={'scrollbar'} style={{
                height: height,
                overflowY: 'auto',
            }}><Modoverrides levelName={levelName} level={level}
                             changeLevel={changeLevel} permission={permission}/>
            </div>,
            key: 2,
        },
        {
            key: 3,
            label: t('level.serverIni'),
            children: <div className={'scrollbar'} style={{
                height: height,
                overflowY: 'auto',
            }}><ServerIni levelName={levelName} level={level}
                          changeLevel={changeLevel} permission={permission}/>
            </div>,
        },
    ];

    return (
        <div>
            <Tabs items={items}/>
        </div>
    );
};

const Leveldataoverride: React.FC<LevelItemProps> = (props) => {
    const {theme} = useTheme()
    const {t} = useTranslation()

    const editorRef = useRef<MonacoEditorRef>(null);
    const valueRef = useRef(props.level?.leveldataoverride || '')
    const [leveldataoverride, setLeveldataoverride] = useState<string>(props.level?.leveldataoverride || '')
    // editorRef?: React.RefObject<MonacoEditorRef>;

    useEffect(() => {
        editorRef.current?.setValue(props.level?.leveldataoverride || '')
        setLeveldataoverride(props.level?.leveldataoverride || '')
        valueRef.current = props.level?.leveldataoverride || ''
    }, [props.level?.leveldataoverride]);

    const items: TabsProps['items'] = [
        {
            forceRender: true,
            key: '1',
            label: t('level.view'),
            children: <LevelViewer leveldataoverride={leveldataoverride} dstWorldSetting={props.dstWorldSetting}
                                   porklandSetting={{}}
                                   changeValue={(value) => {
                                       props.changeLevel(props.levelName, {leveldataoverride: value})
                                       editorRef?.current?.setValue(value)
                                   }}/>,
        },
        {
            forceRender: true,
            key: '2',
            label: t('level.edit'),
            children: <div>
                <MonacoEditor2 ref={editorRef}
                               theme={theme === 'dark' ? 'vs-dark' : ''}
                               style={{
                                   "height": "54vh",
                                   "width": "100%"
                               }}
                               onChange={value => {
                                   if (props.changeLevel) {
                                       props.changeLevel(props.levelName, {leveldataoverride: value})
                                       setLeveldataoverride(value)
                                   }
                               }}
                />
            </div>,
        },
    ];


    return (<>
        <Tabs defaultActiveKey="1" type={'card'} destroyInactiveTabPane={true} items={items}/>
    </>)
}

const Modoverrides: React.FC<LevelItemProps> = (props) => {
    const {theme} = useTheme();
    const editorRef = useRef<MonacoEditorRef>(null);
    // editorRef?: React.RefObject<MonacoEditorRef>;

    useEffect(() => {
        editorRef.current?.setValue(props.level?.modoverrides || '')
    }, [props.level?.modoverrides]);
    return (<>
        <div>
            <MonacoEditor2 ref={editorRef}
                           theme={theme === 'dark' ? 'vs-dark' : ''}
                           style={{
                               "height": "50vh",
                               "width": "100%"
                           }}
                           onChange={value => {
                               if (props.changeLevel) {
                                   props.changeLevel(props.levelName || '', {modoverrides: value})
                               }
                           }}
            />
        </div>
    </>)
}

const ServerIni: React.FC<LevelItemProps> = (props) => {
    const {t} = useTranslation()
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(props.level.server_ini)
    }, [props.level.server_ini]);

    function onValuesChange(_changedValues: object, allValues: Record<string, object>) {
        if (props.changeLevel) {
            props.changeLevel(props.levelName || '', {serverIni: allValues})
        }
    }

    return (
        <Form
            labelCol={{
                span: 3,
            }}
            wrapperCol={{
                span: 18,
            }}
            form={form}
            layout="horizontal"
            initialValues={props?.level?.server_ini || {
                is_master: false,
                encode_user_path: true
            }}
            onValuesChange={onValuesChange}
        >
            <br/>
            <br/>
            <Form.Item
                label={t('serverini.server_port')}
                name="server_port"
                tooltip={`
            服务器监听的 UDP 端口，每个服务器需要设置不同的端口\n\n
            范围：10998-11018 (其它端口也可，但游戏在检索局域网房间时只会扫描这些端口)\n\n
            页面自动分配的端口不会与已填写的端口重复，但页面不会擅自修改自行填写的端口，所以确保不要填写重复的端口。
            `}
            >
                <InputNumber style={{
                    width: '100%',
                }} placeholder="范围: 10998-11018"/>
            </Form.Item>

            <Form.Item
                label={t('serverini.is_master')}
                valuePropName="checked"
                name='is_master'
                tooltip={`
        将该世界设为主世界，即第一次进入房间时将会进入的世界。
        主服务器运行的是一个房间的核心世界，其它世界都是该世界的附属，比如季节、天数等都是以该世界为准的。
        `}>
                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}/>
            </Form.Item>

            <Form.Item
                label={t('serverini.name')}
                name="name"
                tooltip={`name`}
            >
                <Input placeholder="世界名"/>
            </Form.Item>

            <Form.Item
                label={t('serverini.id')}
                name="id"
                tooltip={`
            随机数字，用于区分不同的从服务器。
            
            游戏过程中修改该项会导致该世界的玩家信息丢失。
            
            主服务器强制为 1。其它世界设为 1 也会被视为主服务器去新注册一个房间。
            `}
            >
                <InputNumber
                    style={{
                        width: '100%',
                    }}
                    placeholder="id"/>
            </Form.Item>

            <Form.Item
                label={t('serverini.encode_user_path')}
                valuePropName="checked"
                name='encode_user_path'
                tooltip={`
            使路径编码与不区分大小写的操作系统兼容`}
            >
                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')} defaultChecked/>
            </Form.Item>

            <Form.Item
                label={t('serverini.authentication_port')}
                name='authentication_port'
                tooltip={`serverini.authentication_port`}
            >
                <InputNumber style={{
                    width: '100%',
                }} placeholder="serverini.authentication_port"/>
            </Form.Item>

            <Form.Item
                label={t('serverini.master_server_port')}
                name='master_server_port'
                tooltip={`master_server_port`}
            >
                <InputNumber
                    style={{
                        width: '100%',
                    }}
                    placeholder="master_server_port"/>
            </Form.Item>
        </Form>
    )
}

const defaultDstWorldSetting = {
    zh: {
        forest: {
            WORLDGEN_GROUP: {},
            WORLDSETTINGS_GROUP: {}
        },
        cave: {
            WORLDGEN_GROUP: {},
            WORLDSETTINGS_GROUP: {}
        }
    },
    en: {
        forest: {
            WORLDGEN_GROUP: {},
            WORLDSETTINGS_GROUP: {}
        },
        cave: {
            WORLDGEN_GROUP: {},
            WORLDSETTINGS_GROUP: {}
        }
    }
}

function base64ToUtf8(base64: string) {
    return new TextDecoder().decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
}

const Level2 = () => {

    const [dstWorldSetting, setDstWorldSetting] = useState(defaultDstWorldSetting)
    const [loading, setLoading] = useState(true)

    const [cluster, setCluster] = useState<Cluster>()
    const [items, setItems] = useState<any>([])

    const changeLevel = (levelName: string, changeValue: Record<string, any>) => {
        // console.log(levelName)
        // if (changeValue['leveldataoverride'] !== undefined && changeValue['leveldataoverride'] !== null) {
        //     const newLeveldataoverride = changeValue['leveldataoverride'] as string
        //     console.log(newLeveldataoverride)
        // }
        // if (changeValue['modoverrides'] !== undefined && changeValue['modoverrides'] !== null) {
        //     const newModoverrides = changeValue['modoverrides'] as string
        //     console.log(newModoverrides)
        // }
        // if (changeValue['serverIni'] !== undefined && changeValue['modoverrides'] !== null) {
        //     const newServerIni = changeValue['serverIni'] as ServerIni
        //     console.log(newServerIni)
        // }
    }

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const response = await axios.get('/api/dst-static/dst_world_setting.json');
                const dstWorldSetting = JSON.parse(base64ToUtf8(response.data));
                setDstWorldSetting(dstWorldSetting);

                const reps = await fetch('./misc/MasterCaves.json').then(res => res.json());
                const data = reps as Cluster;
                setCluster(data);
                const items = data.levels.map(level => ({
                    label: level.levelName,
                    key: level.uuid,
                    children: (
                        <LevelItem
                            dstWorldSetting={dstWorldSetting}
                            levelName={level.levelName || ''}
                            level={level}
                            changeLevel={changeLevel}
                            permission={{}}
                        />
                    ),
                }));
                setItems(items);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleDownload = () => {
        // 转换为 JSON 字符串，并添加缩进格式
        const jsonString = JSON.stringify(cluster);
        // 创建 Blob 对象
        const blob = new Blob([jsonString], {type: "application/json"});
        // 创建 URL 对象
        const url = URL.createObjectURL(blob);
        // 创建一个隐藏的 <a> 标签用于下载
        const a = document.createElement("a");
        a.href = url;
        a.download = `${cluster?.name}-房间配置.json`; // 设置文件名
        document.body.appendChild(a);
        a.click(); // 触发下载
        // 清理 DOM
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // 处理文件上传
    const handleUpload = (file: File) => {
        // 仅允许上传 JSON 文件
        if (file.type !== "application/json") {
            message.warning("请上传 JSON 文件");
            return false; // 阻止上传
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                const result = event.target?.result as string
                const parsedData = JSON.parse(result); // 解析 JSON
                const data = parsedData as Cluster;
                setCluster(data);
                const items = data.levels.map(level => ({
                    label: level.levelName,
                    key: level.uuid,
                    children: (
                        <LevelItem
                            dstWorldSetting={dstWorldSetting}
                            levelName={level.levelName || ''}
                            level={level}
                            changeLevel={changeLevel}
                            permission={{}}
                        />
                    ),
                }));
                setItems(items);
            }
        };
        reader.readAsText(file);
        return false
    }

    return (<Skeleton loading={loading}>
        {/**
         <Typography.Paragraph>
         {cluster?.name}
         </Typography.Paragraph>
         <Typography.Paragraph color={'red'}>
         {cluster?.description}
         </Typography.Paragraph>
         */}
        <Tabs type="card" items={items}/>
        <Space size={16} wrap>
            <Button type={'primary'}>保存</Button>
            <Upload beforeUpload={handleUpload} showUploadList={false}>
                <Button type={'primary'}>导入</Button>
            </Upload>
            <Button type={'primary'} onClick={handleDownload}>下载</Button>
        </Space>
    </Skeleton>)
}

export default Level2