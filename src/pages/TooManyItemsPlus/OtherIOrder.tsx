import {sendCommandApi} from "../../api/commdApi.ts";
import {Button, Divider, Image, Input, InputNumber, message, Select, Space, Typography} from "antd";
import {useParams} from "react-router-dom";
import {ProCard} from "@ant-design/pro-components";
import {useState} from "react";
import {usePlayerListStore} from "../../store/usePlayerListStore.tsx";
import {dstRoles} from "../../types/dst.ts";
import {useLevelsStore} from "../../store/useLevelsStore.tsx";

export default function OtherIOrder(){

    const {cluster} = useParams()

    function send(command:string) {
        sendCommandApi(cluster || "", "Master", command)
            .then(resp =>{
                if (resp.code === 200) {
                    message.success("发送成功")
                } else {
                    message.warning("发送失败")
                }
            })
    }

    const [kuId, setKuId] = useState<string>();
    const [amount, setAmount] = useState<number>(1);
    const [prefab, setPrefab] = useState<string>();
    const playerList = usePlayerListStore((state) => state.playerList);

    const levels = useLevelsStore((state) => state.levels)
    const notHasLevels = levels === undefined || levels === null || levels.length === 0
    const [levelName, setLevelName] = useState(notHasLevels?"":levels[0].key)

    function give(prefab: string, amount: number, kuId: string) {
        const command = `ThePlayer = UserToPlayer(\\"${kuId}\\")   c_give(\\"${prefab}\\", ${amount}) ThePlayer = nil`
        sendCommandApi(cluster || "", levelName, command)
            .then(resp =>{
                if (resp.code === 200) {
                    message.success("发送成功")
                } else {
                    message.warning("发送失败")
                }
            })
    }

    return(
        <ProCard>
            <Typography.Title level={5}>
                时间按钮
            </Typography.Title>
            <Space wrap size={16}>
                <Button type={'primary'} onClick={() => send('TheWorld:PushEvent(\\"ms_nextcycle\\")')}>跳过一天</Button>
                <Button type={'primary'} onClick={() => send('TheWorld:PushEvent(\\"ms_nextphase\\")')}>跳过时钟</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_setseason\\", \\"summer\\")')}>进入夏季</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_setseason\\", \\"winter\\")')}>进入冬季</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_setseason\\", \\"spring\\")')}>进入春季</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_setseason\\", \\"autumn\\")')}>进人秋季</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_forceprecipitation\\")')}>开始下雨</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_forceprecipitation\\", false)')}>停止下雨</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_startthemoonstorms\\")')}>开启月亮裂隙</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_stopthemoonstorms\\")')}>关闭月亮裂隙</Button>
            </Space>
            <Divider />
            <Typography.Title level={5}>
                自定义模组物品给予
            </Typography.Title>
            <Space size={16} wrap>
                <Select
                    style={{
                        width: 120,
                    }}
                    onChange={value => {
                        setLevelName(value)
                    }}
                    defaultValue={notHasLevels?"":levels[0].levelName}
                    options={levels.map(level=>({
                        value: level.key,
                        label: level.levelName,
                    }))}
                />
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
                <Input placeholder={'请输入物品代码'} onChange={value => setPrefab(value.target.value)} />
                <Button type={'primary'} onClick={()=>{
                    give(prefab||'', amount, kuId||'')
                }} >发送</Button>
            </Space>
        </ProCard>
    )
}