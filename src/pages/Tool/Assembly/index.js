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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable */
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var lua_json_1 = require("lua-json");
var icons_1 = require("@ant-design/icons");
var clusterLevelApi_1 = require("../../../api/clusterLevelApi");
function parseWorldConfig(modoverrides, workshopId) {
    try {
        var object = (0, lua_json_1.parse)(modoverrides);
        // workshop-1754389029
        if (object === null) {
            return [];
        }
        var mod = object[workshopId];
        if (mod === null || mod === undefined || mod.configuration_options === undefined || mod.configuration_options.world_config === undefined) {
            return [];
        }
        var world_config = mod.configuration_options.world_config;
        console.log("lua to js", world_config);
        var keys = Object.keys(world_config);
        var items = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            items.push({
                id: key,
                name: world_config[key].name,
                category: world_config[key].category,
                galleryful: world_config[key].galleryful,
                invisible: world_config[key].invisible,
                extra: world_config[key].extra,
                is_cave: world_config[key].is_cave,
                note: world_config[key].note,
                desc: world_config[key].desc,
            });
        }
        return items;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
exports.default = (function (_a) {
    var reload = _a.reload;
    var _b = (0, react_1.useState)([]), levels = _b[0], setLevels = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var form = antd_1.Form.useForm()[0];
    var _d = (0, react_1.useState)("workshop-1754389029"), workshopId = _d[0], setWorkshopId = _d[1];
    var updateWorkshopId = function (workshopId) {
        setWorkshopId(workshopId);
        // 重新读取配置
        form.setFieldsValue({
            world_config: parseWorldConfig(levels[0].modoverrides, workshopId)
        });
    };
    var saveWorkshop = function () {
        var world_config = form.getFieldValue().world_config;
        if (world_config === null || world_config === undefined) {
            antd_1.message.warning("不能为空");
            return;
        }
        world_config.forEach(function (item) {
            if (item !== null || item !== undefined) {
                Object.keys(item).forEach(function (key) {
                    if (item[key] === undefined) {
                        delete item[key];
                    }
                });
            }
        });
        // 转成对象
        var object = {};
        if (world_config === null || world_config === undefined) {
            antd_1.message.warning("不能为空");
            return;
        }
        world_config.forEach(function (item) {
            var temp = __assign({}, item);
            delete temp['id'];
            object[item.id] = temp;
        });
        var levels2 = __spreadArray([], levels, true);
        for (var _i = 0, levels2_1 = levels2; _i < levels2_1.length; _i++) {
            var level2 = levels2_1[_i];
            var oldValue = level2.modoverrides;
            var mobject = (0, lua_json_1.parse)(oldValue);
            if (mobject[workshopId] === null || mobject[workshopId] === undefined || mobject[workshopId].configuration_options === undefined) {
                mobject[workshopId] = {
                    configuration_options: {
                        world_config: {},
                        default_galleryful: 0,
                        auto_balancing: true,
                        no_bat: true,
                        world_prompt: false,
                        say_dest: true,
                        migration_postern: false,
                        ignore_sinkholes: false,
                        open_button: true,
                        migrator_required: false,
                        force_population: false,
                        name_button: true,
                        always_show_ui: false,
                        gift_toasts_offset: 100,
                    },
                    enabled: true,
                };
            }
            mobject[workshopId].configuration_options.world_config = object;
            var newValue = (0, lua_json_1.format)(mobject, { singleQuote: false });
            level2.modoverrides = newValue;
        }
        console.log(levels2);
        (0, clusterLevelApi_1.updateLevelsApi)({ levels: levels2 })
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("保存成功");
                reload();
            }
            else {
                antd_1.message.error("保存失败", resp.msg);
            }
        });
    };
    (0, react_1.useEffect)(function () {
        setLoading(true);
        (0, clusterLevelApi_1.getLevelListApi)()
            .then(function (resp) {
            console.log(resp);
            if (resp.code === 200) {
                var levels_1 = resp.data;
                setLevels(levels_1);
                var workshop1 = localStorage.getItem('workshop');
                if (workshop1 === null || workshop1 === undefined || workshop1 === "") {
                    workshop1 = "workshop-1754389029";
                }
                setWorkshopId(workshop1);
                form.setFieldsValue({
                    world_config: parseWorldConfig(levels_1[0].modoverrides, workshop1)
                });
            }
            setLoading(false);
        });
    }, []);
    var items = [
        {
            label: '多层选择器',
            children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(SelectorMod, { form: form, updateWorkshopId: updateWorkshopId, workshopId: workshopId, saveWorkshop: saveWorkshop }) }),
            key: '1',
        },
        {
            label: '世界配置同步',
            children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(SyncConfig, { levels: levels }) }),
            key: '2',
            forceRender: true,
        },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items }) }) }));
});
var SelectorMod = function (_a) {
    var form = _a.form, formValueChange = _a.formValueChange, updateWorkshopId = _a.updateWorkshopId, workshopId = _a.workshopId, saveWorkshop = _a.saveWorkshop;
    var inputRef = (0, react_1.useRef)(null);
    var Connect = function () {
        return ((0, jsx_runtime_1.jsx)(antd_1.Form, { form: form, onValuesChange: formValueChange, children: (0, jsx_runtime_1.jsx)(antd_1.Form.List, { name: "world_config", children: function (fields, _a) {
                    var add = _a.add, remove = _a.remove;
                    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [fields.map(function (_a) {
                                var key = _a.key, name = _a.name, restField = __rest(_a, ["key", "name"]);
                                return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { style: {
                                                display: 'flex',
                                            }, align: "baseline", size: [8, 16], wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: '世界id' }, restField, { name: [name, 'id'], rules: [
                                                        {
                                                            required: true,
                                                            message: '缺失世界id',
                                                        },
                                                    ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u4E16\u754Cid" }) }), "".concat(key, "\u4E16\u754Cid")), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: '世界名称' }, restField, { name: [name, 'name'], rules: [
                                                        {
                                                            required: true,
                                                            message: '世界名称',
                                                        },
                                                    ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u4E16\u754C\u540D\u79F0\uFF0C\u4E0D\u5141\u8BB8\u6362\u884C" }) }), "".concat(key, "\u4E16\u754C\u540D\u79F0")), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: '分类' }, restField, { name: [name, 'category'], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u4E16\u754C\u7C7B\u522B\uFF0C\u7528\u4E8E\u7B5B\u9009\uFF0C\u5C06\u663E\u793A\u4E8E\u5DE6\u4FA7\u83DC\u5355" }) }), "".concat(key, "\u5206\u7C7B")), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: '提示信息' }, restField, { name: [name, 'note'], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u9F20\u6807\u60AC\u505C\u663E\u793A\u7684\u63D0\u793A\u4FE1\u606F" }) }), "".concat(key, "\u63D0\u793A\u4FE1\u606F")), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: '人数' }, restField, { name: [name, 'galleryful'], children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { placeholder: "\u4E16\u754C\u4EBA\u6570\u9650\u5236" }) }), "".concat(key, "\u4EBA\u6570")), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: '不分流' }, restField, { name: [name, 'extra'], valuePropName: "checked", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426" }) }), "".concat(key, "\u4E0D\u5206\u6D41")), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: '洞穴' }, restField, { name: [name, 'is_cave'], valuePropName: "checked", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426" }) }), "".concat(key, "\u6D1E\u7A74")), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ label: '不可见' }, restField, { name: [name, 'invisible'], valuePropName: "checked", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426" }) }), "".concat(key, "\u4E0D\u53EF\u89C1")), (0, jsx_runtime_1.jsx)(icons_1.MinusCircleOutlined, { onClick: function () { return remove(name); } })] }, key), (0, jsx_runtime_1.jsx)(antd_1.Divider, {})] }, key));
                            }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "dashed", onClick: function () { return add(); }, block: true, icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), children: "Add field" }) })] }));
                } }) }));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { message: "\u76EE\u524D\u53EA\u517C\u5BB9 [WIP] \u53C8\u662F\u4E00\u4E2A\u4E16\u754C\u9009\u62E9\u5668 workshop-1754389029 \u8FD9\u79CD\u683C\u5F0F\u7684\u914D\u7F6E", type: "info", showIcon: true, action: (0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://steamcommunity.com/sharedfiles/filedetails/?id=1754389029", children: "\u8BE6\u7EC6" }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 16, wrap: true, children: [(0, jsx_runtime_1.jsxs)(antd_1.Space.Compact, { style: {
                            width: '100%',
                        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { defaultValue: workshopId, ref: inputRef, placeholder: "\u591A\u5C42\u9009\u62E9\u5668\u6A21\u7EC4id" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                                    updateWorkshopId(inputRef.current.input.value);
                                }, children: "\u5237\u65B0" })] }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "middle", type: "primary", onClick: function () { return localStorage.setItem("workshop", inputRef.current.input.value); }, children: "\u8BBE\u7F6E\u9ED8\u8BA4\u591A\u5C42\u9009\u62E9\u5668" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(Connect, {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: function () { return saveWorkshop(); }, children: "\u4FDD\u5B58\u914D\u7F6E" })] }));
};
var SyncConfig = function (_a) {
    var _b, _c;
    var levels = _a.levels, saveSyncConfig = _a.saveSyncConfig;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 16, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Select, { defaultValue: (_b = levels[0]) === null || _b === void 0 ? void 0 : _b.uuid, style: {
                        width: 120,
                    }, 
                    // onChange={handleChange}
                    options: levels.map(function (level, index) {
                        return {
                            value: level.uuid,
                            label: level.levelName,
                        };
                    }) }), (0, jsx_runtime_1.jsx)("span", { children: "\u540C\u6B65" }), (0, jsx_runtime_1.jsx)(antd_1.Select, { mode: "multiple", defaultValue: (_c = levels[0]) === null || _c === void 0 ? void 0 : _c.uuid, style: {
                        width: 120,
                    }, 
                    // onChange={handleChange}
                    options: levels.map(function (level, index) {
                        return {
                            value: level.uuid,
                            label: level.levelName,
                        };
                    }) })] }) }));
};
