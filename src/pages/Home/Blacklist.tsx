import NameList from "./NameList/index.tsx";
import {getBlacklistApi, saveBlacklistApi} from "../../api/levelApi";
import {useTranslation} from "react-i18next";

const Blacklist: React.FC = () => {

    const {t} = useTranslation();

    return (<>
        <NameList
            title={t('cluster.blacklist')}
            getApi={getBlacklistApi}
            saveApi={saveBlacklistApi}
            tips={`保存在该文件内的ID对应的玩家将不能加入该房间。`}
        />
    </>)
}

export default Blacklist;
