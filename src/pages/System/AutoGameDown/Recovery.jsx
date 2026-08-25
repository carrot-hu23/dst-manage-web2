import {Button, Form, Input, InputNumber, message, Modal, Spin, Switch} from "antd";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {saveAutoCheck2Api} from "../../../api/autoCheckApi.jsx";
import DstEmoji from "../../DstServerList/DstEmoji/index.jsx";
import style from "../../DstServerList/index.module.css";


const {TextArea} = Input;

export default ({isGameUpdate, isMod, autoCheck}) => {
    const {t} = useTranslation()
    const {cluster} = useParams()
    const [form] = Form.useForm()
    const [spin, setSpin] = useState(false)
    const [open,setOpen] = useState(false)

    useEffect(() => {
        form.setFieldsValue(autoCheck)
    }, [autoCheck])

    function saveAutoCheck() {
        setSpin(true)
        const data = form.getFieldValue()
        saveAutoCheck2Api(cluster, data)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success(t('backup.save.ok'))
                    form.setFieldsValue(resp.data)
                } else {
                    message.error(t('backup.save.error'))
                    message.warning(resp.msg)
                }
                setSpin(false)
            })
    }

    return (<>

        <Spin spinning={spin}>
            <Modal  title={t('setting.autoGameDown.emoji.title')} open={open}  onCancel={()=>setOpen(false)} footer={null} >
                <DstEmoji />
            </Modal>

            <Form
                form={form}
                labelCol={{
                    span: 2,
                }}
                // wrapperCol={{
                //     span: 16,
                // }}
                initialValues={{
                    interval: 20,
                    announcement: ""
                }}
            >
                {!isGameUpdate && <>
                    <Form.Item
                        label={t('setting.autoGameDown.levelName')}
                    >
                        {autoCheck.levelName}
                    </Form.Item>
                    <Form.Item
                        tooltip={t('setting.autoGameDown.uuid.tooltip')}
                        label={t('setting.autoGameDown.uuid')}
                    >
                        {autoCheck.uuid}
                    </Form.Item>
                </>}

                <Form.Item
                    label={t('setting.autoGameDown.enable')}
                    name='enable'
                    valuePropName="checked"
                >
                    <Switch checkedChildren={t('switch.open')}
                            unCheckedChildren={t('switch.close')}/>
                </Form.Item>
                {isMod && <>
                    <Form.Item
                        label={t('setting.timedTask.column.announcement')}
                        name='announcement'
                    >
                        <TextArea className={style.icon} rows={4} placeholder={t('setting.announcement.placeholder')}/>
                    </Form.Item>
                    <Form.Item label="-">
                        <Button type={'link'} onClick={()=>setOpen(true)} >{t('setting.autoGameDown.viewEmoji')}</Button>
                    </Form.Item>
                    <Form.Item
                        label={t('setting.delay.label')}
                        name='sleep'
                    >
                        <InputNumber
                            addonAfter={t('setting.delay.unit')}
                            style={{width: 120,}}
                            min={1}
                            placeholder={t('setting.delay.placeholder')}/>
                    </Form.Item>
                    <Form.Item
                        label={t('setting.announcementCount.label')}
                        name='times'
                    >
                        <InputNumber
                            addonAfter={t('setting.announcementCount.unit')}
                            style={{width: 120,}}
                            min={1}
                            placeholder={t('setting.announcementCount.label')}/>
                    </Form.Item>
                </>}
                <Form.Item
                    label={t('setting.detectionInterval.label')}
                    name='interval'
                >
                    <InputNumber
                        addonAfter={t('backup.snapshotBackup.interval.minute')}
                        style={{width: 120,}}
                        min={1}
                        placeholder={t('setting.detectionInterval.placeholder')}/>
                </Form.Item>
                <Form.Item
                    label={t('panel.action')}
                >
                    <Button type={'primary'}
                            onClick={() => saveAutoCheck()}
                    >{t('backup.save')}</Button>
                </Form.Item>
            </Form>
        </Spin>

    </>)
}