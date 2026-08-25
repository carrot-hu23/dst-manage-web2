import { Button, Popconfirm, message } from 'antd';
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default () => {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);

        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            message.success(t('begin.steamcmd.install.success'))
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <Popconfirm
            title={t('begin.steamcmd.install.title')}
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
                loading: confirmLoading,
            }}
            onCancel={handleCancel}
        >
            <Button type="link"
                onClick={showPopconfirm}
            >{t('begin.steamcmd.install.button')}</Button>
        </Popconfirm>
    )
}