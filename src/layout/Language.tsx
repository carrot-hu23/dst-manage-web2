import {useTranslation} from "react-i18next";
import {Dropdown} from "antd";
import {TranslationOutlined} from "@ant-design/icons";

export const LANGUAGES = [
    { key: 'en', label: 'English' },
    { key: 'zh', label: '中文' },
    { key: 'jp', label: '日本語' },
    { key: 'kr', label: '한국인' },
    { key: 'es', label: 'Español' },
]

export const ToggleLanguage = () => {

    const {i18n} = useTranslation();
    // @ts-ignore
    const onClick = ({key}) => {
        localStorage.setItem('language', key)
        i18n.changeLanguage(key)
    };
    return (
        <>

            <Dropdown
                menu={{
                    items: LANGUAGES,
                    onClick,
                }}
                placement="bottomRight"
            >
                <TranslationOutlined />
            </Dropdown>
        </>
    )
}