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
/* eslint-disable */
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var lua_json_1 = require("lua-json");
var react_i18next_1 = require("react-i18next");
var NewEditor_1 = require("../NewEditor");
var clusterLevelApi_1 = require("../../api/clusterLevelApi");
var useTheme_1 = require("../../hooks/useTheme");
var react_router_dom_1 = require("react-router-dom");
var ConfigViewEditor_1 = __importDefault(require("./ConfigViewEditor"));
var dst_1 = require("../../utils/dst");
var Leveldataoverride = function (_a) {
    var editorRef = _a.editorRef, dstWorldSetting = _a.dstWorldSetting, levelName = _a.levelName, level = _a.level, changeValue = _a.changeValue;
    var t = (0, react_i18next_1.useTranslation)().t;
    var theme = (0, useTheme_1.useTheme)().theme;
    var ref = (0, react_1.useRef)(level.leveldataoverride);
    (0, react_1.useEffect)(function () {
        ref.current = level.leveldataoverride;
        // console.log("leveldataoverride update")
    }, [level]);
    function updateValue(newValue) {
        changeValue(levelName, { leveldataoverride: newValue });
        ref.current = newValue;
        editorRef.current.current.setValue(newValue);
    }
    (0, react_1.useEffect)(function () {
        editorRef.current.current.setValue(level.leveldataoverride);
        editorRef.current.current.onDidChangeModelContent(function (e) {
            var newValue = editorRef.current.current.getValue();
            changeValue(levelName, { leveldataoverride: newValue });
            ref.current = newValue;
        });
    }, []);
    var LeveldataoverrideEditor = function () {
        return ((0, jsx_runtime_1.jsx)(NewEditor_1.MonacoEditor, { ref: editorRef, style: {
                "height": "52vh",
                "width": "100%"
            }, options: {
                theme: theme === 'dark' ? 'vs-dark' : ''
            } }));
    };
    var LeveldataoverrideViewer = function () {
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
        var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
        var _b = (0, react_1.useState)(), porklandSetting = _b[0], setPorklandSetting = _b[1];
        (0, react_1.useEffect)(function () {
            if (getLevelObject(ref.current).location === 'porkland') {
                setLoading(true);
                // 获取 哈姆雷特的配置项
                fetch('./misc/porkland_setting.json')
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
                    console.log("111111111111", typeof data);
                    setPorklandSetting(data);
                })
                    .catch(function (error) {
                    console.error('无法加载配置文件', error);
                }).finally(function () {
                    setLoading(false);
                });
            }
            else {
                setLoading(false);
            }
        }, []);
        return ((0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, children: (0, jsx_runtime_1.jsx)(ConfigViewEditor_1.default, { changeValue: updateValue, valueRef: ref, dstWorldSetting: dstWorldSetting, porklandSetting: porklandSetting }) }));
    };
    var items = [
        {
            label: t('level.view'),
            children: (0, jsx_runtime_1.jsx)(LeveldataoverrideViewer, {}),
            key: '1',
        },
        {
            label: t('level.edit'),
            children: (0, jsx_runtime_1.jsx)(LeveldataoverrideEditor, {}),
            key: '2',
            forceRender: true,
        }
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { type: "card", destroyInactiveTabPane: true, items: items }) }));
};
var Modoverrides = function (_a) {
    var editorRef = _a.editorRef, modoverridesRef = _a.modoverridesRef, levelName = _a.levelName, level = _a.level, changeValue = _a.changeValue;
    var theme = (0, useTheme_1.useTheme)().theme;
    (0, react_1.useEffect)(function () {
        editorRef.current.current.setValue(modoverridesRef.current);
        editorRef.current.current.onDidChangeModelContent(function (e) {
            var newValue = editorRef.current.current.getValue();
            //console.log(newValue)
            changeValue(levelName, { modoverrides: newValue });
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(NewEditor_1.MonacoEditor, { ref: editorRef, style: {
                "height": "56vh",
                "width": "100%"
            }, options: {
                theme: theme === 'dark' ? 'vs-dark' : ''
            } }) }));
};
var ServerIni = function (_a) {
    var levelName = _a.levelName, level = _a.level, changeValue = _a.changeValue;
    var t = (0, react_i18next_1.useTranslation)().t;
    function onValuesChange(changedValues, allValues) {
        changeValue(levelName, { server_ini: allValues });
    }
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Form, { labelCol: {
            span: 3,
        }, wrapperCol: {
            span: 18,
        }, layout: "horizontal", initialValues: level.server_ini || {
            is_master: false,
            encode_user_path: true
        }, onValuesChange: onValuesChange, children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('serverini.server_port'), name: "server_port", tooltip: "\n            \u670D\u52A1\u5668\u76D1\u542C\u7684 UDP \u7AEF\u53E3\uFF0C\u6BCF\u4E2A\u670D\u52A1\u5668\u9700\u8981\u8BBE\u7F6E\u4E0D\u540C\u7684\u7AEF\u53E3\n\n\n            \u8303\u56F4\uFF1A10998-11018 (\u5176\u5B83\u7AEF\u53E3\u4E5F\u53EF\uFF0C\u4F46\u6E38\u620F\u5728\u68C0\u7D22\u5C40\u57DF\u7F51\u623F\u95F4\u65F6\u53EA\u4F1A\u626B\u63CF\u8FD9\u4E9B\u7AEF\u53E3)\n\n\n            \u9875\u9762\u81EA\u52A8\u5206\u914D\u7684\u7AEF\u53E3\u4E0D\u4F1A\u4E0E\u5DF2\u586B\u5199\u7684\u7AEF\u53E3\u91CD\u590D\uFF0C\u4F46\u9875\u9762\u4E0D\u4F1A\u64C5\u81EA\u4FEE\u6539\u81EA\u884C\u586B\u5199\u7684\u7AEF\u53E3\uFF0C\u6240\u4EE5\u786E\u4FDD\u4E0D\u8981\u586B\u5199\u91CD\u590D\u7684\u7AEF\u53E3\u3002\n            ", children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { style: {
                        width: '100%',
                    }, placeholder: "\u8303\u56F4: 10998-11018" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('serverini.is_master'), valuePropName: "checked", name: 'is_master', tooltip: "\n        \u5C06\u8BE5\u4E16\u754C\u8BBE\u4E3A\u4E3B\u4E16\u754C\uFF0C\u5373\u7B2C\u4E00\u6B21\u8FDB\u5165\u623F\u95F4\u65F6\u5C06\u4F1A\u8FDB\u5165\u7684\u4E16\u754C\u3002\n        \u4E3B\u670D\u52A1\u5668\u8FD0\u884C\u7684\u662F\u4E00\u4E2A\u623F\u95F4\u7684\u6838\u5FC3\u4E16\u754C\uFF0C\u5176\u5B83\u4E16\u754C\u90FD\u662F\u8BE5\u4E16\u754C\u7684\u9644\u5C5E\uFF0C\u6BD4\u5982\u5B63\u8282\u3001\u5929\u6570\u7B49\u90FD\u662F\u4EE5\u8BE5\u4E16\u754C\u4E3A\u51C6\u7684\u3002\n        ", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close') }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('serverini.name'), name: "name", tooltip: "name", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u4E16\u754C\u540D" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('serverini.id'), name: "id", tooltip: "\n            \u968F\u673A\u6570\u5B57\uFF0C\u7528\u4E8E\u533A\u5206\u4E0D\u540C\u7684\u4ECE\u670D\u52A1\u5668\u3002\n            \n            \u6E38\u620F\u8FC7\u7A0B\u4E2D\u4FEE\u6539\u8BE5\u9879\u4F1A\u5BFC\u81F4\u8BE5\u4E16\u754C\u7684\u73A9\u5BB6\u4FE1\u606F\u4E22\u5931\u3002\n            \n            \u4E3B\u670D\u52A1\u5668\u5F3A\u5236\u4E3A 1\u3002\u5176\u5B83\u4E16\u754C\u8BBE\u4E3A 1 \u4E5F\u4F1A\u88AB\u89C6\u4E3A\u4E3B\u670D\u52A1\u5668\u53BB\u65B0\u6CE8\u518C\u4E00\u4E2A\u623F\u95F4\u3002\n            ", children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { style: {
                        width: '100%',
                    }, placeholder: "id" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('serverini.encode_user_path'), valuePropName: "checked", name: 'encode_user_path', tooltip: "\n            \u4F7F\u8DEF\u5F84\u7F16\u7801\u4E0E\u4E0D\u533A\u5206\u5927\u5C0F\u5199\u7684\u64CD\u4F5C\u7CFB\u7EDF\u517C\u5BB9", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close'), defaultChecked: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('serverini.authentication_port'), name: 'authentication_port', tooltip: "serverini.authentication_port", children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { style: {
                        width: '100%',
                    }, placeholder: "serverini.authentication_port" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('serverini.master_server_port'), name: 'master_server_port', tooltip: "master_server_port", children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { style: {
                        width: '100%',
                    }, placeholder: "master_server_port" }) })] }));
};
function parseWorldConfig(modoverrides) {
    try {
        var object = (0, lua_json_1.parse)(modoverrides);
        // workshop-1754389029
        if (object === null) {
            return [];
        }
        var mod = object['workshop-1754389029'];
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
var LevelItem = function (_a) {
    var dstWorldSetting = _a.dstWorldSetting, levelName = _a.levelName, level = _a.level, changeValue = _a.changeValue;
    var t = (0, react_i18next_1.useTranslation)().t;
    var modoverridesRef = (0, react_1.useRef)(level.modoverrides);
    var editorRef = (0, react_1.useRef)();
    var editorRef2 = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d;
        (_b = (_a = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.setValue(level.modoverrides);
        (_d = (_c = editorRef2 === null || editorRef2 === void 0 ? void 0 : editorRef2.current) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.setValue(level.leveldataoverride);
    }, [level]);
    var form = antd_1.Form.useForm()[0];
    form.setFieldsValue({
        world_config: parseWorldConfig(level.modoverrides)
    });
    var formValueChange = function (changedValues, allValues) {
        var world_config = allValues.world_config;
        if (world_config === null || world_config === undefined) {
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
            return;
        }
        world_config.forEach(function (item) {
            var temp = __assign({}, item);
            delete temp['id'];
            object[item.id] = temp;
        });
        var oldValue = editorRef.current.current.getValue();
        var mobject = (0, lua_json_1.parse)(oldValue);
        if (mobject['workshop-1754389029'] === null || mobject['workshop-1754389029'] === undefined || mobject['workshop-1754389029'].configuration_options === undefined) {
            mobject['workshop-1754389029'] = {
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
        mobject['workshop-1754389029'].configuration_options.world_config = object;
        var newValue = (0, lua_json_1.format)(mobject, { singleQuote: false });
        editorRef.current.current.setValue(newValue);
    };
    var onTabItemChange = function (activeKey) {
        if (activeKey === '4') {
            // 更新form 的数据
            var world_config = parseWorldConfig(editorRef.current.current.getValue());
            form.setFieldsValue({
                world_config: world_config
            });
        }
        if (activeKey === '2') {
            // 更新编译器的值
        }
    };
    var items = [
        {
            label: t('level.leveldataoverride'),
            children: (0, jsx_runtime_1.jsx)("div", { className: 'scrollbar', style: {
                    height: '62vh',
                    overflowY: 'auto',
                }, children: (0, jsx_runtime_1.jsx)(Leveldataoverride, { editorRef: editorRef2, dstWorldSetting: dstWorldSetting, levelName: levelName, level: level, changeValue: changeValue }) }),
            key: '1',
            forceRender: true,
        },
        {
            label: t('level.modoverrides'),
            children: (0, jsx_runtime_1.jsx)("div", { className: 'scrollbar', style: {
                    height: '60vh',
                    overflowY: 'auto',
                }, children: (0, jsx_runtime_1.jsx)(Modoverrides, { editorRef: editorRef, onchange: function (v) { return setModoverridesState(v); }, modoverridesRef: modoverridesRef, levelName: levelName, level: level, changeValue: changeValue }) }),
            key: '2',
            forceRender: true,
        },
        {
            label: t('level.serverIni'),
            children: (0, jsx_runtime_1.jsx)("div", { className: 'scrollbar', style: {
                    height: '60vh',
                    overflowY: 'auto',
                }, children: (0, jsx_runtime_1.jsx)(ServerIni, { levelName: levelName, level: level, changeValue: changeValue }) }),
            key: '3',
            forceRender: true,
        },
    ];
    (0, react_1.useEffect)(function () {
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { onChange: onTabItemChange, 
            // destroyInactiveTabPane={true}
            items: items }) }));
};
var defaultDstWorldSetting = {
    zh: {
        forest: {
            WORLDGEN_GROUP: {},
            WORLDSETTINGS_GROUP: {}
        },
        cave: {
            WORLDGEN_GROUP: {},
            WORLDSETTINGS_GROUP: {}
        }
    },
    en: {
        forest: {
            WORLDGEN_GROUP: {},
            WORLDSETTINGS_GROUP: {}
        },
        cave: {
            WORLDGEN_GROUP: {},
            WORLDSETTINGS_GROUP: {}
        }
    }
};
var App = function () {
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var t = (0, react_i18next_1.useTranslation)().t;
    var i18n = (0, react_i18next_1.useTranslation)().i18n;
    var lang = i18n.language;
    var levelListRef = (0, react_1.useRef)([]);
    var _a = (0, react_1.useState)(false), openAdd = _a[0], setOpenAdd = _a[1];
    var _b = (0, react_1.useState)(false), openDelete = _b[0], setOpenDelete = _b[1];
    var levelNameRef = (0, react_1.useRef)("");
    var _c = (0, react_1.useState)(''), activeKey = _c[0], setActiveKey = _c[1];
    var _d = (0, react_1.useState)([]), items = _d[0], setItems = _d[1];
    var newTabIndex = (0, react_1.useRef)(0);
    var _e = (0, react_1.useState)(defaultDstWorldSetting), dstWorldSetting = _e[0], setDstWorldSetting = _e[1];
    var _f = (0, react_1.useState)(true), loading = _f[0], setLoading = _f[1];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        fetch('misc/dst_world_setting.json')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setDstWorldSetting(data);
            (0, clusterLevelApi_1.getLevelListApi)()
                .then(function (resp) {
                // console.log(resp)
                if (resp.code === 200) {
                    var levels = resp.data;
                    levelListRef.current = levels;
                    var items2 = levels.map(function (level) {
                        var closable = level.uuid !== "Master";
                        if (lang === "en") {
                            if (level.uuid === "Master") {
                                level.levelName = "Forest";
                            }
                            if (level.uuid === "Caves") {
                                level.levelName = "Caves";
                            }
                        }
                        if (level.uuid !== "Master") {
                            if (level.leveldataoverride === "return {}" || level.leveldataoverride === "") {
                                level.leveldataoverride = dst_1.forest;
                            }
                        }
                        return {
                            label: level.levelName,
                            children: (0, jsx_runtime_1.jsx)(LevelItem, { dstWorldSetting: data, level: {
                                    leveldataoverride: level.leveldataoverride,
                                    modoverrides: level.modoverrides,
                                    server_ini: level.server_ini
                                }, levelName: level.levelName, changeValue: changeValue }),
                            key: level.uuid,
                            closable: closable,
                        };
                    });
                    setItems(items2);
                    if (levels.length === 0) {
                        setActiveKey("");
                    }
                    else {
                        setActiveKey(levels[0].uuid);
                    }
                }
                else {
                    antd_1.message.error(t('level.fetch.error'));
                }
                setLoading(false);
            });
        })
            .catch(function (error) {
            console.error('无法加载配置文件', error);
        });
    }, []);
    var onChange = function (newActiveKey) {
        setActiveKey(newActiveKey);
    };
    function changeValue(levelName, newValue) {
        var oldLevels = levelListRef.current;
        levelListRef.current = oldLevels.map(function (level) {
            if (level.levelName === levelName) {
                return __assign(__assign({}, level), newValue);
            }
            return level;
        });
    }
    var add = function (levelName, uuid, leveldataoverride, modoverrides, server_ini) {
        var newActiveKey = "newTab".concat(newTabIndex.current++);
        var newPanes = __spreadArray([], items, true);
        var newLevel = {
            levelName: levelName,
            uuid: uuid,
            leveldataoverride: leveldataoverride,
            modoverrides: modoverrides,
            server_ini: server_ini
        };
        var newLevels = __spreadArray([], levelListRef.current, true);
        newLevels.push(newLevel);
        levelListRef.current = newLevels;
        newPanes.push({
            label: levelName,
            children: (0, jsx_runtime_1.jsx)(LevelItem, { dstWorldSetting: dstWorldSetting, level: {
                    leveldataoverride: newLevel.leveldataoverride,
                    modoverrides: newLevel.modoverrides,
                    server_ini: newLevel.server_ini
                }, levelName: levelName, changeValue: changeValue }),
            key: uuid,
        });
        setItems(newPanes);
        setActiveKey(uuid);
    };
    var remove = function (targetKey) {
        setDeleteLevelName(targetKey);
        setOpenDelete(true);
        // let newActiveKey = activeKey;
        // let lastIndex = -1;
        // items.forEach((item, i) => {
        //     if (item.key === targetKey) {
        //         lastIndex = i - 1;
        //     }
        // });
        // const newPanes = items.filter((item) => item.key !== targetKey);
        // if (newPanes.length && newActiveKey === targetKey) {
        //     if (lastIndex >= 0) {
        //         newActiveKey = newPanes[lastIndex].key;
        //     } else {
        //         newActiveKey = newPanes[0].key;
        //     }
        // }
        // setItems(newPanes);
        // setActiveKey(newActiveKey);
        //
        // // TODO 删除对应的level
        // levelListRef.current = levelListRef.current.filter((item) => item.levelName !== targetKey)
    };
    var removeLevel = function (targetKey) {
        var newActiveKey = activeKey;
        var lastIndex = -1;
        items.forEach(function (item, i) {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        var newPanes = items.filter(function (item) { return item.key !== targetKey; });
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            }
            else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
        // TODO 删除对应的level
        levelListRef.current = levelListRef.current.filter(function (item) { return item.uuid !== targetKey; });
    };
    var onEdit = function (targetKey, action) {
        if (action === 'add') {
            add();
        }
        else {
            remove(targetKey);
        }
    };
    var _g = (0, react_1.useState)(false), confirmLoading = _g[0], setConfirmLoading = _g[1];
    var _h = (0, react_1.useState)(""), deleteLevelName = _h[0], setDeleteLevelName = _h[1];
    var levelForm = antd_1.Form.useForm()[0];
    function onCreateLevel() {
        levelForm.validateFields().then(function () {
            var body = levelForm.getFieldsValue();
            if (body.levelName === undefined || body.levelName === '') {
                antd_1.message.warning(t('level.warning.name.not.allow.null'));
                return;
            }
            if (body.type === "forest") {
                body.leveldataoverride = dst_1.forest;
            }
            else if (body.type === 'porkland') {
                body.leveldataoverride = dst_1.porkland;
            }
            else {
                body.leveldataoverride = dst_1.cave;
            }
            body.modoverrides = getMasterModoverrides();
            // 初始化
            body.server_ini = getNextServerIni(body.levelName);
            setConfirmLoading(true);
            (0, clusterLevelApi_1.createLevelApi)(body).then(function (resp) {
                if (resp.code === 200) {
                    antd_1.message.success("".concat(body.levelName, " ").concat(t('level.create.success')));
                    var data = resp.data;
                    console.log("data", data);
                    add(body.levelName, data.uuid, data.leveldataoverride, data.modoverrides, data.server_ini);
                    setConfirmLoading(false);
                    setOpenAdd(false);
                }
                else {
                    antd_1.message.error("".concat(body.levelName, " ").concat(t('level.create.error')));
                }
            });
        }).catch(function (err) {
            // 验证不通过时进入
            antd_1.message.error(err.errorFields[0].errors[0]);
        });
    }
    var validateName1 = function (_, value) {
        var stringList = levelListRef.current.map(function (level) { return level.levelName; });
        // 判断是否重复字符串
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error(t('level.name.duplication')));
        }
        return Promise.resolve();
    };
    var validateName2 = function (_, value) {
        var stringList = levelListRef.current.map(function (level) { return level.uuid; });
        // 判断是否重复字符串
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error(t('level.filename.duplication')));
        }
        // 判断是否为子串
        for (var i = 0; i < stringList.length; i++) {
            if (value && stringList[i].includes(value)) {
                return Promise.reject(new Error(t('level.filename.error.substring')));
            }
        }
        // 判断是否以英文开头且不含有特殊字符
        var regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
        if (value && !regex.test(value)) {
            return Promise.reject(new Error(t('level.filename.error.contain.special.characters')));
        }
        return Promise.resolve();
    };
    var validateName3 = function (_, value) {
        console.log("value3", value);
        if (value === undefined || value === null || value === "") {
            return Promise.reject(new Error('请选择类型'));
        }
        return Promise.resolve();
    };
    function getMasterModoverrides() {
        var levels = levelListRef.current;
        var modoverrides = "return {}";
        levels.forEach(function (level) {
            if (level.uuid === "Master") {
                modoverrides = level.modoverrides;
            }
        });
        return modoverrides;
    }
    function getNextServerIni(levelName) {
        var levels = levelListRef.current;
        var nextId = 11001;
        var nextPort = 11001;
        var master_server_port = 27019;
        var authentication_port = 8769;
        var maxId = 0;
        var maxPort = 0;
        var maxMaster_server_port = 0;
        var maxAuthentication_port = 0;
        levels.forEach(function (level) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (((_a = level === null || level === void 0 ? void 0 : level.server_ini) === null || _a === void 0 ? void 0 : _a.id) > maxId) {
                maxId = (_b = level === null || level === void 0 ? void 0 : level.server_ini) === null || _b === void 0 ? void 0 : _b.id;
            }
            if (((_c = level === null || level === void 0 ? void 0 : level.server_ini) === null || _c === void 0 ? void 0 : _c.server_port) > maxPort) {
                maxPort = (_d = level === null || level === void 0 ? void 0 : level.server_ini) === null || _d === void 0 ? void 0 : _d.server_port;
            }
            if (((_e = level === null || level === void 0 ? void 0 : level.server_ini) === null || _e === void 0 ? void 0 : _e.authentication_port) > maxAuthentication_port) {
                maxAuthentication_port = (_f = level === null || level === void 0 ? void 0 : level.server_ini) === null || _f === void 0 ? void 0 : _f.authentication_port;
            }
            if (((_g = level === null || level === void 0 ? void 0 : level.server_ini) === null || _g === void 0 ? void 0 : _g.master_server_port) > maxMaster_server_port) {
                maxMaster_server_port = (_h = level === null || level === void 0 ? void 0 : level.server_ini) === null || _h === void 0 ? void 0 : _h.master_server_port;
            }
        });
        return {
            id: maxId + 1,
            name: levelName,
            is_master: false,
            encode_user_path: true,
            server_port: maxPort + 1,
            authentication_port: maxAuthentication_port + 1,
            master_server_port: maxMaster_server_port + 1,
        };
    }
    var _j = (0, react_1.useState)(false), spinLoading = _j[0], setSpinLoading = _j[1];
    var handleRefresh = function () {
        setSpinLoading(true);
        (0, clusterLevelApi_1.getLevelListApi)()
            .then(function (resp) {
            if (resp.code === 200) {
                var levels = resp.data;
                levelListRef.current = levels;
                var items2 = levels.map(function (level) {
                    var closable = level.uuid !== "Master";
                    if (level.uuid !== "Master") {
                        if (level.leveldataoverride === "return {}" || level.leveldataoverride === "") {
                            level.leveldataoverride = dst_1.forest;
                        }
                    }
                    return {
                        label: level.levelName,
                        children: (0, jsx_runtime_1.jsx)(LevelItem, { dstWorldSetting: dstWorldSetting, level: {
                                leveldataoverride: level.leveldataoverride,
                                modoverrides: level.modoverrides,
                                server_ini: level.server_ini
                            }, levelName: level.levelName, changeValue: changeValue }),
                        key: level.uuid,
                        closable: closable,
                    };
                });
                setItems(__spreadArray([], items2, true));
                if (levels.length === 0) {
                    setActiveKey("");
                }
                else {
                    setActiveKey(levels[0].uuid);
                }
                setSpinLoading(false);
            }
            else {
                antd_1.message.error(t('level.fetch.error'));
            }
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, children: (0, jsx_runtime_1.jsxs)(antd_1.Spin, { spinning: spinLoading, children: [levelListRef.current.length === 0 && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Empty, { description: t('level.empty') }) })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', style: {
                                height: '72vh',
                            }, hideAdd: true, type: "editable-card", onChange: onChange, activeKey: activeKey, onEdit: onEdit, items: items }), (0, jsx_runtime_1.jsx)(antd_1.Divider, {}), (0, jsx_runtime_1.jsx)("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between'
                            }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 12, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                                            (0, clusterLevelApi_1.updateLevelsApi)({ levels: levelListRef.current })
                                                .then(function (resp) {
                                                if (resp.code === 200) {
                                                    antd_1.message.success(t('level.save.success'));
                                                }
                                                else {
                                                    antd_1.message.warning(t('level.save.error'));
                                                    antd_1.message.warning(resp.msg);
                                                }
                                            });
                                        }, children: t('level.save') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return setOpenAdd(true); }, children: t('level.add') })] }) })] }) }), (0, jsx_runtime_1.jsxs)(antd_1.Modal, { title: t('level.add'), open: openAdd, onOk: function () { return onCreateLevel(); }, confirmLoading: confirmLoading, onCancel: function () {
                    setOpenAdd(false);
                }, children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { message: t('level.add.tips1'), type: "warning", showIcon: true, closable: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Form, { form: levelForm, layout: "vertical", labelAlign: 'left', children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('level.name'), name: "levelName", rules: [
                                    {
                                        required: true,
                                        validator: validateName1
                                    },
                                ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u4E16\u754C\u540D" }) }), (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: t('level.add.tips2'), type: "warning", showIcon: true, closable: true }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('level.filename'), name: "uuid", rules: [
                                    {
                                        required: false,
                                        validator: validateName2
                                    },
                                ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6587\u4EF6\u540D" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('level.type'), name: "type", rules: [
                                    {
                                        required: true,
                                        validator: validateName3,
                                        message: 'Please input your type!',
                                    },
                                ], children: (0, jsx_runtime_1.jsxs)(antd_1.Radio.Group, { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 'forest', children: t('level.type.forest') }), (0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 'cave', children: t('level.type.caves') }), (0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 'porkland', children: t('level.type.porkland') })] }) })] })] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: "\u662F\u5426\u5220\u9664 ".concat(deleteLevelName, " \u4E16\u754C"), open: openDelete, onOk: function () {
                    setConfirmLoading(true);
                    (0, clusterLevelApi_1.deleteLevelApi)(deleteLevelName)
                        .then(function (resp) {
                        if (resp.code === 200) {
                            antd_1.message.success("\u5220\u9664\u4E16\u754C\u6210\u529F");
                            removeLevel(deleteLevelName);
                            setConfirmLoading(false);
                            setOpenDelete(false);
                        }
                        else {
                            antd_1.message.error("\u5220\u9664\u4E16\u754C\u5931\u8D25");
                        }
                    });
                }, confirmLoading: confirmLoading, onCancel: function () {
                    setOpenDelete(false);
                }, children: (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: "\u5220\u4E16\u754C\u4F1A\u5148\u505C\u6B62\u4E16\u754C\u8FD0\u884C\uFF0C\u5220\u9664\u4E4B\u524D\u8BF7\u4FDD\u5B58\u597D\u6570\u636E", type: "warning", showIcon: true }) })] }));
};
exports.default = App;
