import {
    CloudServerOutlined,
    GithubFilled,
    LogoutOutlined, UserOutlined,
} from '@ant-design/icons';
import type {ProSettings} from '@ant-design/pro-components';
import {
    PageContainer,
    ProCard,
    ProConfigProvider,
    ProLayout,
    // SettingDrawer,
} from '@ant-design/pro-components';
import {
    Typography,
    ConfigProvider,
    Dropdown, Avatar, Tag
} from 'antd';
import {useEffect, useState} from 'react';
import defaultProps from './_defaultProps';
import {Outlet, useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {http} from '../utils/http';
import {ToggleLanguage} from "./Language.tsx";
import ToggleTheme from "./ToggleTheme.tsx";

import {useTheme} from "../hooks/useTheme";
import {useThemeConfigStore} from "../store/useThemeConfigStore";

const {Link} = Typography;

declare const __APP_VERSION__: string;

export default () => {

    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        // fixSiderbar: true,
        // layout: 'mix',
        // splitMenus: false,
        "fixSiderbar": true,
        "layout": "side",
        "splitMenus": false,
        "navTheme": "light",
        "contentWidth": "Fluid",
        "fixedHeader": true
    });
    const firstPagePath = '/panel';
    const location = useLocation()
    const [pathname, setPathname] = useState(location.pathname);
    const paddingInlinePageContainerContent = 24;
    if (typeof document === 'undefined') {
        return <div/>;
    }

    const navigate = useNavigate()
    const {t} = useTranslation()

    const [account, setAcount] = useState({
        displayName: '',
        email: '',
        photoURL: ''
    })
    useEffect(() => {
        const userJson = localStorage.getItem('user') || '{}';
        let user = JSON.parse(userJson);
        if (user === null) {
            user = {
                displayName: '',
                email: '',
                photoURL: ''
            }
        }
        setAcount(user)
    }, [])

    const logout = async () => {
        localStorage.clear()
        const data = await http.get("/api/logout")
        console.log('logout', data);
        navigate('/login', {replace: true});

    };

    const {theme} = useTheme()
    const {themeConfig} = useThemeConfigStore();

    return (
        <div
            id="test-pro-layout"
            style={{
                overflow: 'auto',
            }}
        >
            <ProConfigProvider dark={theme == 'dark'}>
                <ConfigProvider
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                    theme={{
                        "token": themeConfig
                    }}
                >
                    <ProLayout
                        {...defaultProps}
                        location={{
                            pathname,
                        }}
                        logo={(
                            <div onClick={()=>{
                                window.open('https://github.com/carrot-hu23/dst-admin-go', '_blank');
                            }} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <Tag bordered={false} color={themeConfig.colorPrimary}>v{__APP_VERSION__}</Tag>
                            </div>
                        )}
                        token={{
                            bgLayout: theme === 'dark' ? '#000000' : '#F1F2F5',
                            sider: {
                                colorMenuBackground: theme === 'dark'? '#000000' : '#FFFFFF',
                                colorBgMenuItemSelected: theme === 'dark'? '#383838' : '#F1F2F5',
                            },
                        }}
                        // siderMenuType="group"
                        menu={{
                            collapsedShowGroupTitle: true,
                        }}
                        menuDataRender={menuData => {
                            return menuData.map(menu => {
                                return {
                                    ...menu, name: t(menu.name as string),
                                    children: menu.children?.map(child => {
                                        return {
                                            ...child,
                                            name: t(child.name as string),
                                        }
                                    })
                                }
                            })
                        }}
                        title="Dst-admin-go"
                        avatarProps={{
                            src: account.photoURL || <Avatar style={{ backgroundColor: themeConfig.colorPrimary }}>{account?.displayName[0]}</Avatar>,
                            size: 'small',
                            title: account.displayName,
                            render: (_props, dom) => {
                                return (
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'logout',
                                                    icon: <LogoutOutlined/>,
                                                    label: t('header.logout'),
                                                    onClick: () => logout(),
                                                },
                                                {
                                                    key: 'userProfile',
                                                    icon: <UserOutlined />,
                                                    label: t('header.userProfile'),
                                                    onClick: () => navigate('/userProfile'),
                                                },
                                            ],
                                        }}
                                    >
                                        {dom}
                                    </Dropdown>
                                );
                            },
                        }}
                        actionsRender={(props) => {
                            if (props.isMobile) return [
                                <div onClick={() => {
                                    window.open('https://github.com/carrot-hu23/dst-admin-go', '_blank');
                                }}><GithubFilled key="GithubFilled"/></div>,
                                <ToggleLanguage/>,
                                <ToggleTheme/>
                            ];
                            if (typeof window === 'undefined') return [];
                            return [
                                <Link target={'_blank'} href={'https://www.lcayun.com/aff/OYXIWEQC'}>
                                    莱卡云
                                    <CloudServerOutlined />
                                </Link>,
                                <div onClick={() => {
                                    window.open('https://github.com/carrot-hu23/dst-admin-go', '_blank');
                                }}>
                                    <GithubFilled key="GithubFilled"/></div>,
                                <ToggleLanguage/>,
                                <ToggleTheme/>
                            ];
                        }}
                        headerTitleRender={(_logo, _title, _) => {
                            const defaultDom = (
                                <a>
                                    {t('web.title')}
                                </a>
                            );
                            if (typeof window === 'undefined') return defaultDom;
                            if (document.body.clientWidth < 1400) {
                                return defaultDom;
                            }
                            if (_.isMobile) return defaultDom;
                            return (
                                <>
                                    {defaultDom}
                                </>
                            );
                        }}
                        onMenuHeaderClick={(e) => console.log(e)}
                        menuItemRender={(item, dom) => (
                            <div
                                onClick={() => {
                                    navigate(item.path as string)
                                    setPathname(item.path || firstPagePath);
                                }}
                            >
                                {dom}
                            </div>
                        )}
                        {...settings}
                    >
                        <PageContainer
                            token={{
                                paddingInlinePageContainerContent,
                            }}
                            // 去掉面包屑
                            breadcrumbRender={false}
                            title={false}
                        >
                            {(location.pathname === firstPagePath
                                || location.pathname === '/dashboard'
                                || location.pathname === '/home/clusterIni') && (
                                <Outlet/>
                            )}
                            {(location.pathname !== firstPagePath
                                && location.pathname !== '/dashboard'
                                && location.pathname !== '/home/clusterIni') && (
                                <ProCard>
                                    <Outlet/>
                                </ProCard>
                            )}
                        </PageContainer>

                        {/*
                         <SettingDrawer
                            pathname={pathname}
                            enableDarkTheme
                            getContainer={(e: any) => {
                                if (typeof window === 'undefined') return e;
                                return document.getElementById('test-pro-layout');
                            }}
                            settings={settings}
                            onSettingChange={(changeSetting) => {
                                setSetting(changeSetting);
                            }}
                            disableUrlParams={false}
                        />
                        */}
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};