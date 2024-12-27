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
/* eslint-disable react/prop-types */
var react_1 = require("react");
var react_i18next_1 = require("react-i18next");
var lodash_1 = __importDefault(require("lodash"));
var antd_1 = require("antd");
var Select2_1 = __importDefault(require("./Select2"));
var dateUitls_1 = require("../../../utils/dateUitls");
var modApi_1 = require("../../../api/modApi");
var Paragraph = antd_1.Typography.Paragraph;
function generateUUID() {
    var cryptoObj = window.crypto || window.msCrypto;
    if (!cryptoObj) {
        console.error('Crypto API not supported.');
        return;
    }
    var buffer = new Uint8Array(16);
    cryptoObj.getRandomValues(buffer);
    // Set version (4) and variant (8, 9, a, or b) bits
    // eslint-disable-next-line no-bitwise
    buffer[6] = (buffer[6] & 0x0f) | 0x40;
    // eslint-disable-next-line no-bitwise
    buffer[8] = (buffer[8] & 0x3f) | 0x80;
    var hexCodes = Array.from(buffer)
        .map(function (byte) { return byte.toString(16).padStart(2, '0'); });
    var uuid = hexCodes.join('');
    // eslint-disable-next-line consistent-return
    return "".concat(uuid.substr(0, 8), "-").concat(uuid.substr(8, 4), "-").concat(uuid.substr(12, 4), "-").concat(uuid.substr(16, 4), "-").concat(uuid.substr(20));
}
var OptionSelect = function (_a) {
    var mod = _a.mod, root = _a.root, setRoot = _a.setRoot, defaultValues = _a.defaultValues, defaultValuesMap = _a.defaultValuesMap, setDefaultValuesMap = _a.setDefaultValuesMap;
    var form = antd_1.Form.useForm()[0];
    (0, react_1.useEffect)(function () {
        var options = mod.mod_config.configuration_options;
        if (options !== undefined && options !== null) {
            var object_1 = {};
            options.forEach(function (item) {
                var name = item.name;
                var value = item.default;
                object_1[name] = value;
            });
            var newDefault_1 = {};
            options.forEach(function (o) {
                newDefault_1[o.name] = o.default;
            });
            // setDefaultValue(newDefault);
            //   console.log('init', options,object);
        }
    }, []);
    // eslint-disable-next-line no-unused-vars
    var handleFormChange = function (changedValues, allValues) {
        // console.log('Changed values:', changedValues);
        // eslint-disable-next-line no-restricted-syntax
        for (var fieldName in changedValues) {
            // eslint-disable-next-line no-prototype-builtins
            if (changedValues.hasOwnProperty(fieldName)) {
                var fieldValue = changedValues[fieldName];
                // console.log(`Field ${fieldName} changed to ${fieldValue}`);
                lodash_1.default.set(root, "".concat(mod.modid, ".").concat(fieldName), fieldValue);
                // 同时把 默认的配置 也更新下
                var newDefaultValue = lodash_1.default.cloneDeep(defaultValuesMap);
                // _.set(newDefaultValue, `"${mod.modid}".${fieldName}`, fieldValue)
                console.log("newDefaultValue.get(mod.modid): ", newDefaultValue.get(mod.modid));
                if (newDefaultValue.get(mod.modid) === undefined || newDefaultValue.get(mod.modid) === null) {
                    var obj = {
                        fieldName: fieldValue
                    };
                    newDefaultValue.set(mod.modid, obj);
                }
                else {
                    newDefaultValue.get(mod.modid)["".concat(fieldName)] = fieldValue;
                }
                setDefaultValuesMap(newDefaultValue);
                console.log("defaultValuesMap: ", defaultValuesMap);
                console.log("newDefaultValue: ", newDefaultValue);
            }
        }
        var _root = lodash_1.default.cloneDeep(root);
        setRoot(_root);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, { form: form, onValuesChange: handleFormChange, name: "basic", labelCol: {
                span: 8,
            }, wrapperCol: {
                span: 16,
            }, children: mod.mod_config.configuration_options !== undefined &&
                mod.mod_config.configuration_options
                    .filter(function (item) { return item.options !== undefined; })
                    .map(function (item, index) {
                    var _a;
                    // 例如2928810007,2334209327都是这样的,options只有一个,而且就只是默认值,并且该项的description没有内容
                    if (item.options.length === 1 && item.options[0].data === item.default && !item.options[0].description) {
                        /*                           在DST中,如果label为空字符串,就直接是显示空白行,这里用||会导致label为空也显示name,为了跟DST保持一样使用了??
                                                                                                                         ↓                     */
                        return (0, jsx_runtime_1.jsx)(antd_1.Divider, { children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: "14px", fontWeight: "600" }, children: (_a = item.label) !== null && _a !== void 0 ? _a : item.name }) }, generateUUID());
                    }
                    // TODO 还不知道哪些mod是这样的作为标题的,我目前没有发现
                    if (item.name === 'Title' || item.name === '') {
                        if (item.label === '') {
                            return "";
                        }
                        return (0, jsx_runtime_1.jsx)(antd_1.Divider, { children: (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: "14px", fontWeight: "600" }, children: [item.label, " \u914D\u7F6E"] }) }, generateUUID());
                        // return <h4 key={item.label}>{item.label} 配置</h4>;
                    }
                    var defaultValue;
                    if (defaultValuesMap.get("".concat(mod.modid)) !== undefined) {
                        defaultValue = defaultValuesMap.get("".concat(mod.modid))["".concat(item.name)];
                    }
                    else {
                        defaultValue = undefined;
                    }
                    // console.log("1111111: ",defaultValuesMap, mod.modid, defaultValuesMap.get(`${mod.modid}`), item.name)
                    return (0, jsx_runtime_1.jsx)(Select2_1.default, { item: item, defaultValue: defaultValue }, generateUUID());
                }) }) }));
};
// eslint-disable-next-line react/prop-types
var ModDetail = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var mod = _a.mod, setMod = _a.setMod, setModList = _a.setModList, root = _a.root, setRoot = _a.setRoot, defaultValues = _a.defaultValues, defaultValuesMap = _a.defaultValuesMap, setDefaultValuesMap = _a.setDefaultValuesMap;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _o = (0, react_1.useState)(false), open = _o[0], setOpen = _o[1];
    var _p = (0, react_1.useState)(true), ellipsis = _p[0], setEllipsis = _p[1];
    var _q = (0, react_1.useState)(false), spinning = _q[0], setSpinning = _q[1];
    function updateMod() {
        setSpinning(true);
        (0, modApi_1.updateModApi)("", mod.modid)
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
                    console.log(current);
                    return __spreadArray([], current, true);
                });
                setMod(newMod_1);
                setSpinning(false);
                antd_1.message.success("更新成功");
            }
        });
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    height: '335px',
                    overflowY: 'auto',
                    overflowX: 'auto',
                }, children: [(mod === null || mod === void 0 ? void 0 : mod.installed) && (mod === null || mod === void 0 ? void 0 : mod.mod_config) !== undefined && (mod === null || mod === void 0 ? void 0 : mod.mod_config) !== null && (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Spin, { spinning: spinning, tip: "正在更新模组", children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 16, wrap: true, children: [(0, jsx_runtime_1.jsx)("img", { alt: "example", src: mod === null || mod === void 0 ? void 0 : mod.img }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                                        fontSize: '16px',
                                                        fontWeight: 500
                                                    }, children: mod === null || mod === void 0 ? void 0 : mod.name.slice(0, 20) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("span", { children: [t('modid'), ":", mod === null || mod === void 0 ? void 0 : mod.modid] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("span", { children: [t('author'), ": ", ((_b = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _b === void 0 ? void 0 : _b.author) !== undefined ? (_c = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _c === void 0 ? void 0 : _c.author.slice(0, 20) : ""] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", { children: [t('version'), ": ", (_d = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _d === void 0 ? void 0 : _d.version] }), (0, jsx_runtime_1.jsxs)("div", { children: [t('last time'), ": ", (0, dateUitls_1.timestampToString)(mod.last_time * 1000)] }), (0, jsx_runtime_1.jsx)("span", { children: ((_e = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _e === void 0 ? void 0 : _e.dont_starve_compatible) === true && (0, jsx_runtime_1.jsx)("span", { children: "\u9965\u8352\u8054\u673A\u7248\u517C\u5BB9" }) }), (0, jsx_runtime_1.jsx)("span", { children: ((_f = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _f === void 0 ? void 0 : _f.dont_starve_compatible) === false && (0, jsx_runtime_1.jsx)("span", { children: "-" }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(Paragraph, { getContainer: false, ellipsis: ellipsis
                                                ? {
                                                    rows: 4,
                                                    expandable: true,
                                                    symbol: 'more',
                                                }
                                                : false, children: (_g = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _g === void 0 ? void 0 : _g.description }), (0, jsx_runtime_1.jsx)("br", {})] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { getContainer: document.body, title: "".concat(mod === null || mod === void 0 ? void 0 : mod.name, " \u914D\u7F6E"), 
                                    // centered
                                    open: open, onOk: function () {
                                        setOpen(false);
                                    }, onCancel: function () { return setOpen(false); }, width: 640, destroyOnClose: true, footer: null, children: (0, jsx_runtime_1.jsxs)("div", { className: 'scrollbar', style: {
                                            height: '386px',
                                            overflowY: 'auto',
                                            overflowX: 'auto'
                                        }, children: [((_h = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _h === void 0 ? void 0 : _h.configuration_options) !== undefined && ((0, jsx_runtime_1.jsx)(OptionSelect, { mod: mod, root: root, setRoot: setRoot, defaultValues: defaultValues, defaultValuesMap: defaultValuesMap, setDefaultValuesMap: setDefaultValuesMap })), ((_j = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _j === void 0 ? void 0 : _j.configuration_options) === undefined && ((_k = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _k === void 0 ? void 0 : _k.author) === undefined && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: "\u7F51\u7EDC\u95EE\u9898!!! \u4E0B\u6A21\u7EC4\u5931\u8D25" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: "\u70B9\u51FB \u66F4\u65B0 \u6309\u94AE\u91CD\u65B0\u4E0B\u8F7D" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: "\u5982\u679C\u591A\u6B21\u66F4\u65B0\u4F9D\u65E7\u6CA1\u6709\u914D\u7F6E\uFF0C\u8BF7\u5148\u52A0\u6B64mod\u52A0\u5165\u5230\u4F60\u7684\u6A21\u7EC4\u914D\u7F6E\u6587\u4EF6\u91CC\u9762" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: "\u7136\u540E\u5728\u542F\u52A8\u623F\u95F4\uFF0C\u7B49\u5F85\u623F\u95F4mod\u4E0B\u8F7D\u5B8C\u6210\u540E\uFF0C\u5728\u70B9\u51FB \u66F4\u65B0 \u6309\u94AE\u5C31\u4F1A\u6709\u914D\u7F6E\u9009\u9879" })] }), ((_l = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _l === void 0 ? void 0 : _l.configuration_options) === undefined && ((_m = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _m === void 0 ? void 0 : _m.author) !== undefined && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: t('this mod dont have configuration options') })] })] }) })] }) }), !mod.installed && (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("span", { children: t('none mod') }) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 16, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return setOpen(true); }, children: t('options') }), (0, jsx_runtime_1.jsxs)(antd_1.Popconfirm, { title: t('update mode configuration options'), okText: "Yes", cancelText: "No", onConfirm: function () { return updateMod(); }, children: [mod.update && (0, jsx_runtime_1.jsx)(antd_1.Badge, { dot: true, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { style: {
                                        backgroundColor: "#149b6e"
                                    }, type: "primary", children: t('Update Configuration') }) }), !mod.update && (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", children: t('Update Configuration') })] }), (0, jsx_runtime_1.jsx)(antd_1.Button, { children: (0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://steamcommunity.com/sharedfiles/filedetails/?id=".concat(mod.modid), rel: "noreferrer", children: t('workshop') }) })] })] }));
};
exports.default = ModDetail;
