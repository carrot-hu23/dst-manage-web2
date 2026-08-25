import {useParams} from "react-router-dom";
import React, {useRef, useState} from 'react';
import {ProConfigProvider, ProTable} from '@ant-design/pro-components';
import {Button, ConfigProvider, Image, message, Popconfirm, Space, Tag} from 'antd';

import {useTranslation} from "react-i18next";
import i18n from "i18next";

import {deleteLogs, getPlayerLog} from '../../api/playerLogApi.jsx';
import {dstRoles, dstRolesMap} from '../../utils/dst.js';
import {addBlackListPlayerListApi} from "../../api/playerApi.jsx";
import style from "../DstServerList2/index.module.css";
import HiddenText from "../Home/HiddenText/HiddenText";
import {getAntdLocale, getProIntl} from "../../locales/antdLocale";


export default ()=> {

    const {t} = useTranslation()

    const playerActionEnum = {
        "[LeaveAnnouncement]": t('player.log.action.leave'),
        "[JoinAnnouncement]": t('player.log.action.join'),
        "[Say]": t('player.log.action.chat'),
        "[DeathAnnouncement]": t('player.log.action.death'),
        "[ResurrectAnnouncement]": t('player.log.action.resurrect'),
        "[Announcement]": t('player.log.action.system'),
    }

    const {cluster} = useParams()
    const currentLocale = getAntdLocale(i18n.resolvedLanguage);

    const actionRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            setSelectedRowKeys(selectedRowKeys)
        },
    }

    const columns = [
        {
            title: t('player.log.column.name'),
            dataIndex: 'name',
            key: 'name',
            copyable: true,
            render: (text, record) => {
                return (<div className={style.icon}>{record.name}</div>)
            }
        },
        {
            title: t('player.log.column.role'),
            dataIndex: 'role',
            key: 'role',
            ellipsis: true,
            valueEnum: dstRolesMap,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                <Image preview={false} width={36.8} src={dstRoles[record.role] || dstRoles.mod}/>
            </div>)
        },
        {
            title: t('player.log.column.kuId'),
            dataIndex: 'kuId',
            key: 'kuId',
            ellipsis: true,
            // <Text>{`${record.kuId.slice(0, 3)}***${record.kuId.slice(record.kuId.length - 2)}`}</Text>
            render: (text, record, _, action) => <HiddenText text={record.kuId}/>
        },
        {
            title: t('player.log.column.steamId'),
            dataIndex: 'steamId',
            key: 'steamId',
            // ellipsis: true,
            align: 'left',
            // <span>{`${record.steamId.slice(0, 5)}***${record.steamId.slice(record.steamId.length - 2)}  `}</span>
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                <Space size={4}>
                    <HiddenText text={record.steamId}/>
                    <a
                        target={'_blank'}
                        href={`https://steamcommunity.com/profiles/${record.steamId}`}
                        style={{
                            background: 'url(./assets/dst/icon_button_normal.png)'
                        }} rel="noreferrer">
                        <Image preview={false} width={22}
                               src={'./assets/dst/steam_btn.png'}/>
                    </a>
                </Space>
            </div>)

        },
        {
            title: t('player.log.column.date'),
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
            valueType: 'dateTime',
            search: false
        },
        {
            title: t('player.log.column.ip'),
            dataIndex: 'ip',
            key: 'ip',
            valueType: 'string',
            render: (text, record, _, action) => <HiddenText text={record.ip}/>
        },
        {
            title: t('panel.action'),
            dataIndex: 'action',
            key: 'action',
            valueEnum: playerActionEnum,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, _, action) => (<div>
                {record.action === '[JoinAnnouncement]' && <Tag color="magenta">{t('player.log.tag.join')}</Tag>}
                {record.action === '[LeaveAnnouncement]' && <Tag>{t('player.log.tag.leave')}</Tag>}
                {record.action === '[DeathAnnouncement]' && <Tag color="red">{t('player.log.tag.death')}</Tag>}
                {record.action === '[ResurrectAnnouncement]' && <Tag color="green">{t('player.log.tag.resurrect')}</Tag>}
                {record.action === '[Say]' && <Tag color="gold">{t('player.log.tag.chat')}</Tag>}
                {record.action === '[Announcement]' && <Tag color="geekblue">{t('player.log.tag.system')}</Tag>}
            </div>)
        },
        {
            title: t('player.log.column.actionDesc'),
            search: false,
            dataIndex: 'actionDesc',
            key: 'actionDesc',
            render: (text, record) => (
                <div className={style.icon} style={{wordWrap: 'break-word', wordBreak: 'break-word'}}>
                    {text}
                </div>
            ),
        },
        {
            title: t('panel.action'),
            key: 'index',
            search: false,
            render: (text, record, _, action) => (
                <div>
                    <Popconfirm
                        title={t('player.log.block.title')}
                        onConfirm={() => {
                            addBlackListPlayerListApi(cluster, [record.kuId])
                                .then(resp => {
                                    if (resp.code === 200) {
                                        message.success(t('player.log.block.ok'))
                                    }
                                })
                        }}
                        onCancel={() => {
                        }}
                        okText={t('panel.y')}
                        cancelText={t('panel.n')}
                    >
                        <Button size={'small'} type={'primary'} danger disabled={record.action === '[Announcement]'}>{t('player.log.block')}</Button>
                    </Popconfirm>
                </div>)
        },
    ];


    return (
        <>
            <ConfigProvider locale={currentLocale}>
                        <ProConfigProvider intl={getProIntl(i18n.resolvedLanguage)}>
                            <ProTable
                                scroll={{
                                    x: 500,
                                }}
                                // cardBordered
                                columns={columns}
                                actionRef={actionRef}
                                rowSelection={rowSelection}
                                request={async (params = {}, sort, filter) => {
                                    const resp = await getPlayerLog(cluster, params)
                                    setData(resp.data)
                                    return {
                                        data: resp.data.data,
                                        success: true,
                                        total: resp.data.total
                                    };
                                }}
                                rowKey="ID"
                                pagination={{
                                    current: currentPage,
                                    pageSize,
                                    total: data.total,
                                    onChange: setCurrentPage,
                                    showSizeChanger: true,
                                    onShowSizeChange: (current, size) => setPageSize(size),
                                    // pageSizeOptions: [5, 10, 20 ,50, 100]
                                }}
                                headerTitle={t('player.log.title')}
                                toolBarRender={() => [
                                    <Button type="primary" danger onClick={() => {
                                        deleteLogs("", {
                                            ids: selectedRowKeys
                                        }).then(resp => {
                                            if (resp.code === 200) {
                                                message.success(t('player.log.delete.ok'))
                                                actionRef.current?.reload();
                                            }
                                        })
                                    }}>
                                        {t('player.log.delete')}
                                    </Button>
                                ]}
                            />
                        </ProConfigProvider>
            </ConfigProvider>
        </>
    )
}
