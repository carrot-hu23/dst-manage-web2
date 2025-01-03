import NameList from "./NameList/index.jsx";
import {useTranslation} from "react-i18next";
import {getWhitelistApi, saveWhitelistApi} from "../../api/level.jsx";

export default () => {

    const {t} = useTranslation()

    return (<>
        <NameList
            title={t('cluster.whitelist')}
            getApi={getWhitelistApi}
            saveApi={saveWhitelistApi}
            tips={`加入白名单的玩家将可以使用保留栏位的位置,避免其他玩家过多导致不能进入服务器。`}
        />
    </>)
}