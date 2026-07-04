import NameList from "./NameList/index.tsx";
import {getAdminlistApi, saveAdminlistApi} from "../../api/levelApi";
import {useTranslation} from "react-i18next";

const Adminlist: React.FC = () => {

    const {t} = useTranslation();

    return(<>
        <NameList
            title={t('cluster.adminlist')}
            getApi={getAdminlistApi}
            saveApi={saveAdminlistApi}
            tips={'管理员可以在游戏内拥有管理权限，包括踢出玩家、封禁玩家、回档、使用控制台执行指令等'}
        />
    </>)
}

export default Adminlist;
