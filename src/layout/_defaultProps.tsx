import {
    AppstoreOutlined,
    CompassOutlined,
    DashboardOutlined,
    DesktopOutlined,
    FolderOutlined,
    GithubOutlined,
    GlobalOutlined,
    HomeOutlined,
    SettingOutlined,
    SmileFilled, TeamOutlined,
} from '@ant-design/icons';
export default {
    route: {
        routes: [
            {
                path: '/dashboard',
                name: 'menu.dashboard',
                icon: <DashboardOutlined />,
                
            },
            {
                path: '/panel',
                name: 'menu.panel',
                icon: <DesktopOutlined />,
            },
            {
                path: '/home',
                name: 'menu.home',
                icon: <HomeOutlined />,
                routes: [
                    {
                        path: '/home/clusterIni',
                        name: 'menu.home.clusterIni',
                    },
                    {
                        path: '/home/adminlist',
                        name: 'menu.home.adminlist',
                    },
                    {
                        path: '/home/whitelist',
                        name: 'menu.home.whitelist',
                    },
                    {
                        path: '/home/blacklist',
                        name: 'menu.home.blacklist',
                    },
                ]
            },
            {
                path: '/levels',
                name: 'menu.levels',
                icon: <AppstoreOutlined />,
                routes: [
                    {
                        path: '/levels/levels',
                        name: 'menu.levels.levels',
                    },
                    {
                        path: '/levels/selectorMod',
                        name: 'menu.levels.selectorMod',
                    },
                    {
                        path: '/levels/preinstall',
                        name: 'menu.levels.preinstall',
                    },
                    {
                        path: '/levels/genMap',
                        name: 'menu.levels.genMap',
                    },
                ],
            },
            {
                path: '/mod',
                name: 'menu.mod',
                icon: <GlobalOutlined />,
            },
            {
                path: '/backup',
                name: 'menu.backup',
                icon: <FolderOutlined />,
            },
            {
                path: '/playerLog',
                name: 'menu.log',
                icon: <TeamOutlined />,
            },
            {
                path: '/setting',
                name: 'menu.setting',
                icon: <SettingOutlined />,
            },
            {
                path: '/lobby',
                name: 'menu.lobby',
                icon: <CompassOutlined />,
            },
            {
                path: '/help',
                name: 'menu.help',
                icon: <SmileFilled />,
            },
            {
                path: '/github',
                name: 'menu.github',
                icon: <GithubOutlined />,
            },
        ],
    },
    location: {
        pathname: '/panel',
    },
    appList: [
        {
            // icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            title: '饥荒查房dstserverlist',
            desc: '饥荒查房网站',
            url: 'https://dstserverlist.top/',
            target: '_blank',
        },
        {
            // icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            title: '饥荒ip中转',
            desc: 'https://server.dstapi.com/server/',
            url: 'https://server.dstapi.com/server/',
            target: '_blank',
        },

    ],
};