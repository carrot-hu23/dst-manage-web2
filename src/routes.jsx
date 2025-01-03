import {Navigate, useRoutes} from 'react-router-dom';

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

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {element: <Navigate to="/panel"/>, index: true,},
                {path: 'dashboard', element: <Dashboard/>},
                {path: 'playerLog', element: <PlayerLog/>},
                {path: 'mod', element: <Mod/>},
                {path: 'panel', element: <Panel/>},
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
                {path: 'github', element: <Github/>},
                {path: 'help', element: <Help/>},
                {path: 'lobby', element: <DstServerList/>},
                {path: 'userProfile', element: <UserProfile/>},
                {path: 'link', element: <Link/>},
                {path: 'toomanyitemsplus', element: <TooManyItemsPlus/>},
                {path: '404', element: <Page404/>},
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
