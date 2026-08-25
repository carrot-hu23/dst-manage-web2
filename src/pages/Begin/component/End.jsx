import { useTranslation } from "react-i18next";

const End = () => {
    const { t } = useTranslation();
    return (
        <>
            <h3>{t('begin.end.title')}</h3>
            <div>
            <img src="/assets/pig.gif" alt="login" />
            </div>
        </>
    )
}

export default End