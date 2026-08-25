import {useEffect, useRef, useState} from "react";
import {Alert, Button, Input, message, Skeleton, Space, Spin, Switch} from "antd";
import {useTranslation} from "react-i18next";
import {enableKeyCerApi, getKeyCerApi, importClusterApi, reflushKeyCerApi} from "../../../api/shareApi";
import HiddenText from "../../Home/HiddenText/HiddenText";


export default ()=>{
    const {t} = useTranslation()

    const [keyCer, setKeyCer] = useState({})
    const inputRef = useRef(null);

    const [spin, setSpin] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        getKeyCerApi()
            .then(resp=>{
                if (resp.code === 200) {
                    setKeyCer(resp.data)
                }
                setLoading(false)
            })
    }, [])


    return(
        <>
                    <Skeleton loading={loading} >
                        <Spin spinning={spin}>
                            <Space.Compact
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Input ref={inputRef} placeholder={t('tool.share.linkPlaceholder')}/>
                                <Button type="primary" onClick={()=>{
                                    importClusterApi(inputRef.current.input.value)
                                        .then(resp=>{
                                            if (resp.code === 200) {
                                                message.success(t('tool.share.importSuccess'))
                                            } else {
                                                message.error(t('tool.share.importError'))
                                            }
                                        })
                                }}>{t('tool.share.importArchive')}</Button>
                            </Space.Compact>

                            <br/><br/>
                            <h4>{t('tool.share.myShareLink')}</h4>
                            <Space size={8} wrap>
                                <Switch checked={keyCer.enable === "1"} checkedChildren={t('switch.open')} unCheckedChildren={t('switch.close')}
                                        onChange={(checked)=>{
                                            setSpin(true)
                                            enableKeyCerApi(checked)
                                                .then(resp=>{
                                                    if (resp.code === 200) {
                                                        setKeyCer(resp.data)
                                                    }
                                                    setSpin(false)
                                                })
                                        }}
                                />
                                <Button size={'small'} type={"primary"} onClick={()=>{
                                    setSpin(true)
                                    reflushKeyCerApi()
                                        .then(resp=>{
                                            if (resp.code === 200) {
                                                setKeyCer(resp.data)
                                            }
                                            setSpin(false)
                                        })
                                }}>{t('tool.share.refreshLink')}</Button>
                            </Space>
                            <br/><br/>
                            <HiddenText text={`http://${keyCer.ip}:${keyCer.port}/share/cluster?key=${keyCer.key}`} />
                            <br/>
                            <Alert message={t('tool.share.securityWarning')} type="warning" showIcon closeIcon/>
                        </Spin>
                    </Skeleton>
        </>
    )
}