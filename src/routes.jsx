import {Navigate, useParams, useRoutes} from 'react-router-dom';

import Login from './pages/Login/index.jsx';

import Backup from './pages/Backup/index.jsx';
import Setting from './pages/System/index.jsx';
import Github from './pages/Github/index.jsx';
import Panel from './pages/Panel/index.jsx';
import Begin from './pages/Begin/index.jsx';
import Link from "./pages/WebLink/index.jsx";

import Help from "./pages/Help/index.jsx";

import Levels from "./pages/Levels/index.jsx";
import DstServerList from "./pages/DstServerList/index.jsx";
import Mod from "./pages/Mod/index.jsx";
import PlayerLog from "./pages/PlayerLog/index.jsx";
import Layout from "./layout/index";
import Dashboard from "./pages/Dashboard/index.jsx";
import Preinstall from "./pages/Tool/Preinstall/index.jsx";
import Assembly from "./pages/Tool/Assembly/index.jsx";
import ClusterIni from "./pages/Home/ClusterIni/index.jsx";
import Page404 from "./pages/Page404/index";
import DstMapData from "./pages/DstData/DstMapData";
import Adminlist from "./pages/Home/Adminlist.jsx";
import Whitelist from "./pages/Home/Whitelist.jsx";
import Blacklist from "./pages/Home/Blacklist.jsx";
import UserProfile from "./layout/UserProfile.jsx";
import TooManyItemsPlus from "./pages/TooManyItemsPlus";
import AddMod from "./pages/Mod/AddMod/index.jsx";
import Level2 from "./pages/Level2/index";
import ModViewer from "./pages/ModViewer/index";

// layout outside
import LayoutSide from "./layoutSide/index";
import ClusterList from "./pages/ClusterList/index";
import UserList from "./pages/UserList/index.jsx";
import Server from "./pages/ClusterList/Server/index.jsx";

function RedirectToPanel() {
    const { cluster, name } = useParams();
    return <Navigate to={`/${cluster}/${name}/panel`} replace />;
}


export default function Routes() {
    return useRoutes([
        {
            path: '/:cluster/:name/',
            element: <Layout/>,
            children: [
                {
                    element: <RedirectToPanel />, // 这里替换 Navigate
                    index: true,
                },
                {path: 'dashboard', element: <Dashboard/>},
                {path: 'playerLog', element: <PlayerLog/>},
                {path: 'mod', element: <Mod/>},
                {path: 'panel', element: <Panel/>},
                {path: 'mod/add/:modId', element: <AddMod/>},
                {
                    path: 'home',
                    children: [
                        {path: 'clusterIni', element: <ClusterIni/>},
                        {path: 'adminlist', element: <Adminlist/>},
                        {path: 'whitelist', element: <Whitelist/>},
                        {path: 'blacklist', element: <Blacklist/>},
                    ]
                },
                {
                    path: 'levels',
                    children: [
                        {path: 'levels', element: <Levels/>},
                        {path: 'selectorMod', element: <Assembly/>},
                        {path: 'preinstall', element: <Preinstall/>},
                        {path: 'genMap', element: <DstMapData/>},
                    ]
                },
                {path: 'backup', element: <Backup/>},
                {path: 'setting', element: <Setting/>},
                {path: 'toomanyitemsplus', element: <TooManyItemsPlus/>},
            ],
        },
        {
            element: <LayoutSide/>,
            children: [
                {element: <Navigate to="/cluster"/>, index: true},
                {
                    path: '/cluster',
                    element: <Server />,
                },
                {path: 'userList', element: <UserList/>},
                {path: 'userProfile', element: <UserProfile/>},
                {path: 'link', element: <Link/>},
                {path: 'lobby', element: <DstServerList/>},
                {path: 'github', element: <Github/>},
                {path: 'help', element: <Help/>},
                {path: '404', element: <Page404/>},
                {path: '*', element: <Navigate to="/404"/>},
                {path: 'level2', element: <Level2 />},
                {path: 'mod2', element: <ModViewer />},
            ],
        },
        {
            path: 'login',
            element: <Login/>,
        },
        {
            path: 'init',
            element: <Begin/>,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);
}
