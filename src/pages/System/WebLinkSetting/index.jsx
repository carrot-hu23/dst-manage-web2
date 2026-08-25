import {Button, Form, Input, message, Modal, Popconfirm, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {addWebLinkApi, deleteWebLinkApi, getWebLinkListApi} from "../../../api/WebLinkApi.jsx";


export default () => {
    const {t} = useTranslation()
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const dataSource = data.slice(startIndex, endIndex);

    const [isOpenAddJobTask, setIsOpenAddJobTask] = useState(false)

    function getJobTaskList() {
        getWebLinkListApi("")
            .then(resp => {
                setData(resp.data || [])
            })
    }

    useEffect(() => {
        getJobTaskList()
    }, [])

    const columns = [
        {
            title: t('setting.webLinkSetting.field.title'),
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: t('setting.webLinkSetting.field.url'),
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: t('setting.webLinkSetting.field.width'),
            dataIndex: 'width',
            key: 'width',
        },
        {
            title: t('setting.webLinkSetting.field.height'),
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: t('panel.action'),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Popconfirm
                        title={t('setting.webLinkSetting.delete.title')}
                        description={t('setting.webLinkSetting.delete.desc')}
                        onConfirm={() => {
                            deleteWebLinkApi("", record.ID)
                                .then(resp => {
                                    if (resp.code !== 200) {
                                        message.error(t('setting.webLinkSetting.delete.error'))
                                    } else {
                                        message.success(t('setting.webLinkSetting.delete.ok'))
                                        getJobTaskList()
                                    }
                                })
                        }}
                        onCancel={() => {

                        }}
                        okText={t('panel.y')}
                        cancelText={t('panel.n')}
                    >
                        <Button type="link" danger>{t('backup.delete')}</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const AddWebLinkModal = ({isModalOpen, setIsModalOpen}) => {

        const [form] = Form.useForm()
        const handleOk = () => {
            form.validateFields().then(() => {
                setIsModalOpen(false);
            }).catch(err => {
                // 验证不通过时进入
                message.error(err.errorFields[0].errors[0])
            });
            const data = form.getFieldsValue()
            addWebLinkApi("", data).then((response => {
                if (response.code !== 200) {
                    message.error(t('setting.webLinkSetting.create.error'))
                }
                getJobTaskList()
                message.success(t('setting.webLinkSetting.create.ok'))
            })).catch(err => console.log(err))
        };

        return (
            <Modal title={t('setting.webLinkSetting.create.title')} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <Form
                    form={form}
                    layout="horizontal"
                    labelCol={{
                        span: 6,
                    }}
                >
                    <Form.Item
                        label={t('setting.webLinkSetting.field.title')}
                        name='title'
                        rules={[{required: true, message: t('setting.webLinkSetting.form.title.required'),},]}
                    >
                        <Input placeholder={t('setting.webLinkSetting.form.title.required')}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t('setting.webLinkSetting.field.url')}
                        name='url'
                        rules={[{required: true, message: t('setting.webLinkSetting.form.url.required'),},]}
                    >
                        <Input placeholder={t('setting.webLinkSetting.form.url.required')}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t('setting.webLinkSetting.field.width')}
                        name='width'
                        rules={[{required: true, message: t('setting.webLinkSetting.form.width.required'),},]}
                    >
                        <Input placeholder={t('setting.webLinkSetting.form.width.required')}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t('setting.webLinkSetting.field.height')}
                        name='height'
                        rules={[{required: true, message: t('setting.webLinkSetting.form.height.required'),},]}
                    >
                        <Input placeholder={t('setting.webLinkSetting.form.height.required')}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        )
    }

    return (<>
                <div>
                    <Space size={16} wrap>
                        <Button type="primary" onClick={() => {
                            setIsOpenAddJobTask(true)
                        }}>
                            {t('setting.webLinkSetting.add')}
                        </Button>
                    </Space>
                </div>
                <br/>
                <Table
                    scroll={{
                        x: 600,
                    }}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        current: currentPage,
                        pageSize,
                        total: data.length,
                        onChange: setCurrentPage,
                        showSizeChanger: true,
                        onShowSizeChange: (current, size) => setPageSize(size),
                    }}
                />
            <AddWebLinkModal isModalOpen={isOpenAddJobTask} setIsModalOpen={setIsOpenAddJobTask}/>
    </>)
}