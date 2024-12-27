import {Button, Drawer} from "antd";
import {useState} from "react";
import {useTranslation} from "react-i18next";
// @ts-ignore
import BackupList from "../../Backup/BackupList/index.jsx";

// @ts-ignore
export default ({block}) => {

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const {t} = useTranslation()

    return (
        <>
            <Button block={block} type="primary" onClick={showDrawer}>{t('panel.archive')}</Button>
            <Drawer title="存档列表" onClose={onClose} open={open} width={1200}>
                <div>
                    <BackupList />
                </div>
            </Drawer>
        </>
    )

}