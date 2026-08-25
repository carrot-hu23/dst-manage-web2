import React from "react";

import {
    Typography, theme as antTheme, Collapse, Image
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
            label: t('clusterIniTips.getClusterToken'),
            children:
                <Typography>
                    <Paragraph>
                        <Title level={5}>{t('clusterIniTips.method1.title')}</Title>
                        {t('clusterIniTips.method1.visit')}
                        <Link
                            href=" https://accounts.klei.com/account/game/servers?game=DontStarveTogether">{t('clusterIniTips.kleiWebsite')}</Link>
                        {t('clusterIniTips.method1.steps')}
                        <Title level={5}>{t('clusterIniTips.method2.title')}</Title>
                        <Paragraph>
                            {t('clusterIniTips.method2.step1')}
                        </Paragraph>
                        <Paragraph>
                            {t('clusterIniTips.method2.step2')}
                            <Text code>TheNet:GenerateClusterToken()</Text>
                            {t('clusterIniTips.method2.tildeKeyHint')}
                        </Paragraph>
                        <Paragraph>
                            {t('clusterIniTips.method2.tokenFileInfo')}
                            %userprofile%\Documents\Klei\DoNotStarveTogether\
                            {t('clusterIniTips.method2.pathExample')}
                            C:\Users\xxx\Documents\Klei\DoNotStarveTogether\132274880\cluster_token.txt
                        </Paragraph>
                    </Paragraph>
                </Typography>,
            style: panelStyle,
        },
        {
            key: '2',
            label: t('clusterIniTips.serverTandem.title'),
            children:
                <>
                    <p>{t('clusterIniTips.serverTandem.reference')}<Link
                        href="https://atjiu.github.io/dstmod-tutorial/#/multi_dedicated_server">https://atjiu.github.io/dstmod-tutorial/#/multi_dedicated_server</Link>
                    </p>
                    {t('clusterIniTips.serverTandem.explanation')}
                </>,
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