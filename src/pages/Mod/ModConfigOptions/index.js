"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var react_router_dom_1 = require("react-router-dom");
var dateUitls_1 = require("../../../utils/dateUitls");
var modApi_1 = require("../../../api/modApi");
var OptionsSelect_1 = __importDefault(require("./OptionsSelect"));
var Paragraph = antd_1.Typography.Paragraph;
var ModInfo = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var mod = _a.mod;
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 16, wrap: true, children: [(0, jsx_runtime_1.jsx)("img", { alt: "example", src: mod === null || mod === void 0 ? void 0 : mod.img }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                    fontSize: '16px',
                                    fontWeight: 500
                                }, children: mod === null || mod === void 0 ? void 0 : mod.name.slice(0, 20) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("span", { children: [t('mod.modid'), ":", mod === null || mod === void 0 ? void 0 : mod.modid] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("span", { children: [t('mod.author'), ": ", ((_b = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _b === void 0 ? void 0 : _b.author) !== undefined ? (_c = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _c === void 0 ? void 0 : _c.author.slice(0, 20) : ""] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", { children: [t('mod.version'), ": ", (_d = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _d === void 0 ? void 0 : _d.version] }), (0, jsx_runtime_1.jsxs)("div", { children: [t('mod.lasttime'), ": ", (0, dateUitls_1.timestampToString)(mod.last_time * 1000)] }), (0, jsx_runtime_1.jsx)("span", { children: ((_e = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _e === void 0 ? void 0 : _e.dont_starve_compatible) === true && (0, jsx_runtime_1.jsx)("span", { children: "\u9965\u8352\u8054\u673A\u7248\u517C\u5BB9" }) }), (0, jsx_runtime_1.jsx)("span", { children: ((_f = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _f === void 0 ? void 0 : _f.dont_starve_compatible) === false && (0, jsx_runtime_1.jsx)("span", { children: "-" }) })] })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", { children: (_g = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _g === void 0 ? void 0 : _g.description }) })] }));
};
exports.default = (function (_a) {
    var _b, _c, _d, _e, _f;
    var mod = _a.mod, setModList = _a.setModList, defaultConfigOptionsRef = _a.defaultConfigOptionsRef, modConfigOptionsRef = _a.modConfigOptionsRef;
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _g = (0, react_1.useState)(false), open = _g[0], setOpen = _g[1];
    var _h = (0, react_1.useState)(false), spinning = _h[0], setSpinning = _h[1];
    function updateMod() {
        setSpinning(true);
        (0, modApi_1.updateModApi)(cluster, mod.modid)
            .then(function (resp) {
            if (resp.code === 200) {
                var newMod_1 = resp.data;
                newMod_1.installed = true;
                setModList(function (current) {
                    var index = 0;
                    // eslint-disable-next-line no-plusplus
                    for (var i = 0; i < current.length; i++) {
                        if (current[i].modid === newMod_1.modid) {
                            index = i;
                            if (current.enable) {
                                newMod_1.enable = true;
                            }
                        }
                    }
                    current[index] = newMod_1;
                    return __spreadArray([], current, true);
                });
                setSpinning(false);
                antd_1.message.success(t('mod.update.ok'));
            }
        });
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Spin, { spinning: spinning, children: [!mod.installed && (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("span", { children: t('mod.none') }) }), (mod.installed && mod.modid === null || mod.modid === undefined) ? ((0, jsx_runtime_1.jsx)("span", { children: t('mod.choose.please') })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                height: '56vh',
                                overflowY: 'auto',
                                overflowX: 'auto',
                            }, children: (0, jsx_runtime_1.jsx)(ModInfo, { mod: mod }) }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 16, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return setOpen(true); }, children: t('mod.options') }), (0, jsx_runtime_1.jsxs)(antd_1.Popconfirm, { title: t('mod.update.title'), okText: "Yes", cancelText: "No", onConfirm: function () { return updateMod(); }, children: [mod.update && (0, jsx_runtime_1.jsx)(antd_1.Badge, { dot: true, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { style: {
                                                    backgroundColor: "#149b6e"
                                                }, type: "primary", children: t('mod.update') }) }), !mod.update && (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", children: t('mod.update') })] }), (0, jsx_runtime_1.jsx)(antd_1.Button, { children: (0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://steamcommunity.com/sharedfiles/filedetails/?id=".concat(mod.modid), rel: "noreferrer", children: t('mod.workshop') }) })] })] })), (0, jsx_runtime_1.jsx)(antd_1.Modal, { getContainer: document.body, title: "".concat(mod === null || mod === void 0 ? void 0 : mod.name), 
                    // centered
                    open: open, onOk: function () {
                        setOpen(false);
                    }, onCancel: function () { return setOpen(false); }, width: 640, destroyOnClose: true, footer: null, children: (0, jsx_runtime_1.jsxs)("div", { className: 'scrollbar', style: {
                            height: '60vh',
                            overflowY: 'auto',
                            overflowX: 'auto'
                        }, children: [((_b = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _b === void 0 ? void 0 : _b.configuration_options) !== undefined && ((0, jsx_runtime_1.jsx)(OptionsSelect_1.default, { mod: mod, defaultConfigOptionsRef: defaultConfigOptionsRef, modConfigOptionsRef: modConfigOptionsRef })), ((_c = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _c === void 0 ? void 0 : _c.configuration_options) === undefined && ((_d = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _d === void 0 ? void 0 : _d.author) === undefined && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Paragraph, { children: "\u7F51\u7EDC\u95EE\u9898!!! \u4E0B\u6A21\u7EC4\u5931\u8D25" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: "\u70B9\u51FB \u66F4\u65B0 \u6309\u94AE\u91CD\u65B0\u4E0B\u8F7D" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: "\u5982\u679C\u591A\u6B21\u66F4\u65B0\u4F9D\u65E7\u6CA1\u6709\u914D\u7F6E\uFF0C\u8BF7\u5148\u52A0\u6B64mod\u52A0\u5165\u5230\u4F60\u7684\u6A21\u7EC4\u914D\u7F6E\u6587\u4EF6\u91CC\u9762,\u7136\u540E\u5728\u542F\u52A8\u623F\u95F4\uFF0C\u7B49\u5F85\u623F\u95F4mod\u4E0B\u8F7D\u5B8C\u6210\u540E\uFF0C\u5728\u70B9\u51FB \u66F4\u65B0 \u6309\u94AE\u5C31\u4F1A\u6709\u914D\u7F6E\u9009\u9879" })] }), ((_e = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _e === void 0 ? void 0 : _e.configuration_options) === undefined && ((_f = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _f === void 0 ? void 0 : _f.author) !== undefined && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: t('mod.tips4') })] })] }) })] }) }));
});
