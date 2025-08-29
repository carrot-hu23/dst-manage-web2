import {Image, Typography} from "antd";
import React from "react";

const {Title} = Typography

export default ()=>{
    return(
        <>
            <Title level={2}>感谢 莱卡云 赞助</Title>
            <a target={'_blank'}
               href={'https://www.lcayun.com/aff/OYXIWEQC'} key="list-loadmore-edit"
               rel="noreferrer">
                <div>【莱卡云】热卖套餐配置低至32元/月起，镜像内置面板，一键开服，即刻畅玩，立享优惠！</div>
                <Image preview={false} src={'./assets/莱卡云游戏面板.png'} onClick={() => {}}/>
            </a>
        </>
    )
}