import React, {useEffect, useRef, useState} from 'react';
import _ from "lodash";
import {Row, Col, Button, Space, Tooltip, message, Alert, Popconfirm, Spin, Select} from 'antd';
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {format} from "lua-json";

import {updateModinfosApi} from '../../../api/modApi.jsx';
import ModItem from "./ModItem/index.jsx";
import ModConfigOptions from "../ModConfigOptions/index.jsx";
import {useLevelsStore} from "../../../store/useLevelsStore";
import {updateLevelsApi} from "../../../api/clusterLevelApi.jsx";
import i18n from "i18next";
import {useUserPreferences} from "../../../hooks/useUserPreferences.ts";

// eslint-disable-next-line react/prop-types
export default ({modList, setModList,defaultConfigOptionsRef, modConfigOptionsRef, changeLevel, selectedLevelUuid}) => {

    const levels = useLevelsStore((state) => state.levels)
    const reFlushLevels = useLevelsStore((state) => state.reFlushLevels)
    const { t } = useTranslation()
    const navigate = useNavigate();
    const {cluster} = useParams()
    const lang = i18n.language
    const {isDismissed, dismissAlert} = useUserPreferences()

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [mod, setMod] = useState({})
    const modListRef = useRef(modList)
    const levelsRef = useRef(levels)
    const [showModTips1Alert, setShowModTips1Alert] = useState(true)

    const changeMod = (mod) => {
        const _mod = _.cloneDeep(mod);
        setMod(_mod)
    }

    const changeEnable = (modId) => {
        const newModList = modList.map(mod =>
            mod.modid === modId ? { ...mod, enable: !mod.enable } : mod
        );
        setModList(newModList);
    };

    function isWorkshopId(str) {
        return /^[0-9]+$/.test(str);
    }

    function formatModOverride(targetModList = modList) {
        try {
            const chooses = targetModList.filter(mod => mod.enable)
            const modids = chooses.map(mod => mod.modid)
            const object = _.pick(modConfigOptionsRef.current, modids)
            const object1 = {}
            // eslint-disable-next-line no-restricted-syntax
            for (const id of modids) {
                defaultConfigOptionsRef.current.get(id)
                object1[id] = defaultConfigOptionsRef.current.get(id)
            }
            const workshopObject = _.merge({}, object, object1)
            const workshopIdKeys = Object.keys(workshopObject)
            const workShops = {}
            workshopIdKeys.forEach(workshopId => {
                if (workshopObject[workshopId] === undefined) {
                    workshopObject[workshopId] = {}
                }
                let workshop
                if (isWorkshopId(workshopId)) {
                    workshop = `workshop-${workshopId}`
                } else {
                    workshop = workshopId
                }
                const options = workshopObject[workshopId]
                delete options.null
                if (options !== undefined || options !== null) {
                    Object.keys(options).map(k=>{
                        if (options[k] === null || options[k] === undefined) {
                            delete options[k]
                        }
                    })
                }
                workShops[workshop] = {
                    configuration_options: options,
                    enabled: true
                }
            })
            console.log("结果",workShops)
            return format(workShops, {
                singleQuote: false
            })
        } catch (error) {
            console.log(error)
            message.warning("mod配置解析错误", error.message)
            return "return { error }"
        }
    }

    function saveModConfig() {
        const modoverrides = formatModOverride(modListRef.current)
        if (modoverrides === "return { error }") {
            message.warning(t('mod.parse.error'))
            return Promise.resolve(false)
        }
        const newLevels = levelsRef.current.map(item => ({
            ...item,
            modoverrides,
        }))
        console.log("save all levels modoverrides", newLevels)
        return updateLevelsApi({levels: newLevels})
            .then(resp => {
                if (resp.code === 200) {
                    message.info(t('mod.save.ok'))
                    reFlushLevels(cluster)
                    return true
                } else {
                    message.warning(t('level.save.error'))
                    message.warning(resp.msg)
                    return false
                }
            })
            .catch(error => {
                console.log(error);
                message.error(t('mod.save.error'))
                return false
            })
    }

    function saveLevelMod() {
        if (!selectedLevelUuid) {
            message.warning(t('level.fetch.error'))
            return
        }
        const modoverrides = formatModOverride()
        const newLevels = levels.map(item=>{
            if (item.uuid === selectedLevelUuid) {
                return {...item, modoverrides}
            }
            return item
        })
        updateLevelsApi({levels: newLevels})
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('level.save.success'))
                    reFlushLevels(cluster)
                        .then(resp=>{

                        })
                } else {
                    message.warning(t('level.save.error'))
                    message.warning(resp.msg)
                }
            })
            .catch(error => {
                console.log(error)
                message.error(t('level.save.error'))
            })
        console.log(newLevels)
    }

    function updateModConfigOptions() {
        setConfirmLoading(true)
        updateModinfosApi(lang)
            .then(data => {
                if (data.code === 200) {
                    message.success(t('mod.update.ok'))
                } else {
                    message.warning(t('mod.update.error'))
                }
                setConfirmLoading(false)
            })
    }

    const removeMod = (modId) => {
        const newModList = modList.filter(mod => mod.modid !== modId)
        const modoverrides = formatModOverride(newModList)
        if (modoverrides === "return { error }") {
            message.warning(t('mod.parse.error'))
            return Promise.resolve(false)
        }
        const newLevels = levelsRef.current.map(item => {
            if (item.uuid === selectedLevelUuid) {
                return {...item, modoverrides}
            }
            return item
        })
        return updateLevelsApi({levels: newLevels})
            .then(resp => {
                if (resp.code === 200) {
                    defaultConfigOptionsRef.current.delete(modId)
                    delete modConfigOptionsRef.current[modId]
                    modListRef.current = newModList
                    setModList([...newModList])
                    setMod(current => current?.modid === modId ? (newModList[0] || {}) : current)
                    message.success(t('mod.delete.ok'))
                    reFlushLevels(cluster)
                    return true
                } else {
                    message.warning(t('level.save.error'))
                    message.warning(resp.msg)
                    return false
                }
            })
            .catch(error => {
                console.log(error)
                message.error(t('mod.delete.error'))
                return false
            })
    }

    useEffect(() => {
        // 去重：根据 modid 去重，保留第一个
        const uniqueModList = modList.reduce((acc, current) => {
            const existingMod = acc.find(item => item.modid === current.modid);
            if (!existingMod) {
                acc.push(current);
            }
            return acc;
        }, []);

        // 如果去重后的列表和原列表不同，更新列表
        if (uniqueModList.length !== modList.length) {
            modListRef.current = uniqueModList
            setModList(uniqueModList);
            return
        }

        modListRef.current = uniqueModList
        setMod(current => uniqueModList.find(item => item.modid === current?.modid) || uniqueModList[0] || {})
    }, [modList, setModList])

    useEffect(() => {
        levelsRef.current = levels
    }, [levels])

    useEffect(() => {
        // 检查用户是否已关闭提示
        isDismissed('mod-tips1').then(dismissed => {
            setShowModTips1Alert(!dismissed)
        })
    }, [isDismissed])

    const handleDismissModTips1 = async () => {
        const success = await dismissAlert('mod-tips1')
        if (success) {
            setShowModTips1Alert(false)
            message.success(t('mod.dismiss.success'))
        }
    }

    const updateModSize = modList.filter(mod=>mod.update)
    const selectedLevel = levels.find(item => item.uuid === selectedLevelUuid) || levels[0] || {}

    const handleChange = (value) => {
        changeLevel(value)
    }

    return (
        <div translate="no">
            <Spin spinning={confirmLoading}>
                {showModTips1Alert && (
                    <div style={{
                        paddingBottom: 8
                    }}>
                        <Alert
                            message={t('mod.tips1')}
                            type={'info'}
                            showIcon
                            closable
                            action={
                                <Button size="small" type="link" onClick={handleDismissModTips1}>
                                    {t('mod.dismiss.button')}
                                </Button>
                            }
                        />
                    </div>
                )}

                    {updateModSize.length > 0 && <>
                        <div style={{
                            paddingBottom: 8
                        }}>
                            <Alert message={`你有 ${updateModSize.length} 个模组配置有更新`} type="warning" showIcon
                                   closable/>
                        </div>
                    </>}
                    <Space size={16} wrap>
                        <Button type="primary" onClick={() => saveModConfig()}>{t('mod.save')}</Button>
                        <Popconfirm
                            title={t('mod.tips2')}
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => updateModConfigOptions()}
                        >
                            <Button type="primary">{t('mod.update.all')}</Button>
                        </Popconfirm>
                        <Tooltip
                            title={t('mod.tips3')}>
                            <Button type="primary"
                                    onClick={() => navigate(`/mod/add/:modId`)}>{t('mod.upload.modinfo')}</Button>
                        </Tooltip>
                        <Select
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            value={selectedLevelUuid || undefined}
                            options={levels.map(level=>{
                                return {
                                    value: level.uuid,
                                    label: level.levelName || level.uuid,
                                }
                            })}
                        />
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#00B96B'
                            }}
                            onClick={()=>saveLevelMod()}
                        >保存到{selectedLevel?.levelName || selectedLevel?.uuid || ''}</Button>
                    </Space>
                    <br/><br/>
                    <Row gutter={24}>
                        <Col span={10} xs={24} md={10} lg={10}>
                            <div className={'scrollbar'} style={{
                                height: 'calc(100vh - 320px)',
                                minHeight: '400px',
                                overflowY: 'auto',
                                overflowX: 'auto'
                            }}>
                                {modList.length > 0 && <div>
                                    {modList.map((item, index) =>
                                        <ModItem
                                            key={item.modid}
                                            mod={item}
                                            changeMod={changeMod}
                                            changeEnable={changeEnable}
                                            removeMod={removeMod}
                                            modList={modList}
                                            setModList={setModList}
                                        />)}
                                </div>}
                            </div>
                            <br/>
                        </Col>
                        <Col span={14} xs={24} md={14} lg={14}>
                            {mod.modid !== undefined && <ModConfigOptions
                                mod={mod}
                                setMod={setMod}
                                setModList={setModList}
                                defaultConfigOptionsRef={defaultConfigOptionsRef}
                                modConfigOptionsRef={modConfigOptionsRef}
                            />}
                        </Col>
                    </Row>
            </Spin>
        </div>
)
}
