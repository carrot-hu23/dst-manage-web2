import React from "react";

import {
    Typography, theme as antTheme, Collapse
} from "antd";
import {useTranslation} from "react-i18next";
import {CaretRightOutlined} from "@ant-design/icons";
import {useTheme} from "../../../hooks/useTheme";

const { Title, Paragraph, Text, Link } = Typography;

export default ()=>{
    const {theme} = useTheme();
    const { t } = useTranslation()
    const { token } = antTheme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
        marginRight: '8px'
    };

    const getTips = (panelStyle) => [
        {
            key: '1',
            label: t('levelTips.layerCount.title'),
            children:
                <Typography>
                    <Paragraph>
                        <Paragraph>
                            {t('levelTips.layerCount.para1')}
                        </Paragraph>
                        <Paragraph>
                            {t('levelTips.layerCount.para2')}
                        </Paragraph>
                        <Paragraph>
                            {t('levelTips.layerCount.para3')}
                        </Paragraph>
                    </Paragraph>
                </Typography>,
            style: panelStyle,
        },
        {
            key: '2',
            label: t('levelTips.levelJson.title'),
            children: <Typography>
                <Paragraph>
                    <Paragraph>
                        {t('levelTips.levelJson.para1')}
                    </Paragraph>
                    <Paragraph>
                        {t('levelTips.levelJson.para2')}
                    </Paragraph>
                    <ul>
                        <li>{t('levelTips.levelJson.nameField')}</li>
                        <li>{t('levelTips.levelJson.fileField')}</li>
                    </ul>
                    <Paragraph>
                        {t('levelTips.levelJson.example')}
                    </Paragraph>
                    <pre>{'{"levelList":[{"name":"森林","file":"Master"},{"name":"洞穴","file":"Caves"},{"name":"森林1","file":"Master1"},{"name":"洞穴1","file":"Caves1"}]}'}</pre>

                </Paragraph>
            </Typography>,
            style: panelStyle,
        },
        {
            key: '3',
            label: t('levelTips.visualFailure.title'),
            children: <Typography>
                <Paragraph>
                    <Paragraph>
                        {t('levelTips.visualFailure.para1')}
                    </Paragraph>
                    <Paragraph>
                        {t('levelTips.visualFailure.para2')}
                    </Paragraph>

                </Paragraph>
            </Typography>,
            style: panelStyle,
        },
    ]

    return(
        <>
            <Collapse
                bordered={false}
                // defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{
                    background: theme === 'dark'?'#1E1E1E':'#FFFFFF',
                }}
                items={getTips(panelStyle)}
            />
        </>
    )
}