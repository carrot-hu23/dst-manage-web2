import NameList from "./NameList/index.jsx";
import {useTranslation} from "react-i18next";
import {getBlacklistApi, saveBlacklistApi} from "../../api/8level.jsx";

export default () => {

    const {t} = useTranslation()

    return (<>
        <NameList
            title={t('cluster.blacklist')}
            getApi={getBlacklistApi}
            saveApi={saveBlacklistApi}
            tips={`保存在该文件内的ID对应的玩家将不能加入该房间。`}
        />
    </>)
}