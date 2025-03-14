import {Button, Divider, Image, message, Modal, Select, Space} from "antd";
import React, {useState} from "react";
import {sendCommandApi} from "../../../api/level.jsx";
import {useParams} from "react-router-dom";
import {dstRoles, dstRolesMap} from "../../../utils/dst.js";
import style from "../../DstServerList/index.module.css";
import {useTranslation} from "react-i18next";
import {usePlayerListStore} from "../../../store/usePlayerListStore";

export default ({player, levelName}) => {

    const {t} = useTranslation()
    const {cluster} = useParams()

    const playerList = usePlayerListStore((state) => state.playerList)
    const [playerMate, setPlayerMate] = useState()
    const handleChange = (value) => {
        setPlayerMate(value)
    }

    const gotoPlayer = (player, otherPlayerKuId) => {
        let command = `ThePlayer = UserToPlayer(\\"${player.kuId}\\") c_goto(\\"${otherPlayerKuId}\\") ThePlayer = nil`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(`${player.name} success`)
                } else {
                    message.error(`${player.name} error`)
                }
            })
    }

    const gotoNext = (player, where) => {
        let command = `ThePlayer = UserToPlayer(\\"${player.kuId}\\") c_gonext(\\"${where}\\") ThePlayer = nil`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(`${player.name} success`)
                } else {
                    message.error(`${player.name} error`)
                }
            })
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const kickPlayer = (player) => {
        const command = `TheNet:Kick(\\"${player.kuId}\\")`
        sendCommandApi(cluster, levelName, command)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success(`踢出 ${player.name} success`)
                } else {
                    message.error(`踢出 ${player.name} error`)
                }
            })
    }
    const killPlayer = (player) => {
        const command = `UserToPlayer(\\"${player.kuId}\\"):PushEvent('death')`
        sendCommandApi(cluster, levelName, command)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success(`kill ${player.name} success`)
                } else {
                    message.error(`kill ${player.name} error`)
                }
            })
    }
    const respawnPlayer = (player) => {

        const command = `UserToPlayer(\\"${player.kuId}\\"):PushEvent('respawnfromghost')`
        sendCommandApi(cluster, levelName, command)
            .then(resp=>{
                if (resp.code === 200) {
                    message.success(`复活 ${player.name} success`)
                } else {
                    message.error(`复活 ${player.name} error`)
                }
            })
    }

    const execPlayerCommand = (player, order, arg) => {
        let command
        if (arg == null) {
            command = `ThePlayer = UserToPlayer(\\"${player.kuId}\\") ${order}() ThePlayer = nil`
        } else {
            command = `ThePlayer = UserToPlayer(\\"${player.kuId}\\") ${order}(${arg}) ThePlayer = nil`
        }
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(`${player.name} success`)
                } else {
                    message.error(`${player.name} error`)
                }
            })
    }

    const despawnPlayer = (player) => {
        const command = `c_despawn(\\"${player.kuId}\\")`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(`重选 ${player.name} success`)
                } else {
                    message.error(`重选 ${player.name} error`)
                }
            })
    }

    const resetskilltree = (player) => {
        const command = `ThePlayer = UserToPlayer(\\"${player.kuId}\\") require(\\"debugcommands\\") d_resetskilltree() ThePlayer = nil`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(`${player.name} success`)
                } else {
                    message.error(`${player.name} error`)
                }
            })
    }

    const dropEverything = (player) => {
        const command = `AllPlayers[${player.key}].components.inventory:DropEverything()`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(`${player.name} success`)
                } else {
                    message.error(`${player.name} error`)
                }
            })
    }

    //
    return (
        <>
            <Button type="primary" size={'small'} onClick={showModal}>
                操作
            </Button>
            <Modal title="玩家操作" open={isModalOpen} width={800} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Space align="center" size={'middle'}>
                    <div>
                        <Image preview={false} width={48} src={dstRoles[player.role] || dstRoles.mod}/>
                    </div>
                    <div className={style.icon}>
                        {player.name}
                    </div>
                    <div>
                        <span style={{color: '#1677ff'}}>
                            {player.kuId}
                        </span>
                    </div>
                </Space>
                <br/><br/>
                <Space size={[8, 16]} wrap>
                    <Button type="primary" onClick={() => { killPlayer(player) }} >K I L L</Button>
                    <Button type="primary" onClick={() => { respawnPlayer(player) }} >{t('panel.respawn')}</Button>
                    <Button type="primary" onClick={() => { kickPlayer(player) }} >{t('panel.kick')}</Button>
                </Space>
                <Divider />
                <Space size={[8, 16]} wrap>
                    <Button type="primary" onClick={() => despawnPlayer(player)}>{t('panel.despawn')}</Button>
                    <Button type="primary" onClick={() => execPlayerCommand(player, "c_sethealth", 1)}>满血</Button>
                    <Button type="primary" onClick={() => execPlayerCommand(player, "c_sethunger", 1)}>满饥饿值</Button>
                    <Button type="primary" onClick={() => execPlayerCommand(player, "c_setsanity", 1)}>满理智值</Button>
                    <Button type="primary"
                            onClick={() => execPlayerCommand(player, "c_setmoisture", -1)}>清除湿度</Button>
                    <Button type="primary"
                            onClick={() => execPlayerCommand(player, "c_settemperature", 25)}>25温度</Button>

                    <Button type="primary"
                            onClick={() => execPlayerCommand(player, "c_godmode", null)}>开启上帝模式</Button>
                    <Button type="primary"
                            onClick={() => execPlayerCommand(player, "c_godmode", null)}>关闭上帝模式</Button>
                    <Button type="primary"
                            onClick={() => resetskilltree(player)}>重置技能树点</Button>
                    <Button type="primary"
                            onClick={() => dropEverything(player)}>掉落所有物品</Button>
                </Space>
                <br/><br/>
                <div>
                    <Space size={8}>
                        <span>传送到玩家</span>
                        <Select
                            style={{
                                width: 300,
                            }}
                            onChange={handleChange}
                            // defaultValue={notHasLevels?"":levels[0].levelName}
                            options={playerList.map(player => ({
                                value: player.kuId,
                                label: `${dstRolesMap[player.role]}${player.role} + ${player.name}`,
                            }))}
                        />
                        <Button type={'primary'} onClick={() => {
                            gotoPlayer(player, playerMate)
                        }}>传送</Button>
                    </Space>
                </div>
                <br/>
                <Space size={[8,16]} wrap>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'pigking')}>传送猪王</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'dragonfly')}>龙蝇</Button>

                    <Button type={'primary'} onClick={()=>gotoNext(player, 'malbatross')}>邪天翁</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'beequeenhivegrown')}>蜂王</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'crabking')}>帝王蟹</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'klaus_sack')}>赃物袋</Button>

                    <Button type={'primary'} onClick={()=>gotoNext(player, 'moonbase')}>月亮石</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'critterlab')}>岩石巢穴</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'stagehand')}>舞台之手</Button>

                    <Button type={'primary'} onClick={()=>gotoNext(player, 'multiplayer_portal')}>绚丽之门</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'oasislake')}>湖泊</Button>

                    <Button type={'primary'} onClick={()=>gotoNext(player, 'lava_pond')}>岩浆池</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'moon_fissure')}>天体裂隙</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'hermitcrab')}>寄居蟹隐士</Button>

                    <Button type={'primary'} onClick={()=>gotoNext(player, 'wormhole')}>虫洞</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'statueglommer')}>格罗门雕像</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'walrus_camp')}>海象窝</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'beequeenhive')}>蜂蜜地块</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'chester_eyebone')}>眼骨</Button>

                    <Button type={'primary'} onClick={()=>gotoNext(player, 'lightninggoat')}>伏特羊</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'beefalo')}>牛</Button>

                    <Button type={'primary'} onClick={()=>gotoNext(player, 'sculpture_bishophead')}>可疑的大理石</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'sculpture_knighthead')}>可疑的大理石</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'sculpture_rooknose')}>可疑的大理石</Button>

                </Space>
                <Divider />
                <Space size={[8,16]} wrap>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'toadstool_cap')}>毒菌蟾蜍</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'atrium_gate')}>远古大门</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'minotaur')}>远古守护者</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'hutch_fishbowl')}>星空</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'archive_security_desk')}>远古哨所</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'ancient_altar_broken')}>损坏的远古伪科学站</Button>
                    <Button type={'primary'} onClick={()=>gotoNext(player, 'ancient_altar')}>远古伪科学站</Button>
                </Space>
                <br/><br/>
            </Modal>
        </>
    );
}