"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react/prop-types */
var react_1 = require("react");
var antd_1 = require("antd");
require("./mod.css");
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var modApi_1 = require("../../../../api/modApi");
function subscribeMod(lang, t, modid, modList, setModList, setStartLoading) {
    setStartLoading(true);
    (0, modApi_1.getModInfo)(lang, "", modid).then(function (data) {
        console.log(data.data);
        if (data.code !== 200) {
            antd_1.message.warning(t('"mod.subscribe.error"'));
        }
        else {
            setStartLoading(false);
            setModList(function (current) {
                // return [...current, data.data]
                var newModList = [];
                // eslint-disable-next-line no-restricted-syntax
                for (var _i = 0, current_1 = current; _i < current_1.length; _i++) {
                    var mod = current_1[_i];
                    if (mod.modid !== modid) {
                        newModList.push(mod);
                    }
                }
                data.data.installed = true;
                data.data.enable = true;
                newModList.push(data.data);
                console.log("newModList: ", newModList);
                return newModList;
            });
            antd_1.message.success("".concat(t('mod.subscribe.ok'), " ").concat(modid));
        }
    }).catch(function (error) {
        console.log(error);
    });
}
var ModItem = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var t = (0, react_i18next_1.useTranslation)().t;
    var i18n = (0, react_i18next_1.useTranslation)().i18n;
    var lang = i18n.language;
    var removeMod = props.removeMod, modList = props.modList, setModList = props.setModList;
    var _o = (0, react_1.useState)({}), mod = _o[0], setMod = _o[1];
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _p = (0, react_1.useState)(false), startLoading = _p[0], setStartLoading = _p[1];
    return (0, jsx_runtime_1.jsx)(antd_1.Spin, { spinning: startLoading, tip: t('mod.subscribing'), children: (0, jsx_runtime_1.jsxs)(antd_1.Card, { className: 'mod', style: { margin: ' 0 0 16px', backgroundColor: ((_a = props === null || props === void 0 ? void 0 : props.mod) === null || _a === void 0 ? void 0 : _a.update) ? "#583D23" : "" }, children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { onClick: function () {
                        props.changeMod(props === null || props === void 0 ? void 0 : props.mod);
                    }, children: ((_b = props === null || props === void 0 ? void 0 : props.mod) === null || _b === void 0 ? void 0 : _b.installed) && (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "stretch", flex: "1", overflow: "hidden" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { flexBasis: "20%", marginRight: "20px" }, children: (0, jsx_runtime_1.jsx)("img", { style: { display: "inline-block", maxWidth: "auto" }, alt: "example", src: props.mod.img }) }), (0, jsx_runtime_1.jsxs)("div", { style: { flexBasis: "80%", overflow: "hidden" }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                                fontSize: '16px',
                                                paddingBottom: '8px',
                                                maxWidth: '100%',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }, children: (0, jsx_runtime_1.jsx)("span", { style: {}, children: (_c = props === null || props === void 0 ? void 0 : props.mod) === null || _c === void 0 ? void 0 : _c.name }) }), (0, jsx_runtime_1.jsxs)("div", { children: [((_d = props === null || props === void 0 ? void 0 : props.mod) === null || _d === void 0 ? void 0 : _d.update) && (0, jsx_runtime_1.jsx)(antd_1.Badge, { count: 1, children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close'), defaultChecked: (_e = props === null || props === void 0 ? void 0 : props.mod) === null || _e === void 0 ? void 0 : _e.enable, onChange: function () {
                                                            var _a;
                                                            props.changeEnable((_a = props === null || props === void 0 ? void 0 : props.mod) === null || _a === void 0 ? void 0 : _a.modid);
                                                        } }) }), !((_f = props === null || props === void 0 ? void 0 : props.mod) === null || _f === void 0 ? void 0 : _f.update) &&
                                                    (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close'), defaultChecked: (_g = props === null || props === void 0 ? void 0 : props.mod) === null || _g === void 0 ? void 0 : _g.enable, onChange: function () {
                                                            var _a;
                                                            props.changeEnable((_a = props === null || props === void 0 ? void 0 : props.mod) === null || _a === void 0 ? void 0 : _a.modid);
                                                        } }), ((_h = props === null || props === void 0 ? void 0 : props.mod) === null || _h === void 0 ? void 0 : _h.modid) !== "client_mods_disabled" && (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: t('mod.delete.title'), okText: "Yes", cancelText: "No", onConfirm: function () {
                                                            (0, modApi_1.deleteModInfo)(cluster, mod.modid)
                                                                .then(function (resp) {
                                                                if (resp.code === 200) {
                                                                    antd_1.message.success(t('mod.delete.ok'));
                                                                    removeMod(mod.modid);
                                                                }
                                                            });
                                                        }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", danger: true, onClick: function () {
                                                                setMod(props.mod);
                                                            }, children: t('mod.delete') }) }) }), ((_j = props === null || props === void 0 ? void 0 : props.mod) === null || _j === void 0 ? void 0 : _j.update) && (0, jsx_runtime_1.jsx)("span", { children: t('mod.update') })] })] })] }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Row, { children: ((_k = props === null || props === void 0 ? void 0 : props.mod) === null || _k === void 0 ? void 0 : _k.installed) === false && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { flex: "64px", children: (0, jsx_runtime_1.jsx)("img", { alt: "example", src: (_l = props === null || props === void 0 ? void 0 : props.mod) === null || _l === void 0 ? void 0 : _l.img }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", style: { paddingLeft: '16px' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsx)("span", { style: {
                                                    fontSize: '16px'
                                                }, children: (_m = props === null || props === void 0 ? void 0 : props.mod) === null || _m === void 0 ? void 0 : _m.modid }) }) }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { style: {
                                            marginTop: '12px'
                                        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12 }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: t('mod.install'), okText: "Yes", cancelText: "No", onConfirm: function () {
                                                        var _a;
                                                        subscribeMod(lang, t, (_a = props === null || props === void 0 ? void 0 : props.mod) === null || _a === void 0 ? void 0 : _a.modid, modList, setModList, setStartLoading);
                                                    }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                                                            setMod(props.mod);
                                                        }, children: t('mod.install') }) }) })] })] })] }) })] }) });
};
exports.default = ModItem;
