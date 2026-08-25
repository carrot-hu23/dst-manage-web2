import {Alert, Button, Col, Image, message, Popconfirm, Row, Space, Tag} from "antd";
import { genDstMapApi, hasWalrusHutPlainsApi } from "../../api/dstDataApi.ts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { getLevelListApi } from "../../api/clusterLevelApi.jsx";
import { useEffect, useState } from "react";
import useIsMobile from "../../hooks/UseIsMobile";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {readLevelServerLogApi, sendCommandApi} from "../../api/level.jsx";
import { useTranslation } from "react-i18next";
import i18next from "../../locales/i18n.tsx";
import { parse } from "lua-json";
import {Level} from "../../types";
import {useParams} from "react-router-dom";


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
        message.warning(i18next.t("level.warning.lua.error"));
        console.log(error);
        return {};
    }
}

export default () => {
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const {cluster} = useParams()

    const [levels, setLevels] = useState<Level[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [hasWalrusHutPlainsMap, setHasWalrusHutPlainsMap] = useState<Record<string, boolean>>({});
    const [wasphive, setWasphive] = useState<string>();

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
                message.error(t('dstData.map.fetchLevelsError'));
            }
        } catch (err) {
            console.error("获取世界列表失败", err);
            message.error(t('dstData.map.fetchLevelsError'));
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
                message.warning(t('dstData.map.generateFailed'));
            } else {
                message.success(t('dstData.map.generateSuccess'));
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
            message.error(t('dstData.map.generateError'));
        }
    };

    // 重置世界
    const resetWorld = async (cluster: string, levelName: string) => {
        try {
            const resp = await sendCommandApi(cluster, levelName, "c_regenerateshard()");
            if (resp.code === 200) {
                message.success(t('dstData.map.resetSuccess', {levelName}));
            } else {
                message.error(`${t('dstData.map.resetError', {levelName})}: ${resp.msg || t('dstData.map.unknownError')}`);
            }
        } catch (err) {
            console.error("重置世界失败", err);
            message.error(t('dstData.map.resetError', {levelName}));
        }
    };

    const fetchWasphive = async (cluster: string, levelName: string) =>{
        await sendCommandApi(cluster, levelName, "c_countprefabs(\"wasphive\")")
        const resp = await readLevelServerLogApi(cluster, levelName, 100)
        if (resp.code === 200) {
            const lines = (resp.data || []) as string[]
            lines.forEach(line=>{
                if (line.includes('wasphives in the world.')) {
                    const splits = line.split(" ")
                    if (splits.length > 3) {
                        setWasphive(splits[3])
                    }
                }
            })
        }
    }

    useEffect(() => {
        fetchWasphive(cluster||'', "Master")
    }, []);

    return (
        <>
            <div>
                <Space size={24} wrap>
                    <Button type="primary" onClick={generateMaps}>
                        {t('backup.refresh')}
                    </Button>
                    <div>
                        {levels.map(l => (
                            l.location === "forest" && (
                                <Space size={12} wrap>
                                    <Tag
                                        key={l.uuid}
                                        color={hasWalrusHutPlainsMap[l.uuid] ? "blue" : "red"}
                                    >
                                        {l.levelName} {hasWalrusHutPlainsMap[l.uuid] ? t('dstData.map.hasWalrusPlains') : t('dstData.map.noWalrusPlains')}
                                    </Tag>
                                    <Tag color={'blue'}>{t('dstData.map.killerBeeCount', {count: wasphive})}</Tag>
                                </Space>
                            )
                        ))}
                    </div>
                </Space>
                <br />
                <br />
                <Alert
                    type="info"
                    message={t('dstData.map.firstGenerateTip')}
                    closable
                />
            </div>
            <br />
            <Row gutter={[16, 16]}>
                {levels.map((l, idx) => (
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div key={l.uuid} style={{ textAlign: "center" }}>
                        <Image
                            width={isMobile ? 300 : 502}
                            height={isMobile ? 300 : 502}
                            src={imageUrls[idx]}
                        />
                        <br />
                        <Popconfirm
                            title={t('panel.regenerate')}
                            description={t('dstData.map.resetConfirmDesc')}
                            onConfirm={() => resetWorld(cluster || 'Master', l.uuid)} // ⚠️ 这里 cluster 先写死
                            okText={t('panel.y')}
                            cancelText={t('panel.n')}
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
                    </Col>
                ))}
            </Row>
        </>
    );
};
