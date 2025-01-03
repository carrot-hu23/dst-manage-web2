import {useEffect, useState, useMemo} from "react";
import {Alert, Col, Image, Input, InputNumber, Row, Select, Space, Tabs} from "antd";
import ItemsList from "./ItemsList";
import {translations} from "../../utils/translate.ts";
import {usePlayerListStore} from "../../store/usePlayerListStore.tsx";
import {useParams} from "react-router-dom";
import {getAllOnlinePlayersApi} from "../../api/onlinPlayerApi.ts";
import {dstRoles} from "../../types/dst.ts";
import {ProCard} from "@ant-design/pro-components";

export default function TooManyItemsPlus() {

    const {cluster} = useParams();

    const [data, setData] = useState<Record<string, Record<string, string>>>({});
    const [filteredData, setFilteredData] = useState<Record<string, Record<string, string>>>({});
    const [kuId, setKuId] = useState<string>();
    const [amount, setAmount] = useState<number>(1);

    const playerList = usePlayerListStore((state) => state.playerList);
    const setPlayerList = usePlayerListStore((state) => state.setPlayerList);

    useEffect(() => {
        getAllOnlinePlayersApi(cluster || '').then(resp => {
            if (resp.code === 200) {
                setPlayerList(resp.data);
                if (resp.data?.length > 0) {
                    setKuId(resp.data[0].kuId);
                }
            }
        });
    }, [cluster, setPlayerList]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('./misc/toomanyitemsplus.json');
            const data = await response.json();
            const filteredData = { ...data };
            const filterNames = [
                "itemlist_beta",
                "itemlist_event",
                "itemlist_follower",
                "itemlist_rot",
                "itemlist_natural",
                "itemlist_sculpture",
                "itemlist_puppet",
                "itemlist_boss",
                "itemlist_den",
                "itemlist_ruins",
                "itemlist_building"
            ];
            filterNames.forEach(name => delete filteredData[name]);
            setData(filteredData);
            setFilteredData(filteredData);
        };
        fetchData();
    }, []);

    const handleFilter = (keyword: string) => {
        if (!keyword.trim()) {
            setFilteredData(data);
        } else {
            const filtered = Object.entries(data).reduce((acc, [key, items]) => {
                const filteredItems = Object.fromEntries(
                    Object.entries(items).filter(([, value]) => value.includes(keyword))
                );
                if (Object.keys(filteredItems).length > 0) {
                    acc[key] = filteredItems;
                }
                return acc;
            }, {} as Record<string, Record<string, string>>);
            setFilteredData(filtered);
        }
    };

    const tabItems = useMemo(() => {
        return Object.keys(filteredData).map(key => ({
            key,
            label: translations[key],
            children: <ItemsList items={filteredData[key]} kuId={kuId} amount={amount} />
        }));
    }, [filteredData, kuId, amount]);

    return (
        <ProCard>
            <div>
                <Row gutter={[16, 32]}>
                    <Col xs={24} sm={12} md={12} lg={16} xl={16}>
                        <Space size={16} wrap>
                            <Select
                                defaultValue={kuId}
                                style={{ width: 120 }}
                                options={playerList.map(player => ({
                                    value: player.kuId,
                                    label: player.name
                                }))}
                                onChange={value => setKuId(value)}
                            />
                            <InputNumber
                                style={{ width: 120 }}
                                min={1}
                                max={10}
                                defaultValue={1}
                                onChange={value => setAmount(value || 1)}
                                addonAfter="数量"
                            />
                            {kuId && (
                                <>
                                    day: {playerList.find(player => player.kuId === kuId)?.day || 0}
                                    <Image
                                        preview={false}
                                        width={48}
                                        src={dstRoles[`${playerList.find(player => player?.kuId === kuId)?.role}`] || dstRoles.mod}
                                    />
                                </>
                            )}
                        </Space>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                        <Input
                            placeholder="请输入关键字过滤"
                            onChange={e => handleFilter(e.target.value)}
                        />
                    </Col>
                </Row>
            </div>
            <br/>
            <Alert type={'info'} message={'只适用于可以被储存在物品栏的背包 和物品。其他物品会炸档'} closable />
            <br />
            <Tabs items={tabItems} tabPosition="left" />
        </ProCard>
    );
}
