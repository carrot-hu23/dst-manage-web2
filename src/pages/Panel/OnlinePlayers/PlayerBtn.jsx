import {Button, Card, Divider, Drawer, Image, message, Modal, Select, Space} from "antd";
import React, {useState} from "react";
import {sendCommandApi} from "../../../api/level.jsx";
import {useParams} from "react-router-dom";
import {dstRoles, dstRolesMap} from "../../../utils/dst.js";
import style from "../../DstServerList/index.module.css";
import {useTranslation} from "react-i18next";
import {usePlayerListStore} from "../../../store/usePlayerListStore";
import {ProCard} from "@ant-design/pro-components";

export default ({player, levelName}) => {

    const {t} = useTranslation()
    const {cluster} = useParams()

    const playerList = usePlayerListStore((state) => state.playerList)
    const [playerMate, setPlayerMate] = useState()
    const handleChange = (value) => {
        setPlayerMate(value)
    }

    const gotoPlayer = (player, otherPlayerKuId) => {
        let command = `ThePlayer = UserToPlayer(\"${player.kuId}\") c_goto(\"${otherPlayerKuId}\") ThePlayer = nil`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('panel.command.success', {name: player.name}))
                } else {
                    message.error(t('panel.command.error', {name: player.name}))
                }
            })
    }

    const gotoNext = (player, where) => {
        let command = `ThePlayer = UserToPlayer(\"${player.kuId}\") c_gonext(\"${where}\") ThePlayer = nil`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('panel.command.success', {name: player.name}))
                } else {
                    message.error(t('panel.command.error', {name: player.name}))
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
        const command = `TheNet:Kick(\"${player.kuId}\")`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('panel.kickPlayer.success', {name: player.name}))
                } else {
                    message.error(t('panel.kickPlayer.error', {name: player.name}))
                }
            })
    }
    const killPlayer = (player) => {
        const command = `UserToPlayer(\"${player.kuId}\"):PushEvent('death')`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('panel.killPlayer.success', {name: player.name}))
                } else {
                    message.error(t('panel.killPlayer.error', {name: player.name}))
                }
            })
    }
    const respawnPlayer = (player) => {

        const command = `UserToPlayer(\"${player.kuId}\"):PushEvent('respawnfromghost')`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('panel.respawnPlayer.success', {name: player.name}))
                } else {
                    message.error(t('panel.respawnPlayer.error', {name: player.name}))
                }
            })
    }

    const execPlayerCommand = (player, order, arg) => {
        let command
        if (arg == null) {
            command = `ThePlayer = UserToPlayer(\"${player.kuId}\") ${order}() ThePlayer = nil`
        } else {
            command = `ThePlayer = UserToPlayer(\"${player.kuId}\") ${order}(${arg}) ThePlayer = nil`
        }
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('panel.command.success', {name: player.name}))
                } else {
                    message.error(t('panel.command.error', {name: player.name}))
                }
            })
    }

    const despawnPlayer = (player) => {
        const command = `c_despawn(\"${player.kuId}\")`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('panel.despawnPlayer.success', {name: player.name}))
                } else {
                    message.error(t('panel.despawnPlayer.error', {name: player.name}))
                }
            })
    }

    const resetskilltree = (player) => {
        const command = `ThePlayer = UserToPlayer(\"${player.kuId}\") require(\"debugcommands\") d_resetskilltree() ThePlayer = nil`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('panel.command.success', {name: player.name}))
                } else {
                    message.error(t('panel.command.error', {name: player.name}))
                }
            })
    }

    const dropEverything = (player) => {
        const command = `AllPlayers[${player.key}].components.inventory:DropEverything()`
        sendCommandApi(cluster, levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(t('panel.command.success', {name: player.name}))
                } else {
                    message.error(t('panel.command.error', {name: player.name}))
                }
            })
    }

    //
    return (
        <>
            <Button type="primary" size={'small'} onClick={showModal}>
                {t('panel.action')}
            </Button>
            <Drawer
                closable={{ placement: 'end' }}
                title={(
                    <Space size={'middle'}>
                        <div>
                            <Image preview={false} width={48} src={dstRoles[player.role] || dstRoles.mod}/>
                        </div>
                        <div className={style.icon}>
                            {player.name}
                        </div>
                        <div>
                            <span>KuId:{player.kuId}</span>
                        </div>
                        <div>
                            <span>{t('panel.day')}: {player.day}</span>
                        </div>
                    </Space>
                )}
                open={isModalOpen}
                width={800}
                onOk={handleOk}
                onClose={handleCancel}
                onCancel={handleCancel}
                footer={null}
            >
                <Card title={t('panel.playerOperations')}>
                    <Space size={[8, 16]} wrap>
                        <Button color="purple" variant="solid" danger onClick={() => {
                            killPlayer(player)
                        }}>{t('panel.killPlayer')}</Button>
                        <Button color="green" variant="solid" onClick={() => {
                            respawnPlayer(player)
                        }}>{t('panel.respawn')}</Button>
                        <Button color="red" variant="solid" danger onClick={() => {
                            kickPlayer(player)
                        }}>{t('panel.kick')}</Button>
                    </Space>
                    <Divider/>
                    <Space size={[8, 16]} wrap>
                        <Button type="primary" onClick={() => despawnPlayer(player)}>{t('panel.despawn')}</Button>
                        <Button type="primary" onClick={() => execPlayerCommand(player, "c_sethealth", 1)}>{t('panel.fullHealth')}</Button>
                        <Button type="primary"
                                onClick={() => execPlayerCommand(player, "c_sethunger", 1)}>{t('panel.fullHunger')}</Button>
                        <Button type="primary"
                                onClick={() => execPlayerCommand(player, "c_setsanity", 1)}>{t('panel.fullSanity')}</Button>
                        <Button type="primary"
                                onClick={() => execPlayerCommand(player, "c_setmoisture", -1)}>{t('panel.clearMoisture')}</Button>
                        <Button type="primary"
                                onClick={() => execPlayerCommand(player, "c_settemperature", 25)}>{t('panel.setTemperature25')}</Button>

                        <Button type="primary"
                                onClick={() => execPlayerCommand(player, "c_godmode", null)}>{t('panel.godModeOn')}</Button>
                        <Button type="primary"
                                onClick={() => execPlayerCommand(player, "c_godmode", null)}>{t('panel.godModeOff')}</Button>
                        <Button type="primary"
                                onClick={() => resetskilltree(player)}>{t('panel.resetSkillTree')}</Button>
                        <Button type="primary"
                                onClick={() => dropEverything(player)}>{t('panel.dropAllItems')}</Button>
                    </Space>
                </Card>
                <br/>
                <Card title={t('panel.teleportPlayer')}>
                    <Space size={8} wrap>
                        <span>{t('panel.teleportToPlayer')}</span>
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
                        }}>{t('panel.teleport')}</Button>
                    </Space>
                </Card>
                <br/>
                <Card title={t('panel.forestOperations')}>
                    <Space size={[8, 16]} wrap>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'pigking')}>{t('panel.gotoPigKing')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'dragonfly')}>{t('panel.gotoDragonfly')}</Button>

                        <Button type={'primary'} onClick={() => gotoNext(player, 'malbatross')}>{t('panel.gotoMalbatross')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'beequeenhivegrown')}>{t('panel.gotoBeeQueen')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'crabking')}>{t('panel.gotoCrabKing')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'klaus_sack')}>{t('panel.gotoKlausSack')}</Button>

                        <Button type={'primary'} onClick={() => gotoNext(player, 'moonbase')}>{t('panel.gotoMoonBase')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'critterlab')}>{t('panel.gotoCritterLab')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'stagehand')}>{t('panel.gotoStagehand')}</Button>

                        <Button type={'primary'}
                                onClick={() => gotoNext(player, 'multiplayer_portal')}>{t('panel.gotoMultiplayerPortal')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'oasislake')}>{t('panel.gotoOasisLake')}</Button>

                        <Button type={'primary'} onClick={() => gotoNext(player, 'lava_pond')}>{t('panel.gotoLavaPond')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'moon_fissure')}>{t('panel.gotoMoonFissure')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'hermitcrab')}>{t('panel.gotoHermitCrab')}</Button>

                        <Button type={'primary'} onClick={() => gotoNext(player, 'wormhole')}>{t('panel.gotoWormhole')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'statueglommer')}>{t('panel.gotoStatueGlommer')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'walrus_camp')}>{t('panel.gotoWalrusCamp')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'beequeenhive')}>{t('panel.gotoBeeQueenHive')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'chester_eyebone')}>{t('panel.gotoChesterEyebone')}</Button>

                        <Button type={'primary'} onClick={() => gotoNext(player, 'lightninggoat')}>{t('panel.gotoLightningGoat')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'beefalo')}>{t('panel.gotoBeefalo')}</Button>

                        <Button type={'primary'}
                                onClick={() => gotoNext(player, 'sculpture_bishophead')}>{t('panel.gotoSculptureBishop')}</Button>
                        <Button type={'primary'}
                                onClick={() => gotoNext(player, 'sculpture_knighthead')}>{t('panel.gotoSculptureKnight')}</Button>
                        <Button type={'primary'}
                                onClick={() => gotoNext(player, 'sculpture_rooknose')}>{t('panel.gotoSculptureRook')}</Button>

                    </Space>
                </Card>
                <br/>
                <Card title={t('panel.caveOperations')}>
                    <Space size={[8, 16]} wrap>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'toadstool_cap')}>{t('panel.gotoToadstool')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'atrium_gate')}>{t('panel.gotoAtriumGate')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'minotaur')}>{t('panel.gotoMinotaur')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'hutch_fishbowl')}>{t('panel.gotoHutchFishbowl')}</Button>
                        <Button type={'primary'}
                                onClick={() => gotoNext(player, 'archive_security_desk')}>{t('panel.gotoArchiveSecurityDesk')}</Button>
                        <Button type={'primary'}
                                onClick={() => gotoNext(player, 'ancient_altar_broken')}>{t('panel.gotoAncientAltarBroken')}</Button>
                        <Button type={'primary'} onClick={() => gotoNext(player, 'ancient_altar')}>{t('panel.gotoAncientAltar')}</Button>
                    </Space>
                </Card>
            </Drawer>
        </>
    );
}