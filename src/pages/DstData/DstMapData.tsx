import {Alert, Button, Image, message, Space, Tag} from "antd";
import {genDstMapApi, hasWalrusHutPlainsApi} from "../../api/dstDataApi.ts";
import {useEffect, useState} from "react";
import useIsMobile from "../../hooks/UseIsMobile";

export default () => {

    const isMobile = useIsMobile();
    const [imageUrl, setImageUrl] = useState('/api/dst/map/image')

    const [hasWalrusHutPlains, setHasWalrusHutPlains] = useState(false)

    const fetchHasWalrusHutPlainsApi = ()=>{
        hasWalrusHutPlainsApi()
            .then(resp => {
                if (resp.code === 200) {
                    console.log(resp.data)
                    setHasWalrusHutPlains(resp.data)
                }
            })
    }

    useEffect(() => {
        fetchHasWalrusHutPlainsApi()
    }, [])

    const refreshImage = () => {
        // 添加时间戳作为查询参数以强制刷新
        setImageUrl(`/api/dst/map/image?t=${Date.now()}`);
    };

    return (<>
        <div>
            <Space size={24} wrap>
                <Button type={'primary'} onClick={() => {
                    genDstMapApi("Master").then(resp => {
                        if (resp.code !== 200) {
                            message.warning("生成地图预览失败")
                        } else {
                            message.success("生成成功")
                            refreshImage(); // 成功后刷新图片
                            fetchHasWalrusHutPlainsApi()
                        }
                    })
                }}>刷新</Button>
                <div>
                    {hasWalrusHutPlains && (
                        <Tag color={'blue'}>当前地图存在海象平原</Tag>
                    )}
                    {!hasWalrusHutPlains && (
                        <Tag color={'red'}>当前地图不存在海象平原</Tag>
                    )}
                </div>
            </Space>
            <br/><br/>
            <Alert type={"info"} message={'第一次生成世界时，请点击 "存档"，再点击生成, 不然生成的图片是错误的'} closable/>
        </div>
        <br/>
        <Image width={isMobile ? 300 : 502} height={isMobile ? 300 : 502} src={imageUrl}/>
    </>)
}