import React from "react";
import {Tabs} from "antd";
import {useTranslation} from "react-i18next";
import BackupList from "./BackupList/index.jsx";
import SnapshotBackup from "./SnapshotBackup/index.jsx";


export default ()=>{
    const { t } = useTranslation()

    const items = [
        {
            key: '1',
            label: t("backup.BackupList"),
            children: <BackupList showStatistic={true}/>,
        },
        {
            key: '2',
            label: t("backup.SnapshotBackup"),
            children: <SnapshotBackup/>,
        },
    ]

    return(
        <Tabs defaultActiveKey="1" items={items}/>
    )
}