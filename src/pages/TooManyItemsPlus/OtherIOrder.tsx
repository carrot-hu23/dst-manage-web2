import {sendCommandApi} from "../../api/commdApi.ts";
import {Button, Divider, Image, Input, InputNumber, message, Select, Space, Typography} from "antd";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {usePlayerListStore} from "../../store/usePlayerListStore.tsx";
import {dstRoles} from "../../types/dst.ts";
import {useLevelsStore} from "../../store/useLevelsStore.tsx";

export default function OtherIOrder(){
    const {t} = useTranslation()

    const {cluster} = useParams()

    function send(command:string) {
        sendCommandApi(cluster || "", "Master", command)
            .then(resp =>{
                if (resp.code === 200) {
                    message.success(t('tooManyItems.sendSuccess'))
                } else {
                    message.warning(t('tooManyItems.sendFailed'))
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
        const command = `ThePlayer = UserToPlayer(\"${kuId}\")   c_give(\"${prefab}\", ${amount}) ThePlayer = nil`
        sendCommandApi(cluster || "", levelName, command)
            .then(resp =>{
                if (resp.code === 200) {
                    message.success(t('tooManyItems.sendSuccess'))
                } else {
                    message.warning(t('tooManyItems.sendFailed'))
                }
            })
    }

    return(
        <div>
            <Typography.Title level={5}>
                {t('tooManyItems.timeButtons')}
            </Typography.Title>
            <Space wrap size={16}>
                <Button type={'primary'} onClick={() => send('TheWorld:PushEvent(\"ms_nextcycle\")')}>{t('tooManyItems.skipDay')}</Button>
                <Button type={'primary'} onClick={() => send('TheWorld:PushEvent(\"ms_nextphase\")')}>{t('tooManyItems.skipPhase')}</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\"ms_setseason\", \"summer\")')}>{t('tooManyItems.enterSummer')}</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\"ms_setseason\", \"winter\")')}>{t('tooManyItems.enterWinter')}</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\"ms_setseason\", \"spring\")')}>{t('tooManyItems.enterSpring')}</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\"ms_setseason\", \"autumn\")')}>{t('tooManyItems.enterAutumn')}</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\"ms_forceprecipitation\")')}>{t('tooManyItems.startRain')}</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\"ms_forceprecipitation\", false)')}>{t('tooManyItems.stopRain')}</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\"ms_startthemoonstorms\")')}>{t('tooManyItems.enableMoonStorm')}</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\"ms_stopthemoonstorms\")')}>{t('tooManyItems.disableMoonStorm')}</Button>
            </Space>
            <Divider />
            <Typography.Title level={5}>
                {t('tooManyItems.customItemGive')}
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
                    addonAfter={t('tooManyItems.quantity')}
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
                <Input placeholder={t('tooManyItems.itemCodePlaceholder')} onChange={value => setPrefab(value.target.value)} />
                <Button type={'primary'} onClick={()=>{
                    give(prefab||'', amount, kuId||'')
                }} >{t('tooManyItems.send')}</Button>
            </Space>
        </div>
    )
}