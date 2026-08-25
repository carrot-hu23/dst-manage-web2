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
            tips={t('cluster.blacklist.tips')}
        />
    </>)
}

export default Blacklist;
