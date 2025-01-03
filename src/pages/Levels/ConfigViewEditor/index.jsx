/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react";
import {Alert, message, Select, Space, Tabs} from "antd";
import {parse,format} from "lua-json";

import './index.css'
import {useTranslation} from "react-i18next";

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

export default ({valueRef, dstWorldSetting, changeValue, porklandSetting}) => {

    const { t } = useTranslation()
    const { i18n } = useTranslation()
    const [lang, setLang] = useState(i18n.language)
    console.log(i18n.language)
    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setLang(lng)
        };

        i18n.on("languageChanged", handleLanguageChange);

        // 清理事件监听器
        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n]);

    const levelObject = getLevelObject(valueRef.current)
    const levelType = levelObject.location
    // 获取用户默认值
    const [leveldataoverrideObject, setLeveldataoverrideObject] = useState(levelObject.overrides)

    // 获取世界默认值
    const forestWorldGenGroup = lang.includes('zh')? dstWorldSetting.zh.forest.WORLDGEN_GROUP : dstWorldSetting.en.forest.WORLDGEN_GROUP
    const forestWorldSettingsGroup =  lang.includes('zh')? dstWorldSetting.zh.forest.WORLDSETTINGS_GROUP : dstWorldSetting.en.forest.WORLDSETTINGS_GROUP
    const cavesWorldGenGroup = lang.includes('zh')? dstWorldSetting.zh.cave.WORLDGEN_GROUP : dstWorldSetting.en.cave.WORLDGEN_GROUP
    const cavesWorldSettingsGroup = lang.includes('zh')? dstWorldSetting.zh.cave.WORLDSETTINGS_GROUP : dstWorldSetting.en.cave.WORLDSETTINGS_GROUP

    useEffect(()=>{
        const levelObject = getLevelObject(valueRef.current)
        setLeveldataoverrideObject(levelObject.overrides)
    }, [valueRef.current])

    const porklandItems = [
        {
            label: t("level.worldSettings"),
            children: <div>
                <Group
                    valueRef={valueRef}
                    data={porklandSetting?.WORLDSETTINGS_GROUP}
                    url={"./misc/customization_porkland.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                    type={'porkland'}
                />
            </div>,
            key: '1'
        },
        {
            label: t("level.worldGeneration"),
            children: <div>
                <Group
                    valueRef={valueRef}
                    data={porklandSetting?.WORLDGEN_GROUP}
                    url={"./misc/customization_porkland.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                    type={'porkland'}
                    isWorldGen
                />
            </div>,
            key: '2'
        }
    ]

    const forestItems = [
        {
            label: t("level.worldSettings"),
            children: <div>
                <Group
                    valueRef={valueRef}
                    data={forestWorldSettingsGroup}
                    url={"./misc/worldsettings_customization.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                />
            </div>,
            key: '1'
        },
        {
            label: t("level.worldGeneration"),
            children: <div>
                <Group
                    valueRef={valueRef}
                    data={forestWorldGenGroup}
                    url={"./misc/worldgen_customization.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                />
            </div>,
            key: '2'
        }
    ]

    const caveItems = [
        {
            label: t("level.worldSettings"),
            children: <div>
                <Group
                    valueRef={valueRef}
                    data={cavesWorldSettingsGroup}
                    url={"./misc/worldsettings_customization.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                />
            </div>,
            key: 3,
        },
        {
            label: t("level.worldGeneration"),
            children: <div>
                <Group
                    valueRef={valueRef}
                    data={cavesWorldGenGroup}
                    url={"./misc/worldgen_customization.webp"}
                    leveldataoverrideObject={leveldataoverrideObject}
                    onStateChange={(name, newValue) => {
                        setLeveldataoverrideObject(current=> {
                            current[name]=newValue
                            return {...current}
                        })
                    }}
                    changeValue={changeValue}
                />
            </div>,
            key: 4,
        },
    ]

    return (
        <>
            <div className={'scrollbar'} style={{
                "height": "52vh",
                overflowY: 'auto',
            }}>
                {levelType === 'forest' && (<>
                        <Tabs items={forestItems} />
                    </>
                )}
                {levelType === 'cave' && (<>
                        <Tabs items={caveItems} />
                    </>
                )}
                {levelType === 'porkland' &&(<>
                    <Tabs items={porklandItems} />
                </>)}
                {(levelType !== 'forest' && levelType !== 'cave' && levelType !== 'porkland') && (<>
                    <Alert style={{
                        marginBottom: '4px'
                    }} message={`${t("level.warning.not.support.view")} ${levelType}`} type="info" showIcon closable />
                </>)}

            </div>
        </>
    )
}

const Group = ({valueRef, data, url, leveldataoverrideObject, onStateChange, changeValue, type, isWorldGen}) => {

    function getWebp(key, key2) {
        if (type === 'porkland' && key === 'global' && isWorldGen) {
            return url
        }
        if (type === 'porkland' && (key === 'survivors' || key === 'global'))  {
            return './misc/worldsettings_customization.webp'
        }
        const list = [
            'task_set','boons','rock',  'mushroom', 'weather',
        ]
        if (type === 'porkland' && list.includes(key2))  {
            return './misc/worldgen_customization.webp'
        }
        return url
    }


    return (<>
        {Object.keys(data)
            .sort((a, b) => data[a].order - data[b].order)
            .map(key =>
                <div key={key}>
                    <h3>{data[key].text}</h3>
                    <Space size={[32, 8]} wrap>
                        {Object.entries(data[key].items)
                            .map(([key2, value]) =>
                                // 可以在回调函数内对 value 进行操作
                                <Space key={key2} align="center" size={'middle'}>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        backgroundImage: `url(${getWebp(key, key2)})`,
                                        backgroundPosition: `-${Math.round(value.image.x * data[key].atlas.width / data[key].atlas.item_size) * 100}% -${Math.round(value.image.y * data[key].atlas.height / data[key].atlas.item_size) * 100}%`
                                    }}/>
                                    <div>
                                        <span>{value.text}</span>
                                        <Item
                                            options={
                                                ((value.desc !== undefined &&
                                                        value.desc !== null) &&
                                                    Object.entries(value.desc).map(([k, v]) => ({
                                                        value: k,
                                                        label: v,
                                                    }))) || (data[key].desc !== undefined &&
                                                    data[key].desc !== null) &&
                                                Object.entries(data[key].desc).map(([k, v]) => ({
                                                    value: k,
                                                    label: v,
                                                }))
                                            }
                                            currentValue={leveldataoverrideObject[key2]}
                                            defaultValue={value.value}
                                            name={key2}
                                            valueRef={valueRef}
                                            onStateChange={onStateChange}
                                            changeValue={changeValue}
                                        />
                                    </div>
                                </Space>)
                        }
                    </Space>
                </div>
            )}
    </>)
}

const Item = ({currentValue, defaultValue, options, name, valueRef,onStateChange, changeValue}) => {
    const { t } = useTranslation()
    const [isDefault, setIsDefault] = useState(true);

    useEffect(() => {
        if (currentValue !== defaultValue) {
            setIsDefault(false)
        }
    }, [])

    function handleChange(value) {
        try {
            setIsDefault(value === defaultValue);
            // console.log("value: ", value, "name: ", name)

            const data = parse(valueRef.current.replace(/\n/g, ""))
            data.overrides[name] = value

            onStateChange(name, value)
            // valueRef.current = format(data)
            changeValue(format(data))
        } catch (error) {
            message.warning(t("level.warning.lua.error"))
        }
    }

    const selectClassName = isDefault ? "" : "selected";
    return (
        <>
            <div>
                <Select
                    style={{
                        width: 120,
                    }}
                    value={currentValue}
                    defaultValue={defaultValue}
                    onChange={(value) => {
                        handleChange(value)
                    }}
                    className={selectClassName}
                    options={options}
                />
            </div>
        </>
    )
}