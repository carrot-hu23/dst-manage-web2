import {
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
    Button,
    ConfigProvider,
    Dropdown,
} from 'antd';
import {useEffect, useState} from 'react';
import defaultProps from './_defaultProps';
import {Outlet, useLocation} from "react-router";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {http} from '../utils/http';
import {ToggleLanguage} from "./Language.tsx";
import ToggleTheme from "./ToggleTheme.tsx";


import {useTheme} from "../hooks/useTheme";
import ClusterSelector from "./ClusterSelector";
import {useThemeConfigStore} from "../store/useThemeConfigStore";
import UseIsMobile from "../hooks/UseIsMobile.tsx";
import useIsMobile from "../hooks/UseIsMobile.tsx";


export default () => {

    const {cluster, name} = useParams()


    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(
        {
            "fixSiderbar": true,
            "layout": "side",
            "splitMenus": false,
            "navTheme": "light",
            "contentWidth": "Fluid",
            "fixedHeader": true
        }
    );
    const firstPagePath = `${cluster}/${name}/panel`;
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

    const isMobile = useIsMobile()
    const [collapsed, setCollapsed] = useState(isMobile);

    return (
        <div
            id="test-pro-layout"
            style={{
                // height: '100vh',
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
                        logo={null}
                        // bgLayoutImgList={[
                        //     {
                        //         src: './assets/dark-bg.png',
                        //         // left: 85,
                        //         // bottom: 100,
                        //         // height: '303px',
                        //     }
                        // ]}
                        onCollapse={ (collapsed) => {
                            console.log(collapsed)
                            setCollapsed(collapsed)
                        }}
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
                        avatarProps={{
                            src: account.photoURL,
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
                                <ToggleLanguage/>,
                                <ToggleTheme/>
                            ];
                            if (typeof window === 'undefined') return [];
                            return [
                                <ToggleLanguage/>,
                                <ToggleTheme/>
                            ];
                        }}
                        onMenuHeaderClick={(e) => console.log(e)}
                        menuHeaderRender={()=>!collapsed && <ClusterSelector/>}
                        menuItemRender={(item, dom) => (
                            <div
                                onClick={() => {
                                    navigate(`/${cluster}/${name}${item.path}` as string)
                                    setPathname(item.path || firstPagePath);
                                }}
                            >
                                {dom}
                            </div>
                        )}
                        menuFooterRender={(props) => {
                            if (props?.collapsed) return undefined;
                            return (
                                <div
                                    style={{
                                        paddingLeft: 16
                                    }}
                                >
                                    <Button block type={'primary'} onClick={()=>{
                                        navigate('/cluster')
                                    }}>返回</Button>
                                </div>
                            );
                        }}
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
                                || location.pathname.includes('panel')
                                || location.pathname.includes('dashboard')
                                || location.pathname.includes('home/clusterIni')) && (
                                <Outlet/>
                            )}
                            {(location.pathname !== firstPagePath
                                && !location.pathname.includes('panel')
                                && !location.pathname.includes('dashboard')
                                && !location.pathname.includes('home/clusterIni')) && (
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