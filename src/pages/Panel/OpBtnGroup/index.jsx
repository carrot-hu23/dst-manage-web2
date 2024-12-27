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

    const updateGameOnclick = () => {
        message.success(t('panel.updating.game'))
        setUpdateStatus(true)
        updateGameApi(cluster)
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
                    message.success("更新模组成功，请重启房间")
                } else {
                    message.warning("更新模组失败")
                }
                setOpen(false)
            })
    }

    return <>
        <Row gutter={[16,16]}>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <Button
                    block
                    type="primary"
                        style={{
                            backgroundColor: 'rgb(82, 196, 26)'
                        }}
                        onClick={() => {
                            updateGameOnclick()
                        }}
                        loading={updateGameStatus}
                >
                    {t('panel.updateGame')}
                </Button>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <CreateBackUpBtn block={true} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <ArchiveList block={true} />
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                <DstMapReviewer block={true} />
            </Col>
        </Row>
    </>
}