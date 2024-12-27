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
var react_1 = __importStar(require("react"));
var react_i18next_1 = require("react-i18next");
var antd_1 = require("antd");
var _8level_jsx_1 = require("../../../api/8level.jsx");
var useLevelsStore_jsx_1 = require("../../../store/useLevelsStore.jsx");
var pro_components_1 = require("@ant-design/pro-components");
var TextArea = antd_1.Input.TextArea;
exports.default = (function () {
    var _a;
    var t = (0, react_i18next_1.useTranslation)().t;
    var levels = (0, useLevelsStore_jsx_1.useLevelsStore)(function (state) { return state.levels; });
    (0, react_1.useEffect)(function () {
        var historyJson = localStorage.getItem('history');
        var history = JSON.parse(historyJson);
        if (history === null) {
            history = [];
        }
        setHistoryCommand(history);
    }, []);
    function addHistory(command) {
        var h = __spreadArray([], historyCommand, true);
        h.push(command);
        setHistoryCommand(h);
        localStorage.setItem("history", JSON.stringify(h));
    }
    function removeHistory(command) {
        var h = __spreadArray([], historyCommand, true);
        var j = h.filter(function (o) { return command !== o; });
        setHistoryCommand(j);
        localStorage.setItem("history", JSON.stringify(j));
    }
    var _b = (0, react_1.useState)([]), historyCommand = _b[0], setHistoryCommand = _b[1];
    var _c = (0, react_1.useState)(''), command = _c[0], setCommand = _c[1];
    var _d = (0, react_1.useState)(''), command2 = _d[0], setCommand2 = _d[1];
    var _e = (0, react_1.useState)(false), spin = _e[0], setSpin = _e[1];
    var onchange = function (e) {
        setCommand(e.target.value);
    };
    var onchange2 = function (e) {
        setCommand2(e.target.value);
    };
    var notHasLevels = (levels === null || levels === void 0 ? void 0 : levels.length) === 0;
    var _f = (0, react_1.useState)(notHasLevels ? "" : (_a = levels[0]) === null || _a === void 0 ? void 0 : _a.key), levelName = _f[0], setLevelName = _f[1];
    function sendInstructOrder() {
        if (command === "") {
            antd_1.message.warning("请填写指令在发送");
            return;
        }
        console.log(levelName, command);
        setSpin(true);
        addHistory(command);
        (0, _8level_jsx_1.sendCommandApi)("", levelName, escapeString(command))
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("发送指令成功");
            }
            else {
                antd_1.message.error("发送指令失败");
            }
            setSpin(false);
        });
    }
    function SentBroad() {
        if (command2 === "") {
            antd_1.message.warning("请填写指令在发送");
            return;
        }
        console.log(levelName, command2);
        setSpin(true);
        var cmd = "c_announce\"".concat(command2, "\"");
        addHistory(command2);
        (0, _8level_jsx_1.sendCommandApi)("", levelName, escapeString(cmd))
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("发送指令成功");
            }
            else {
                antd_1.message.error("发送指令失败");
            }
            setSpin(false);
        });
    }
    function escapeString(str) {
        return str.replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    }
    var handleChange = function (value) {
        setLevelName(value);
    };
    return ((0, jsx_runtime_1.jsxs)(pro_components_1.ProCard, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Spin, { spinning: spin, tip: "正在发送指令", children: [(0, jsx_runtime_1.jsx)(antd_1.Space, { size: 8, children: (0, jsx_runtime_1.jsx)(antd_1.Select, { defaultValue: notHasLevels ? "" : levels[0].levelName, style: {
                                width: 120,
                            }, onChange: handleChange, options: levels.map(function (level) {
                                return {
                                    value: level.key,
                                    label: level.levelName,
                                };
                            }) }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(TextArea, { onChange: onchange, rows: 3 }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return sendInstructOrder(); }, children: t('panel.remote.send.command') }), (0, jsx_runtime_1.jsx)(antd_1.Divider, {}), (0, jsx_runtime_1.jsx)(antd_1.Space, { size: 8, children: (0, jsx_runtime_1.jsx)(antd_1.Select, { defaultValue: notHasLevels ? "" : levels[0].levelName, style: {
                                width: 120,
                            }, onChange: handleChange, options: levels.map(function (level) {
                                return {
                                    value: level.key,
                                    label: level.levelName,
                                };
                            }) }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(TextArea, { onChange: onchange2, rows: 3 }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return SentBroad(); }, children: t('panel.remote.send.message') })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("div", { children: [t('panel.remote.send.history'), ":", historyCommand.map(function (c) { return ((0, jsx_runtime_1.jsx)(antd_1.Tag, { closeIcon: true, onClose: function () { return removeHistory(c); }, children: c }, c)); })] })] }));
});
