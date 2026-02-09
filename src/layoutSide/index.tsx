import {
    GithubFilled,
    LogoutOutlined, UserOutlined,
} from '@ant-design/icons';
import type {ProSettings} from '@ant-design/pro-components';
import {
    ProConfigProvider,
    ProLayout,
    // SettingDrawer,
} from '@ant-design/pro-components';
import {
    Avatar,
    ConfigProvider,
    Dropdown, Tag,
} from 'antd';
import {useEffect, useState} from 'react';

import defaultProps from './_defaultProps';
import {Outlet, useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {http} from '../utils/http';
import {ToggleLanguage} from "../layout/Language.tsx";
import ToggleTheme from "../layout/ToggleTheme.tsx";

import {useTheme} from "../hooks/useTheme/index.jsx";
import {useThemeConfigStore} from "../store/useThemeConfigStore.tsx";

declare const __APP_VERSION__: string;

export default () => {


    const [settings] = useState<Partial<ProSettings> | undefined>(
        {
            "fixSiderbar": true,
            "layout": "side",
            "splitMenus": false,
            "navTheme": "light",
            "contentWidth": "Fluid",
            "fixedHeader": true
        }
    );
    const firstPagePath = '/panel';
    const location = useLocation()
    const [pathname, setPathname] = useState(location.pathname);

    if (typeof document === 'undefined') {
        return <div/>;
    }

    const navigate = useNavigate()
    const {t} = useTranslation()

    const [account, setAcount] = useState({
        displayName: '',
        email: '',
        photoURL: '',
        role: ''
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

    // @ts-ignore
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
                            return menuData
                                .filter(menu => {
                                    // 过滤掉没有权限的菜单项
                                    if (account.role === 'admin') {
                                        return true; // 管理员拥有所有权限
                                    } else {
                                        if (menu.path === '/userList') {
                                            return false; // 普通用户没有权限访问设置页面
                                        }
                                    }
                                    // 这里可以根据实际需求添加更多的权限判断逻辑
                                    return true; // 普通用户显示所有菜单项（根据需要修改）
                                })
                                .map(menu => {
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
                        title={(
                            <div onClick={()=>{
                                window.open('https://github.com/carrot-hu23/dst-admin-go', '_blank');
                            }}>
                                <span style={{paddingRight: 8}}>
                                    Dst-admin-go
                                </span>
                                <Tag bordered={false} color={themeConfig.colorPrimary}>v{__APP_VERSION__}</Tag>
                            </div>
                        )}
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
                                                    icon: <UserOutlined/>,
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
                        <Outlet/>
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};