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
var Secondaries_1 = __importDefault(require("./Secondaries"));
var HomeDetail = function (props) {
    var _a, _b, _c, _d, _e, _f, _g;
    var players = ((_b = (_a = props.home) === null || _a === void 0 ? void 0 : _a.successinfo) === null || _b === void 0 ? void 0 : _b.players) || [];
    var home = ((_c = props.home) === null || _c === void 0 ? void 0 : _c.successinfo) || {
        data: {
            day: '未知'
        }
    };
    var mods = ((_e = (_d = props.home) === null || _d === void 0 ? void 0 : _d.successinfo) === null || _e === void 0 ? void 0 : _e.mods_info) || [];
    var secondaries = ((_g = (_f = props.home) === null || _f === void 0 ? void 0 : _f.successinfo) === null || _g === void 0 ? void 0 : _g.secondaries) || [];
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
        {
            label: '从世界',
            key: '4',
            children: (0, jsx_runtime_1.jsx)(Secondaries_1.default, { secondaries: secondaries })
        },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: "1", centered: true, items: items }) }));
};
exports.default = HomeDetail;
