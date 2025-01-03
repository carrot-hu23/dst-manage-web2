"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
var react_router_dom_1 = require("react-router-dom");
var react_1 = __importStar(require("react"));
var react_i18next_1 = require("react-i18next");
var antd_1 = require("antd");
var dst_1 = require("../../../utils/dst");
var _8level_1 = require("../../../api/level.jsx");
var index_module_css_1 = __importDefault(require("../../DstServerList/index.module.css"));
var HiddenText_1 = __importDefault(require("../../Home/HiddenText/HiddenText"));
var useLevelsStore_1 = require("../../../store/useLevelsStore");
var usePlayerListStore_1 = require("../../../store/usePlayerListStore.js");
var Online = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(false), spin = _b[0], setSpin = _b[1];
    var levels = (0, useLevelsStore_1.useLevelsStore)(function (state) { return state.levels; });
    var playerList = (0, usePlayerListStore_1.usePlayerListStore)(function (state) { return state.playerList; });
    var setPlayerList = (0, usePlayerListStore_1.usePlayerListStore)(function (state) { return state.setPlayerList; });
    var notHasLevels = levels === undefined || levels === null || levels.length === 0;
    var _c = (0, react_1.useState)(notHasLevels ? "" : levels[0].key), levelName = _c[0], setLevelName = _c[1];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        (0, _8level_1.getAllOnlinePlayersApi)(cluster)
            .then(function (resp) {
            if (resp.code === 200) {
                setPlayerList(resp.data);
            }
            setLoading(false);
        });
    }, []);
    function queryPlayers() {
        setSpin(true);
        (0, _8level_1.getOnlinePlayersApi)(cluster, levelName)
            .then(function (resp) {
            if (resp.code === 200) {
                setPlayerList(resp.data);
            }
            setSpin(false);
        });
    }
    function queryAllPlayers() {
        setSpin(true);
        (0, _8level_1.getAllOnlinePlayersApi)(cluster)
            .then(function (resp) {
            if (resp.code === 200) {
                setPlayerList(resp.data);
            }
            setSpin(false);
        });
    }
    var kickPlayer = function (player) {
        setSpin(true);
        var command = "TheNet:Kick(\\\"".concat(player.kuId, "\\\")");
        (0, _8level_1.sendCommandApi)(cluster, levelName, command)
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("\u8E22\u51FA ".concat(player.name, " success"));
            }
            else {
                antd_1.message.error("\u8E22\u51FA ".concat(player.name, " error"));
            }
            setSpin(false);
        });
    };
    var killPlayer = function (player) {
        setSpin(true);
        var command = "UserToPlayer(\\\"".concat(player.kuId, "\\\"):PushEvent('death')");
        (0, _8level_1.sendCommandApi)(cluster, levelName, command)
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("kill ".concat(player.name, " success"));
            }
            else {
                antd_1.message.error("kill ".concat(player.name, " error"));
            }
            setSpin(false);
        });
    };
    var respawnPlayer = function (player) {
        setSpin(true);
        var command = "UserToPlayer(\\\"".concat(player.kuId, "\\\"):PushEvent('respawnfromghost')");
        (0, _8level_1.sendCommandApi)(cluster, levelName, command)
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("\u590D\u6D3B ".concat(player.name, " success"));
            }
            else {
                antd_1.message.error("\u590D\u6D3B ".concat(player.name, " error"));
            }
            setSpin(false);
        });
    };
    var handleChange = function (value) {
        setLevelName(value);
    };
    var list = playerList.map(function (item) { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 18, sm: 10, md: 10, lg: 10, xl: 10, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { align: "center", size: 'middle', children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 48, src: dst_1.dstRoles[item.role] || dst_1.dstRoles.mod }) }), (0, jsx_runtime_1.jsx)("div", { className: index_module_css_1.default.icon, children: item.name }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", { style: { color: '#1677ff' }, children: (0, jsx_runtime_1.jsx)(HiddenText_1.default, { text: item.kuId }) }) })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 4, sm: 1, md: 4, lg: 4, xl: 4, children: (0, jsx_runtime_1.jsx)(antd_1.Space, { size: 'middle', children: (0, jsx_runtime_1.jsxs)("span", { children: [item.day, t('day')] }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 10, md: 10, lg: 10, xl: 10, children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { spinning: loading, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: "primary", onClick: function () { killPlayer(item); }, children: "K I L L" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: "primary", onClick: function () { respawnPlayer(item); }, children: t('respawn') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: "primary", onClick: function () { kickPlayer(item); }, children: t('kick') })] }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: '10px' } })] })); });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [notHasLevels && ((0, jsx_runtime_1.jsx)("span", { children: "\u5F53\u524D\u6682\u65E0\u4E16\u754C" })), !notHasLevels && ((0, jsx_runtime_1.jsx)(antd_1.Spin, { spinning: spin, children: (0, jsx_runtime_1.jsxs)(antd_1.Skeleton, { loading: loading, active: true, children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 8, children: [(0, jsx_runtime_1.jsx)(antd_1.Select, { style: {
                                        width: 120,
                                    }, onChange: handleChange, defaultValue: notHasLevels ? "" : levels[0].levelName, options: levels.map(function (level) { return ({
                                        value: level.key,
                                        label: level.levelName,
                                    }); }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', size: 'small', onClick: function () {
                                        queryPlayers();
                                    }, children: t('panel.query') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', size: 'small', onClick: function () {
                                        queryAllPlayers();
                                    }, children: t('panel.query_all') }), (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: 'green', children: playerList.length })] }), (0, jsx_runtime_1.jsx)(antd_1.List, { pagination: {
                                position: "bottom",
                                align: "end",
                                showSizeChanger: true,
                                total: playerList.length,
                                pageSizeOptions: [5, 10, 20, 50, 100]
                            }, dataSource: playerList, renderItem: function (item) { return ((0, jsx_runtime_1.jsxs)(antd_1.List.Item, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 18, sm: 10, md: 10, lg: 10, xl: 10, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { align: "center", size: 'middle', children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 48, src: dst_1.dstRoles[item.role] || dst_1.dstRoles.mod }) }), (0, jsx_runtime_1.jsx)("div", { className: index_module_css_1.default.icon, children: item.name }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", { style: { color: '#1677ff' }, children: (0, jsx_runtime_1.jsx)(HiddenText_1.default, { text: item.kuId }) }) })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 4, sm: 1, md: 4, lg: 4, xl: 4, children: (0, jsx_runtime_1.jsx)(antd_1.Space, { size: 'middle', children: (0, jsx_runtime_1.jsxs)("span", { children: [item.day, t('day')] }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 10, md: 10, lg: 10, xl: 10, children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { spinning: loading, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: "primary", onClick: function () { killPlayer(item); }, children: "K I L L" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: "primary", onClick: function () { respawnPlayer(item); }, children: t('panel.respawn') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: "primary", onClick: function () { kickPlayer(item); }, children: t('panel.kick') })] }) }) })] })); } })] }) }))] }));
};
exports.default = Online;
