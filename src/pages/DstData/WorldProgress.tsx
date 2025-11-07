import {FC, useEffect, useState} from 'react';
import {Row, Col, Space, Timeline, Image} from 'antd';
import {Level} from "../../types";
import {sessionFileApi} from "../../api/dstDataApi.ts";
import {useParams} from "react-router-dom";

interface WorldProgressProps {
    levels: Level[];
}

const WorldProgress: FC<WorldProgressProps> = ({levels}) => {

    const [sessionFile, setSessionFile] = useState<string>("")
    const {cluster} = useParams()

    // 或当前世界杀人蜂数量
    // 1.通过发送命令 c_countprefabs("wasphive")
    // 2.读取最近的200行数据
    // 3.解析 [ There are 	44	wasphives in the world.	 ]

    const [wasphive, setWasphive] = useState<number>(0)

    // 海象也是类似操作
    const [walrus, setWalrus] = useState<number>(0)

    const [moonrockseed, setMoonrockseed] = useState<boolean>(false)
    const [hermit_pearl, setHermit_pearl] = useState<boolean>(false)
    const [multiplayer_portal_moonrock, setMultiplayer_portal_moonrock] = useState<boolean>(false)
    const [lunarrift_portal, setLunarrift_portal] = useState<boolean>(false)

    useEffect(() => {
        sessionFileApi(cluster || "Master", "Master")
            .then(resp => {
                if (resp.code == 200) {
                    setSessionFile(resp.data)
                    parseData(resp.data)
                }
            })
    }, [levels]);

    function parseData(content: string) {
        console.log(content)
        // 2. 定义 prefab 名称
        const patterns = {
            walrus_camp: /walrus_camp/g,
            killerbeehive: /killerbeehive/g,
        };

        // 3. 统计匹配次数
        const counts = {};
        for (const [name, regex] of Object.entries(patterns)) {
            const matches = content.match(regex);
            counts[name] = matches ? matches.length : 0;
        }
        // 4. 输出结果
        console.log(counts)

        if (content.includes("moonrockseed")) {
            setMoonrockseed(true)
        }
        if (content.includes("hermit_pearl")) {
            setHermit_pearl(true)
        }
        if (content.includes("multiplayer_portal_moonrock")) {
            setMultiplayer_portal_moonrock(true)
        }
        if (content.includes("hermitcrab_lure_marker")) {
            setLunarrift_portal(true)
        }
    }

    return (
        <div style={{paddingTop: 12, paddingBottom: 12}}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <div>
                        <Space wrap size={16}>
                            <div>
                                <Image width={32} src={'./assets/dst/MacTusk.webp'}/>
                                <span>x{wasphive}</span>
                            </div>
                            <div>
                                <Image width={32} src={'./assets/dst/Killer_Bee_Hive.webp'}/>
                                <span>x{wasphive}</span>
                            </div>
                        </Space>
                    </div>
                </Col>
                <Col span={12}>
                    <Timeline
                        items={[
                            {
                                children: (
                                    <div>
                                        <div>天体宝球</div>
                                        <Image width={32} src={'./assets/dst/Celestial_Orb.webp'}/>
                                    </div>
                                ),
                                color: moonrockseed ? 'green' : 'gray',
                            },
                            {
                                children: (
                                    <div>
                                        <div>天体大门</div>
                                        <Image
                                            width={32}
                                            src={'./assets/dst/Celestial_Portal_Build.webp'}
                                        />
                                    </div>
                                ),
                                color: multiplayer_portal_moonrock ? 'green' : 'gray',
                            },
                            {
                                children: (
                                    <div>
                                        <div>寄居蟹奶奶珍珠</div>
                                        <Image width={32} src={'./assets/dst/Crabby_Hermit.webp'}/>
                                    </div>
                                ),
                                color: hermit_pearl ? 'green' : 'gray',
                            },
                            {
                                children: (
                                    <div>
                                        <div>月亮裂隙</div>
                                        <Image
                                            width={32}
                                            src={'./assets/dst/Lunar_Rift_Phase_3.png'}
                                        />
                                    </div>
                                ),
                                color: lunarrift_portal ? 'green' : 'gray',
                            },
                        ]}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default WorldProgress;
