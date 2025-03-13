import {
    CompassOutlined,
    DashboardOutlined,
    GithubOutlined, SmileFilled, UsergroupAddOutlined,
} from '@ant-design/icons';
export default {
    route: {
        routes: [
            {
                path: '/cluster',
                name: 'menu.cluster',
                icon: <DashboardOutlined />,
                
            },
            {
                path: '/userList',
                name: 'menu.userList',
                icon: <UsergroupAddOutlined />,
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