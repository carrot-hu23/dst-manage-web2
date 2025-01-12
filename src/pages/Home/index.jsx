import {Card, Tabs} from "antd";
import {useTranslation} from "react-i18next";

import ClusterIni from "./ClusterIni";
import NameList from "./NameList";
import {
    getAdminlistApi,
    getBlacklistApi,
    getWhitelistApi,
    saveAdminlistApi,
    saveBlacklistApi,
    saveWhitelistApi
} from "../../api/level.jsx";

export default () => {
    const { t } = useTranslation()
    const tabs = [
        {
            key: '1',
            label: t('cluster.clusterIni'),
            children: <ClusterIni/>
        },
        {
            key: '3',
            label: t('cluster.adminlist'),
            children: <NameList
                title={t('cluster.adminlist')}
                getApi={getAdminlistApi}
                saveApi={saveAdminlistApi}
                tips={`管理员KleilD列表\n
                管理员可以在游戏内拥有管理权限，包括踢出玩家、封禁玩家、回档、使用控制台执行指令等。\n
                支持KleilD (KU_xXXXXXXx) 。
                `}/>
        },
        {
            key: '4',
            label: t('cluster.whitelist'),
            children: <NameList
                title={t('cluster.whitelist')}
                getApi={getWhitelistApi}
                saveApi={saveWhitelistApi}
                tips={`白名单KleilD列表\n
加入白名单的玩家将可以使用保留栏位的位置,避免其他玩家过多导致不能进入服务器。`}/>
        },
        {
            key: '5',
            label: t('cluster.blacklist'),
            children: <NameList
                title={t('cluster.blacklist')}
                getApi={getBlacklistApi}
                saveApi={saveBlacklistApi}
                tips={`被封禁玩家列表\n
保存在该文件内的ID对应的玩家将不能加入该房间。\n
支持KleilD ( KU_xxxxxxxx )和SteamlD
(7656xXXxxXXXxxxxx)。`}/>
        },
    ]

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                items={tabs}
            />
        </>
    )
}