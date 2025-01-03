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
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_1 = __importStar(require("react"));
var react_i18next_1 = require("react-i18next");
var react_router_dom_1 = require("react-router-dom");
var gameApi_1 = require("../../../api/gameApi");
var index_module_css_1 = __importDefault(require("../../DstServerList/index.module.css"));
var HiddenText_1 = __importDefault(require("../../Home/HiddenText/HiddenText"));
var dst_1 = require("../../../utils/dst");
var usePlayerListStore_1 = require("../../../store/usePlayerListStore.js");
var pro_components_1 = require("@ant-design/pro-components");
exports.default = (function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    var t = (0, react_i18next_1.useTranslation)().t;
    var i18n = (0, react_i18next_1.useTranslation)().i18n;
    var lang = i18n.language;
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _8 = (0, react_1.useState)({}), archive = _8[0], setArchive = _8[1];
    var playerList = (0, usePlayerListStore_1.usePlayerListStore)(function (state) { return state.playerList; });
    (0, react_1.useEffect)(function () {
        (0, gameApi_1.archiveApi)(cluster)
            .then(function (data) {
            console.log(data.data);
            setArchive(data.data);
        }).catch(function (error) { return console.log(error); });
    }, []);
    function getTimeStatus(daysElapsedInSeason, daysLeftInSeason) {
        var totalDays = daysElapsedInSeason + daysLeftInSeason;
        var thresholdEarly = totalDays / 3;
        if (daysElapsedInSeason <= thresholdEarly) {
            if (lang === "en") {
                return "morning";
            }
            return '早';
        }
        if (daysLeftInSeason < thresholdEarly) {
            if (lang === "en") {
                return "evening";
            }
            return '晚';
        }
        return '';
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(pro_components_1.ProDescriptions, { column: 2, children: [(0, jsx_runtime_1.jsx)(pro_components_1.ProDescriptions.Item, { span: 2, valueType: "text", contentStyle: {
                        maxWidth: '80%',
                    }, ellipsis: true, label: t('panel.clusterName'), children: (0, jsx_runtime_1.jsx)("span", { className: index_module_css_1.default.icon, children: archive.clusterName }) }), (0, jsx_runtime_1.jsx)(pro_components_1.ProDescriptions.Item, { span: 2, valueType: "text", label: t('panel.gameMod'), children: (0, dst_1.getDstMod)("", archive.gameMod) }), (0, jsx_runtime_1.jsx)(pro_components_1.ProDescriptions.Item, { span: 2, valueType: "text", label: t('panel.mods'), children: archive.mods }), (0, jsx_runtime_1.jsx)(pro_components_1.ProDescriptions.Item, { span: 2, valueType: "text", label: t('panel.season'), children: (0, jsx_runtime_1.jsxs)("span", { children: [lang === "en" && (0, jsx_runtime_1.jsxs)("span", { children: [((_b = (_a = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _a === void 0 ? void 0 : _a.Clock) === null || _b === void 0 ? void 0 : _b.Cycles) + 1, "/", (_d = (_c = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _c === void 0 ? void 0 : _c.Clock) === null || _d === void 0 ? void 0 : _d.Phase, " ", getTimeStatus((_f = (_e = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _e === void 0 ? void 0 : _e.Seasons) === null || _f === void 0 ? void 0 : _f.ElapsedDaysInSeason, (_h = (_g = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _g === void 0 ? void 0 : _g.Seasons) === null || _h === void 0 ? void 0 : _h.RemainingDaysInSeason), " ", (_k = (_j = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _j === void 0 ? void 0 : _j.Seasons) === null || _k === void 0 ? void 0 : _k.Season, "(", (_m = (_l = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _l === void 0 ? void 0 : _l.Seasons) === null || _m === void 0 ? void 0 : _m.ElapsedDaysInSeason, "/", ((_p = (_o = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _o === void 0 ? void 0 : _o.Seasons) === null || _p === void 0 ? void 0 : _p.ElapsedDaysInSeason) + ((_r = (_q = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _q === void 0 ? void 0 : _q.Seasons) === null || _r === void 0 ? void 0 : _r.RemainingDaysInSeason), ")"] }), lang !== "en" && (0, jsx_runtime_1.jsxs)("span", { children: [((_t = (_s = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _s === void 0 ? void 0 : _s.Clock) === null || _t === void 0 ? void 0 : _t.Cycles) + 1, "\u5929/", dst_1.dstSegs[(_v = (_u = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _u === void 0 ? void 0 : _u.Clock) === null || _v === void 0 ? void 0 : _v.Phase], " ", getTimeStatus((_x = (_w = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _w === void 0 ? void 0 : _w.Seasons) === null || _x === void 0 ? void 0 : _x.ElapsedDaysInSeason, (_z = (_y = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _y === void 0 ? void 0 : _y.Seasons) === null || _z === void 0 ? void 0 : _z.RemainingDaysInSeason), dst_1.dstSeason[(_1 = (_0 = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _0 === void 0 ? void 0 : _0.Seasons) === null || _1 === void 0 ? void 0 : _1.Season], "(", (_3 = (_2 = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _2 === void 0 ? void 0 : _2.Seasons) === null || _3 === void 0 ? void 0 : _3.ElapsedDaysInSeason, "/", ((_5 = (_4 = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _4 === void 0 ? void 0 : _4.Seasons) === null || _5 === void 0 ? void 0 : _5.ElapsedDaysInSeason) + ((_7 = (_6 = archive === null || archive === void 0 ? void 0 : archive.meta) === null || _6 === void 0 ? void 0 : _6.Seasons) === null || _7 === void 0 ? void 0 : _7.RemainingDaysInSeason), ")"] })] }) }), (0, jsx_runtime_1.jsx)(pro_components_1.ProDescriptions.Item, { span: 2, valueType: "text", label: t('panel.players'), children: (0, jsx_runtime_1.jsx)("span", { children: "".concat(playerList === null || playerList === void 0 ? void 0 : playerList.length, "/").concat(archive.maxPlayers) }) }), (0, jsx_runtime_1.jsxs)(pro_components_1.ProDescriptions.Item, { span: 2, valueType: "text", label: t('panel.version'), children: [archive.version, " / ", archive.lastVersion] }), (0, jsx_runtime_1.jsx)(pro_components_1.ProDescriptions.Item, { span: 2, valueType: "text", label: t('panel.ipConnect'), children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 8, children: [(0, jsx_runtime_1.jsx)(HiddenText_1.default, { text: archive.ipConnect }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { placement: "topLeft", title: "\u8BF7\u5F00\u653E\u5BF9\u5E94\u7684 ".concat(archive.port, " udp \u7AEF\u53E3\uFF0C\u5DF2\u5F00\u653E\u8BF7\u5FFD\u7565"), children: (0, jsx_runtime_1.jsx)(icons_1.QuestionCircleOutlined, {}) })] }) }), (0, jsx_runtime_1.jsx)(pro_components_1.ProDescriptions.Item, { span: 2, valueType: "text", label: t('panel.password'), children: (0, jsx_runtime_1.jsx)(HiddenText_1.default, { text: archive === null || archive === void 0 ? void 0 : archive.clusterPassword }) })] }) }));
});
