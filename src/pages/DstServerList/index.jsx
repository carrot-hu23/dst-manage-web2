/* eslint-disable no-unused-vars */

import React, {useState} from 'react';

import {ProTable} from '@ant-design/pro-components';
import {Button, Modal, Image, Skeleton, message, ConfigProvider} from 'antd';

import i18n from "i18next";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";


import {dstHomeListApi, dstHomeDetailApi} from '../../api/dstApi.jsx';

import HomeDetail from './home/index.jsx';

import style from "./index.module.css"


const SortWayEnum = {

    1: "降序",
    2: "升序",
}

const SortTypeEnum = {
    connected: "按照人数",
    name: "服务器名称",
    maxconnections: "人数上限",
    v: "游戏版本",
}

const PasswordEnum = {
    '-1': "任意",
    0: "不需要",
    1: "需要",
}

const WordEnum = {
    '-1': "任意",
    1: "单层",
    2: "双层",
    3: "多层",
}

const PlayerPercentEnum = {
    ">0": ">0",
    "<1": "<1",
}

const SeasonsEnum = {
    spring: "春天",
    summer: "夏天",
    autumn: "秋天",
    winter: "冬天",
}

const GameModEnum = {
    relaxed: "轻松",
    endless: "无尽",
    survival: "标准",
    wilderness: "荒野",
    lightsout: "永夜",
    lavaarena: "熔炉",
    quagmire: "暴食",
    OceanFishing: "海钓",
    starvingfloor: "闯关"
}

const DstServerList = () => {

    const currentLocale = i18n.language.startsWith('zh') ? zhCN : enUS;

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const [isModalOpen, setIsModalOpen] = useState(false);

    // 对话框的loading
    const [loading, setLoading] = useState(true);

    // 房间信息
    const [homeInfo, setHomeInfo] = useState({});

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setLoading(true)
    };

    const viewHomeDetail = (record) => {
        console.log(record.__rowId)
        console.log(record.region)

        setIsModalOpen(true);

        dstHomeDetailApi({
            rowId: record.__rowId,
            region: record.region
        }).then(response => {
            setLoading(false)
            const responseData = JSON.parse(response)
            const {success} = responseData
            if (success) {
                setHomeInfo(responseData)
            } else {
                message.warning("请求Klei服务器超时")
                setIsModalOpen(false)
            }

        })
    }

    const columns = [
        {
            title: '房间名',
            dataIndex: 'name',
            key: 'name',
            copyable: true,
            // ellipsis: true,
            width: 300,
            render: (text, record) => {
                return (<div className={style.icon}>{record.name}</div>)
            }
        },
        {
            title: '当前人数',
            key: 'maxconnections',
            valueEnum: PlayerPercentEnum,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (
                <div>{record.connected}/{record.maxconnections}
                    <Image
                        preview={false}
                        width={20}
                        src="./assets/dst/players.png"
                    />

                </div>
            ),
            sorter: (a, b) => b.connected - a.connected,
            align: 'right '
        },
        {
            title: '排序',
            key: 'sort_way',
            dataIndex: 'sort_way',
            valueEnum: SortWayEnum,
            hideInTable: true,
            render: null,
        },
        {
            title: '排序方式',
            key: 'sort_type',
            dataIndex: 'sort_type',
            valueEnum: SortTypeEnum,
            hideInTable: true,
            render: null,
        },
        {
            title: '游戏模式',
            key: 'mode',
            valueEnum: GameModEnum,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>{record.mode}</div>),
        },
        {
            title: '季节',
            key: 'season',
            dataIndex: 'season',
            valueEnum: SeasonsEnum,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                {record.season === 'spring' && (
                    // <div>春季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="./assets/dst/spring.png"
                    />
                )}
                {record.season === 'summer' && (
                    // <div>夏季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="./assets/dst/summer.png"
                    />
                )}
                {record.season === 'autumn' && (
                    // <div>秋季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="./assets/dst/autumn.png"
                    />
                )}
                {record.season === 'winter' && (
                    // <div>冬季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="./assets/dst/winter.png"
                    />
                )}

            </div>),
        },
        {
            disable: true,
            title: '密码',
            key: 'password',
            dataIndex: 'password',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueEnum: PasswordEnum,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                {record.password === 1 && (
                    <Image
                        preview={false}
                        width={28}
                        src="./assets/dst/password.png"
                    />

                    // <LockOutlined />
                )}
            </div>),
        },
        {
            disable: true,
            title: '模组',
            key: 'mod',
            dataIndex: 'mods',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: {
                "": {
                    key: '1115',
                    text: '任意',
                    status: -1,
                },
                "0": {
                    key: '1113',
                    text: '无模组',
                    status: 0,
                },
                "1": {
                    key: '1114',
                    text: '有模组',
                    status: 1,
                },

            },
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                {record.mods === 1 && (
                    <Image
                        preview={false}
                        width={28}
                        src="./assets/dst/mods.png"
                    />

                    // <LockOutlined />
                )}
            </div>),
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                // eslint-disable-next-line react/jsx-key
                (<div>
                    <Button type="link" onClick={() => {
                        viewHomeDetail(record)
                    }} key={record.__rowId}>查看详情</Button>

                </div>)
            ],
        },
    ];


    return (
        <ConfigProvider locale={currentLocale}>
            <>
                <Modal
                    getContainer={false}
                    open={isModalOpen}
                    footer={null}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={800}
                >
                    <Skeleton title loading={loading} active>
                        <div
                            style={{height: 600}}>
                            <HomeDetail home={homeInfo}/>
                        </div>
                    </Skeleton>
                </Modal>

                <ProTable
                    columns={columns}
                    // cardBordered
                    request={async (params = {}, sort, filter) => {
                        console.log(sort, filter);
                        console.log('params', params)
                        const msg = await dstHomeListApi(params)
                        return {
                            data: msg.data,
                            success: true,
                            total: msg.total
                        };
                    }}
                    scroll={{
                        x: 600,
                    }}
                    rowKey="__rowId"
                    pagination={{
                        pageSize: 10,
                        onChange: (page) => console.log(page),
                    }}
                    headerTitle="饥荒服务器列表"
                    // toolBarRender={() => [
                    //     <Button key="button" type="primary" disabled={!hasSelected > 0}>
                    //         导出配置
                    //     </Button>,
                    // ]}
                    rowSelection={{
                        type: 'radio',
                        ...rowSelection
                    }}
                    tableAlertRender={({selectedRowKeys, selectedRows, onCleanSelected}) => false}
                />
            </>
        </ConfigProvider>
    );

};

export default DstServerList