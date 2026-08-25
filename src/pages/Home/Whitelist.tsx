import NameList from "./NameList/index.tsx";
import {getWhitelistApi, saveWhitelistApi} from "../../api/levelApi";
import {useTranslation} from "react-i18next";

const Whitelist: React.FC = () => {

    const {t} = useTranslation();

    return (<>
        <NameList
            title={t('cluster.whitelist')}
            getApi={getWhitelistApi}
            saveApi={saveWhitelistApi}
            tips={t('cluster.whitelist.tips')}
        />
    </>)
}

export default Whitelist;
