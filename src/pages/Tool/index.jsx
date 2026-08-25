import React from "react";
import {useTranslation} from "react-i18next";

import {Tabs} from "antd";

import Assembly from "./Assembly";
import Preinstall from "./Preinstall";

export default ()=>{
    const {t} = useTranslation()

    const items = [
        {
            label: t('tool.tab.assembly'),
            children: <div>
                <Assembly />
            </div>,
            key: '1',
        },
        {
            label: t('menu.levels.preinstall'),
            children: <Preinstall />,
            key: '2',
            forceRender: true,
        },
    ]

    return(
        <>
            <Tabs
                items={items}
            />
        </>
    )
}