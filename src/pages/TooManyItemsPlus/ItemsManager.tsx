import {useEffect, useState, useMemo, useCallback} from "react";
import {Alert, Col, Image, Input, InputNumber, Row, Select, Space, Tabs, Skeleton, Empty} from "antd";
import ItemsList from "./ItemsList";
import {translations} from "../../utils/translate.ts";
import {usePlayerListStore} from "../../store/usePlayerListStore.tsx";
import {useParams} from "react-router-dom";
import {getAllOnlinePlayersApi} from "../../api/onlinPlayerApi.ts";
import {dstRoles} from "../../types/dst.ts";
import {ProCard} from "@ant-design/pro-components";
import {useLevelsStore} from "../../store/useLevelsStore.tsx";

interface ItemsManagerProps {
    /** 物品数据 */
    dataSource: Record<string, Record<string, string>>;
    /** 需要过滤掉的分类名称列表 */
    filterCategories?: string[];
    /** 警告提示信息 */
    warningMessage?: string;
    /** 数据加载状态 */
    isLoading?: boolean;
}

export default function ItemsManager({
    dataSource,
    filterCategories = [],
    warningMessage,
    isLoading = false
}: ItemsManagerProps) {

    const {cluster} = useParams();

    const [data, setData] = useState<Record<string, Record<string, string>>>({});
    const [filteredData, setFilteredData] = useState<Record<string, Record<string, string>>>({});
    const [kuId, setKuId] = useState<string>();
    const [amount, setAmount] = useState<number>(1);
    const [isLoadingPlayers, setIsLoadingPlayers] = useState<boolean>(true);

    const playerList = usePlayerListStore((state) => state.playerList);
    const setPlayerList = usePlayerListStore((state) => state.setPlayerList);

    const levels = useLevelsStore((state) => state.levels)
    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels?"":levels[0].key)

    // Fetch online players
    useEffect(() => {
        setIsLoadingPlayers(true);
        getAllOnlinePlayersApi(cluster || '').then(resp => {
            if (resp.code === 200) {
                setPlayerList(resp.data);
                if (resp.data?.length > 0) {
                    setKuId(resp.data[0].kuId);
                }
            }
        }).finally(() => {
            setIsLoadingPlayers(false);
        });
    }, [cluster, setPlayerList]);

    // Process data when dataSource changes
    useEffect(() => {
        const filteredData = { ...dataSource };
        // Filter out specified categories
        filterCategories.forEach(name => delete filteredData[name]);
        setData(filteredData);
        setFilteredData(filteredData);
    }, [dataSource, filterCategories]);

    // Debounced filter handler
    const handleFilter = useCallback((keyword: string) => {
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
    }, [data]);

    // Get selected player info
    const selectedPlayer = useMemo(() => {
        return playerList.find(player => player.kuId === kuId);
    }, [playerList, kuId]);

    const tabItems = useMemo(() => {
        return Object.keys(filteredData).map(key => ({
            key,
            label: translations[key],
            children: <ItemsList levelName={levelName} items={filteredData[key]} kuId={kuId} amount={amount} />
        }));
    }, [filteredData, levelName, kuId, amount]);

    return (
        <ProCard>
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 6 }} />
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={12} lg={16} xl={16}>
                            <Space size={16} wrap>
                                {isLoadingPlayers ? (
                                    <>
                                        <Skeleton.Input active size="default" style={{ width: 120 }} />
                                        <Skeleton.Input active size="default" style={{ width: 120 }} />
                                        <Skeleton.Input active size="default" style={{ width: 120 }} />
                                    </>
                                ) : (
                                    <>
                                        <Select
                                            style={{ width: 120 }}
                                            onChange={value => setLevelName(value)}
                                            defaultValue={notHasLevels ? "" : levels[0].levelName}
                                            options={levels.map(level => ({
                                                value: level.key,
                                                label: level.levelName,
                                            }))}
                                            disabled={notHasLevels}
                                        />
                                        <Select
                                            value={kuId}
                                            style={{ width: 120 }}
                                            options={playerList.map(player => ({
                                                value: player.kuId,
                                                label: player.name
                                            }))}
                                            onChange={value => setKuId(value)}
                                            disabled={playerList.length === 0}
                                            notFoundContent={
                                                <Empty
                                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                    description="暂无在线玩家"
                                                />
                                            }
                                        />
                                        <InputNumber
                                            style={{ width: 120 }}
                                            min={1}
                                            max={99}
                                            defaultValue={1}
                                            onChange={value => setAmount(value || 1)}
                                            suffix="个"
                                        />
                                        {selectedPlayer && (
                                            <>
                                                <span>day: {selectedPlayer.day || 0}</span>
                                                <Image
                                                    preview={false}
                                                    width={48}
                                                    src={dstRoles[`${selectedPlayer.role}`] || dstRoles.mod}
                                                    alt={selectedPlayer.name}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </Space>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                            <Input
                                placeholder="请输入关键字过滤"
                                onChange={e => handleFilter(e.target.value)}
                                allowClear
                                disabled={isLoading}
                            />
                        </Col>
                    </Row>
                    <br/>
                    {warningMessage && (
                        <>
                            <Alert
                                type="info"
                                message={warningMessage}
                                closable
                            />
                            <br />
                        </>
                    )}
                    {Object.keys(filteredData).length === 0 ? (
                        <Empty description="未找到匹配的物品" />
                    ) : (
                        <Tabs items={tabItems} tabPosition="left" />
                    )}
                </>
            )}
        </ProCard>
    );
}