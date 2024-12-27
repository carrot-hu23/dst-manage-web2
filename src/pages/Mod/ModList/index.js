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
var lodash_1 = __importDefault(require("lodash"));
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var lua_json_1 = require("lua-json");
var gameApi_1 = require("../../../api/gameApi");
var modApi_1 = require("../../../api/modApi");
var ModItem_1 = __importDefault(require("./ModItem"));
var ModConfigOptions_1 = __importDefault(require("../ModConfigOptions"));
// eslint-disable-next-line react/prop-types
exports.default = (function (_a) {
    var modList = _a.modList, setModList = _a.setModList, defaultConfigOptionsRef = _a.defaultConfigOptionsRef, modConfigOptionsRef = _a.modConfigOptionsRef;
    var t = (0, react_i18next_1.useTranslation)().t;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _b = (0, react_1.useState)(false), confirmLoading = _b[0], setConfirmLoading = _b[1];
    var _c = (0, react_1.useState)({}), mod = _c[0], setMod = _c[1];
    var changeMod = function (mod) {
        var _mod = lodash_1.default.cloneDeep(mod);
        setMod(_mod);
    };
    var changeEnable = function (modId) {
        modList.forEach(function (mod) {
            if (mod.modid === modId) {
                mod.enable = !mod.enable;
            }
        });
        setModList(__spreadArray([], modList, true));
    };
    function isWorkshopId(str) {
        return /^[0-9]+$/.test(str);
    }
    function formatModOverride() {
        try {
            var chooses = modList.filter(function (mod) { return mod.enable; });
            var modids = chooses.map(function (mod) { return mod.modid; });
            var object = lodash_1.default.pick(modConfigOptionsRef.current, modids);
            var object1 = {};
            // eslint-disable-next-line no-restricted-syntax
            for (var _i = 0, modids_1 = modids; _i < modids_1.length; _i++) {
                var id = modids_1[_i];
                defaultConfigOptionsRef.current.get(id);
                object1[id] = defaultConfigOptionsRef.current.get(id);
            }
            var workshopObject_1 = lodash_1.default.merge({}, object, object1);
            var workshopIdKeys = Object.keys(workshopObject_1);
            var workShops_1 = {};
            workshopIdKeys.forEach(function (workshopId) {
                if (workshopObject_1[workshopId] === undefined) {
                    workshopObject_1[workshopId] = {};
                }
                var workshop;
                if (isWorkshopId(workshopId)) {
                    workshop = "workshop-".concat(workshopId);
                }
                else {
                    workshop = workshopId;
                }
                var options = workshopObject_1[workshopId];
                delete options.null;
                workShops_1[workshop] = {
                    configuration_options: options,
                    enabled: true
                };
            });
            console.log("结果", workShops_1);
            return (0, lua_json_1.format)(workShops_1, {
                singleQuote: false
            });
        }
        catch (error) {
            console.log(error);
            antd_1.message.warning("mod配置解析错误", error.message);
            return "return { error }";
        }
    }
    function saveModConfig() {
        (0, gameApi_1.getHomeConfigApi)(cluster)
            .then(function (data) {
            var homeConfig = data.data;
            homeConfig.modData = formatModOverride();
            if (homeConfig.modData !== "return { error }") {
                console.log(homeConfig);
                (0, gameApi_1.saveHomeConfigApi)(cluster, homeConfig).then(function () {
                    antd_1.message.info(t('mod.save.ok'));
                }).catch(function (error) {
                    console.log(error);
                    antd_1.message.error(t('mod.save.error'));
                });
            }
            else {
                antd_1.message.warning(t('mod.parse.error'));
            }
        });
    }
    function updateModConfigOptions() {
        setConfirmLoading(true);
        (0, modApi_1.updateModinfosApi)()
            .then(function (data) {
            if (data.code === 200) {
                antd_1.message.success(t('mod.update.ok'));
            }
            else {
                antd_1.message.warning(t('mod.update.error'));
            }
            setConfirmLoading(false);
        });
    }
    var removeMod = function (modId) {
        var newModList = [];
        // eslint-disable-next-line no-restricted-syntax
        for (var _i = 0, modList_1 = modList; _i < modList_1.length; _i++) {
            var mod_1 = modList_1[_i];
            if (mod_1.modid !== modId) {
                newModList.push(mod_1);
            }
        }
        setModList(__spreadArray([], newModList, true));
    };
    (0, react_1.useEffect)(function () {
        setMod(modList[0] || {});
    }, [modList]);
    var updateModSize = modList.filter(function (mod) { return mod.update; });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Spin, { spinning: confirmLoading, children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { message: t('mod.tips1'), type: "warning", showIcon: true, closable: true }), (0, jsx_runtime_1.jsx)("br", {}), updateModSize.length > 0 && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { message: "\u4F60\u6709 ".concat(updateModSize.length, " \u4E2A\u6A21\u7EC4\u914D\u7F6E\u6709\u66F4\u65B0"), type: "warning", showIcon: true, closable: true }), (0, jsx_runtime_1.jsx)("br", {})] }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 16, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return saveModConfig(); }, children: t('mod.save') }), (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: t('mod.tips2'), okText: "Yes", cancelText: "No", onConfirm: function () { return updateModConfigOptions(); }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", children: t('mod.update.all') }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: t('mod.tips3'), children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return navigate("/dashboard/mod/add/0"); }, children: t('mod.upload.modinfo') }) })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Row, { gutter: 24, children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, { span: 10, xs: 24, md: 10, lg: 10, children: [(0, jsx_runtime_1.jsx)("div", { className: 'scrollbar', style: {
                                        height: '60vh',
                                        overflowY: 'auto',
                                        overflowX: 'auto'
                                    }, children: modList.length > 0 && (0, jsx_runtime_1.jsx)("div", { children: modList.map(function (item, index) {
                                            return (0, jsx_runtime_1.jsx)(ModItem_1.default, { mod: item, changeMod: changeMod, changeEnable: changeEnable, removeMod: removeMod, modList: modList, setModList: setModList }, index);
                                        }) }) }), (0, jsx_runtime_1.jsx)("br", {})] }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 14, xs: 24, md: 14, lg: 14, children: mod.modid !== undefined && (0, jsx_runtime_1.jsx)(ModConfigOptions_1.default, { mod: mod, setMod: setMod, setModList: setModList, defaultConfigOptionsRef: defaultConfigOptionsRef, modConfigOptionsRef: modConfigOptionsRef }) })] })] }) }));
});
