/* eslint-disable no-unused-vars */

import React, {useState} from 'react';

import {ProConfigProvider, ProTable} from '@ant-design/pro-components';
import {Button, Modal, Image, Skeleton, message, ConfigProvider} from 'antd';

import i18n from "i18next";
import {useTranslation} from "react-i18next";


import {dstHomeListApi, dstHomeDetailApi} from '../../api/dstApi.jsx';

import HomeDetail from './home/index.jsx';

import style from "./index.module.css"
import {getAntdLocale, getProIntl} from "../../locales/antdLocale";


const PlayerPercentEnum = {
    ">0": ">0",
    "<1": "<1",
}

const DstServerList = () => {
    const {t} = useTranslation()

    const currentLocale = getAntdLocale(i18n.resolvedLanguage);

    const SortWayEnum = {
        1: t('dstServerList.sort.desc'),
        2: t('dstServerList.sort.asc'),
    }

    const SortTypeEnum = {
        connected: t('dstServerList.sortType.byPlayers'),
        name: t('dstServerList.sortType.byName'),
        maxconnections: t('dstServerList.sortType.byMaxPlayers'),
        v: t('dstServerList.sortType.byVersion'),
    }

    const PasswordEnum = {
        '-1': t('dstServerList.password.any'),
        0: t('dstServerList.password.notRequired'),
        1: t('dstServerList.password.required'),
    }

    const SeasonsEnum = {
        spring: t('dstServerList.season.spring'),
        summer: t('dstServerList.season.summer'),
        autumn: t('dstServerList.season.autumn'),
        winter: t('dstServerList.season.winter'),
    }

    const GameModEnum = {
        relaxed: t('dstServerList.mode.relaxed'),
        endless: t('dstServerList.mode.endless'),
        survival: t('dstServerList.mode.survival'),
        wilderness: t('dstServerList.mode.wilderness'),
        lightsout: t('dstServerList.mode.lightsout'),
        lavaarena: t('dstServerList.mode.lavaarena'),
        quagmire: t('dstServerList.mode.quagmire'),
        OceanFishing: t('dstServerList.mode.oceanFishing'),
        starvingfloor: t('dstServerList.mode.starvingFloor')
    }

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
                message.warning(t('dstServerList.kleiTimeout'))
                setIsModalOpen(false)
            }

        })
    }

    const columns = [
        {
            title: t('dstServerList.column.name'),
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
            title: t('dstServerList.column.players'),
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
            title: t('dstServerList.column.sortWay'),
            key: 'sort_way',
            dataIndex: 'sort_way',
            valueEnum: SortWayEnum,
            hideInTable: true,
            render: null,
        },
        {
            title: t('dstServerList.column.sortType'),
            key: 'sort_type',
            dataIndex: 'sort_type',
            valueEnum: SortTypeEnum,
            hideInTable: true,
            render: null,
        },
        {
            title: t('dstServerList.column.mode'),
            key: 'mode',
            valueEnum: GameModEnum,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>{record.mode}</div>),
        },
        {
            title: t('dstServerList.column.season'),
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
            title: t('dstServerList.column.password'),
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
            title: t('dstServerList.column.mods'),
            key: 'mod',
            dataIndex: 'mods',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: {
                "": {
                    key: '1115',
                    text: t('dstServerList.mods.any'),
                    status: -1,
                },
                "0": {
                    key: '1113',
                    text: t('dstServerList.mods.no'),
                    status: 0,
                },
                "1": {
                    key: '1114',
                    text: t('dstServerList.mods.yes'),
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
            title: t('dstServerList.column.action'),
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                // eslint-disable-next-line react/jsx-key
                (<div>
                    <Button type="link" onClick={() => {
                        viewHomeDetail(record)
                    }} key={record.__rowId}>{t('dstServerList.viewDetail')}</Button>

                </div>)
            ],
        },
    ];


    return (
        <ConfigProvider locale={currentLocale}>
        <ProConfigProvider intl={getProIntl(i18n.resolvedLanguage)}>
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
                    headerTitle={t('dstServerList.title')}
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
        </ProConfigProvider>
        </ConfigProvider>
    );

};

export default DstServerList