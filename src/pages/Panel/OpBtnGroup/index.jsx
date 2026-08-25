import {Alert, Button, Col, Drawer, message, Popconfirm, Row, Space} from "antd";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {updateGameApi} from "../../../api/gameApi.jsx";
import {deleteStepupWorkshopApi} from "../../../api/modApi.jsx";
import CreateBackUpBtn from "./CreateBackUpBtn.jsx";
import ArchiveList from "./ArchiveList";
import DstMapReviewer from "./DstMapReviewer.jsx";

export default () => {

    const [updateGameStatus, setUpdateStatus] = useState(false)
    const {cluster} = useParams()
    const [open, setOpen] = useState(false);
    const {t} = useTranslation()

    const updateGameOnclick = (isDelete = false) => {
        message.success(t('panel.updating.game'))
        setUpdateStatus(true)
        updateGameApi(cluster, isDelete)
            .then(response => {
                if (response.code === 200) {
                    message.success(t('panel.update.success'))
                } else {
                    message.warning(`${response.msg}`)
                    message.warning(t('panel.update.error'))
                }

                setUpdateStatus(false)
            })
            .catch(error => {
                console.log(error)
                setUpdateStatus(false)
            })
    }

    function deleteStepupWorkshop() {
        deleteStepupWorkshopApi()
            .then(data => {
                if (data.code === 200) {
                    message.success(t('panel.updateWorkshopMod.success'))
                } else {
                    message.warning(t('mod.update.error'))
                }
                setOpen(false)
            })
    }

    const btnStyle = {height: 'auto', minHeight: 32, whiteSpace: 'normal', lineHeight: 1.4, padding: '4px 12px'}

    return <>
        <Row gutter={[16,16]}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <Popconfirm
                    title={t('panel.updateGame.confirm.title')}
                    description={t('panel.updateGame.confirm.desc')}
                    okText={t('panel.updateGame.deleteAndUpdate')}
                    cancelText={t('panel.updateGame.updateOnly')}
                    okButtonProps={{danger: true}}
                    onConfirm={() => updateGameOnclick(true)}
                    onCancel={() => updateGameOnclick(false)}
                >
                    <Button
                        block
                        type="primary"
                        loading={updateGameStatus}
                        style={btnStyle}
                    >
                        {t('panel.updateGame')}
                    </Button>
                </Popconfirm>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <CreateBackUpBtn block={true} style={btnStyle} />
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <ArchiveList block={true} style={btnStyle} />
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <DstMapReviewer block={true} style={btnStyle} />
            </Col>
        </Row>
    </>
}