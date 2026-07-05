import {Typography, Popover, Image, Spin} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {base64ToUtf8} from "../../utils/encoding.ts";
import {AdData} from "../../types";

const {Link, Paragraph} = Typography;

export const Ad = () => {
    const [adData, setAdData] = useState<AdData | null>(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div style={{textAlign: 'center', padding: '24px'}}>
                <Spin />
            </div>
        );
    }

    if (!adData) {
        return null;
    }

    const getPopoverContent = () => (
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
                了解更多 →
            </a>
        </div>
    );

    return (
        <div>
            <Popover
                content={getPopoverContent()}
                title={adData.title}
                trigger="hover"
                placement="top"
            >
                <Link>{adData.title}</Link>
            </Popover>
        </div>
    );
};