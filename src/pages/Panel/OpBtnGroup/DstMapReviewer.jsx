import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Drawer} from "antd";
import DstMapData from "../../DstData/DstMapData";

export default ({block})=>{
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
            <Button block={block} type="primary" onClick={showDrawer}>{t('panel.mapReviewer')}</Button>
            <Drawer destroyOnClose={true} title="地图数据" onClose={onClose} open={open} width={1200}>
                <div>
                    <DstMapData />
                </div>
            </Drawer>
        </>
    )
}