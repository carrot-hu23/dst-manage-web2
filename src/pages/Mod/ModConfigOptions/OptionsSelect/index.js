"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var lodash_1 = __importDefault(require("lodash"));
var react_window_1 = require("react-window");
var Select2_1 = __importDefault(require("../../component/Select2"));
var dateUitls_1 = require("../../../../utils/dateUitls");
var OptionSelect = function (_a) {
    var _b, _c, _d, _e;
    var mod = _a.mod, defaultConfigOptionsRef = _a.defaultConfigOptionsRef, modConfigOptionsRef = _a.modConfigOptionsRef;
    var defaultConfigOptions = defaultConfigOptionsRef.current;
    (0, react_1.useEffect)(function () {
    }, []);
    // eslint-disable-next-line no-unused-vars
    var handleFormChange = function (changedValues, allValues) {
        var root = modConfigOptionsRef.current;
        // eslint-disable-next-line no-restricted-syntax
        for (var fieldName in changedValues) {
            // eslint-disable-next-line no-prototype-builtins
            if (changedValues.hasOwnProperty(fieldName)) {
                var fieldValue = changedValues[fieldName];
                // console.log(`Field ${fieldName} changed to ${fieldValue}`);
                lodash_1.default.set(root, "".concat(mod.modid, ".").concat(fieldName), fieldValue);
                // 同时把 默认的配置 也更新下
                var newDefaultValue = lodash_1.default.cloneDeep(defaultConfigOptionsRef.current);
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
                console.log("defaultValuesMap: ", defaultConfigOptionsRef.current);
                defaultConfigOptionsRef.current = newDefaultValue;
                console.log("newDefaultValue: ", newDefaultValue);
            }
        }
        modConfigOptionsRef.current = root;
        console.log("new modConfigOptionsRef", modConfigOptionsRef.current);
    };
    var configurationOptions = ((_b = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _b === void 0 ? void 0 : _b.configuration_options) !== undefined ? (_c = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _c === void 0 ? void 0 : _c.configuration_options.filter(function (item) { return item.options !== undefined; }).map(function (item) { return item; }) : [];
    console.log("configurationOptions", configurationOptions.length);
    var _f = (0, react_1.useState)(0), pageHeight = _f[0], setPageHeight = _f[1];
    (0, react_1.useEffect)(function () {
        var updatePageHeight = function () {
            setPageHeight(window.innerHeight);
        };
        window.addEventListener('resize', updatePageHeight);
        updatePageHeight();
        return function () {
            window.removeEventListener('resize', updatePageHeight);
        };
    }, []);
    var fiftyVhHeight = pageHeight * 0.58;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { onValuesChange: handleFormChange, name: "basic", labelCol: {
                span: 8,
            }, wrapperCol: {
                span: 16,
            }, children: [((_d = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _d === void 0 ? void 0 : _d.configuration_options) !== undefined && configurationOptions.length > 30 && ((0, jsx_runtime_1.jsx)(react_window_1.FixedSizeList, { height: fiftyVhHeight, itemCount: configurationOptions.length, itemSize: 60, children: function (_a) {
                        var _b, _c, _d;
                        var index = _a.index, style = _a.style;
                        var item = configurationOptions[index];
                        if (((_b = item === null || item === void 0 ? void 0 : item.options) === null || _b === void 0 ? void 0 : _b.length) === 1 && ((_c = item === null || item === void 0 ? void 0 : item.options[0]) === null || _c === void 0 ? void 0 : _c.data) === (item === null || item === void 0 ? void 0 : item.default) && !((_d = item === null || item === void 0 ? void 0 : item.options[0]) === null || _d === void 0 ? void 0 : _d.description)) {
                            // 在DST中,如果label为空字符串,就直接是显示空白行,这里用||会导致label为空也显示name,为了跟DST保持一样使用了??
                            return (0, jsx_runtime_1.jsx)("div", { style: style, children: (0, jsx_runtime_1.jsx)(antd_1.Divider, { children: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: "14px", fontWeight: "600" }, children: item.label || item.name }) }, (0, dateUitls_1.generateUUID)()) });
                        }
                        // TODO 还不知道哪些mod是这样的作为标题的,我目前没有发现
                        if (item.name === 'Title' || item.name === '') {
                            if (item.label === '') {
                                return "";
                            }
                            return (0, jsx_runtime_1.jsx)("div", { style: style, children: (0, jsx_runtime_1.jsx)(antd_1.Divider, { children: (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: "14px", fontWeight: "600" }, children: [item.label, " \u914D\u7F6E"] }) }, (0, dateUitls_1.generateUUID)()) });
                        }
                        var defaultValue;
                        if (defaultConfigOptions.get("".concat(mod.modid)) !== undefined) {
                            defaultValue = defaultConfigOptions.get("".concat(mod.modid))["".concat(item.name)];
                        }
                        else {
                            defaultValue = undefined;
                        }
                        return (0, jsx_runtime_1.jsx)("div", { style: style, children: (0, jsx_runtime_1.jsx)(Select2_1.default, { item: item, defaultValue: defaultValue }, (0, dateUitls_1.generateUUID)()) });
                    } })), ((_e = mod === null || mod === void 0 ? void 0 : mod.mod_config) === null || _e === void 0 ? void 0 : _e.configuration_options) !== undefined && configurationOptions.length <= 30 && (mod.mod_config.configuration_options
                    .filter(function (item) { return item.options !== undefined; })
                    .map(function (item) {
                    var _a, _b, _c;
                    // 例如2928810007,2334209327都是这样的,options只有一个,而且就只是默认值,并且该项的description没有内容
                    if (((_a = item === null || item === void 0 ? void 0 : item.options) === null || _a === void 0 ? void 0 : _a.length) === 1 && ((_b = item === null || item === void 0 ? void 0 : item.options[0]) === null || _b === void 0 ? void 0 : _b.data) === (item === null || item === void 0 ? void 0 : item.default) && !((_c = item === null || item === void 0 ? void 0 : item.options[0]) === null || _c === void 0 ? void 0 : _c.description)) {
                        // 在DST中,如果label为空字符串,就直接是显示空白行,这里用||会导致label为空也显示name,为了跟DST保持一样使用了??
                        return (0, jsx_runtime_1.jsx)(antd_1.Divider, { children: (0, jsx_runtime_1.jsx)("span", { style: {
                                    fontSize: "14px",
                                    fontWeight: "600"
                                }, children: item.label || item.name }) }, (0, dateUitls_1.generateUUID)());
                    }
                    // TODO 还不知道哪些mod是这样的作为标题的,我目前没有发现
                    if (item.name === 'Title' || item.name === '') {
                        if (item.label === '') {
                            return "";
                        }
                        return (0, jsx_runtime_1.jsx)(antd_1.Divider, { children: (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: "14px", fontWeight: "600" }, children: [item.label, " \u914D\u7F6E"] }) }, (0, dateUitls_1.generateUUID)());
                    }
                    var defaultValue;
                    if (defaultConfigOptions.get("".concat(mod.modid)) !== undefined) {
                        defaultValue = defaultConfigOptions.get("".concat(mod.modid))["".concat(item.name)];
                    }
                    else {
                        defaultValue = undefined;
                    }
                    return (0, jsx_runtime_1.jsx)(Select2_1.default, { item: item, defaultValue: defaultValue }, (0, dateUitls_1.generateUUID)());
                }))] }) }));
};
exports.default = OptionSelect;
