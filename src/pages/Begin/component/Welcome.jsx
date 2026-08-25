import {useTranslation} from "react-i18next";
import {Typography} from "antd";
const { Title } = Typography;

const Welcome = () => {
    const { t } = useTranslation()
    return(
        <>
            <Title level={2}>{t('begin.welcome.title')}</Title>
            <div>
                <img src="/assets/pig.gif" alt="login" />
            </div>
        </>
    )
}

export default Welcome