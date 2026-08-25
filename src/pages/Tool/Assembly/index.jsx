/* eslint-disable */
import {
    Button,
    Form,
    Input,
    InputNumber,
    Space,
    Switch,
    Tabs,
    Alert,
    Divider,
    Skeleton, message, Select,
} from 'antd';
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {format, parse} from "lua-json";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

import {getLevelListApi, updateLevelsApi} from "../../../api/clusterLevelApi.jsx";


function parseWorldConfig(modoverrides, workshopId) {
    try {
        const object = parse(modoverrides)
        // workshop-1754389029
        if (object === null) {
            return []
        }
        const mod = object[workshopId]
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


export default ({reload}) => {
    const {t} = useTranslation()

    const [levels, setLevels] = useState([])
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()
    const [workshopId, setWorkshopId] = useState("workshop-1754389029")

    const updateWorkshopId = (workshopId) => {
        setWorkshopId(workshopId)
        // 重新读取配置
        form.setFieldsValue({
            world_config: parseWorldConfig(levels[0].modoverrides, workshopId)
        })
    }

    const saveWorkshop = ()=>{

        const world_config =  form.getFieldValue().world_config
        if (world_config === null || world_config === undefined) {
            message.warning(t('tool.assembly.cannotBeEmpty'))
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
            message.warning(t('tool.assembly.cannotBeEmpty'))
            return
        }
        world_config.forEach(item => {
            const temp = {...item}
            delete temp['id']
            object[item.id] = temp
        })

        const levels2 = [...levels]
        for (let level2 of levels2) {
            let oldValue = level2.modoverrides
            const mobject = parse(oldValue)
            if (mobject[workshopId] === null || mobject[workshopId] === undefined || mobject[workshopId].configuration_options === undefined) {
                mobject[workshopId] = {
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

            mobject[workshopId].configuration_options.world_config = object

            const newValue = format(mobject, {singleQuote: false})
            level2.modoverrides = newValue
        }

        console.log(levels2)

        updateLevelsApi({levels: levels2})
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('tool.assembly.saveSuccess'))
                    reload()
                } else {
                    message.error(t('tool.assembly.saveError'), resp.msg)
                }
            })

    }

    useEffect(() => {
        setLoading(true)
        getLevelListApi()
            .then(resp => {
                console.log(resp)
                if (resp.code === 200) {
                    const levels = resp.data
                    setLevels(levels)
                    let workshop1 = localStorage.getItem('workshop')
                    if (workshop1 === null || workshop1 === undefined || workshop1 === "") {
                        workshop1 = "workshop-1754389029"
                    }
                    setWorkshopId(workshop1)
                    form.setFieldsValue({
                        world_config: parseWorldConfig(levels[0].modoverrides, workshop1)
                    })
                }
                setLoading(false)
            })
    }, [])

    const items = [
        {
            label: t('tool.tab.assembly'),
            children: <div>
                <SelectorMod form={form} updateWorkshopId={updateWorkshopId} workshopId={workshopId} saveWorkshop={saveWorkshop} />
            </div>,
            key: '1',
        },
        {
            label: t('tool.assembly.tab.syncConfig'),
            children: <>
                <SyncConfig levels={levels} />
            </>,
            key: '2',
            forceRender: true,
        },
    ]

    return (
        <>
            <Skeleton loading={loading}>
                <Tabs
                    items={items}
                />
            </Skeleton>
        </>
    )
}

const SelectorMod = ({form, formValueChange, updateWorkshopId, workshopId, saveWorkshop}) => {
    const {t} = useTranslation()

    const inputRef = useRef(null);

    const Connect = () => {
        return (
            <Form
                form={form}
                onValuesChange={formValueChange}
            >
                <Form.List name="world_config">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <div key={key}>
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                        }}
                                        align="baseline"
                                        size={[8, 16]}
                                        wrap
                                    >
                                        <Form.Item
                                            label={t('tool.assembly.field.worldId')}
                                            key={`${key}世界id`}
                                            {...restField}
                                            name={[name, 'id']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t('tool.assembly.validation.worldIdRequired'),
                                                },
                                            ]}
                                        >
                                            <Input placeholder={t('tool.assembly.field.worldId')}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={t('tool.assembly.field.worldName')}
                                            key={`${key}世界名称`}
                                            {...restField}
                                            name={[name, 'name']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t('tool.assembly.validation.worldNameRequired'),
                                                },
                                            ]}
                                        >
                                            <Input placeholder={t('tool.assembly.field.worldNamePlaceholder')}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={t('tool.assembly.field.category')}
                                            key={`${key}分类`}
                                            {...restField}
                                            name={[name, 'category']}
                                        >
                                            <Input placeholder={t('tool.assembly.field.categoryPlaceholder')}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={t('tool.assembly.field.note')}
                                            key={`${key}提示信息`}
                                            {...restField}
                                            name={[name, 'note']}
                                        >
                                            <Input placeholder={t('tool.assembly.field.notePlaceholder')}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={t('tool.assembly.field.galleryful')}
                                            key={`${key}人数`}
                                            {...restField}
                                            name={[name, 'galleryful']}
                                        >
                                            <InputNumber placeholder={t('tool.assembly.field.gallerfulPlaceholder')}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={t('tool.assembly.field.extra')}
                                            key={`${key}不分流`}
                                            {...restField}
                                            name={[name, 'extra']}
                                            valuePropName="checked"
                                        >
                                            <Switch checkedChildren={t('panel.y')} unCheckedChildren={t('panel.n')}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={t('tool.assembly.field.isCave')}
                                            key={`${key}洞穴`}
                                            {...restField}
                                            name={[name, 'is_cave']}
                                            valuePropName="checked"
                                        >
                                            <Switch checkedChildren={t('panel.y')} unCheckedChildren={t('panel.n')}/>
                                        </Form.Item>
                                        <Form.Item
                                            label={t('tool.assembly.field.invisible')}
                                            key={`${key}不可见`}
                                            {...restField}
                                            name={[name, 'invisible']}
                                            valuePropName="checked"
                                        >
                                            <Switch checkedChildren={t('panel.y')} unCheckedChildren={t('panel.n')}/>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)}/>
                                    </Space>
                                    <Divider/>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    {t('tool.assembly.addField')}
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        )
    }

    return (
        <>
            <Alert message={t('tool.assembly.compatNotice')}
                   type="info"
                   showIcon
                   action={
                       <a target={'_blank'}
                          href="https://steamcommunity.com/sharedfiles/filedetails/?id=1754389029">{t('tool.assembly.details')}</a>
                   }
            />
            <br/>
            <Space size={16} wrap>
                <Space.Compact
                    style={{
                        width: '100%',
                    }}
                >
                    <Input defaultValue={workshopId} ref={inputRef} placeholder={t('tool.assembly.modIdPlaceholder')}/>
                    <Button type="primary" onClick={() => {
                        updateWorkshopId(inputRef.current.input.value)
                    }}>{t('backup.refresh')}</Button>
                </Space.Compact>
                <Button size={"middle"} type="primary"
                        onClick={() => localStorage.setItem("workshop", inputRef.current.input.value)}
                >{t('tool.assembly.setDefault')}</Button>
            </Space>
            <br/><br/>
            <Connect/>
            <br/><br/>
            <Button type={'primary'}
                    onClick={()=>saveWorkshop()}
            >{t('tool.assembly.saveConfig')}</Button>
        </>
    )
}


const SyncConfig = ({levels, saveSyncConfig})=>{
    const {t} = useTranslation()

    return(
        <>
            <Space size={16} wrap>
                <Select
                    defaultValue={levels[0]?.uuid}
                    style={{
                        width: 120,
                    }}
                    // onChange={handleChange}
                    options={levels.map((level, index)=>{
                        return{
                            value: level.uuid,
                            label: level.levelName,
                        }
                    })}
                />
                <span>{t('tool.assembly.sync')}</span>
                <Select
                    mode="multiple"
                    defaultValue={levels[0]?.uuid}
                    style={{
                        width: 120,
                    }}
                    // onChange={handleChange}
                    options={levels.map((level, index)=>{
                        return{
                            value: level.uuid,
                            label: level.levelName,
                        }
                    })}
                />
            </Space>
        </>
    )
}

