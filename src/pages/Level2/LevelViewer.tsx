import React, {useEffect, useState} from "react";
import {Alert, message, Select, Space, Tabs} from "antd";
import {parse, format} from "lua-json";
import './index.css';
import {useTranslation} from "react-i18next";

function getLevelObject(value: string): Record<string, any> {
    value = value.replace(/\n/g, "")
    try {
        return parse(value)
    } catch (error) {
        message.warning("lua配置解析错误")
        console.log(error)
        return {}
    }
}

interface GroupProps {
    leveldataoverride?: string;
    data: Record<string, Record<string, any>>;
    url: string;
    leveldataoverrideObject: Record<string, any>;
    onStateChange: (name: string, newValue: any) => void;
    changeValue: (value: string) => void;
    type: string;
    isWorldGen?: boolean;
}

const Group: React.FC<GroupProps> = ({
                                         leveldataoverride,
                                         data,
                                         url,
                                         leveldataoverrideObject,
                                         onStateChange,
                                         changeValue,
                                         type,
                                         isWorldGen
                                     }) => {

    function getWebp(key: string, key2: string) {
        if (type === 'porkland' && key === 'global' && isWorldGen) {
            return url
        }
        if (type === 'porkland' && (key === 'survivors' || key === 'global')) {
            return './misc/worldsettings_customization.webp'
        }
        const list = [
            'task_set', 'boons', 'rock', 'mushroom', 'weather',
        ]
        if (type === 'porkland' && list.includes(key2)) {
            return './misc/worldgen_customization.webp'
        }
        return url
    }

    // @ts-ignore
    return (
        <>
            {Object.keys(data)
                .sort((a, b) => data[a].order - data[b].order)
                .map(key =>
                    <div key={key}>
                        <h3>{data[key].text}</h3>
                        <Space size={[32, 8]} wrap>
                            {Object.entries(data[key].items)
                                .map(([key2, value]) =>
                                    <Space key={key2} align="center" size={'middle'}>
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            backgroundImage: `url(${getWebp(key, key2)})`,
                                            // @ts-ignore
                                            backgroundPosition: `-${Math.round(value?.image?.x * data[key].atlas.width / data[key].atlas.item_size) * 100}% -${Math.round(value.image.y * data[key].atlas.height / data[key].atlas.item_size) * 100}%`
                                        }}/>
                                        <div>
                                            <span>{value.text}</span>
                                            <Item
                                                // @ts-ignore
                                                options={
                                                    // @ts-ignore
                                                    ((value.desc !== undefined && value.desc !== null) && Object.entries(value.desc).map(([k, v]) => ({
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
                                                // @ts-ignore
                                                defaultValue={value.value}
                                                name={key2}
                                                leveldataoverride={leveldataoverride}
                                                onStateChange={onStateChange}
                                                changeValue={changeValue}
                                            />
                                        </div>
                                    </Space>)
                            }
                        </Space>
                    </div>
                )}
        </>
    );
}

interface ItemProps {
    currentValue: any;
    defaultValue: any;
    options: Array<{ value: string; label: string }>;
    name: string;
    leveldataoverride: string,
    onStateChange: (name: string, newValue: any) => void;
    changeValue: (value: string) => void;
}

const Item: React.FC<ItemProps> = ({
                                       currentValue,
                                       defaultValue,
                                       options,
                                       name,
                                       leveldataoverride,
                                       onStateChange,
                                       changeValue
                                   }) => {
    const {t} = useTranslation();
    const [isDefault, setIsDefault] = useState(true);

    useEffect(() => {
        setIsDefault(currentValue === defaultValue);
    }, [currentValue, defaultValue]);

    function handleChange(value: any) {
        try {
            console.log("value", value)
            setIsDefault(value === defaultValue);
            const data: Record<string, any> = parse(leveldataoverride.replace(/\n/g, ""));
            data.overrides[name] = value;
            onStateChange(name, value);
            changeValue(format(data));
        } catch (error) {
            console.log(error)
            message.warning(t("level.warning.lua.error"));
        }
    }

    const selectClassName = isDefault ? "" : "selected";
    return (
        <div>
            <Select
                style={{width: 120}}
                value={currentValue}
                defaultValue={defaultValue}
                onChange={handleChange}
                className={selectClassName}
                options={options}
            />
        </div>
    );
}

const LevelViewEditor: React.FC<{
    leveldataoverride?: string;
    dstWorldSetting: any;
    changeValue: (value: string) => void;
    porklandSetting: any;
}> = ({leveldataoverride, dstWorldSetting, changeValue, porklandSetting}) => {

    const {t} = useTranslation();
    const {i18n} = useTranslation();
    const [lang, setLang] = useState(i18n.language);
    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            setLang(lng);
        };

        i18n.on("languageChanged", handleLanguageChange);
        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n]);

    const [leveldataoverrideObject, setLeveldataoverrideObject] = useState<Record<string, any>>(getLevelObject(leveldataoverride || '')?.overrides);
    const [levelType, setLevelType] = useState<string>()
    useEffect(() => {
        const levelObject = getLevelObject(leveldataoverride || '');
        setLevelType(levelObject?.location);
        setLeveldataoverrideObject(levelObject?.overrides)
    }, [leveldataoverride]);

    // 获取世界默认值
    const forestWorldGenGroup = lang.includes('zh') ? dstWorldSetting.zh.forest.WORLDGEN_GROUP : dstWorldSetting.en.forest.WORLDGEN_GROUP;
    const forestWorldSettingsGroup = lang.includes('zh') ? dstWorldSetting.zh.forest.WORLDSETTINGS_GROUP : dstWorldSetting.en.forest.WORLDSETTINGS_GROUP;
    const cavesWorldGenGroup = lang.includes('zh') ? dstWorldSetting.zh.cave.WORLDGEN_GROUP : dstWorldSetting.en.cave.WORLDGEN_GROUP;
    const cavesWorldSettingsGroup = lang.includes('zh') ? dstWorldSetting.zh.cave.WORLDSETTINGS_GROUP : dstWorldSetting.en.cave.WORLDSETTINGS_GROUP;

    const porklandItems = [
        {
            label: t("level.worldSettings"),
            children: <Group
                leveldataoverride={leveldataoverride}
                data={porklandSetting?.WORLDSETTINGS_GROUP}
                url={"/api/dst-static/customization_porkland.webp"}
                leveldataoverrideObject={leveldataoverrideObject}
                onStateChange={(name, newValue) => {
                    setLeveldataoverrideObject(current => {
                        current[name] = newValue;
                        return {...current};
                    });
                }}
                changeValue={changeValue}
                type={'porkland'}
            />,
            key: '1'
        },
        {
            label: t("level.worldGeneration"),
            children: <Group
                leveldataoverride={leveldataoverride}
                data={porklandSetting?.WORLDGEN_GROUP}
                url={"/api/dst-static/customization_porkland.webp"}
                leveldataoverrideObject={leveldataoverrideObject}
                onStateChange={(name, newValue) => {
                    setLeveldataoverrideObject(current => {
                        current[name] = newValue;
                        return {...current};
                    });
                }}
                changeValue={changeValue}
                type={'porkland'}
                isWorldGen
            />,
            key: '2'
        }
    ];

    const forestItems = [
        {
            label: t("level.worldSettings"),
            children: <Group
                leveldataoverride={leveldataoverride}
                data={forestWorldSettingsGroup}
                url={"/api/dst-static/worldsettings_customization.webp"}
                leveldataoverrideObject={leveldataoverrideObject}
                onStateChange={(name, newValue) => {
                    setLeveldataoverrideObject(current => {
                        current[name] = newValue;
                        return {...current};
                    });
                }}
                changeValue={changeValue}
                type={'forest'}
            />,
            key: '1'
        },
        {
            label: t("level.worldGeneration"),
            children: <Group
                leveldataoverride={leveldataoverride}
                data={forestWorldGenGroup}
                url={"/api/dst-static/worldgen_customization.webp"}
                leveldataoverrideObject={leveldataoverrideObject}
                onStateChange={(name, newValue) => {
                    setLeveldataoverrideObject(current => {
                        current[name] = newValue;
                        return {...current};
                    });
                }}
                changeValue={changeValue}
                type={'forest'}
            />,
            key: '2'
        }
    ];

    const caveItems = [
        {
            label: t("level.worldSettings"),
            children: <Group
                leveldataoverride={leveldataoverride}
                data={cavesWorldSettingsGroup}
                url={"/api/dst-static/worldsettings_customization.webp"}
                leveldataoverrideObject={leveldataoverrideObject}
                onStateChange={(name, newValue) => {
                    setLeveldataoverrideObject(current => {
                        current[name] = newValue;
                        return {...current};
                    });
                }}
                changeValue={changeValue}
                type={'caves'}
            />,
            key: 3,
        },
        {
            label: t("level.worldGeneration"),
            children: <Group
                leveldataoverride={leveldataoverride}
                data={cavesWorldGenGroup}
                url={"/api/dst-static/worldgen_customization.webp"}
                leveldataoverrideObject={leveldataoverrideObject}
                onStateChange={(name, newValue) => {
                    setLeveldataoverrideObject(current => {
                        current[name] = newValue;
                        return {...current};
                    });
                }}
                changeValue={changeValue}
                type={'caves'}
            />,
            key: 4,
        },
    ];

    return (
        <>
            <div className={'scrollbar'} style={{
                "height": "54vh",
                overflowY: 'auto',
            }}>
                {levelType === 'forest' && <Tabs items={forestItems}/>}
                {levelType === 'cave' && <Tabs items={caveItems}/>}
                {levelType === 'porkland' && <Tabs items={porklandItems}/>}
                {(levelType !== 'forest' && levelType !== 'cave' && levelType !== 'porkland') && (
                    <Alert style={{marginBottom: '4px'}} message={`${t("level.warning.not.support.view")} ${levelType}`}
                           type="info" showIcon closable/>
                )}
            </div>
        </>
    );
}

export default LevelViewEditor;