"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var Players_1 = __importDefault(require("../component/Players"));
var HomeOverView_1 = __importDefault(require("../component/HomeOverView"));
var HomeModInfo_1 = __importDefault(require("../component/HomeModInfo"));
var HomeDetail = function (_a) {
    var home = _a.home;
    var players = home.Players || [];
    var mods = home.ModsInfo || [];
    var items = [
        {
            label: '概要',
            key: '1',
            children: ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(HomeOverView_1.default, { home: home }) }))
        },
        {
            label: '玩家',
            key: '2',
            children: ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Players_1.default, { players: players }) }))
        },
        {
            label: '模组',
            key: '3',
            children: ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(HomeModInfo_1.default, { mods: mods }) }))
        },
        // {
        //     label: '从世界',
        //     key: '4',
        //     children: <Secondaries secondaries={secondaries} />
        // },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: "1", centered: true, items: items }) }));
};
exports.default = HomeDetail;
