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
            tips={t('cluster.adminlist.tips')}
        />
    </>)
}

export default Adminlist;
