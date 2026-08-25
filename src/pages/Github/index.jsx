import {Image, Space, Typography} from "antd";
import aliPayImage from './alipay.jpg';
import wechatpayImage from './wechatpay.png';
import qqgroup from './qqgroup.png'
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {base64ToUtf8} from "../../utils/encoding";
import axios from "axios";

const {Link, Paragraph} = Typography;

export default () => {
    const {t} = useTranslation()

    const [adData, setAdData] = useState({
        title: '',
        description: '',
        image: '',
        link: ''
    });

    useEffect(() => {
        axios.get('/api/dst-static/ad/ad.json')
            .then(response => {
                return JSON.parse(base64ToUtf8(response.data))
            })
            .then(data => {
                setAdData(data)
            })
            .catch(error => {
                console.error('无法加载配置文件', error);
            }).finally(() => {
            setLoading(false)
        })
    }, []);

    return (
        <div>
            <h1>{t('github.pageTitle')}</h1>
            <strong>{t('github.noCommercialUse')}</strong>
            <br/>
            <div>
                {t('github.licenseLabel')}
                <a
                    target={'_blank'}
                    href={'https://github.com/hujinbo23/dst-admin-go/blob/main/LICENSE'}
                    rel="noreferrer"
                >
                    GPL-3.0 license
                </a>
            </div>
            <div>
                {t('github.addressLabel')}
                <a
                    target={'_blank'}
                    href={"https://github.com/hujinbo23/dst-admin-go"}
                    rel="noreferrer"
                >
                    {"https://github.com/hujinbo23/dst-admin-go"}
                </a>
            </div>
            <br/>
            <div>
                <h2>{t('github.sponsorAd')}</h2>
                {adData && (
                    <div>
                        <div style={{maxWidth: 300}}>
                            <Image
                                src={adData.image}
                                alt={adData.title}
                                preview={false}
                                style={{marginBottom: 8}}
                            />
                            <Paragraph style={{margin: 0}}>{adData.description}</Paragraph>
                            <a
                                href={adData.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {t('github.learnMore')}
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <br/>
            <div>
                <h3>{t('github.buyCoffee')}</h3>
                <Space size={32} wrap>
                    <Image style={{borderRadius: '4px'}} width={160} src={aliPayImage}/>
                    <Image style={{borderRadius: '4px'}} width={160} src={wechatpayImage}/>
                </Space>
            </div>

            <div>
                <h3>{t('github.qqGroupFeedback')}</h3>
                <Image style={{borderRadius: '4px'}} width={160} src={qqgroup}/>
            </div>
        </div>
    )
}
