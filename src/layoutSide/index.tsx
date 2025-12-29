import {
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
    ConfigProvider,
    Dropdown,
} from 'antd';
import {useEffect, useState} from 'react';
// @ts-ignore
import defaultProps from './_defaultProps';
import {Outlet, useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {http} from '../utils/http';
import {ToggleLanguage} from "../layout/Language.tsx";
import ToggleTheme from "../layout/ToggleTheme.tsx";
// @ts-ignore
import {useTheme} from "../hooks/useTheme/index.jsx";

export default () => {

    // @ts-ignore
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: false,
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
                >
                    <ProLayout
                        {...defaultProps}
                        location={{
                            pathname,
                        }}
                        logo={null}
                        token={{
                            header: {
                                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
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
                                <div style={{
                                    paddingTop: 16
                                }}>
                                    <ToggleTheme/>
                                </div>
                            ];
                            if (typeof window === 'undefined') return [];
                            return [
                                <div onClick={() => {
                                    window.open('https://github.com/carrot-hu23/dst-admin-go', '_blank');
                                }}>
                                    <GithubFilled key="GithubFilled"/></div>,
                                <ToggleLanguage/>,
                                <div style={{
                                    paddingTop: 16
                                }}>
                                    <ToggleTheme/>
                                </div>
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
                                || location.pathname === '/cluster') && (
                                <Outlet/>
                            )}
                            {(location.pathname !== firstPagePath
                                && location.pathname !== '/cluster') && (
                                <ProCard>
                                    <Outlet/>
                                </ProCard>
                            )}
                        </PageContainer>
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};