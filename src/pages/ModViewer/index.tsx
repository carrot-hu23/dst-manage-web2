import {Button, Card, Col, Divider, Drawer, Form, Image, Row, Select, Switch} from "antd";
import React, {RefObject, useEffect, useState} from "react";
import {getMyModInfoList} from "../../api/modApi.ts";
import {parse} from "lua-json";
import {useParams} from "react-router-dom";

export interface ModInfo {
    auth?: string;
    consumer_id?: number;
    creator_appid?: number;
    description?: string;
    file_url?: string;
    img?: string;
    last_time?: number;
    mod_config?: ModConfig;
    modid?: string;
    name?: string;
    update?: boolean;
    v?: string;
    enable?: boolean
}

export interface ModConfig {
    all_clients_require_mod: boolean;
    api_version: number;
    author: string;
    client_only_mod: boolean;
    configuration_options: ConfigurationOption[];
    description: string;
    dont_starve_compatible: boolean;
    dst_compatible: boolean;
    folder_name: string;
    forumthread: string;
    icon: string;
    icon_atlas: string;
    locale: string;
    name: string;
    priority: number;
    reign_of_giants_compatible: boolean;
    server_filter_tags: string[];
    version: string;
}

interface ConfigurationOptionItem {
    data: number | boolean;
    description: string;
}

interface ConfigurationOption {
    default: number | boolean;
    hover: string;
    label: string;
    name: string;
    options: ConfigurationOptionItem[];
}

function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const ModItem2: React.FC<{ modInfo: ModInfo, valueRef: RefObject<string> }> = ({modInfo, valueRef}) => {
    const [open1, setOpen1] = useState(false);
    const [modoverridesMap, setModoverridesMap] = useState(parseModoverrides(valueRef.current || "return{}"))
    useEffect(() => {
        setModoverridesMap(parseModoverrides(valueRef.current || "return{}"))
        // console.log(parseModoverrides(valueRef.current))
    }, [valueRef.current]);
    // @ts-ignore
    return (
        <>
            <Card bordered={true} bodyStyle={{
                padding: 8
            }}>
                <Row>
                    <Col span={12}>
                        <div style={{display: 'flex'}}>
                            <Image
                                src={modInfo.img}/>
                            <div style={{paddingLeft: 8}}>
                                <strong>{modInfo.name}</strong>
                                <div>模组id: {modInfo.modid}</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{float: "right"}}>
                            <div style={{paddingBottom: 8}}>
                                <Switch checkedChildren="开启" unCheckedChildren="关闭"
                                        defaultValue={modoverridesMap?.has(modInfo.modid)}/>
                            </div>
                            <Button type="link" onClick={() => setOpen1(true)}>配置</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
            <Drawer
                title={modInfo.name}
                onClose={() => {
                    setOpen1(false)
                }}
                open={open1}
                width={1200}
            >
                <ModOptions modInfo={modInfo} valueRef={valueRef}/>
            </Drawer>

        </>
    )
}

function parseModoverrides(modoverrides: string) {
    try {
        const result = parse(modoverrides);
        const keys = Object.keys(result)
        const workshopMap = new Map();
        keys.forEach(workshopId => {
            // @ts-ignore
            workshopMap.set(workshopId.replace('workshop-', '').replace('"', '').replace('"', ''), {...result[workshopId].configuration_options})
        })
        return workshopMap
    } catch (error) {
        console.log(error)
        return new Map()
    }
}

const ModOptions: React.FC<{ modInfo: ModInfo, valueRef: RefObject<string> }> = ({modInfo, valueRef}) => {
    // @ts-ignore
    const [modoverridesMap, setModoverridesMap] = useState<Map<any, any>>()
    useEffect(() => {
        const map = parseModoverrides(valueRef.current || "return{}");
        // console.log(map)
        // console.log(modInfo?.mod_config?.configuration_options)
        setModoverridesMap(map)
    }, [valueRef.current]);

    function onValuesChange(changedValues: object, _allValues: Record<string, object>) {
        console.log(changedValues)
    }

    return (
        <>
            <Form
                onValuesChange={onValuesChange}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                {modInfo?.mod_config?.configuration_options && (
                    modInfo?.mod_config?.configuration_options.map(item => {
                        if (item?.options?.length === 1 && item?.options[0]?.data === item?.default && !item?.options[0]?.description) {
                            // 在DST中,如果label为空字符串,就直接是显示空白行,这里用||会导致label为空也显示name,为了跟DST保持一样使用了??
                            return <div>
                                <Divider key={generateUUID()}>
                                        <span style={{fontSize: "14px", fontWeight: "600"}}>
                                        {item.label || item.name}</span>
                                </Divider>
                            </div>
                        }
                        if (item.name === 'Title' || item.name === '') {
                            if (item.label === '') {
                                return ""
                            }
                            return <div>
                                <Divider key={generateUUID()}>
                                    <span style={{fontSize: "14px", fontWeight: "600"}}>{item.label} 配置</span>
                                </Divider>
                            </div>
                        }
                        let defaultValue: string | boolean | number
                        if (modoverridesMap?.has(modInfo.modid)) {
                            defaultValue = modoverridesMap?.get(modInfo.modid)[item.name]
                        } else {
                            defaultValue = item.default
                        }
                        return (
                            <div key={item.name}>
                                <Select4 key={generateUUID()} item={item} defaultValue={defaultValue}/>
                            </div>
                        )
                    })
                )}
            </Form>
        </>
    )
}

const Select4: React.FC<{ item: ConfigurationOption, defaultValue: string | boolean | number }> = ({
                                                                                                       item,
                                                                                                       defaultValue
                                                                                                   }) => {

    function checkDefault(defaultValue1: any, defaultValue2: any) {
        if (defaultValue1 === undefined || defaultValue2 === null) {
            return true
        }
        return defaultValue1 === defaultValue2
    }

    const [isDefault, setIsDefault] = useState(checkDefault(defaultValue, item.default))

    // @ts-ignore
    return <>
        {typeof item.default === 'object' && (
            <>
                <Form.Item
                    key={item.label + item.name}
                    label={item.label}
                    name={item.name}>
                    <span style={{width: 480}}>
                        {JSON.stringify(defaultValue)}
                    </span>
                </Form.Item>
            </>
        )}
        {typeof item.default !== 'object' && (
            <Form.Item
                key={item.label + item.name}
                label={item.label}
                name={item.name}>
                <Select
                    className={isDefault ? '' : 'selected'}
                    defaultValue={defaultValue === undefined ? item.default : defaultValue}
                    onChange={(value) => {
                        setIsDefault(value === item.default)
                    }}
                    // @ts-ignore
                    options={Array.isArray(item?.options) && item?.options.map(option => ({
                        value: option.data,
                        label: option.description,
                    }))}
                />
            </Form.Item>
        )}
    </>
}

const ModViewer: React.FC<{ valueRef: RefObject<string> }> = ({valueRef}) => {

    const [modList, setModList] = useState<ModInfo[]>([])
    const {cluster} = useParams()

    useEffect(() => {
        getMyModInfoList(cluster || "")
            .then(resp => {
                if (resp.code === 200) {
                    const data = resp.data
                    sort(data, valueRef.current || 'return {}')
                    setModList(data)
                }
            })
    }, []);

    function sort(modList: ModInfo[], modoverrides: string) {
        const map = parseModoverrides(modoverrides);
        modList.forEach(mod => {
            mod.enable = !!map?.has(mod.modid);
        })
        modList.sort((a, b) => {
            if (a.enable === b.enable) {
                return 0;
            }
            if (a.enable) {
                return -1; // a在前
            }
            return 1; // b在前
        });
    }

    return (
        <>
            {modList && (
                modList.map(modInfo => (
                    <div key={modInfo.modid}>
                        <ModItem2 modInfo={modInfo} valueRef={valueRef}/>
                        <br/>
                    </div>
                ))
            )}
        </>
    )
}

export default ModViewer