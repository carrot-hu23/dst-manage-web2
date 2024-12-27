import NameList from "./NameList/index.jsx";
import {getAdminlistApi, saveAdminlistApi} from "../../api/8level.jsx";
import {useTranslation} from "react-i18next";

export default ()=>{

    const {t} = useTranslation()

    return(<>
        <NameList
            title={t('cluster.adminlist')}
            getApi={getAdminlistApi}
            saveApi={saveAdminlistApi}
            tips={'管理员可以在游戏内拥有管理权限，包括踢出玩家、封禁玩家、回档、使用控制台执行指令等'}
        />
    </>)
}