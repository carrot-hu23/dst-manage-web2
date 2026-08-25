import {Form, Space, Typography} from 'antd';
import {useTranslation} from "react-i18next";

import style from "../index.module.css"

const {Paragraph} = Typography;

// eslint-disable-next-line react/prop-types
const HomeOverView = ({home}) => {
    const {t} = useTranslation()
    console.log("==========",home.home)
    if (home.DaysInfo === undefined || home.DaysInfo === null) {
        home.DaysInfo = {}
    }
    return (
        <>
            <div style={{
                height: 450,
                overflowY: 'auto',
            }}>
                <h3 className={style.icon}>{home.Name}</h3>
                <span>{home.Desc}</span>
                <br/>
                <br/>
                <Form>
                    <Space>
                        <div>
                            <Form.Item label={t('dstServerList.overview.directConnect')}>
                                <Paragraph style={{
                                    color: '#4096ff'
                                }} copyable>{`c_connect("${home.Address}", ${home.Port})`}</Paragraph>
                            </Form.Item>

                            <Form.Item label={t('dstServerList.overview.version')}>
                                <span>{home.Version}</span>
                            </Form.Item>

                            <Form.Item label={t('dstServerList.overview.days')}>
                                <span>{home.DaysInfo.Day}</span>
                            </Form.Item>

                            <Form.Item label={t('dstServerList.overview.season')}>
                                <span>{home.Season}{`(${home.DaysInfo.DaysElapsedInSeason + 1}/${home.DaysInfo.DaysElapsedInSeason + home.DaysInfo.DaysLeftInSeason})`}</span>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label={t('dstServerList.overview.host')}>
                                <span>{home.Host}</span>
                            </Form.Item>
                            <Form.Item label={t('dstServerList.overview.mode')}>
                                <span>{home.Intent}</span>
                            </Form.Item>
                            <Form.Item label={t('dstServerList.overview.join')}>
                                <span>{home.Allownewplayers ? <span>{t('dstServerList.overview.allowJoin')}</span> : <span>{t('dstServerList.overview.notAllowJoin')}</span>}</span>
                            </Form.Item>
                            <Form.Item label={t('dstServerList.overview.network')}>
                                <span>{home.Lanonly ? <span>{t('dstServerList.overview.lan')}</span> : <span>{t('dstServerList.overview.public')}</span>}</span>
                            </Form.Item>
                        </div>
                    </Space>
                </Form>

            </div>
        </>
    )
}
export default HomeOverView;