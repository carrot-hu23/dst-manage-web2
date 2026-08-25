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