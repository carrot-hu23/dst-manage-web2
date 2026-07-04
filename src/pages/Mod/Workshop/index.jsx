/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import {Row, Col, Card, Input, Pagination, Button, message, Empty, Spin} from 'antd';
import {StarFilled} from '@ant-design/icons';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {getModInfo, searchMod} from '../../../api/modApi.jsx';
import {format} from "../../../utils/dateUitls";
import {fShortenNumber} from "../../../utils/formatNumber";


const {Search} = Input;
const {Meta} = Card;

const extractAuthorId = (authorUrl) => {
    if (!authorUrl) return '';
    const match = authorUrl.match(/profiles\/(\d+)/);
    return match ? match[1] : '';
};

const ModCard2 = ({modinfo, addModList, subscribe}) => {

    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)

    const authorId = extractAuthorId(modinfo.author);

    return (
        <Card
            key={modinfo.id}
            hoverable
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
            cover={<div style={{padding: '12px 12px 0 12px'}}>
                <a
                    target={'_blank'}
                    href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${modinfo.id}`} rel="noreferrer">
                    <img alt="example" style={{
                        height: 160,
                        objectFit: 'cover',
                        width: '100%'
                    }} src={modinfo.img} onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160"%3E%3Crect fill="%23f0f0f0" width="160" height="160"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}/>
                </a>
            </div>}
        >
            <Meta
                title={<div style={{
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>{modinfo.name}</div>}
                style={{marginBottom: 8}}
            />

            {authorId && (
                <div style={{
                    fontSize: '12px',
                    color: '#999',
                    marginBottom: 4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {t('mod.author') || 'Author'}: {authorId}
                </div>
            )}

            {modinfo.vote && (
                <div style={{
                    fontSize: '12px',
                    color: '#999',
                    marginBottom: 4,
                }}>
                    <StarFilled style={{color: '#faad14', marginRight: 4, fontSize: '10px'}}/>
                    {modinfo.vote.star} <span style={{marginLeft: 4}}>({fShortenNumber(modinfo.vote.num)})</span>
                </div>
            )}

            <div style={{
                fontSize: '12px',
                color: '#999',
                marginBottom: 4,
            }}>
                {t('mod.subscriptions')}: {fShortenNumber(modinfo.sub)}
            </div>

            <div style={{
                fontSize: '12px',
                color: '#999',
                marginBottom: 12,
            }}>
                {format(modinfo.time * 1000)}
            </div>

            <div style={{marginTop: 'auto'}}>
                <Button
                    loading={loading}
                    type="primary"
                    size={'small'}
                    block
                    onClick={() => subscribe(modinfo.id, modinfo.name, addModList, setLoading)}
                >
                    {t('mod.subscribe')}
                </Button>
            </div>
        </Card>
    )
}

export default ({addModList}) => {

    const { t } = useTranslation()
    const { i18n } = useTranslation();
    const lang = i18n.language;

    const [modList, setModList] = useState([])
    const [pageSize, setPageSize] = useState(20)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [text, setText] = useState("")
    const [searching, setSearching] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();
    const {cluster} = useParams()

    useEffect(() => {
        updateModList("", page, pageSize)
    }, [])

    const subscribe = (modId, modName, addModList, setLoading) => {
        messageApi.open({
            type: 'loading',
            content: `${t('mod.subscribing')} ${modName}`,
            duration: 0,
        });
        setLoading(true)
        // message.info(`正在订阅 ${modName}`)
        getModInfo(lang, cluster, modId).then(data => {
            data.data.installed = true
            addModList(current => {
                const newData = []
                current.forEach(item=>{
                    if (item.modid !== data.data.modid) {
                        newData.push(item)
                    }
                })
                newData.push(data.data)
                return [... newData]
            })

            // Dismiss manually and asynchronously
            setTimeout(messageApi.destroy, 1);
            message.success(`${t('mod.subscribe.ok')} ${modName}`)
            setLoading(false)
        }).catch(error => {
            setTimeout(messageApi.destroy, 1);
            message.warning(`${t('mod.subscribe.error')} ${modName} 失败`)
            setLoading(false)
            console.log(error)
        })
    }

    const updateModList = (text, page, pageSize) => {
        setSearching(true)
        searchMod(lang, cluster, text, page, pageSize).then(data => {
            setModList(data.data.data)
            setPage(data.data.page)
            setPageSize(data.data.size)
            setTotal(data.data.total)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setSearching(false)
        })
    }

    const onSearch = (text) => {
        setText(text)
        updateModList(text, 1, pageSize)
    }

    const onShowSizeChange = (current, pageSize) => {
        setPageSize(pageSize)
        updateModList(text, current, pageSize)
    }

    const onChange = (page) => {
        updateModList(text, page, pageSize)
    }

    return (
        <>
            {contextHolder}

            <Search
                placeholder={t('mod.search.placeholder') || 'input search text'}
                allowClear
                enterButton
                // size="large"
                loading={searching}
                onSearch={onSearch}
                style={{
                    // width: '300px',
                    marginBottom: '24px',
                }}
            />

            <Spin spinning={searching}>
                {modList.length === 0 && !searching ? (
                    <Empty
                        description={t('mod.empty') || 'No mods found'}
                        style={{marginTop: '100px'}}
                    />
                ) : (
                    <>
                        <Row gutter={[16, 16]}>
                            {modList.map(modinfo => (
                                <Col key={modinfo.id} xs={24} sm={8} md={8} lg={4} xl={4}>
                                    <ModCard2 modinfo={modinfo} addModList={addModList} subscribe={subscribe}/>
                                </Col>
                            ))}
                        </Row>

                        {modList.length > 0 && (
                            <Pagination
                                onShowSizeChange={onShowSizeChange}
                                current={page}
                                pageSize={pageSize}
                                pageSizeOptions={['10', '20', '50', '100']}
                                showSizeChanger
                                showQuickJumper
                                onChange={onChange}
                                total={total}
                                style={{marginTop: '32px', marginBottom: '24px'}}
                            />
                        )}
                    </>
                )}
            </Spin>
        </>
    );
};
