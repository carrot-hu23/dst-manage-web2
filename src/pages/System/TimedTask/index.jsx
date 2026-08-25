import React, {useEffect, useState} from "react";

import {
    Alert,
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Popconfirm,
    Segmented,
    Select,
    Space,
    Table,
    Tag,
    TimePicker
} from "antd";

import {converter} from 'react-js-cron'

import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {addJobTaskApi, deleteJobTaskApi, getJobTaskListApi} from "../../../api/jobTaskApi.jsx";
import {getLevelListApi} from "../../../api/clusterLevelApi.jsx";

const {Option} = Select;
const { TextArea } = Input;

export default () => {

    const {t} = useTranslation()
    const jobTaskEnum = {
        "backup": t('setting.timedTask.category.backup'),
        "update": t('setting.timedTask.category.update'),
        "start": t('setting.timedTask.category.start'),
        "stop": t('setting.timedTask.category.stop'),
        "startGame": t('setting.timedTask.category.startGame'),
        "stopGame": t('setting.timedTask.category.stopGame'),

        "restart": t('setting.timedTask.category.restart'),
        "regenerate": t('setting.timedTask.category.regenerate'),
        "script": t('setting.timedTask.category.script'),
        "none": t('setting.timedTask.category.none')
    }

    const {cluster} = useParams()

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const dataSource = data.slice(startIndex, endIndex);

    const [isOpenAddJobTask, setIsOpenAddJobTask] = useState(false)

    function getJobTaskList() {
        getJobTaskListApi("")
            .then(resp => {
                const {data} = resp
                setData(data || [])
            })
    }
    useEffect(() => {
        getJobTaskList()
    }, [])

    const ShowAnnouncement = ({announcement}) =>{
        if (announcement === null || announcement === undefined) {
            announcement = ""
        }
        const list = announcement.split("\n")

        return(<>
            {list.map(item=>(
                <div>
                    {item}
                </div>
            ))}
        </>)
    }

    const columns = [
        {
            title: t('setting.timedTask.column.level'),
            dataIndex: 'levelName',
            key: 'levelName',
        },
        {
            title: t('setting.timedTask.column.jobId'),
            dataIndex: 'jobId',
            key: 'jobId',
        },
        {
            title: t('setting.timedTask.column.cron'),
            dataIndex: 'cron',
            key: 'cron',
        },
        {
            title: t('setting.timedTask.column.prev'),
            dataIndex: 'prev',
            key: 'prev',
            render: (text, record) => (
                <span>{new Date(record.prev).toLocaleString()}</span>
            ),
        },
        {
            title: t('setting.timedTask.column.next'),
            dataIndex: 'next',
            key: 'next',
            render: (text, record) => (
                <span>{new Date(record.next).toLocaleString()}</span>
            ),
        },
        {
            title: t('setting.timedTask.column.valid'),
            dataIndex: 'valid',
            key: 'valid',
            render: (text, record, _, action) => (
                <>
                    {record.valid && <Tag color="green">{t('setting.timedTask.valid.active')}</Tag>}
                    {!record.valid && <Tag color="purple">{t('setting.timedTask.valid.inactive')}</Tag>}
                </>
            )
        },
        {
            title: t('setting.timedTask.column.comment'),
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: t('setting.timedTask.column.announcement'),
            dataIndex: 'announcement',
            key: 'announcement',
            render: (text, record, _, action)=> <ShowAnnouncement announcement={record.announcement} />
        },
        {
            title: t('setting.timedTask.column.category'),
            dataIndex: 'category',
            key: 'category',
            render: (text, record, _, action)=> <Tag>{jobTaskEnum[record.category]}</Tag>
        },
        {
            title: t('panel.action'),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Popconfirm
                        title={t('setting.timedTask.delete.title')}
                        description={t('setting.timedTask.delete.desc')}
                        onConfirm={() => {
                            deleteJobTaskApi("", record.jobId)
                                .then(resp=>{
                                    if (resp.code !== 200) {
                                        message.error(t('setting.timedTask.delete.error'))
                                    } else {
                                        message.success(t('setting.timedTask.delete.ok'))
                                        getJobTaskList()
                                    }
                                })
                        }}
                        onCancel={() => {

                        }}
                        okText={t('panel.y')}
                        cancelText={t('panel.n')}
                    >
                        <Button type="link" danger >{t('backup.delete')}</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ]

    const AddJobTaskModal = ({isModalOpen, setIsModalOpen}) => {

        const [levels, setLevels] = useState([])
        useEffect(()=>{
            getLevelListApi()
                .then(resp => {
                    if (resp.code === 200) {
                        const levels = resp.data
                        setLevels(levels)
                    }
                })
        },[])

        const onChange = (time, timeString) => {
            console.log(time, timeString);
            const converted = converter.getCronStringFromValues(
                'day', // period: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'reboot'
                [], // months: number[] | undefined
                [],  // monthDays: number[] | undefined
                [], // weekDays: number[] | undefined
                [time.$H], // hours: number[] | undefined
                [time.$m], // minutes: number[] | undefined
                false // humanizeValue?: boolean
            )

            console.log('cron string:', converted)

        };

        const [form] = Form.useForm()
        const handleOk = () => {
            form.validateFields().then(() => {
                setIsModalOpen(false);
            }).catch(err => {
                // 验证不通过时进入
                message.error(err.errorFields[0].errors[0])
            });
            const data = form.getFieldsValue()

            if (activeTab === 'default') {
                data.cron = converter.getCronStringFromValues(
                    'day', // period: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'reboot'
                    [], // months: number[] | undefined
                    [],  // monthDays: number[] | undefined
                    [], // weekDays: number[] | undefined
                    [data.date.$H], // hours: number[] | undefined
                    [data.date.$m], // minutes: number[] | undefined
                    false // humanizeValue?: boolean
                )
            }
            console.log(data)

            // eslint-disable-next-line no-restricted-syntax
            for (const level of levels) {
                if (level.uuid === data.levelName) {
                    data.uuid = level.uuid
                    data.levelName = level.levelName
                }
            }
            addJobTaskApi("", data).then((response => {
                if (response.code === 200) {
                    getJobTaskList();
                    message.success(t('setting.timedTask.create.ok'));
                } else {
                    message.error(t('setting.timedTask.create.error') + response.msg);
                }
            })).catch(err => console.log(err))
        };
        const [activeTab, setActiveTab] = useState('default');

        const handleTabChange = (value) => {
            setActiveTab(value);
        };
        return (
            <Modal title={t('setting.timedTask.create.title')} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <Alert message={t('setting.timedTask.tips1')} type="warning" showIcon closable />
                <br/>
                <Form
                    form={form}
                    layout="horizontal"
                    labelCol={{
                        span: 6,
                    }}
                    initialValues={{
                        times: 1,
                        sleep: 5
                    }}
                >
                    <Segmented
                        block
                        value={activeTab}
                        onChange={handleTabChange}
                        options={[
                            {label: t('setting.timedTask.mode.default'), value: 'default'},
                            {label: t('setting.timedTask.mode.custom'), value: 'custom'},
                        ]}
                    />
                    <br/>
                    {activeTab === 'default' && <div>
                        <Form.Item
                            label={t('setting.timedTask.form.time')}
                            name='date'
                            rules={[{required: true, message: t('setting.timedTask.form.time.required'),},]}
                        >
                            <TimePicker onChange={onChange} format={'HH:mm'} />
                        </Form.Item>
                    </div>}
                    {activeTab === 'custom' && <div>
                        <Form.Item
                            label={t('setting.timedTask.form.cron')}
                            name='cron'
                            rules={[
                                { required: true, message: t('setting.timedTask.form.cron.required') },
                                {
                                    pattern: /^(\*|[0-5]?\d) (\*|[0-2]?\d) (\*|[1-3]?\d) (\*|[1-12]) (\*|[0-6])$/,
                                    message: t('setting.timedTask.form.cron.pattern'),
                                },
                            ]}
                        >
                            <Input placeholder={t('setting.timedTask.form.cron.placeholder')} />
                        </Form.Item>
                    </div>}
                    <Form.Item
                        label={t('setting.timedTask.column.category')}
                        name='category'
                        rules={[{required: true, message: t('setting.timedTask.form.category.required'),},]}
                    >
                        <Select>
                            <Option value="startGame">{t('setting.timedTask.category.startGame')}</Option>
                            <Option value="stopGame">{t('setting.timedTask.category.stopGame')}</Option>
                            <Option value="backup">{t('setting.timedTask.category.backup')}</Option>
                            <Option value="update">{t('setting.timedTask.category.update')}</Option>
                            <Option value="start">{t('setting.timedTask.category.start')}</Option>
                            <Option value="stop">{t('setting.timedTask.category.stop')}</Option>
                            <Option value="regenerate">{t('setting.timedTask.category.regenerate')}</Option>
                            <Option value="none">{t('setting.timedTask.category.none')}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={t('setting.timedTask.column.level')}
                        name='levelName'
                        rules={[{required: true, message: t('setting.timedTask.form.level.required'),},]}
                    >
                        <Select>
                            {levels.map((item,index)=>
                                <Option key={index} value={item.uuid}>{item.levelName}</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={t('setting.timedTask.column.comment')}
                        name='comment'
                    >
                        <Input placeholder={t('setting.timedTask.column.comment')}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t('setting.timedTask.column.announcement')}
                        name='announcement'
                    >
                        <TextArea rows={6} placeholder={t('setting.announcement.placeholder')} />
                    </Form.Item>
                    <Form.Item
                        label={t('setting.delay.label')}
                        name='sleep'
                    >
                        <InputNumber
                            addonAfter={t('setting.delay.unit')}
                            style={{width: 120,}}
                            placeholder={t('setting.delay.placeholder')} />
                    </Form.Item>
                    <Form.Item
                        label={t('setting.announcementCount.label')}
                        name='times'
                    >
                        <InputNumber
                            addonAfter={t('setting.announcementCount.unit')}
                            style={{width: 120,}}
                            placeholder={t('setting.announcementCount.label')} />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

    return (<>
                <div>
                    <Space size={16} wrap>
                        <Button type="primary" onClick={() => {setIsOpenAddJobTask(true)}}>
                            {t('setting.timedTask.button.create')}
                        </Button>
                        <a
                            target={'_blank'}
                            href={`https://cron.qqe2.com`} rel="noreferrer" >
                            {t('setting.timedTask.onlineCron')}
                        </a>
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
            <AddJobTaskModal isModalOpen={isOpenAddJobTask} setIsModalOpen={setIsOpenAddJobTask}/>
    </>)
}