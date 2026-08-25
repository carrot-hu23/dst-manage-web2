import {Form, Space, Typography} from 'antd';
import {useTranslation} from "react-i18next";

import style from "../index.module.css"

const {Paragraph} = Typography;

// eslint-disable-next-line react/prop-types
const HomeOverView = ({home}) => {
    const {t} = useTranslation()
    return (
    <>
        <div style={{
            height: '50vh',
            overflowY: 'auto',
        }}>
            <h3 className={style.icon}>{home.name}</h3>
            <span>{home.desc}</span>
            <br/>
            <br/>
            <Form>
                <Space>
                    <div>
                        <Form.Item label={t('dstServerList.overview.directConnect')}>
                            <Paragraph style={{
                                color: '#4096ff'
                            }} copyable>{`c_connect("${home.__addr}", ${home.port})`}</Paragraph>
                        </Form.Item>

                        <Form.Item label={t('dstServerList.overview.version')}>
                            <span>{home.v}</span>
                        </Form.Item>

                        <Form.Item label={t('dstServerList.overview.days')}>
                            <span>{home?.data?.day}</span>
                        </Form.Item>

                        <Form.Item label={t('dstServerList.overview.season')}>
                            <span>{home.season}{`(${home?.data?.dayselapsedinseason + 1}/${home?.data?.dayselapsedinseason + home?.data?.daysleftinseason})`}</span>
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label={t('dstServerList.overview.host')}>
                            <span>{home.host}</span>
                        </Form.Item>
                        <Form.Item label={t('dstServerList.overview.mode')}>
                            <span>{home.intent}</span>
                        </Form.Item>
                        <Form.Item label={t('dstServerList.overview.join')}>
                            <span>{home.allownewplayers ? <span>{t('dstServerList.overview.allowJoin')}</span> : <span>{t('dstServerList.overview.notAllowJoin')}</span>}</span>
                        </Form.Item>
                        <Form.Item label={t('dstServerList.overview.network')}>
                            <span>{home.lanonly ? <span>{t('dstServerList.overview.lan')}</span> : <span>{t('dstServerList.overview.public')}</span>}</span>
                        </Form.Item>
                    </div>
                </Space>
            </Form>

        </div>
    </>
    )
}
export default HomeOverView;