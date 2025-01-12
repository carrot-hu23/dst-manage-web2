import {useState} from "react";
import {Badge, Button, message, Modal, Popconfirm, Space, Spin, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

import {timestampToString} from "../../../utils/dateUitls";
import {updateModApi} from "../../../api/modApi.jsx";

import OptionSelect from "./OptionsSelect/index.jsx";

const { Paragraph } = Typography;

const ModInfo = ({mod}) => {
    const {t} = useTranslation()
    return (
        <>
            <Space size={16} wrap>
                <img alt="example" src={mod?.img}/>
                <div>
                    <span style={{
                        fontSize: '16px',
                        fontWeight: 500
                    }}>
                        {mod?.name.slice(0, 20)}
                    </span>
                    <br/>
                    <span>{t('mod.modid')}:{mod?.modid}</span>
                    <br/>
                    <span>{t('mod.author')}: {mod?.mod_config?.author !== undefined ? mod?.mod_config?.author.slice(0, 20) : ""}</span>
                </div>
                <div>
                    <span>{t('mod.version')}: {mod?.mod_config?.version}</span>
                    <div>{t('mod.lasttime')}: {timestampToString(mod.last_time * 1000)}</div>
                    <span>{mod?.mod_config?.dont_starve_compatible === true && <span>饥荒联机版兼容</span>}</span>
                    <span>{mod?.mod_config?.dont_starve_compatible === false && <span>-</span>}</span>
                </div>
            </Space>
            <br/><br/>
            <div>
                <span>
                    {mod?.mod_config?.description}
                </span>
            </div>
        </>
    )
}


export default ({mod, setModList, defaultConfigOptionsRef, modConfigOptionsRef}) => {

    const {cluster} = useParams()
    const {t} = useTranslation()

    const [open, setOpen] = useState(false);
    const [spinning, setSpinning] = useState(false)

    function updateMod() {
        setSpinning(true)
        updateModApi(cluster, mod.modid)
            .then(resp => {
                if (resp.code === 200) {
                    const newMod = resp.data
                    newMod.installed = true
                    setModList(current => {
                        let index = 0;
                        // eslint-disable-next-line no-plusplus
                        for (let i = 0; i < current.length; i++) {
                            if (current[i].modid === newMod.modid) {
                                index = i
                                if (current.enable) {
                                    newMod.enable = true
                                }
                            }
                        }
                        current[index] = newMod
                        return [...current]
                    })
                    setSpinning(false)
                    message.success(t('mod.update.ok'))
                }
            })
    }

    return (
        <>
            <Spin spinning={spinning}>
                {!mod.installed && <>
                    <span>{t('mod.none')}</span>
                </>
                }

                {(mod.installed && mod.modid === null || mod.modid === undefined) ? (
                    <span>{t('mod.choose.please')}</span>
                ) : (
                    <>
                        <div
                            style={{
                                height: '56vh',
                                overflowY: 'auto',
                                overflowX: 'auto',
                            }}
                        >
                            <ModInfo mod={mod}/>
                        </div>

                        <Space size={16}>
                            <Button type="primary" onClick={() => setOpen(true)}>
                                {t('mod.options')}
                            </Button>
                            <Popconfirm
                                title={t('mod.update.title')}
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => updateMod()}
                            >
                                {mod.update && <Badge dot>
                                    <Button style={{
                                        backgroundColor: "#149b6e"
                                    }} type="primary">
                                        {t('mod.update')}
                                    </Button>
                                </Badge>}
                                {!mod.update && <Button type="primary">
                                    {t('mod.update')}
                                </Button>}
                            </Popconfirm>
                            <Button>
                                <a
                                    target={'_blank'}
                                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.modid}`}
                                    rel="noreferrer"
                                >
                                    {t('mod.workshop')}
                                </a>
                            </Button>
                        </Space>
                    </>
                )}

                <Modal
                    getContainer={document.body}
                    title={`${mod?.name}`}
                    // centered
                    open={open}
                    onOk={() => {
                        setOpen(false);
                    }}
                    onCancel={() => setOpen(false)}
                    width={640}
                    destroyOnClose
                    footer={null}
                >
                    <div className={'scrollbar'} style={{
                        height: '60vh',
                        overflowY: 'auto',
                        overflowX: 'auto'
                    }}>
                        {mod?.mod_config?.configuration_options !== undefined && (
                            <OptionSelect
                                mod={mod}
                                defaultConfigOptionsRef={defaultConfigOptionsRef}
                                modConfigOptionsRef={modConfigOptionsRef}
                            />
                        )}
                        {mod?.mod_config?.configuration_options === undefined && mod?.mod_config?.author === undefined &&<>
                            <Paragraph>
                               网络问题!!! 下模组失败
                            </Paragraph>
                            <Paragraph>
                               点击 更新 按钮重新下载
                            </Paragraph>
                            <Paragraph>
                               如果多次更新依旧没有配置，请先加此mod加入到你的模组配置文件里面,然后在启动房间，等待房间mod下载完成后，在点击 更新 按钮就会有配置选项
                            </Paragraph>
                        </>}
                        {mod?.mod_config?.configuration_options === undefined && mod?.mod_config?.author !== undefined &&<>
                            <br/>
                            <br/>
                            <span>{t('mod.tips4')}</span>
                        </>}
                    </div>
                </Modal>

            </Spin>
        </>

    )
}