import { Alert, Button, Image, message, Popconfirm, Space, Tag } from "antd";
import { genDstMapApi, hasWalrusHutPlainsApi } from "../../api/dstDataApi.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { getLevelListApi } from "../../api/clusterLevelApi.jsx";
import { useEffect, useState } from "react";
import useIsMobile from "../../hooks/UseIsMobile";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { sendCommandApi } from "../../api/level.jsx";
import { useTranslation } from "react-i18next";
import { parse } from "lua-json";

type Level = {
    levelName: string;
    uuid: string;
    location: "forest" | "cave" | "porkland" | string; // 从 leveldataoverride 解析出来
};

type LevelDataOverride = {
    location?: string;
    overrides?: Record<string, string>;
};

function getLevelObject(value: string): LevelDataOverride {
    if (!value) return {};
    value = value.replace(/\n/g, "");
    try {
        return parse(value) as LevelDataOverride;
    } catch (error) {
        message.warning("lua配置解析错误");
        console.log(error);
        return {};
    }
}
// =====================================================================

export default () => {
    const { t } = useTranslation();
    const isMobile = useIsMobile();

    const [levels, setLevels] = useState<Level[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [hasWalrusHutPlainsMap, setHasWalrusHutPlainsMap] = useState<Record<string, boolean>>({});

    // 获取所有世界列表（使用 getLevelObject 解析 leveldataoverride）
    const fetchLevels = async () => {
        try {
            const resp = await getLevelListApi();
            if (resp.code === 200) {
                const newLevels: Level[] = resp.data.map((l: any) => {
                    // leveldataoverride 可能为空、"return {}" 等
                    const raw = (l.leveldataoverride && l.leveldataoverride.trim()) ? l.leveldataoverride : "";
                    let location: string = "forest"; // 默认 forest（和你之前逻辑一致）
                    try {
                        const parsed = getLevelObject(raw);
                        if (parsed && parsed.location) {
                            location = parsed.location;
                        } else {
                            // parsed 没有 location 时保持默认 forest（不依赖 uuid 判定）
                            // 如果你想在解析失败时根据 uuid 做兜底，可以在这里改成：
                            // location = l.uuid === "Caves" ? "cave" : "forest"
                        }
                    } catch (e) {
                        console.warn(`解析 leveldataoverride 失败: ${l.levelName}`, e);
                    }

                    return {
                        levelName: l.levelName,
                        uuid: l.uuid,
                        location: location as Level["location"],
                    };
                });

                setLevels(newLevels);
                setImageUrls(newLevels.map(l => `/api/dst/map/image?levelName=${l.uuid}&t=${Date.now()}`));

                // 仅对 location === 'forest' 的世界查询海象平原
                await Promise.all(
                    newLevels
                        .filter(l => l.location === "forest")
                        .map(l => fetchHasWalrusHutPlainsApi(l.uuid))
                );
            } else {
                message.error("获取世界列表失败");
            }
        } catch (err) {
            console.error("获取世界列表失败", err);
            message.error("获取世界列表失败");
        }
    };

    // 获取某个世界是否存在海象平原
    const fetchHasWalrusHutPlainsApi = async (clusterName: string) => {
        try {
            const resp = await hasWalrusHutPlainsApi(clusterName);
            if (resp.code === 200) {
                setHasWalrusHutPlainsMap(prev => ({ ...prev, [clusterName]: resp.data }));
            }
        } catch (err) {
            console.error(`查询海象平原失败: ${clusterName}`, err);
        }
    };

    useEffect(() => {
        fetchLevels();
    }, []);

    // 刷新所有图片
    const refreshImage = () => {
        setImageUrls(levels.map(l => `/api/dst/map/image?levelName=${l.uuid}&t=${Date.now()}`));
    };

    // 生成所有地图
    const generateMaps = async () => {
        try {
            const results = await Promise.all(levels.map(l => genDstMapApi(l.uuid)));
            const failed = results.some((resp: { code: number }) => resp.code !== 200);
            if (failed) {
                message.warning("生成地图预览失败");
            } else {
                message.success("生成成功");
                refreshImage();
                // 生成成功后仅对 forest 世界重新查询海象平原
                await Promise.all(
                    levels
                        .filter(l => l.location === "forest")
                        .map(l => fetchHasWalrusHutPlainsApi(l.uuid))
                );
            }
        } catch (err) {
            console.error("生成地图失败", err);
            message.error("生成地图失败");
        }
    };

    // 重置世界
    const resetWorld = async (cluster: string, levelName: string) => {
        try {
            const resp = await sendCommandApi(cluster, levelName, "c_regenerateshard()");
            if (resp.code === 200) {
                message.success(`${levelName} 重置成功`);
            } else {
                message.error(`${levelName} 重置失败: ${resp.msg || "未知错误"}`);
            }
        } catch (err) {
            console.error("重置世界失败", err);
            message.error(`${levelName} 重置失败`);
        }
    };

    return (
        <>
            <div>
                <Space size={24} wrap>
                    <Button type="primary" onClick={generateMaps}>
                        刷新
                    </Button>
                    <div>
                        {levels.map(l => (
                            l.location === "forest" && (
                                <Tag
                                    key={l.uuid}
                                    color={hasWalrusHutPlainsMap[l.uuid] ? "blue" : "red"}
                                >
                                    {l.levelName} {hasWalrusHutPlainsMap[l.uuid] ? "存在海象平原" : "不存在海象平原"}
                                </Tag>
                            )
                        ))}
                    </div>
                </Space>
                <br />
                <br />
                <Alert
                    type="info"
                    message={'第一次生成世界时，请点击 "存档"，再点击生成, 不然生成的图片是错误的'}
                    closable
                />
            </div>
            <br />
            <Space size={16} wrap>
                {levels.map((l, idx) => (
                    <div key={l.uuid} style={{ textAlign: "center" }}>
                        <Image
                            width={isMobile ? 300 : 502}
                            height={isMobile ? 300 : 502}
                            src={imageUrls[idx]}
                        />
                        <br />
                        <Popconfirm
                            title={t('panel.regenerate')}
                            description="请保存好数据"
                            onConfirm={() => resetWorld("Master", l.uuid)} // ⚠️ 这里 cluster 先写死
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                size="small"
                                type="primary"
                                danger
                                style={{ marginTop: 8 }}
                            >
                                {t('panel.regenerate')}
                            </Button>
                        </Popconfirm>
                    </div>
                ))}
            </Space>
        </>
    );
};
