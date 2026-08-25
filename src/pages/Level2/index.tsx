import {useTranslation} from "react-i18next";
import React, {useEffect, useRef, useState} from "react";
import {
    Alert,
    Button,
    Divider,
    Dropdown,
    Empty,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Radio,
    Skeleton, Space,
    Switch,
    Tabs,
    TabsProps,
    Tag,
    Upload
} from "antd";
import type {MenuProps} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import MonacoEditor2, {MonacoEditorRef} from "../NewEditor2";
import {useTheme} from "../../hooks/useTheme";
import {useParams} from "react-router-dom";

import axios from "axios";
import LevelViewer from "./LevelViewer.tsx";
import {getLevelListApi, createLevelApi, deleteLevelApi, updateLevelsApi} from "../../api/levelApi";
import type {LevelData, LevelServerIni} from "../../type";
import {cave, forest, porkland} from "../../utils/dst";

// 世界标签组件
interface LevelTagsProps {
    isMaster?: boolean;
    serverPort?: number;
}

const LevelTags: React.FC<LevelTagsProps> = ({isMaster, serverPort}) => {
    const {t} = useTranslation();
    return (
        <>
            {isMaster && <Tag color="blue" bordered={false}>{t('level2.tag.master')}</Tag>}
            {serverPort && <Tag color="green" bordered={true}>{serverPort}</Tag>}
        </>
    );
};

interface LevelItemProps {
    dstWorldSetting?: Record<string, object>
    porklandSetting?: Record<string, object>
    levelName: string,
    level: LevelData,
    changeLevel: (levelName: string, newValue: Record<string, unknown>) => void,
    has: (permission: string) => boolean
}

const LevelItem: React.FC<LevelItemProps> = ({dstWorldSetting, porklandSetting, levelName, level, changeLevel, has}) => {
    const {t} = useTranslation();
    useEffect(() => {
    }, [level]);
    const items: any = [
        {
            label: t('level.leveldataoverride'),
            children: <div className={'scrollbar'} style={{
                height: 'calc(100vh - 280px)',
                minHeight: '400px',
                maxHeight: '800px',
                overflowY: 'auto',
            }}>
                <Leveldataoverride dstWorldSetting={dstWorldSetting} porklandSetting={porklandSetting}
                                   levelName={levelName}
                                   level={level} changeLevel={changeLevel} has={has}/>
            </div>,
            key: 1,
        },
        {
            label: t('level.modoverrides'),
            children: <div className={'scrollbar'} style={{
                height: 'calc(100vh - 280px)',
                minHeight: '400px',
                maxHeight: '800px',
                overflowY: 'auto',
            }}><Modoverrides levelName={levelName} level={level}
                             changeLevel={changeLevel} has={has}/>
            </div>,
            key: 2,
        },
        {
            key: 3,
            label: t('level.serverIni'),
            children: <div className={'scrollbar'} style={{
                height: 'calc(100vh - 340px)',
                minHeight: '400px',
                maxHeight: '800px',
                overflowY: 'auto',
            }}><ServerIni levelName={levelName} level={level}
                          changeLevel={changeLevel} has={has}/>
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
                                   porklandSetting={props.porklandSetting}
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
                                   "height": "calc(100vh - 340px)",
                                   "minHeight": "300px",
                                   "maxHeight": "600px",
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


    return (<Skeleton loading={false}>
        <Tabs defaultActiveKey="1" type={'card'} destroyInactiveTabPane={true} items={items}/>
    </Skeleton>)
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
                               "height": "calc(100vh - 340px)",
                               "minHeight": "300px",
                               "maxHeight": "600px",
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
    }, [props.level.server_ini, form]);

    function onValuesChange(_changedValues: object, allValues: Record<string, object>) {
        if (props.changeLevel) {
            // 确保 allValues 包含完整的 server_ini 数据
            const serverIni = allValues as unknown as LevelServerIni
            props.changeLevel(props.levelName || '', {server_ini: serverIni})
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
            <Alert
                message={(
                    <>
                        <ul className="list-disc list-inside space-y-1 text-blue-800">
                            <li>{t('serverini.portTip.item1')}</li>
                            <li>{t('serverini.portTip.item2')}</li>
                            <li>{t('serverini.portTip.item3')}</li>
                        </ul>
                    </>
                )}
                type="info"

            />
            <br/>
            <Form.Item
                label={t('serverini.server_port')}
                name="server_port"
                tooltip={t('serverini.tooltip.server_port')}
            >
                <InputNumber style={{
                    width: '100%',
                }} placeholder={t('serverini.placeholder.server_port')} disabled={!props.has('allowEditingServerIni')}/>
            </Form.Item>

            <Form.Item
                label={t('serverini.is_master')}
                valuePropName="checked"
                name='is_master'
                tooltip={t('serverini.tooltip.is_master')}>
                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}/>
            </Form.Item>

            <Form.Item
                label={t('serverini.name')}
                name="name"
                tooltip={t('serverini.name')}
            >
                <Input placeholder={t('serverini.placeholder.name')}/>
            </Form.Item>

            <Form.Item
                label={t('serverini.id')}
                name="id"
                tooltip={t('serverini.tooltip.id')}
            >
                <InputNumber
                    style={{
                        width: '100%',
                    }}
                    placeholder={t('serverini.id')}/>
            </Form.Item>

            <Form.Item
                label={t('serverini.encode_user_path')}
                valuePropName="checked"
                name='encode_user_path'
                tooltip={t('serverini.tooltip.encode_user_path')}
            >
                <Switch checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')} defaultChecked/>
            </Form.Item>

            <Form.Item
                label={t('serverini.authentication_port')}
                name='authentication_port'
                tooltip={t('serverini.authentication_port')}
            >
                <InputNumber style={{
                    width: '100%',
                }} placeholder={t('serverini.authentication_port')} disabled={!props.has('allowEditingServerIni')}/>
            </Form.Item>

            <Form.Item
                label={t('serverini.master_server_port')}
                name='master_server_port'
                tooltip={t('serverini.master_server_port')}
            >
                <InputNumber
                    style={{
                        width: '100%',
                    }}
                    placeholder={t('serverini.master_server_port')} disabled={!props.has('allowEditingServerIni')}/>
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
    const {cluster} = useParams<{ cluster?: string }>();

    const has= (p: string)=>{
        return true
    }

    const {t} = useTranslation();
    const {i18n} = useTranslation();
    const lang = i18n.language;

    const [dstWorldSetting, setDstWorldSetting] = useState(defaultDstWorldSetting)
    const [porklandSetting, setPorklandSetting] = useState({})
    const [loading, setLoading] = useState(true)

    const levelListRef = useRef<LevelData[]>([]);
    const [items, setItems] = useState<TabsProps['items']>([])
    const itemsRef = useRef<TabsProps['items']>([])
    const [activeKey, setActiveKey] = useState('');

    // Modal states
    const [openAdd, setOpenAdd] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openRename, setOpenRename] = useState(false)
    const [openDownload, setOpenDownload] = useState(false)
    const [downloadFileName, setDownloadFileName] = useState<string>('')
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [deleteLevelName, setDeleteLevelName] = useState("")
    const [renameLevelUuid, setRenameLevelUuid] = useState("")
    const [renameLevelOldName, setRenameLevelOldName] = useState("")

    const [levelForm] = Form.useForm()
    const [renameForm] = Form.useForm()

    // 提示相关状态
    const [showRenameTip, setShowRenameTip] = useState(() => {
        const saved = localStorage.getItem('level2-rename-tip-dismissed')
        return saved !== 'true'
    })

    const changeLevel = (levelName: string, changeValue: Record<string, unknown>) => {
        const oldLevels = levelListRef.current
        levelListRef.current = oldLevels.map(level => {
            if (level.levelName === levelName) {
                return {...level, ...changeValue}
            }
            return level
        })

        // 如果修改了 server_ini，更新对应标签的 label
        if (changeValue.server_ini && itemsRef.current && itemsRef.current.length > 0) {
            const updatedLevel = levelListRef.current.find(l => l.levelName === levelName)
            if (!updatedLevel) {
                return
            }

            const newItems = itemsRef.current.map(item => {
                // 只更新匹配的 item
                if (item.key === updatedLevel.uuid) {
                    const closable = (updatedLevel.uuid !== "Master" && has('allowAddLevel'))
                    const menuItems: MenuProps['items'] = [
                        {
                            key: 'rename',
                            label: t('level2.rename'),
                            icon: <EditOutlined/>,
                            onClick: () => {
                                setRenameLevelUuid(updatedLevel.uuid)
                                setRenameLevelOldName(updatedLevel.levelName)
                                renameForm.setFieldsValue({newLevelName: updatedLevel.levelName})
                                setOpenRename(true)
                            }
                        }
                    ];

                    // 只更新 label，保持 children 不变以避免重新渲染
                    return {
                        ...item,
                        closable: closable,
                        label: (
                            <Dropdown menu={{items: menuItems}} trigger={['contextMenu']}>
                                <div
                                    onDoubleClick={() => {
                                        setRenameLevelUuid(updatedLevel.uuid)
                                        setRenameLevelOldName(updatedLevel.levelName)
                                        renameForm.setFieldsValue({newLevelName: updatedLevel.levelName})
                                        setOpenRename(true)
                                    }}
                                    style={{cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: '8px'}}
                                >
                                    <span>{updatedLevel.levelName}</span>
                                    <LevelTags
                                        isMaster={updatedLevel.server_ini?.is_master}
                                        serverPort={updatedLevel.server_ini?.server_port}
                                    />
                                </div>
                            </Dropdown>
                        ),
                    }
                }
                // 其他 item 保持不变
                return item
            })

            itemsRef.current = newItems
            setItems(newItems)
        }
    }

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            try {
                const response = await axios.get('/api/dst-static/dst_world_setting.json');
                const response2 = await axios.get('api/dst-static/porkland_setting.json');

                const dstWorldSetting = JSON.parse(base64ToUtf8(response.data));
                const porklandSetting = JSON.parse(base64ToUtf8(response2.data));
                setDstWorldSetting(dstWorldSetting);
                setPorklandSetting(porklandSetting);

                const resp = await getLevelListApi();
                if (resp.code === 200 && resp.data) {
                    const levels = resp.data
                    levelListRef.current = levels
                    const items2 = levels.map(level => {
                        const closable = (level.uuid !== "Master" && has('allowAddLevel'))
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

                        const menuItems: MenuProps['items'] = [
                            {
                                key: 'rename',
                                label: t('level2.rename'),
                                icon: <EditOutlined/>,
                                onClick: () => {
                                    setRenameLevelUuid(level.uuid)
                                    setRenameLevelOldName(level.levelName)
                                    renameForm.setFieldsValue({newLevelName: level.levelName})
                                    setOpenRename(true)
                                }
                            }
                        ];

                        return {
                            label: (
                                <Dropdown menu={{items: menuItems}} trigger={['contextMenu']}>
                                    <div
                                        onDoubleClick={() => {
                                            setRenameLevelUuid(level.uuid)
                                            setRenameLevelOldName(level.levelName)
                                            renameForm.setFieldsValue({newLevelName: level.levelName})
                                            setOpenRename(true)
                                        }}
                                        style={{cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: '8px'}}
                                    >
                                        <span>{level.levelName}</span>
                                        <LevelTags
                                            isMaster={level.server_ini?.is_master}
                                            serverPort={level.server_ini?.server_port}
                                        />
                                    </div>
                                </Dropdown>
                            ),
                            children: <LevelItem
                                dstWorldSetting={dstWorldSetting}
                                porklandSetting={porklandSetting}
                                level={level}
                                levelName={level.levelName}
                                changeLevel={changeLevel}
                                has={has}
                            />,
                            key: level.uuid,
                            closable: closable,
                        }
                    })
                    itemsRef.current = items2
                    setItems(items2)
                    if (levels.length === 0) {
                        setActiveKey("")
                    } else {
                        setActiveKey(levels[0].uuid)
                    }
                } else {
                    message.error(t('level.fetch.error'))
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                message.error(t('level.fetch.error'))
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [cluster, lang, t]);

    // Helper functions
    const getMasterModoverrides = () => {
        const levels = levelListRef.current
        let modoverrides = "return {}"
        levels.forEach(level => {
            if (level.uuid === "Master") {
                modoverrides = level.modoverrides
            }
        })
        return modoverrides
    }

    const getNextServerIni = (levelName: string): LevelServerIni => {
        const levels = levelListRef.current
        let maxId = 0
        let maxPort = 0
        let maxMaster_server_port = 0
        let maxAuthentication_port = 0

        levels.forEach(level => {
            if (level?.server_ini?.id && level.server_ini.id > maxId) {
                maxId = level.server_ini.id
            }
            if (level?.server_ini?.server_port && level.server_ini.server_port > maxPort) {
                maxPort = level.server_ini.server_port
            }
            if (level?.server_ini?.authentication_port && level.server_ini.authentication_port > maxAuthentication_port) {
                maxAuthentication_port = level.server_ini.authentication_port
            }
            if (level?.server_ini?.master_server_port && level.server_ini.master_server_port > maxMaster_server_port) {
                maxMaster_server_port = level.server_ini.master_server_port
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

    // Save functionality
    const handleSave = async () => {
        try {
            const resp = await updateLevelsApi({levels: levelListRef.current})
            if (resp.code === 200) {
                message.success(t('level.save.success'))
            } else {
                message.warning(t('level.save.error'))
                if (resp.msg) {
                    message.warning(resp.msg)
                }
            }
        } catch (error) {
            message.error(t('level.save.error'))
            console.error(error)
        }
    }

    const handleDownload = () => {
        setDownloadFileName(cluster || 'levels')
        setOpenDownload(true)
    }

    const handleConfirmDownload = () => {
        const fileName = downloadFileName.trim()
        if (!fileName) {
            message.error(t('level2.filename.required'))
            return
        }

        const jsonString = JSON.stringify({levels: levelListRef.current}, null, 2)
        const blob = new Blob([jsonString], {type: "application/json"})
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${fileName}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setOpenDownload(false)
    }

    // Upload handler
    const handleUpload = (file: File) => {
        if (file.type !== "application/json") {
            message.warning(t('level2.upload.invalidType'));
            return false;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                try {
                    const result = event.target?.result as string
                    const parsedData = JSON.parse(result);
                    const levels = parsedData.levels as LevelData[];
                    levelListRef.current = levels;
                    const items2 = levels.map(level => {
                        const closable = (level.uuid !== "Master" && has('allowAddLevel'))
                        const menuItems: MenuProps['items'] = [
                            {
                                key: 'rename',
                                label: t('level2.rename'),
                                icon: <EditOutlined/>,
                                onClick: () => {
                                    setRenameLevelUuid(level.uuid)
                                    setRenameLevelOldName(level.levelName)
                                    renameForm.setFieldsValue({newLevelName: level.levelName})
                                    setOpenRename(true)
                                }
                            }
                        ];

                        return {
                            label: (
                                <Dropdown menu={{items: menuItems}} trigger={['contextMenu']}>
                                    <div
                                        onDoubleClick={() => {
                                            setRenameLevelUuid(level.uuid)
                                            setRenameLevelOldName(level.levelName)
                                            renameForm.setFieldsValue({newLevelName: level.levelName})
                                            setOpenRename(true)
                                        }}
                                        style={{cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: '8px'}}
                                    >
                                        <span>{level.levelName}</span>
                                        <LevelTags
                                            isMaster={level.server_ini?.is_master}
                                            serverPort={level.server_ini?.server_port}
                                        />
                                    </div>
                                </Dropdown>
                            ),
                            key: level.uuid,
                            children: (
                                <LevelItem
                                    dstWorldSetting={dstWorldSetting}
                                    levelName={level.levelName || ''}
                                    level={level}
                                    changeLevel={changeLevel}
                                    has={has}
                                />
                            ),
                            closable: closable,
                        }
                    });
                    itemsRef.current = items2
                    setItems(items2);
                    message.success(t('level2.import.success'))
                } catch (error) {
                    message.error(t('level2.import.error'))
                    console.error(error)
                }
            }
        };
        reader.readAsText(file);
        return false
    }

    // Add level handlers
    const add = (levelName: string, uuid: string, leveldataoverride: string, modoverrides: string, server_ini: LevelServerIni) => {
        const newPanes = items ? [...items] : [];

        const newLevel: LevelData = {
            levelName,
            uuid,
            leveldataoverride,
            modoverrides,
            server_ini
        }

        const newLevels = [...levelListRef.current]
        newLevels.push(newLevel)
        levelListRef.current = newLevels

        const menuItems: MenuProps['items'] = [
            {
                key: 'rename',
                label: t('level2.rename'),
                icon: <EditOutlined/>,
                onClick: () => {
                    setRenameLevelUuid(uuid)
                    setRenameLevelOldName(levelName)
                    renameForm.setFieldsValue({newLevelName: levelName})
                    setOpenRename(true)
                }
            }
        ];

        newPanes.push({
            label: (
                <Dropdown menu={{items: menuItems}} trigger={['contextMenu']}>
                    <div
                        onDoubleClick={() => {
                            setRenameLevelUuid(uuid)
                            setRenameLevelOldName(levelName)
                            renameForm.setFieldsValue({newLevelName: levelName})
                            setOpenRename(true)
                        }}
                        style={{cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: '8px'}}
                    >
                        <span>{levelName}</span>
                        <LevelTags
                            isMaster={server_ini?.is_master}
                            serverPort={server_ini?.server_port}
                        />
                    </div>
                </Dropdown>
            ),
            children: <LevelItem
                dstWorldSetting={dstWorldSetting}
                porklandSetting={porklandSetting}
                level={newLevel}
                levelName={levelName}
                changeLevel={changeLevel}
                has={has}
            />,
            key: uuid,
            closable: has('allowAddLevel'),
        })
        itemsRef.current = newPanes
        setItems(newPanes);
        setActiveKey(uuid);
    }

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: string) => {
        setDeleteLevelName(targetKey)
        setOpenDelete(true)
    };

    const removeLevel = (targetKey: string) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items?.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items?.filter((item) => item.key !== targetKey);
        if (newPanes && newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key as string;
            } else {
                newActiveKey = newPanes[0].key as string;
            }
        }
        itemsRef.current = newPanes
        setItems(newPanes);
        setActiveKey(newActiveKey);

        levelListRef.current = levelListRef.current.filter((item) => item.uuid !== targetKey)
    }

    const onEdit = (targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, action: 'add' | 'remove') => {
        if (action === 'add') {
            setOpenAdd(true);
        } else {
            remove(targetKey as string);
        }
    };

    // Form validation
    const validateName1 = (_: unknown, value: string) => {
        const stringList = levelListRef.current.map(level => level.levelName)
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error(t('level.name.duplication')));
        }
        return Promise.resolve();
    };

    const validateRename = (_: unknown, value: string) => {
        if (!value || value.trim() === '') {
            return Promise.reject(new Error(t('level.warning.name.not.allow.null')));
        }
        // 排除当前正在重命名的世界
        const stringList = levelListRef.current
            .filter(level => level.uuid !== renameLevelUuid)
            .map(level => level.levelName)
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error(t('level.name.duplication')));
        }
        return Promise.resolve();
    };

    const validateName2 = (_: unknown, value: string) => {
        const stringList = levelListRef.current.map(level => level.uuid)
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error(t('level.filename.duplication')));
        }
        for (let i = 0; i < stringList.length; i++) {
            if (value && stringList[i].includes(value)) {
                return Promise.reject(new Error(t('level.filename.error.substring')));
            }
        }
        const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
        if (value && !regex.test(value)) {
            return Promise.reject(new Error(t('level.filename.error.contain.special.characters')));
        }
        return Promise.resolve();
    };

    const validateName3 = (_: unknown, value: string) => {
        if (value === undefined || value === null || value === "") {
            return Promise.reject(new Error(t('level.required.type')));
        }
        return Promise.resolve();
    };

    // Create level
    const onCreateLevel = () => {
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
            body.server_ini = getNextServerIni(body.levelName)

            setConfirmLoading(true)
            createLevelApi(body).then(resp => {
                if (resp.code === 200 && resp.data) {
                    message.success(`${body.levelName} ${t('level.create.success')}`)
                    const data = resp.data
                    add(body.levelName, data.uuid, data.leveldataoverride, data.modoverrides, data.server_ini)
                    setConfirmLoading(false)
                    setOpenAdd(false)
                } else {
                    message.error(`${body.levelName} ${t('level.create.error')}`)
                    setConfirmLoading(false)
                }
            }).catch(() => {
                message.error(`${body.levelName} ${t('level.create.error')}`)
                setConfirmLoading(false)
            })
        }).catch(err => {
            message.error(err.errorFields[0].errors[0])
        });
    }

    // Rename level handler
    const onRenameLevel = () => {
        renameForm.validateFields().then(() => {
            const {newLevelName} = renameForm.getFieldsValue()

            if (!newLevelName || newLevelName.trim() === '') {
                message.warning(t('level.warning.name.not.allow.null'))
                return
            }

            // 更新内存中的数据
            const oldLevels = levelListRef.current
            levelListRef.current = oldLevels.map(level => {
                if (level.uuid === renameLevelUuid) {
                    return {...level, levelName: newLevelName}
                }
                return level
            })

            // 更新 UI
            const newItems = items?.map(item => {
                if (item.key === renameLevelUuid) {
                    const level = levelListRef.current.find(l => l.uuid === renameLevelUuid)
                    if (level) {
                        const menuItems: MenuProps['items'] = [
                            {
                                key: 'rename',
                                label: t('level2.rename'),
                                icon: <EditOutlined/>,
                                onClick: () => {
                                    setRenameLevelUuid(level.uuid)
                                    setRenameLevelOldName(level.levelName)
                                    renameForm.setFieldsValue({newLevelName: level.levelName})
                                    setOpenRename(true)
                                }
                            }
                        ];

                        return {
                            ...item,
                            label: (
                                <Dropdown menu={{items: menuItems}} trigger={['contextMenu']}>
                                    <div
                                        onDoubleClick={() => {
                                            setRenameLevelUuid(level.uuid)
                                            setRenameLevelOldName(level.levelName)
                                            renameForm.setFieldsValue({newLevelName: level.levelName})
                                            setOpenRename(true)
                                        }}
                                        style={{cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: '8px'}}
                                    >
                                        <span>{newLevelName}</span>
                                        <LevelTags
                                            isMaster={level.server_ini?.is_master}
                                            serverPort={level.server_ini?.server_port}
                                        />
                                    </div>
                                </Dropdown>
                            ),
                            children: <LevelItem
                                dstWorldSetting={dstWorldSetting}
                                porklandSetting={porklandSetting}
                                level={level}
                                levelName={newLevelName}
                                changeLevel={changeLevel}
                                has={has}
                            />
                        }
                    }
                }
                return item
            })
            itemsRef.current = newItems
            setItems(newItems)

            message.success(t('level2.rename.success', {name: newLevelName}))
            setOpenRename(false)
        }).catch(err => {
            if (err.errorFields) {
                message.error(err.errorFields[0].errors[0])
            }
        });
    };

    return (<Skeleton loading={loading}>
            {/* 重命名提示 */}
            {showRenameTip && (
                <Alert
                    message={t('level2.renameTip.message')}
                    type="info"
                    showIcon
                    closable
                    onClose={() => {
                    }}
                    style={{marginBottom: 12}}
                    action={[
                        <Button type={'link'} onClick={() => {
                            localStorage.setItem('level2-rename-tip-dismissed', 'true')
                            setShowRenameTip(false)
                        }}>{t('mod.dismiss.button')}</Button>
                    ]}
                />
            )}

            {levelListRef.current.length === 0 && (<>
                <Empty description={t('level.empty')}/>
            </>)}
            <Tabs
                tabPosition={'top'}
                style={{
                    height: 'calc(100vh - 240px)',
                    minHeight: '500px',
                }}
                hideAdd
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
            />
            <Divider/>
            <Space size={8} wrap>
                <Button type={"primary"} onClick={handleSave}>{t('level.save')}</Button>
                {has('allowAddLevel') &&
                    <Button type={"primary"} onClick={() => setOpenAdd(true)}>{t('level.add')}</Button>
                }
                <Upload beforeUpload={handleUpload} showUploadList={false}>
                    <Button type={'primary'}>{t('level2.import.button')}</Button>
                </Upload>
                <Button type={'primary'} onClick={handleDownload}>{t('backup.download')}</Button>
            </Space>
        {/* Add Level Modal */}
        <Modal
            title={t('level.add')}
            open={openAdd}
            onOk={() => onCreateLevel()}
            confirmLoading={confirmLoading}
            onCancel={() => {
                setOpenAdd(false)
            }}>
            <Alert message={t('level.add.tips1')} type="warning" showIcon closable/>
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
                    <Input placeholder={t('level.placeholder.name')}/>
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
                    <Input placeholder={t('level.placeholder.filename')}/>
                </Form.Item>
                <Form.Item label={t('level.type')}
                           name="type"
                           rules={[
                               {
                                   required: true,
                                   validator: validateName3,
                                   message: t('level.required.type'),
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

        {/* Delete Level Modal */}
        <Modal
            title={t('level.delete.confirm.title', {name: deleteLevelName})}
            open={openDelete}
            onOk={() => {
                setConfirmLoading(true)
                deleteLevelApi(deleteLevelName)
                    .then(resp => {
                        if (resp.code === 200) {
                            message.success(t('level.delete.success'))
                            removeLevel(deleteLevelName)
                            setConfirmLoading(false)
                            setOpenDelete(false)
                        } else {
                            message.error(t('level.delete.error'))
                            setConfirmLoading(false)
                        }
                    })
                    .catch(() => {
                        message.error(t('level.delete.error'))
                        setConfirmLoading(false)
                    })
            }}
            confirmLoading={confirmLoading}
            onCancel={() => {
                setOpenDelete(false)
            }}
        >
            <Alert message={t('level.delete.warning')} type="warning" showIcon/>
        </Modal>

        {/* Rename Level Modal */}
        <Modal
            title={t('level2.rename.modal.title', {name: renameLevelOldName})}
            open={openRename}
            onOk={() => onRenameLevel()}
            onCancel={() => {
                setOpenRename(false)
            }}
        >
            <Alert message={t('level2.rename.modal.tip')} type="info" showIcon/>
            <br/>
            <Form
                form={renameForm}
                layout="vertical"
                labelAlign={'left'}
            >
                <Form.Item
                    label={t('level2.rename.newName.label')}
                    name="newLevelName"
                    rules={[
                        {
                            required: true,
                            validator: validateRename
                        },
                    ]}
                >
                    <Input placeholder={t('level2.rename.newName.placeholder')}/>
                </Form.Item>
            </Form>
        </Modal>

        {/* Download Modal */}
        <Modal
            title={t('level2.download.modal.title')}
            open={openDownload}
            onOk={() => handleConfirmDownload()}
            onCancel={() => setOpenDownload(false)}
        >
            <Form layout="vertical">
                <Form.Item
                    label={t('backup.fileName')}
                    rules={[
                        {
                            required: true,
                            validator: (_: unknown, value: string) => {
                                if (!value || value.trim() === '') {
                                    return Promise.reject(new Error(t('level2.filename.required')))
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <Input
                        value={downloadFileName}
                        onChange={(e) => setDownloadFileName(e.target.value)}
                        placeholder={t('level2.download.filename.placeholder', {cluster: cluster || 'levels'})}
                        suffix=".json"
                    />
                </Form.Item>
            </Form>
        </Modal>
    </Skeleton>)
}

export default Level2