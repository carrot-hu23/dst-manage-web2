import {Alert, Button, Image, message, Space, Tag} from "antd";
import {genDstMapApi, hasWalrusHutPlainsApi} from "../../api/dstDataApi.ts";
import {useEffect, useState} from "react";
import useIsMobile from "../../hooks/UseIsMobile";
import {useParams} from "react-router-dom";

export default () => {

    const {cluster} = useParams();
    const isMobile = useIsMobile();
    const [imageUrl, setImageUrl] = useState(null);
    const [hasWalrusHutPlains, setHasWalrusHutPlains] = useState(false);
    const [loading, setLoading] = useState(false);

    // 获取图片的通用方法
    const fetchImage = async (url: string) => {
        try {
            setLoading(true);
            const response = await fetch(url, {
                headers: {
                    'Cluster': cluster || '',
                }
            });

            if (!response.ok) throw new Error('图片加载失败');
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } finally {
            setLoading(false);
        }
    };

    // 初始化加载图片
    useEffect(() => {
        const loadImage = async () => {
            const url = await fetchImage('/api/dst/map/image');
            // @ts-ignore
            setImageUrl(url);
        };
        loadImage();

        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl);
        };
    }, []);

    // 海象平原状态获取
    const fetchHasWalrusHutPlains = () => {
        hasWalrusHutPlainsApi()
            .then(resp => {
                if (resp.code === 200) {
                    setHasWalrusHutPlains(resp.data);
                }
            });
    };

    // 刷新图片
    const refreshImage = async () => {
        if (imageUrl) URL.revokeObjectURL(imageUrl); // 释放旧 URL

        const newUrl = await fetchImage(`/api/dst/map/image?t=${Date.now()}`);
        // @ts-ignore
        setImageUrl(newUrl);
    };

    // 生成地图处理
    const handleGenerateMap = () => {
        genDstMapApi("Master")
            .then(resp => {
                if (resp.code !== 200) {
                    message.warning("生成地图预览失败");
                } else {
                    message.success("生成成功");
                    refreshImage();
                    fetchHasWalrusHutPlains();
                }
            });
    };

    return (
        <>
            <div>
                <Space size={24} wrap>
                    <Button
                        type="primary"
                        onClick={handleGenerateMap}
                        loading={loading}
                    >
                        刷新
                    </Button>

                    <div>
                        {hasWalrusHutPlains ? (
                            <Tag color="blue">当前地图存在海象平原</Tag>
                        ) : (
                            <Tag color="red">当前地图不存在海象平原</Tag>
                        )}
                    </div>
                </Space>

                <br/><br/>
                <Alert
                    type="info"
                    message='第一次生成世界时，请点击 "存档"，再点击生成, 不然生成的图片是错误的'
                    closable
                />
            </div>

            <br/>

            {imageUrl ? (
                <Image
                    width={isMobile ? 300 : 502}
                    height={isMobile ? 300 : 502}
                    src={imageUrl}
                    alt="地图预览"
                />
            ) : (
                <div style={{
                    width: isMobile ? 300 : 502,
                    height: isMobile ? 300 : 502,
                    background: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {loading ? '加载中...' : '暂无地图预览'}
                </div>
            )}
        </>
    );
}