"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react/prop-types */
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var lua_json_1 = require("lua-json");
require("./index.css");
var react_i18next_1 = require("react-i18next");
function getLevelObject(value) {
    value = value.replace(/\n/g, "");
    try {
        return (0, lua_json_1.parse)(value);
    }
    catch (error) {
        antd_1.message.warning("lua配置解析错误");
        console.log(error);
        return {};
    }
}
exports.default = (function (_a) {
    var valueRef = _a.valueRef, dstWorldSetting = _a.dstWorldSetting, changeValue = _a.changeValue, porklandSetting = _a.porklandSetting;
    var t = (0, react_i18next_1.useTranslation)().t;
    var i18n = (0, react_i18next_1.useTranslation)().i18n;
    // 获取当前语言
    var lang = i18n.language;
    var levelObject = getLevelObject(valueRef.current);
    var levelType = levelObject.location;
    // 获取用户默认值
    var _b = (0, react_1.useState)(levelObject.overrides), leveldataoverrideObject = _b[0], setLeveldataoverrideObject = _b[1];
    // 获取世界默认值
    var forestWorldGenGroup = lang === 'en' ? dstWorldSetting.en.forest.WORLDGEN_GROUP : dstWorldSetting.zh.forest.WORLDGEN_GROUP;
    var forestWorldSettingsGroup = lang === 'en' ? dstWorldSetting.en.forest.WORLDSETTINGS_GROUP : dstWorldSetting.zh.forest.WORLDSETTINGS_GROUP;
    var cavesWorldGenGroup = lang === 'en' ? dstWorldSetting.en.cave.WORLDGEN_GROUP : dstWorldSetting.zh.cave.WORLDGEN_GROUP;
    var cavesWorldSettingsGroup = lang === 'en' ? dstWorldSetting.en.cave.WORLDSETTINGS_GROUP : dstWorldSetting.zh.cave.WORLDSETTINGS_GROUP;
    (0, react_1.useEffect)(function () {
        var levelObject = getLevelObject(valueRef.current);
        setLeveldataoverrideObject(levelObject.overrides);
    }, [valueRef.current]);
    var porklandItems = [
        {
            label: t("level.worldSettings"),
            children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Group, { valueRef: valueRef, data: porklandSetting === null || porklandSetting === void 0 ? void 0 : porklandSetting.WORLDSETTINGS_GROUP, url: "./misc/customization_porkland.webp", leveldataoverrideObject: leveldataoverrideObject, onStateChange: function (name, newValue) {
                        setLeveldataoverrideObject(function (current) {
                            current[name] = newValue;
                            return __assign({}, current);
                        });
                    }, changeValue: changeValue, type: 'porkland' }) }),
            key: '1'
        },
        {
            label: t("level.worldGeneration"),
            children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Group, { valueRef: valueRef, data: porklandSetting === null || porklandSetting === void 0 ? void 0 : porklandSetting.WORLDGEN_GROUP, url: "./misc/customization_porkland.webp", leveldataoverrideObject: leveldataoverrideObject, onStateChange: function (name, newValue) {
                        setLeveldataoverrideObject(function (current) {
                            current[name] = newValue;
                            return __assign({}, current);
                        });
                    }, changeValue: changeValue, type: 'porkland', isWorldGen: true }) }),
            key: '2'
        }
    ];
    var forestItems = [
        {
            label: t("level.worldSettings"),
            children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Group, { valueRef: valueRef, data: forestWorldSettingsGroup, url: "./misc/worldsettings_customization.webp", leveldataoverrideObject: leveldataoverrideObject, onStateChange: function (name, newValue) {
                        setLeveldataoverrideObject(function (current) {
                            current[name] = newValue;
                            return __assign({}, current);
                        });
                    }, changeValue: changeValue }) }),
            key: '1'
        },
        {
            label: t("level.worldGeneration"),
            children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Group, { valueRef: valueRef, data: forestWorldGenGroup, url: "./misc/worldgen_customization.webp", leveldataoverrideObject: leveldataoverrideObject, onStateChange: function (name, newValue) {
                        setLeveldataoverrideObject(function (current) {
                            current[name] = newValue;
                            return __assign({}, current);
                        });
                    }, changeValue: changeValue }) }),
            key: '2'
        }
    ];
    var caveItems = [
        {
            label: t("level.worldSettings"),
            children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Group, { valueRef: valueRef, data: cavesWorldSettingsGroup, url: "./misc/worldsettings_customization.webp", leveldataoverrideObject: leveldataoverrideObject, onStateChange: function (name, newValue) {
                        setLeveldataoverrideObject(function (current) {
                            current[name] = newValue;
                            return __assign({}, current);
                        });
                    }, changeValue: changeValue }) }),
            key: 3,
        },
        {
            label: t("level.worldGeneration"),
            children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Group, { valueRef: valueRef, data: cavesWorldGenGroup, url: "./misc/worldgen_customization.webp", leveldataoverrideObject: leveldataoverrideObject, onStateChange: function (name, newValue) {
                        setLeveldataoverrideObject(function (current) {
                            current[name] = newValue;
                            return __assign({}, current);
                        });
                    }, changeValue: changeValue }) }),
            key: 4,
        },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: 'scrollbar', style: {
                "height": "54vh",
                overflowY: 'auto',
            }, children: [levelType === 'forest' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: forestItems }) })), levelType === 'cave' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: caveItems }) })), levelType === 'porkland' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: porklandItems }) })), (levelType !== 'forest' && levelType !== 'cave' && levelType !== 'porkland') && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Alert, { style: {
                            marginBottom: '4px'
                        }, message: "".concat(t("level.warning.not.support.view"), " ").concat(levelType), type: "info", showIcon: true, closable: true }) }))] }) }));
});
var Group = function (_a) {
    var valueRef = _a.valueRef, data = _a.data, url = _a.url, leveldataoverrideObject = _a.leveldataoverrideObject, onStateChange = _a.onStateChange, changeValue = _a.changeValue, type = _a.type, isWorldGen = _a.isWorldGen;
    function getWebp(key, key2) {
        if (type === 'porkland' && key === 'global' && isWorldGen) {
            return url;
        }
        if (type === 'porkland' && (key === 'survivors' || key === 'global')) {
            return './misc/worldsettings_customization.webp';
        }
        var list = [
            'task_set', 'boons', 'rock', 'mushroom', 'weather',
        ];
        if (type === 'porkland' && list.includes(key2)) {
            return './misc/worldgen_customization.webp';
        }
        return url;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.keys(data)
            .sort(function (a, b) { return data[a].order - data[b].order; })
            .map(function (key) {
            return (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: data[key].text }), (0, jsx_runtime_1.jsx)(antd_1.Space, { size: [32, 8], wrap: true, children: Object.entries(data[key].items)
                            .map(function (_a) {
                            var key2 = _a[0], value = _a[1];
                            // 可以在回调函数内对 value 进行操作
                            return (0, jsx_runtime_1.jsxs)(antd_1.Space, { align: "center", size: 'middle', children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                            width: '64px',
                                            height: '64px',
                                            backgroundImage: "url(".concat(getWebp(key, key2), ")"),
                                            backgroundPosition: "-".concat(Math.round(value.image.x * data[key].atlas.width / data[key].atlas.item_size) * 100, "% -").concat(Math.round(value.image.y * data[key].atlas.height / data[key].atlas.item_size) * 100, "%")
                                        } }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { children: value.text }), (0, jsx_runtime_1.jsx)(Item, { options: ((value.desc !== undefined &&
                                                    value.desc !== null) &&
                                                    Object.entries(value.desc).map(function (_a) {
                                                        var k = _a[0], v = _a[1];
                                                        return ({
                                                            value: k,
                                                            label: v,
                                                        });
                                                    })) || (data[key].desc !== undefined &&
                                                    data[key].desc !== null) &&
                                                    Object.entries(data[key].desc).map(function (_a) {
                                                        var k = _a[0], v = _a[1];
                                                        return ({
                                                            value: k,
                                                            label: v,
                                                        });
                                                    }), currentValue: leveldataoverrideObject[key2], defaultValue: value.value, name: key2, valueRef: valueRef, onStateChange: onStateChange, changeValue: changeValue })] })] }, key2);
                        }) })] }, key);
        }) }));
};
var Item = function (_a) {
    var currentValue = _a.currentValue, defaultValue = _a.defaultValue, options = _a.options, name = _a.name, valueRef = _a.valueRef, onStateChange = _a.onStateChange, changeValue = _a.changeValue;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _b = (0, react_1.useState)(true), isDefault = _b[0], setIsDefault = _b[1];
    (0, react_1.useEffect)(function () {
        if (currentValue !== defaultValue) {
            setIsDefault(false);
        }
    }, []);
    function handleChange(value) {
        try {
            setIsDefault(value === defaultValue);
            // console.log("value: ", value, "name: ", name)
            var data = (0, lua_json_1.parse)(valueRef.current.replace(/\n/g, ""));
            data.overrides[name] = value;
            onStateChange(name, value);
            // valueRef.current = format(data)
            changeValue((0, lua_json_1.format)(data));
        }
        catch (error) {
            antd_1.message.warning(t("level.warning.lua.error"));
        }
    }
    var selectClassName = isDefault ? "" : "selected";
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { style: {
                    width: 120,
                }, value: currentValue, defaultValue: defaultValue, onChange: function (value) {
                    handleChange(value);
                }, className: selectClassName, options: options }) }) }));
};
