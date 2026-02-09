import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Skeleton, Tabs} from 'antd';
import {useLevelsStore} from "../../store/useLevelsStore.tsx";
import {getLevelStatusApi} from "../../api/level.jsx";
import GameOperator from "./GameOperator/index.jsx";
import RemoteControl from "./RemoteControl/index.jsx";
import TooManyItemsPlus from "../TooManyItemsPlus/index";
import OtherIOrder from "../TooManyItemsPlus/OtherIOrder";
import {useParams} from "react-router-dom";
import RenderCustomCommands from "../CustomCommands/RenderCustomCommands.tsx";
import CustomCommands from "../CustomCommands/index.tsx";

const Panel = () => {

    const { t } = useTranslation()
    const { cluster, name } = useParams()
    const setLevels = useLevelsStore((state) => state.setLevels)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        getLevelStatusApi()
            .then(resp => {
                if (resp.code === 200) {
                    const levels = resp.data
                    const items = []
                    levels.forEach(level=>{
                        const item = {
                            key: level.uuid,
                            uuid: level.uuid,
                            levelName: level.levelName,
                            location: '未知',
                            ps: level.ps,
                            Ps: level.Ps,
                            status: level.status,
                            modoverrides: level.modoverrides
                        }
                        items.push(item)
                    })
                    setLevels(items)
                }
                setLoading(false)
            })
    }, [cluster, name])

    const items = [
        {
            key: '1',
            label: t('panel.panel'),
            children: <GameOperator/>
        },
        {
            key: '2',
            label: t('panel.remote'),
            children: <RemoteControl/>,
        },
        {
            key: '3',
            label: 'TooManyItemsPlus',
            children: <TooManyItemsPlus />,
        },
        {
            key: '5',
            label: '自定义指令',
            children: <RenderCustomCommands />,
        },
        {
            key: '6',
            label: '自定义指令-编辑',
            children: <CustomCommands />,
        },
    ];

    return (
        <>
            <Skeleton loading={loading} >
                <Tabs items={items}/>
            </Skeleton>
        </>
    )
};

export default Panel