import {Button, Col, Row, Tag, Typography} from "antd";

const {Title, Link} = Typography;

import {ProCard, ProDescriptions} from "@ant-design/pro-components";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
// @ts-ignore
import {dstSeason, dstSegs, getTimeStatus} from "../../utils/dst";

export interface ClusterData {
    name: string;
    clusterName: string;
    status: boolean;
    ip: string;
    clusterType: string;
    gameArchive?: Record<string, any>; // gameArchive 可能存在也可能为空对象
}

const clusterList: ClusterData[] = [
    {
        name: '房间这是一个很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的房间名',
        clusterName: '房间1',
        status: true,
        ip: '',
        clusterType: '',
        gameArchive: {
            "clusterName": "默认初始的世界-正式服",
            "clusterDescription": "正式服",
            "clusterPassword": "",
            "gameMod": "survival",
            "maxPlayers": 8,
            "mods": 1,
            "ipConnect": "c_connect(\"139.159.184.218\",10999)",
            "port": 10999,
            "ip": "139.159.184.218",
            "meta": {
                "Clock": {
                    "TotalTimeInPhase": 240,
                    "Cycles": 3,
                    "Phase": "day",
                    "RemainingTimeInPhase": 185.82809448242,
                    "MooomPhaseCycle": 4,
                    "Segs": {
                        "Night": 2,
                        "Day": 8,
                        "Dusk": 6
                    }
                },
                "Seasons": {
                    "Premode": false,
                    "Season": "autumn",
                    "ElapsedDaysInSeason": 3,
                    "IsRandom": {
                        "Summer": false,
                        "Autumn": false,
                        "Spring": false,
                        "Winter": false
                    },
                    "Lengths": {
                        "Summer": 15,
                        "Autumn": 20,
                        "Spring": 20,
                        "Winter": 15
                    },
                    "RemainingDaysInSeason": 17,
                    "Mode": "cycle",
                    "TotalDaysInSeason": 40,
                    "Segs": {}
                }
            },
            "version": 658642,
            "lastVersion": 658642
        },
    },
    {
        name: '房间2',
        clusterName: '房间2',
        status: true,
        ip: '',
        clusterType: '',
        gameArchive: {}
    },
    {
        name: '房间3',
        clusterName: '房间3',
        status: true,
        ip: '',
        clusterType: '',
        gameArchive: {}
    },
    {
        name: '房间4',
        clusterName: '房间4',
        status: true,
        ip: '',
        clusterType: '',
        gameArchive: {}
    },
];

const ClusterList = () => {

    const navigate = useNavigate()
    const {t} = useTranslation()

    return (
        <>
            <Row gutter={16}>
                {clusterList.map((cluster, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>

                        <ProCard
                            bordered={false}
                            style={{marginBottom: 16}}
                        >
                            <div style={{
                                display: 'flex',
                            }}>
                                <Tag color={'green'}>启动</Tag>
                                <Title
                                    level={3}
                                    style={{
                                        margin: 0,
                                        fontSize: 16
                                    }}
                                    ellipsis
                                >
                                    <Link onClick={() => {
                                        navigate(`/${cluster.clusterName}/${cluster.name}/panel`)
                                    }}>
                                        {cluster.name}
                                    </Link>
                                </Title>
                            </div>
                            <br/>
                            <ProDescriptions
                                column={2}
                            >
                                <ProDescriptions.Item
                                    span={2}
                                    valueType="text"
                                    label={t('游戏天数')}
                                >
                                    <span>
                                        {cluster?.gameArchive?.meta?.Clock?.Cycles + 1}天/{dstSegs[cluster?.gameArchive?.meta?.Clock?.Phase]} {getTimeStatus("zh", cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason, cluster?.gameArchive?.meta?.Seasons?.RemainingDaysInSeason)}{dstSeason[cluster?.gameArchive?.meta?.Seasons?.Season]}({cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason}/{cluster?.gameArchive?.meta?.Seasons?.ElapsedDaysInSeason + cluster?.gameArchive?.meta?.Seasons?.RemainingDaysInSeason})
                                    </span>
                                </ProDescriptions.Item>
                                <ProDescriptions.Item
                                    span={2}
                                    valueType="text"
                                    label={t('模组数量')}
                                >
                                    {cluster?.gameArchive?.mods}
                                </ProDescriptions.Item>
                                <ProDescriptions.Item
                                    span={2}
                                    valueType="text"
                                    label={t('最大人数')}
                                >
                                    {cluster?.gameArchive?.maxPlayers}
                                </ProDescriptions.Item>
                                <ProDescriptions.Item
                                    span={2}
                                    valueType="text"
                                    label={t('直连 IP')}
                                >
                                    {cluster.ip}
                                </ProDescriptions.Item>
                                <ProDescriptions.Item
                                    span={2}
                                    valueType="text"
                                    label={t('游戏版本')}
                                >
                                    {cluster?.gameArchive?.version} / {cluster?.gameArchive?.lastVersion}
                                </ProDescriptions.Item>
                            </ProDescriptions>
                            <p>
                                <Button color="primary" variant="filled" style={{marginRight: 8}}>编辑</Button>
                                <Button color="danger" variant="filled">删除</Button>
                            </p>
                        </ProCard>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default ClusterList