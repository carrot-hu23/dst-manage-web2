/* eslint-disable */
import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Space,
    Switch,
    Tabs,
    Alert,
    Divider,
    Skeleton, Empty, Radio, Drawer, Spin
} from 'antd';
import {format, parse} from "lua-json";
import {useTranslation} from "react-i18next";

import {MonacoEditor} from "../NewEditor/index.jsx";
import {createLevelApi, deleteLevelApi, getLevelListApi, updateLevelsApi} from "../../api/clusterLevelApi.jsx";
import {useTheme} from "../../hooks/useTheme/index.jsx";
import {useParams} from "react-router-dom";
import ConfigViewEditor from "./ConfigViewEditor/index.jsx";
import {cave, forest, porkland} from "../../utils/dst";


const Leveldataoverride = ({editorRef, dstWorldSetting, levelName, level, changeValue}) => {

    const {t} = useTranslation()
    const {theme} = useTheme();

    const ref = useRef(level.leveldataoverride)

    useEffect(() => {
        ref.current = level.leveldataoverride
        // console.log("leveldataoverride update")
    }, [level])

    function updateValue(newValue) {
        changeValue(levelName, {leveldataoverride: newValue})
        ref.current = newValue

        editorRef.current.current.setValue(newValue)
    }

    useEffect(() => {
        editorRef.current.current.setValue(level.leveldataoverride)
        editorRef.current.current.onDidChangeModelContent((e) => {
            const newValue = editorRef.current.current.getValue();
            changeValue(levelName, {leveldataoverride: newValue});

            ref.current = newValue
        });

    }, [])

    const LeveldataoverrideEditor = () => {
        return (
            <MonacoEditor
                ref={editorRef}
                style={{
                    "height": "52vh",
                    "width": "100%"
                }}
                options={{
                    theme: theme === 'dark' ? 'vs-dark' : ''
                }}
            />
        )
    }

    const LeveldataoverrideViewer = () => {

        function getLevelObject(value) {
            value = value.replace(/\n/g, "")
            try {
                return parse(value)
            } catch (error) {
                message.warning("lua配置解析错误")
                console.log(error)
                return {}
            }
        }

        const [loading, setLoading] = useState(true)
        const [porklandSetting, setPorklandSetting] = useState()
        useEffect(() => {
            if (getLevelObject(ref.current).location === 'porkland') {
                setLoading(true)
                // 获取 哈姆雷特的配置项
                fetch('./misc/porkland_setting.json')
                    .then(response => response.json())
                    .then(data => {
                        setPorklandSetting(data)
                    })
                    .catch(error => {
                        console.error('无法加载配置文件', error);
                    }).finally(() => {
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        }, [])

        return (
            <Skeleton loading={loading}>
                <ConfigViewEditor changeValue={updateValue} valueRef={ref} dstWorldSetting={dstWorldSetting}
                                  porklandSetting={porklandSetting}/>
            </Skeleton>

        )
    }

    const items = [
        {
            label: t('level.view'),
            children: <LeveldataoverrideViewer/>,
            key: '1',
        },
        {
            label: t('level.edit'),
            children: <LeveldataoverrideEditor/>,
            key: '2',
            forceRender: true,
        }
    ]
    return (
        <>
            <Tabs type="card" destroyInactiveTabPane={true} items={items}/>
        </>
    )
}


const Modoverrides = ({editorRef, modoverridesRef, levelName, level, changeValue}) => {

    const {theme} = useTheme();

    useEffect(() => {
        editorRef.current.current.setValue(modoverridesRef.current)
        editorRef.current.current.onDidChangeModelContent((e) => {
            const newValue = editorRef.current.current.getValue();
            //console.log(newValue)
            changeValue(levelName, {modoverrides: newValue});
        });

    }, [])

    return (
        <>
            <MonacoEditor
                ref={editorRef}
                style={{
                    "height": "56vh",
                    "width": "100%"
                }}
                options={{
                    theme: theme === 'dark' ? 'vs-dark' : ''
                }}
            />
        </>

    )
}

const ServerIni = ({levelName, level, changeValue}) => {
    const {t} = useTranslation()

    function onValuesChange(changedValues, allValues) {
        changeValue(levelName, {server_ini: allValues})
    }

    const {cluster} = useParams()

    return (
        <Form
            labelCol={{
                span: 3,
            }}
            wrapperCol={{
                span: 18,
            }}
            layout="horizontal"
            initialValues={level.server_ini || {
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
                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')} />
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

function parseWorldConfig(modoverrides) {
    try {
        const object = parse(modoverrides)
        // workshop-1754389029
        if (object === null) {
            return []
        }
        const mod = object['workshop-1754389029']
        if (mod === null || mod === undefined || mod.configuration_options === undefined || mod.configuration_options.world_config === undefined) {
            return []
        }

        const world_config = mod.configuration_options.world_config
        console.log("lua to js", world_config)
        const keys = Object.keys(world_config)
        const items = []
        for (const key of keys) {
            items.push({
                id: key,
                name: world_config[key].name,
                category: world_config[key].category,
                galleryful: world_config[key].galleryful,
                invisible: world_config[key].invisible,
                extra: world_config[key].extra,
                is_cave: world_config[key].is_cave,
                note: world_config[key].note,
                desc: world_config[key].desc,
            })
        }
        return items
    } catch (error) {
        console.log(error)
        return []
    }
}

const LevelItem = ({dstWorldSetting, levelName, level, changeValue}) => {
    const {t} = useTranslation()

    const modoverridesRef = useRef(level.modoverrides)
    const editorRef = useRef()
    const editorRef2 = useRef()

    useEffect(() => {
        editorRef?.current?.current?.setValue(level.modoverrides)
        editorRef2?.current?.current?.setValue(level.leveldataoverride)
    }, [level])

    const [form] = Form.useForm()
    form.setFieldsValue({
        world_config: parseWorldConfig(level.modoverrides)
    })


    const formValueChange = (changedValues, allValues) => {

        const world_config = allValues.world_config
        if (world_config === null || world_config === undefined) {
            return
        }
        world_config.forEach(item => {
            if (item !== null || item !== undefined) {
                Object.keys(item).forEach(key => {
                    if (item[key] === undefined) {
                        delete item[key];
                    }
                });
            }

        })
        // 转成对象
        const object = {}
        if (world_config === null || world_config === undefined) {
            return
        }
        world_config.forEach(item => {
            const temp = {...item}
            delete temp['id']
            object[item.id] = temp
        })

        let oldValue = editorRef.current.current.getValue()
        const mobject = parse(oldValue)
        if (mobject['workshop-1754389029'] === null || mobject['workshop-1754389029'] === undefined || mobject['workshop-1754389029'].configuration_options === undefined) {
            mobject['workshop-1754389029'] = {
                configuration_options: {
                    world_config: {},
                    default_galleryful: 0,
                    auto_balancing: true,
                    no_bat: true,
                    world_prompt: false,
                    say_dest: true,
                    migration_postern: false,
                    ignore_sinkholes: false,
                    open_button: true,
                    migrator_required: false,
                    force_population: false,
                    name_button: true,
                    always_show_ui: false,
                    gift_toasts_offset: 100,
                },
                enabled: true,
            }
        }

        mobject['workshop-1754389029'].configuration_options.world_config = object

        const newValue = format(mobject, {singleQuote: false})
        editorRef.current.current.setValue(newValue)

    }

    const onTabItemChange = (activeKey) => {

        if (activeKey === '4') {
            // 更新form 的数据
            const world_config = parseWorldConfig(editorRef.current.current.getValue())
            form.setFieldsValue({
                world_config
            })
        }
        if (activeKey === '2') {
            // 更新编译器的值

        }
    }

    const items = [
        {
            label: t('level.leveldataoverride'),
            children: <div className={'scrollbar'} style={{
                height: '62vh',
                overflowY: 'auto',
            }}>
                <Leveldataoverride editorRef={editorRef2} dstWorldSetting={dstWorldSetting} levelName={levelName}
                                   level={level}
                                   changeValue={changeValue}/>
            </div>,
            key: '1',
            forceRender: true,
        },
        {
            label: t('level.modoverrides'),
            children: <div className={'scrollbar'} style={{
                height: '60vh',
                overflowY: 'auto',
            }}>
                <Modoverrides editorRef={editorRef} onchange={v => setModoverridesState(v)}
                              modoverridesRef={modoverridesRef} levelName={levelName} level={level}
                              changeValue={changeValue}/>
            </div>,
            key: '2',
            forceRender: true,
        },
        {
            label: t('level.serverIni'),
            children:
                <div className={'scrollbar'} style={{
                    height: '60vh',
                    overflowY: 'auto',
                }}>
                    <ServerIni levelName={levelName} level={level} changeValue={changeValue}/>
                </div>,
            key: '3',
            forceRender: true,
        },
    ]
    useEffect(() => {

    }, [])
    return (
        <div>
            <Tabs
                onChange={onTabItemChange}
                // destroyInactiveTabPane={true}
                items={items}
            />
        </div>
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

const App = () => {

    const {cluster} = useParams()
    const {t} = useTranslation()
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const levelListRef = useRef([]);
    const [openAdd, setOpenAdd] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const levelNameRef = useRef("");
    const [activeKey, setActiveKey] = useState('');
    const [items, setItems] = useState([]);
    const newTabIndex = useRef(0);

    const [dstWorldSetting, setDstWorldSetting] = useState(defaultDstWorldSetting)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('misc/dst_world_setting.json')
            .then(response => response.json())
            .then(data => {
                setDstWorldSetting(data)
                getLevelListApi()
                    .then(resp => {
                        // console.log(resp)
                        if (resp.code === 200) {
                            const levels = resp.data
                            levelListRef.current = levels
                            const items2 = levels.map(level => {
                                const closable = level.uuid !== "Master"
                                if (lang === "en") {
                                    if (level.uuid === "Master") {
                                        level.levelName = "Forest"
                                    }
                                    if (level.uuid === "Caves") {
                                        level.levelName = "Caves"
                                    }
                                }
                                if (level.uuid !== "Master") {
                                    if (level.leveldataoverride === "return {}" || level.leveldataoverride === "") {
                                        level.leveldataoverride = forest
                                    }
                                }
                                return {
                                    label: level.levelName,
                                    children: <LevelItem
                                        dstWorldSetting={data}
                                        level={{
                                            leveldataoverride: level.leveldataoverride,
                                            modoverrides: level.modoverrides,
                                            server_ini: level.server_ini
                                        }}
                                        levelName={level.levelName}
                                        changeValue={changeValue}
                                    />,
                                    key: level.uuid,
                                    closable: closable,
                                }
                            })
                            setItems(items2)
                            if (levels.length === 0) {
                                setActiveKey("")
                            } else {
                                setActiveKey(levels[0].uuid)
                            }
                        } else {
                            message.error(t('level.fetch.error'))
                        }
                        setLoading(false)
                    })
            })
            .catch(error => {
                console.error('无法加载配置文件', error);
            })

    }, [])

    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };

    function changeValue(levelName, newValue) {
        const oldLevels = levelListRef.current
        levelListRef.current = oldLevels.map(level => {
            if (level.levelName === levelName) {
                return {...level, ...newValue}
            }
            return level
        })
    }

    const add = (levelName, uuid, leveldataoverride, modoverrides, server_ini) => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];

        const newLevel = {
            levelName,
            uuid,
            leveldataoverride: leveldataoverride,
            modoverrides: modoverrides,
            server_ini: server_ini
        }

        const newLevels = [...levelListRef.current]
        newLevels.push(newLevel)
        levelListRef.current = newLevels

        newPanes.push({
            label: levelName,
            children: <LevelItem dstWorldSetting={dstWorldSetting} level={{
                leveldataoverride: newLevel.leveldataoverride,
                modoverrides: newLevel.modoverrides,
                server_ini: newLevel.server_ini
            }} levelName={levelName} changeValue={changeValue}/>,
            key: uuid,
        })
        setItems(newPanes);
        setActiveKey(uuid);

    }
    const remove = (targetKey) => {

        setDeleteLevelName(targetKey)
        setOpenDelete(true)

        // let newActiveKey = activeKey;
        // let lastIndex = -1;
        // items.forEach((item, i) => {
        //     if (item.key === targetKey) {
        //         lastIndex = i - 1;
        //     }
        // });
        // const newPanes = items.filter((item) => item.key !== targetKey);
        // if (newPanes.length && newActiveKey === targetKey) {
        //     if (lastIndex >= 0) {
        //         newActiveKey = newPanes[lastIndex].key;
        //     } else {
        //         newActiveKey = newPanes[0].key;
        //     }
        // }
        // setItems(newPanes);
        // setActiveKey(newActiveKey);
        //
        // // TODO 删除对应的level
        // levelListRef.current = levelListRef.current.filter((item) => item.levelName !== targetKey)
    };
    const removeLevel = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);

        // TODO 删除对应的level
        levelListRef.current = levelListRef.current.filter((item) => item.uuid !== targetKey)
    }
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    const [confirmLoading, setConfirmLoading] = useState(false)
    const [deleteLevelName, setDeleteLevelName] = useState("")

    const [levelForm] = Form.useForm()

    function onCreateLevel() {

        levelForm.validateFields().then(() => {

            const body = levelForm.getFieldsValue()

            if (body.levelName === undefined || body.levelName === '') {
                message.warning(t('level.warning.name.not.allow.null'))
                return
            }

            if (body.type === "forest") {
                body.leveldataoverride = forest
            } else if (body.type === 'porkland') {
                body.leveldataoverride = porkland
            } else {
                body.leveldataoverride = cave
            }
            body.modoverrides = getMasterModoverrides()
            // 初始化
            body.server_ini = getNextServerIni(body.levelName)

            setConfirmLoading(true)
            createLevelApi(body).then(resp => {
                if (resp.code === 200) {
                    message.success(`${body.levelName} ${t('level.create.success')}`)
                    const data = resp.data
                    console.log("data", data)
                    add(body.levelName, data.uuid, data.leveldataoverride, data.modoverrides, data.server_ini)
                    setConfirmLoading(false)
                    setOpenAdd(false)
                } else {
                    message.error(`${body.levelName} ${t('level.create.error')}`)
                }
            })
        }).catch(err => {
            // 验证不通过时进入
            message.error(err.errorFields[0].errors[0])
        });

    }

    const validateName1 = (_, value) => {
        const stringList = levelListRef.current.map(level => level.levelName)
        // 判断是否重复字符串
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error(t('level.name.duplication')));
        }
        return Promise.resolve();
    };

    const validateName2 = (_, value) => {

        const stringList = levelListRef.current.map(level => level.uuid)
        // 判断是否重复字符串
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error(t('level.filename.duplication')));
        }
        // 判断是否为子串
        for (let i = 0; i < stringList.length; i++) {
            if (value && stringList[i].includes(value)) {
                return Promise.reject(new Error(t('level.filename.error.substring')));
            }
        }

        // 判断是否以英文开头且不含有特殊字符
        const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
        if (value && !regex.test(value)) {
            return Promise.reject(new Error(t('level.filename.error.contain.special.characters')));
        }

        return Promise.resolve();
    };

    const validateName3 = (_, value) => {
        console.log("value3", value)
        if (value === undefined || value === null || value === "") {
            return Promise.reject(new Error('请选择类型'));
        }
        return Promise.resolve();
    };


    function getMasterModoverrides() {
        const levels = levelListRef.current
        let modoverrides = "return {}"
        levels.forEach(level => {
            if (level.uuid === "Master") {
                modoverrides = level.modoverrides
            }
        })
        return modoverrides
    }

    function getNextServerIni(levelName) {
        const levels = levelListRef.current
        let nextId = 11001
        let nextPort = 11001
        let master_server_port = 27019
        let authentication_port = 8769

        let maxId = 0
        let maxPort = 0
        let maxMaster_server_port = 0
        let maxAuthentication_port = 0

        levels.forEach(level => {
            if (level?.server_ini?.id > maxId) {
                maxId = level?.server_ini?.id
            }
            if (level?.server_ini?.server_port > maxPort) {
                maxPort = level?.server_ini?.server_port
            }
            if (level?.server_ini?.authentication_port > maxAuthentication_port) {
                maxAuthentication_port = level?.server_ini?.authentication_port
            }
            if (level?.server_ini?.master_server_port > maxMaster_server_port) {
                maxMaster_server_port = level?.server_ini?.master_server_port
            }
        })

        return {
            id: maxId + 1,
            name: levelName,
            is_master: false,
            encode_user_path: true,
            server_port: maxPort + 1,
            authentication_port: maxAuthentication_port + 1,
            master_server_port: maxMaster_server_port + 1,
        }
    }

    const [spinLoading, setSpinLoading] = useState(false)
    const handleRefresh = () => {
        setSpinLoading(true)
        getLevelListApi()
            .then(resp => {
                if (resp.code === 200) {
                    const levels = resp.data
                    levelListRef.current = levels
                    const items2 = levels.map(level => {
                        const closable = level.uuid !== "Master"
                        if (level.uuid !== "Master") {
                            if (level.leveldataoverride === "return {}" || level.leveldataoverride === "") {
                                level.leveldataoverride = forest
                            }
                        }
                        return {
                            label: level.levelName,
                            children: <LevelItem
                                dstWorldSetting={dstWorldSetting}
                                level={{
                                    leveldataoverride: level.leveldataoverride,
                                    modoverrides: level.modoverrides,
                                    server_ini: level.server_ini
                                }}
                                levelName={level.levelName}
                                changeValue={changeValue}
                            />,
                            key: level.uuid,
                            closable: closable,
                        }
                    })
                    setItems([...items2])
                    if (levels.length === 0) {
                        setActiveKey("")
                    } else {
                        setActiveKey(levels[0].uuid)
                    }
                    setSpinLoading(false)
                } else {
                    message.error(t('level.fetch.error'))
                }
            })
    };

    return (
        <>
            <Skeleton loading={loading}>
                <Spin spinning={spinLoading}>
                    {levelListRef.current.length === 0 && (<>
                        <Empty description={t('level.empty')}/>
                    </>)}
                    <Tabs
                        tabPosition={'top'}
                        style={{
                            height: '68vh',
                        }}
                        hideAdd
                        type="editable-card"
                        onChange={onChange}
                        activeKey={activeKey}
                        onEdit={onEdit}
                        items={items}
                    />
                    <Divider/>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Space size={12} wrap>
                            <Button type={"primary"} onClick={() => {
                                updateLevelsApi({levels: levelListRef.current})
                                    .then(resp => {
                                        if (resp.code === 200) {
                                            message.success(t('level.save.success'))
                                        } else {
                                            message.warning(t('level.save.error'))
                                            message.warning(resp.msg)
                                        }
                                    })
                            }}>{t('level.save')}</Button>
                            <Button type={"primary"} onClick={() => setOpenAdd(true)}>{t('level.add')}</Button>
                        </Space>
                    </div>
                </Spin>
            </Skeleton>
            <Modal
                title={t('level.add')}
                open={openAdd}
                onOk={() => onCreateLevel()}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    setOpenAdd(false)
                }}>

                <Alert message={t('level.add.tips1')} type="warning" showIcon
                       closable/>
                <br/>
                <Form
                    form={levelForm}
                    layout="vertical"
                    labelAlign={'left'}
                >
                    <Form.Item label={t('level.name')}
                               name="levelName"
                               rules={[
                                   {
                                       required: true,
                                       validator: validateName1
                                   },
                               ]}

                    >
                        <Input placeholder="请输入世界名"/>
                    </Form.Item>
                    <Alert
                        message={t('level.add.tips2')}
                        type="warning" showIcon closable/>
                    <br/>
                    <Form.Item label={t('level.filename')}
                               name="uuid"
                               rules={[
                                   {
                                       required: false,
                                       validator: validateName2
                                   },
                               ]}
                    >
                        <Input placeholder="请输入文件名"/>
                    </Form.Item>
                    <Form.Item label={t('level.type')}
                               name="type"
                               rules={[
                                   {
                                       required: true,
                                       validator: validateName3,
                                       message: 'Please input your type!',
                                   },
                               ]}
                    >
                        <Radio.Group>
                            <Radio value={'forest'}>{t('level.type.forest')}</Radio>
                            <Radio value={'cave'}>{t('level.type.caves')}</Radio>
                            <Radio value={'porkland'}>{t('level.type.porkland')}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>

            </Modal>

            <Modal
                title={`是否删除 ${deleteLevelName} 世界`}
                open={openDelete}
                onOk={() => {
                    setConfirmLoading(true)
                    deleteLevelApi(deleteLevelName)
                        .then(resp => {
                            if (resp.code === 200) {
                                message.success(`删除世界成功`)
                                removeLevel(deleteLevelName)
                                setConfirmLoading(false)
                                setOpenDelete(false)
                            } else {
                                message.error(`删除世界失败`)
                            }
                        })
                }}
                confirmLoading={confirmLoading}
                onCancel={() => {
                    setOpenDelete(false)
                }}
            >
                <Alert message="删世界会先停止世界运行，删除之前请保存好数据" type="warning" showIcon/>
            </Modal>
        </>
    );
};
export default App;
