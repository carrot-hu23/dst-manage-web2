import {Card, Descriptions, Divider, Drawer, Image, List, Progress, Skeleton, Space, Tag} from 'antd';
import {dstRoles} from '../../../utils/dst';
import style from '../../DstServerList/index.module.css';
import {useEffect, useState} from "react";
import {sendCommandApi} from "../../../api/commdApi.ts";
import {useParams} from "react-router-dom";
import {generateUUID} from "../../../utils/dateUitls.js";
import {readLevelServerLogApi} from "../../../api/levelApi.ts";

// Mock data - using the structure provided by user
const mockPlayerData = {
    name: "猜猜我是谁",
    prefab: "wilson",
    health: {max: 150, current: 50, percent: 33},
    hunger: {max: 150, current: 50.15625, percent: 33},
    sanity: {max: 200, current: 88.154718621015, percent: 44},
    temperature: 28,
    moisture: 0,
    head_equipment: {name: "冬帽", prefab: "winterhat", count: 1},
    hand_equipment: {name: "步行手杖", prefab: "cane", count: 1},
    body_equipment: {slots: 14, type: "backpack", prefab: "seedpouch", name: "种子袋"},
    backpack_items: [
        {freshness: 92, name: "种子", slot: 1, prefab: "seeds", count: 2},
        {freshness: 92, name: "种子", slot: 9, prefab: "seeds", count: 1}
    ],
    inventory_items: [
        {freshness: 94, name: "海花环", slot: 1, prefab: "kelphat", count: 1},
        {freshness: 94, name: "花环", slot: 2, prefab: "flowerhat", count: 1},
        {freshness: 96, name: "熟肉", slot: 3, prefab: "cookedmeat", count: 1},
        {freshness: 88, name: "活鳗鱼", slot: 4, prefab: "pondeel", count: 1},
        {freshness: 94, name: "小肉", slot: 5, prefab: "smallmeat", count: 1}
    ],
    stats: {backpack_count: 2, total_items: 7, inventory_count: 5}
};

/**
 * 从日志数组中提取指定 uuid 的玩家数据（取最后一次出现）
 * @param {string[]} logArray - 服务器日志行数组
 * @param {string} targetUuid - 目标 uuid（如 "197b97cd-2eed-4252-bb29-ef9300964feaKU_Mt-zrX8K"）
 * @returns {Object|null} 解析后的玩家数据对象，失败则返回 null
 */
function extractPlayerData(logArray, targetUuid) {
    if (!Array.isArray(logArray) || !targetUuid) {
        console.error('Invalid input parameters');
        return null;
    }

    const startMarker = `${targetUuid}-start`;
    const endMarker = `${targetUuid}-end`;

    // 1️⃣ 从后往前找最后一次出现的 endMarker（确保取最新数据）
    let endIndex = -1;
    for (let i = logArray.length - 1; i >= 0; i--) {
        if (logArray[i].includes(endMarker)) {
            endIndex = i;
            break;
        }
    }
    if (endIndex === -1) {
        console.warn(`❌ End marker "${endMarker}" not found in logs`);
        return null;
    }

    // 2️⃣ 从 endIndex 往前找对应的 startMarker
    let startIndex = -1;
    for (let i = endIndex - 1; i >= 0; i--) {
        if (logArray[i].includes(startMarker)) {
            startIndex = i;
            break;
        }
    }
    if (startIndex === -1) {
        console.warn(`❌ Start marker "${startMarker}" not found before end marker`);
        return null;
    }

    // 3️⃣ 提取并拼接 JSON 字符串片段
    const jsonParts = [];

    // 3.1 处理 start 行：提取 `marker\t` 之后的内容（通常是 `{`）
    const startLine = logArray[startIndex];
    const startSegments = startLine.split(`${startMarker}\t`);
    if (startSegments.length > 1) {
        jsonParts.push(startSegments[1]);
    } else {
        console.warn('❌ Start line format unexpected:', startLine);
        return null;
    }

    // 3.2 处理中间行：直接拼接（这些行是纯 JSON 内容）
    for (let i = startIndex + 1; i < endIndex; i++) {
        jsonParts.push(logArray[i]);
    }

    // 3.3 处理 end 行：提取 `\tmarker` 之前的内容（通常是 `}`）
    const endLine = logArray[endIndex];
    const endSegments = endLine.split(`\t${endMarker}`);
    if (endSegments.length > 0) {
        jsonParts.push(endSegments[0]);
    } else {
        console.warn('❌ End line format unexpected:', endLine);
        return null;
    }

    // 4️⃣ 拼接并解析 JSON
    const jsonString = jsonParts.join('').trim();

    try {
        return JSON.parse(jsonString);
    } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError);
        console.log('🔍 Raw JSON string:', jsonString);
        return null;
    }
}

export default ({player, visible, onClose, levelName}) => {
    if (!player) return null;
    const {cluster} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. 在内部定义异步函数
        const fetchData = async () => {
            try {
                setLoading(true);
                const uuid = generateUUID() + player.kuId;
                // 注意：模板字符串中的转义字符可能需要根据实际语言环境调整
                // 原代码: GetPlayerData(\"${player.kuId}\", \"${uuid}\")
                // 如果这是发送给 Lua/特定脚本引擎的命令，请确保引号转义正确
                const command = `print(ToJSONStr(GetPlayerData(\"${player.kuId}\", \"${uuid}\")))`;

                const commandResp = await sendCommandApi(cluster, levelName, command);

                if (commandResp.code === 200) {
                    // 2. 使用 setTimeout 包裹异步逻辑
                    setTimeout(async () => {
                        try {
                            const logResp = await readLevelServerLogApi(cluster, levelName, 1000);
                            if (logResp.code === 200) {
                                const lines = logResp.data || [];
                                for (let line of lines) {
                                    if (line.includes("uuid") && line.includes(uuid)) {
                                        const jsonStr = line.slice(12)
                                        const parse = JSON.parse(jsonStr);
                                        setData(parse?.data);
                                        break
                                    }
                                }
                            }
                            console.log(data)
                            setLoading(false);
                        } catch (logError) {
                            console.error('Failed to read logs:', logError);
                        }
                    }, 1000);
                }
            } catch (error) {
                console.error('Command execution failed:', error);
            }
        };

        // 3. 立即调用该函数
        fetchData();

        // 4. (可选) 清理函数：防止组件卸载后仍然执行 setTimeout 中的逻辑
        return () => {
            // 如果需要更严格的控制，可以使用 clearTimeout 引用
            // 但在此简单场景下，通常 React 卸载后 console.log 无害，只是多余
        };
    }, []); // 依赖项为空，只在挂载时执行一次

    // const data = mockPlayerData;

    return (
        <Drawer
            title={(
                <Space size="middle">
                    <Image preview={false} width={48} src={dstRoles[player.role] || dstRoles.mod}/>
                    <span className={style.icon}>{player.name}</span>
                    <Tag>KuId: {player.kuId}</Tag>
                    <Tag color="blue">天数: {player.day}</Tag>
                </Space>
            )}
            width={800}
            open={visible}
            onClose={onClose}
            footer={null}
        >
            {data ? (
                <>
                    {/* 三维状态 */}
                    <Card title="三维状态" size="small" loading={loading}>
                        <Space direction="vertical" style={{width: '100%'}} size="middle">
                            <div>
                                <div style={{marginBottom: 8}}>
                                    <Tag color="#ff4d4f">生命</Tag> {data.health.current.toFixed(1)}/{data.health.max}
                                </div>
                                <Progress percent={data.health.percent} strokeColor="#ff4d4f" showInfo={false}/>
                            </div>
                            <div>
                                <div style={{marginBottom: 8}}>
                                    <Tag color="#faad14">饥饿</Tag> {data.hunger.current.toFixed(1)}/{data.hunger.max}
                                </div>
                                <Progress percent={data.hunger.percent} strokeColor="#faad14" showInfo={false}/>
                            </div>
                            <div>
                                <div style={{marginBottom: 8}}>
                                    <Tag color="#722ed1">理智</Tag> {data.sanity.current.toFixed(1)}/{data.sanity.max}
                                </div>
                                <Progress percent={data.sanity.percent} strokeColor="#722ed1" showInfo={false}/>
                            </div>
                        </Space>
                    </Card>

                    <Divider/>

                    {/* 环境状态 */}
                    <Card title="环境状态" size="small" loading={loading}>
                        <Descriptions bordered size="small" column={2}>
                            <Descriptions.Item label="温度">{data.temperature}°C</Descriptions.Item>
                            <Descriptions.Item label="湿度">{data.moisture}%</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Divider/>

                    {/* 装备 */}
                    <Card title="装备" size="small" loading={loading}>
                        <Descriptions bordered size="small" column={3}>
                            <Descriptions.Item label="头部">{data.head_equipment?.name || '无'}</Descriptions.Item>
                            <Descriptions.Item label="手部">{data.hand_equipment?.name || '无'}</Descriptions.Item>
                            <Descriptions.Item label="身体">{data.body_equipment?.name || '无'}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Divider/>

                    {/* 背包物品 */}
                    <Card title="背包物品" size="small" style={{marginBottom: 16}} loading={loading} extra={<Tag color="blue">数量: {data.stats.backpack_count}</Tag>}>
                        {data.backpack_items.length > 0 ? (
                            <List
                                size="small"
                                dataSource={data.backpack_items}
                                renderItem={item => (
                                    <List.Item>
                                        <Tag>槽位 {item.slot}</Tag>
                                        <span style={{flex: 1, marginLeft: 8}}>{item.name}</span>
                                        <Tag color="blue">x{item.count}</Tag>
                                        <Tag color="green">新鲜度: {item.freshness}%</Tag>
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <div style={{textAlign: 'center', color: '#999', padding: '20px 0'}}>
                                背包为空
                            </div>
                        )}
                    </Card>

                    {/* 物品栏 */}
                    <Card title="物品栏" size="small" loading={loading} extra={<Tag color="orange">数量: {data.stats.inventory_count}</Tag>}>
                        {data.inventory_items.length > 0 ? (
                            <List
                                size="small"
                                dataSource={data.inventory_items}
                                renderItem={item => (
                                    <List.Item>
                                        <Tag>槽位 {item.slot}</Tag>
                                        <span style={{flex: 1, marginLeft: 8}}>{item.name}</span>
                                        <Tag color="blue">x{item.count}</Tag>
                                        <Tag color="green">新鲜度: {item.freshness}%</Tag>
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <div style={{textAlign: 'center', color: '#999', padding: '20px 0'}}>
                                物品栏为空
                            </div>
                        )}
                    </Card>
                </>
            ) : (
                <>
                    <Skeleton active={true} loading={true} />
                </>
            )}


        </Drawer>
    );
};
