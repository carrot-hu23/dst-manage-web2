import {useTranslation} from "react-i18next";
import {Dropdown} from "antd";
import {TranslationOutlined} from "@ant-design/icons";

export const ToggleLanguage = () => {

    const {i18n} = useTranslation();
    // @ts-ignore
    const onClick = ({key}) => {
        localStorage.setItem('language', key)
        i18n.changeLanguage(key)
    };
    const items = [
        {
            label: 'English',
            key: 'en',
        },
        {
            label: '中文',
            key: 'zh',
        },
        {
            label: '日本語',
            key: 'jp'
        },
        {
            label: '한국인',
            key: 'kr'
        }
    ];
    return (
        <>

            <Dropdown
                menu={{
                    items,
                    onClick,
                }}
                placement="bottomRight"
            >
                <TranslationOutlined />
            </Dropdown>
        </>
    )
}