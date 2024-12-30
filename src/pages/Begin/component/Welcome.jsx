import {useTranslation} from "react-i18next";
import {Typography} from "antd";
const { Title } = Typography;

const Welcome = () => {
    const { t } = useTranslation()
    return(
        <>
            <Title level={2}>欢迎使用饥荒管理面板</Title>
            <Title level={2}>Welcome to dst-admin-web management platform</Title>
            <div>
                <img src="/assets/pig.gif" alt="login" />
            </div>
        </>
    )
}

export default Welcome