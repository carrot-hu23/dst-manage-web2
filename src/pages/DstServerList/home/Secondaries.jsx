import {Card} from "antd";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../hooks/useTheme";

export default ({secondaries}) => {
    const {t} = useTranslation()

    useEffect(()=>{
    },[])
    const {theme} = useTheme();

    return (
        <>
            <div className="text-base font-medium pb-2">{t('dstServerList.secondaries.layerCount', {count: Object.keys(secondaries).length})}</div>
            <div className={'scrollbar'} style={{
                height: '50vh',
                overflowY: 'auto',
            }}>
                {Object.keys(secondaries).map(key => (
                    <div key={key}>
                        <Card bordered={false} style={
                            theme !== 'dark'? {
                                backgroundColor: '#F0F2F5'
                            }:{}} >
                            <div>
                                <span>{t('dstServerList.secondaries.worldId', {id: secondaries[key].id})}</span>
                            </div>
                            <div>
                                <span>{t('dstServerList.secondaries.worldIp', {ip: `${secondaries[key].__addr}:${secondaries[key].port}`})}</span>
                            </div>
                            <div>
                                <span>{t('dstServerList.secondaries.steam', {id: secondaries[key].steamid})}</span>
                            </div>
                        </Card>
                        <br/>
                    </div>
                ))}
            </div>

        </>
    )
}