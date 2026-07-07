import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {message, Skeleton, Tabs} from "antd";
import {parse} from "lua-json";

import {getMyModInfoList} from "../../api/modApi.jsx";
import ModList from "./ModList/index.jsx";

import Workshop from "./Workshop/index.jsx";
import UgcAcf from "./UgcAcf/index.jsx";
import {useLevelsStore} from "../../store/useLevelsStore";
import {useModPreferences} from "../../hooks/useModPreferences";


export default () => {

    const {cluster} = useParams()
    const { t } = useTranslation()

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('1')
    const [selectedLevelUuid, setSelectedLevelUuid] = useState('')

    // 模组列表展示数据
    const [modList, setmodList] = useState([])
    const [modDataList, setModDataList] = useState([])
    // 模组默认的配置项 Module default configuration items
    const defaultConfigOptionsRef = useRef(new Map())
    // 模组配置项
    const modConfigOptionsRef = useRef({})

    const {getAllPreferences, applyPreference} = useModPreferences()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const modInfoListResp = await getMyModInfoList(cluster)
            if (modInfoListResp.code !== 200) {
                message.warning(t('mod.fetch.error'))
                return
            }
            let modList = modInfoListResp.data
            if (modList === null) {
                modList = []
            }
            setmodList([...modList])
            setModDataList([...modList])
            // modInfoListResp.data
            const loadedLevels = await reFlushLevels(cluster)
            const defaultLevel = findDefaultLevel(loadedLevels)
            if (defaultLevel) {
                setSelectedLevelUuid(defaultLevel.uuid)
                await initModConfigList(defaultLevel.modoverrides, modList, setmodList, defaultConfigOptionsRef, modConfigOptionsRef)
            } else {
                setmodList([])
            }
            setLoading(false)
        }
        fetchData()

    }, [])

    const levels = useLevelsStore((state) => state.levels)
    const reFlushLevels = useLevelsStore((state) => state.reFlushLevels)

    function findDefaultLevel(levelList) {
        if (!Array.isArray(levelList) || levelList.length === 0) {
            return null
        }
        return levelList.find(level => level.uuid === 'Master') || levelList[0]
    }

    async function changeLevel(newLevel) {
        const selectedLevel = levels.find(level=>level.uuid === newLevel)
        if (!selectedLevel) {
            message.warning(t('level.fetch.error'))
            return
        }
        setSelectedLevelUuid(newLevel)
        const modoverrides = selectedLevel.modoverrides
        const newModDataList = modDataList.map(a=>{
            return {...a}
        })
        await initModConfigList(modoverrides, newModDataList, setmodList, defaultConfigOptionsRef, modConfigOptionsRef)
    }

    async function initModConfigList(modoverrides, subscribeModList, setModList, defaultConfigOptionsRef, modConfigOptionsRef) {
        const workshopMap = parseModoverrides(modoverrides);
        //console.log("workshopMap", workshopMap)

        // subscribeModList.push({
        //     mod_config: {
        //         author: "kelei",
        //         description: "禁用本地所有模组，tips: 这个只是个虚拟的模组，只是兼容了下。如果不知道是干什么用的请不要开启！！！ 不支持自定禁用某些模组 \n\n 请勿乱点！！！\n\n 如果要删除，对应模组配置里面的 client_mods_disabled = {\n" +
        //             "    configuration_options = {},\n" +
        //             "    enabled = true,\n" +
        //             "  },",
        //         name: "client_mods_disabled",
        //         configuration_options: []
        //     },
        //     enable: false,
        //     update: false,
        //     modid: "client_mods_disabled",
        //     installed: true,
        //     name: "client_mods_disabled",
        //     img: "https://steamuserimages-a.akamaihd.net/ugc/1829046490069435373/B2073D1E5B13DA00D29D316FC946C154C0854146/?imw=64&imh=64&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
        //
        // })
        const modOptions = {}
        const visibleModList = []
        const subscribeModMap = new Map()
        subscribeModList.forEach(mod => {
            const {modid} = mod
            subscribeModMap.set(modid, mod)
            const options = mod.mod_config.configuration_options
            if (typeof options === 'object' && options !== undefined && options !== null) {
                const defaultOptions = {}
                options?.forEach((item) => {
                    if (item.default !== '' && item.name !== "null" && item.name !== undefined) {
                        defaultOptions[item.name] = item.default
                    }
                })
                modOptions[modid] = defaultOptions
            }
            if (workshopMap.has(modid)) {
                mod.enable = true
                mod.installed = true
                visibleModList.push(mod)
            }
        });

        // 一次性获取所有模组的偏好配置
        const allPreferences = await getAllPreferences()

        if (allPreferences) {
            // 遍历所有模组，仅对未启用的模组应用已保存的偏好配置
            subscribeModList.forEach((mod) => {
                const {modid} = mod

                // 只有模组未启用时，才应用保存的偏好配置
                // 已启用的模组使用 workshopMap 中当前的配置（即实际生效的配置）
                if (!mod.enable) {
                    const defaultConfig = modOptions[modid] || {}
                    const savedPreference = allPreferences[modid]

                    if (savedPreference) {
                        // 智能合并：保留新增的配置项，同时应用已保存的偏好
                        const mergedConfig = applyPreference(modid, defaultConfig, savedPreference)
                        workshopMap.set(modid, mergedConfig)
                    }
                }
            })
        }

        // 如果当前世界的 modoverrides 中有未订阅/未安装的 mod，仍显示出来用于编辑或删除。
        workshopMap.forEach((value, key) => {
            if (subscribeModMap.get(key) === undefined) {
                console.log("not subscribe mod: ", key)
                visibleModList.push({
                    mod_config: {
                        author: "unknown",
                        name: "unknown"
                    },
                    name: "",
                    update: false,
                    modid: key,
                    installed: false,
                    enable: true
                })
            }
        });

        visibleModList.sort((a, b) => {
            if (a.enable === b.enable) {
                return 0;
            }
            if (a.enable) {
                return -1; // a在前
            }
            return 1; // b在前
        });

        setModList(visibleModList || [])
        defaultConfigOptionsRef.current = workshopMap
        modConfigOptionsRef.current = modOptions
    }

    function parseModoverrides(modoverrides) {
        console.log(modoverrides)
        try {
            const result = parse(modoverrides);
            const keys = Object.keys(result)
            const workshopMap = new Map();
            keys.forEach(workshopId => {
                workshopMap.set(workshopId.replace('workshop-', '').replace('"', '').replace('"', ''), {...result[workshopId].configuration_options})
            })
            console.log("modoverrides 解析对象", workshopMap)
            return workshopMap
        } catch (error) {
            return new Map()
        }
    }


    const items = [
        {
            key: '1',
            label: t('mod.Setting'),
            children: <ModList modList={modList} setModList={setmodList}
                               defaultConfigOptionsRef={defaultConfigOptionsRef}
                               modConfigOptionsRef={modConfigOptionsRef}
                               changeLevel={changeLevel}
                               selectedLevelUuid={selectedLevelUuid}
            />,
        },
        {
            key: '2',
            label: t('mod.Subscribe'),
            children: <Workshop addModList={setmodList}/>,
        },
        {
            key: '3',
            label: t('mod.UgcMod'),
            children: <UgcAcf />,
        },
    ];

    return (
        <>
            <Skeleton loading={loading}>
                <Tabs activeKey={activeTab} items={items} onChange={(key) => {
                    setActiveTab(key)
                }}/>
            </Skeleton>
        </>
    )
}