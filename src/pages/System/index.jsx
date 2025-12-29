import React from "react";

import {Tabs} from "antd";
import {useTranslation} from "react-i18next";
import DstConfigSetting from "./DstConfigSetting/index.jsx";
import TimedTask from "./TimedTask/index.jsx";
import AutoGameUpdate from "./AutoGameUpdate/index.jsx";
import AutoGameDown from "./AutoGameDown/index.jsx";
import AutoModUpdate from "./AutoModUpdate/index.jsx";
import WebLinkSetting from "./WebLinkSetting/index.jsx";


const System = () => {

    const {t} = useTranslation()

    const items = [
        {
            key: '2',
            label: t('setting.timedTask'),
            children: <TimedTask/>,
        },
        {
            key: '3',
            label: t('setting.autoGameUpdate'),
            children: <AutoGameUpdate/>,
        },
        {
            key: '4',
            label: t('setting.autoGameDown'),
            children: <AutoGameDown/>,
        },
        {
            key: '5',
            label: t('setting.autoModUpdate'),
            children: <AutoModUpdate />,
        },
    ];
    return (
        <Tabs defaultActiveKey="1" items={items}/>

    )
}

export default System