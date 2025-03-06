"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Routes;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Login_1 = __importDefault(require("./pages/Login"));
var index_1 = __importDefault(require("./pages/Backup/index"));
var index_2 = __importDefault(require("./pages/System/index"));
var index_3 = __importDefault(require("./pages/Github/index"));
var index_4 = __importDefault(require("./pages/Panel/index"));
var index_5 = __importDefault(require("./pages/Begin/index"));
var UserProfile_1 = __importDefault(require("./pages/User/UserProfile"));
var WebLink_1 = __importDefault(require("./pages/WebLink"));
var Help_1 = __importDefault(require("./pages/Help"));
var Levels_1 = __importDefault(require("./pages/Levels/index.jsx"));
var DstServerList_1 = __importDefault(require("./pages/DstServerList"));
var Mod_1 = __importDefault(require("./pages/Mod"));
var index_6 = __importDefault(require("./pages/PlayerLog/index"));
var index_7 = __importDefault(require("./layout/index"));
var index_jsx_1 = __importDefault(require("./pages/Dashboard/index.jsx"));
var index_jsx_2 = __importDefault(require("./pages/Tool/Preinstall/index.jsx"));
var index_jsx_3 = __importDefault(require("./pages/Tool/Assembly/index.jsx"));
var index_jsx_4 = __importDefault(require("./pages/Home/ClusterIni/index.jsx"));
var index_8 = __importDefault(require("./pages/Page404/index"));
function Routes() {
    return (0, react_router_dom_1.useRoutes)([
        {
            path: '/',
            element: (0, jsx_runtime_1.jsx)(index_7.default, {}),
            children: [
                { element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/panel" }), index: true, },
                { path: 'dashboard', element: (0, jsx_runtime_1.jsx)(index_jsx_1.default, {}) },
                { path: 'playerLog', element: (0, jsx_runtime_1.jsx)(index_6.default, {}) },
                { path: 'mod', element: (0, jsx_runtime_1.jsx)(Mod_1.default, {}) },
                { path: 'panel', element: (0, jsx_runtime_1.jsx)(index_4.default, {}) },
                {
                    path: 'home',
                    children: [
                        { path: 'clusterIni', element: (0, jsx_runtime_1.jsx)(index_jsx_4.default, {}) },
                    ]
                },
                {
                    path: 'levels',
                    children: [
                        { path: 'levels', element: (0, jsx_runtime_1.jsx)(Levels_1.default, {}) },
                        { path: 'selectorMod', element: (0, jsx_runtime_1.jsx)(index_jsx_3.default, {}) },
                        { path: 'preinstall', element: (0, jsx_runtime_1.jsx)(index_jsx_2.default, {}) },
                    ]
                },
                { path: 'backup', element: (0, jsx_runtime_1.jsx)(index_1.default, {}) },
                { path: 'setting', element: (0, jsx_runtime_1.jsx)(index_2.default, {}) },
                { path: 'github', element: (0, jsx_runtime_1.jsx)(index_3.default, {}) },
                { path: 'help', element: (0, jsx_runtime_1.jsx)(Help_1.default, {}) },
                { path: 'lobby', element: (0, jsx_runtime_1.jsx)(DstServerList_1.default, {}) },
                { path: 'user/Profile', element: (0, jsx_runtime_1.jsx)(UserProfile_1.default, {}) },
                { path: 'link', element: (0, jsx_runtime_1.jsx)(WebLink_1.default, {}) },
                { path: '404', element: (0, jsx_runtime_1.jsx)(index_8.default, {}) },
            ],
        },
        {
            path: 'login',
            element: (0, jsx_runtime_1.jsx)(Login_1.default, {}),
        },
        {
            path: 'init',
            element: (0, jsx_runtime_1.jsx)(index_5.default, {}),
        },
        {
            path: '*',
            element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/404", replace: true }),
        },
    ]);
}
