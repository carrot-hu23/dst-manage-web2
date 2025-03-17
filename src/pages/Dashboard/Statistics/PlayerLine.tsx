import React, {useEffect, useState} from 'react';
import {Button, Image, InputNumber, Space, Tag, Timeline, TimelineItemProps} from 'antd';
import {dstRoles} from "../../../types/dst.ts";
import {useParams} from "react-router-dom";

// @ts-ignore
import {http} from "../../../utils/http";
import {ProCard} from "@ant-design/pro-components";

// @ts-ignore
async function getPlayerLog(cluster: string, paramsData: Record<string, any>) {
    const params = {
        page: paramsData.current,
        size: paramsData.pageSize,
        name: paramsData.name,
        role: paramsData.role,
        kuId: paramsData.kuId,
        steamId: paramsData.steamId,
        action: paramsData.action,
    };

    const filteredParams = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(params).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );

    const queryString = Object.keys(filteredParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filteredParams[key])}`)
        .join('&');

    const url = `/api/player/log?${queryString}`;
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

const playerActionEnum: Record<string, string> = {
    "[LeaveAnnouncement]": '离开房间',
    "[JoinAnnouncement]": '加入房间',
    "[Say]": '聊天',
    "[DeathAnnouncement]": '死亡',
    "[ResurrectAnnouncement]": '复活',
}

const PlayerLine: React.FC = () => {

    const {cluster} = useParams()
    const [playerLogs, setPlayerLogs] = useState<Record<string, any>>([])
    const [amount, setAmount] = useState<number>(10);

    const fetch = async () => {
        const resp = await getPlayerLog(cluster || '', {current: 0, pageSize: amount,})
        const playerLogs = resp.data?.data as []
        playerLogs.reverse()
        setPlayerLogs(playerLogs)
    }

    useEffect(() => {
        fetch()
    }, [])

    function getItems(): TimelineItemProps[] {
        // @ts-ignore
        return playerLogs.map(log => {
            return {
                children: <>
                    <Space size={4} wrap>
                        <Image width={48} src={dstRoles[`${log.role}`]}/>
                        <span>[{log?.name}]</span>
                        {'[LeaveAnnouncement]' === log.action &&
                            <Tag color={'red'}>{playerActionEnum[`${log.action}`]}</Tag>}
                        {'[JoinAnnouncement]' === log.action &&
                            <Tag color={'green'}>{playerActionEnum[`${log.action}`]}</Tag>}
                        {'[Say]' === log.action && <Tag color={'orange'}>{playerActionEnum[`${log.action}`]}</Tag>}
                        {'[DeathAnnouncement]' === log.action &&
                            <Tag color={'red'}>{playerActionEnum[`${log.action}`]}</Tag>}
                        {'[ResurrectAnnouncement]' === log.action &&
                            <Tag color={'pink'}>{playerActionEnum[`${log.action}`]}</Tag>}
                        {log?.actionDesc}
                    </Space>
                </>,
                color: '[LeaveAnnouncement]' === log.action ? 'red' : 'green',
                label: <>{new Date(log.CreatedAt).toLocaleString()}</>,
            } as TimelineItemProps
        })
    }

    return (
        <>
            <ProCard title={'玩家时间线'}>
                <Space size={8} wrap>
                    <InputNumber
                        style={{width: 120}}
                        min={1}
                        max={100}
                        defaultValue={10}
                        onChange={value => setAmount(value || 1)}
                        addonAfter="数量"
                    />
                    <Button type={'primary'} onClick={() => fetch()}>查询</Button>
                </Space>
                <br/><br/>
                <Timeline
                    mode="alternate"
                    items={getItems()}
                />
            </ProCard>
        </>
    )
};

export default PlayerLine;