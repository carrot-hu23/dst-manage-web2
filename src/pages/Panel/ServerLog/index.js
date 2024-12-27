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
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var level_1 = require("../../../api/level");
var NewEditor_1 = require("../../NewEditor");
var _8level_1 = require("../../../api/8level");
var useTheme_1 = require("../../../hooks/useTheme");
var index_module_css_1 = __importDefault(require("../../DstServerList/index.module.css"));
var useLevelsStore_1 = require("../../../store/useLevelsStore");
var pro_components_1 = require("@ant-design/pro-components");
exports.default = (function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var theme = (0, useTheme_1.useTheme)().theme;
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _a = (0, react_1.useState)(false), spinLoading = _a[0], setSpinLoading = _a[1];
    var levels = (0, useLevelsStore_1.useLevelsStore)(function (state) { return state.levels; });
    var notHasLevels = levels === undefined || levels === null || levels.length === 0;
    var levelNameRef = (0, react_1.useRef)(notHasLevels ? "" : levels[0].key);
    var editorRef = (0, react_1.useRef)();
    var inputRef = (0, react_1.useRef)(null);
    var timerIdRef = (0, react_1.useRef)("");
    var _b = (0, react_1.useState)(''), command = _b[0], setCommand = _b[1];
    var onchange = function (e) {
        console.log("e", e);
        setCommand(e);
    };
    function escapeString(str) {
        return str.replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    }
    function sendInstruct(command) {
        if (command === "") {
            antd_1.message.warning("请填写指令在发送");
            return;
        }
        console.log(levelNameRef.current, escapeString(command));
        setSpinLoading(true);
        (0, _8level_1.sendCommandApi)(cluster, levelNameRef.current, escapeString(command))
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("发送指令成功");
            }
            else {
                antd_1.message.error("发送指令失败");
            }
            setSpinLoading(false);
        });
    }
    (0, react_1.useEffect)(function () {
        (0, level_1.readLevelServerLogApi)(cluster, levelNameRef.current, 100)
            .then(function (resp) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            if (resp.code === 200) {
                var logs_1 = "";
                var lines = resp.data || [];
                lines.reverse();
                lines.forEach(function (line) {
                    logs_1 += "".concat(line, "\n");
                });
                (_b = (_a = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.setValue(logs_1);
                (_d = (_c = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.revealLine((_g = (_f = (_e = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _e === void 0 ? void 0 : _e.current) === null || _f === void 0 ? void 0 : _f.getModel()) === null || _g === void 0 ? void 0 : _g.getLineCount());
            }
            else {
                (_j = (_h = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _h === void 0 ? void 0 : _h.current) === null || _j === void 0 ? void 0 : _j.setValue("");
            }
        });
    }, []);
    (0, react_1.useEffect)(function () {
        startPolling();
    }, []);
    (0, react_1.useEffect)(function () {
        return function () {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
            }
        };
    }, [timerIdRef.current]);
    function pullLog() {
        if (!inputRef.current)
            return;
        var lines = inputRef.current.input.value;
        (0, level_1.readLevelServerLogApi)(cluster, levelNameRef.current, lines)
            .then(function (resp) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            if (resp.code === 200) {
                var logs_2 = "";
                var lines_1 = resp.data || [];
                lines_1.reverse();
                lines_1.forEach(function (line) {
                    logs_2 += "".concat(line, "\n");
                });
                if (logs_2 !== ((_b = (_a = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.getValue())) {
                    (_d = (_c = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.setValue(logs_2);
                    (_f = (_e = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _e === void 0 ? void 0 : _e.current) === null || _f === void 0 ? void 0 : _f.revealLine((_j = (_h = (_g = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _g === void 0 ? void 0 : _g.current) === null || _h === void 0 ? void 0 : _h.getModel()) === null || _j === void 0 ? void 0 : _j.getLineCount());
                }
            }
            else {
                (_l = (_k = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _k === void 0 ? void 0 : _k.current) === null || _l === void 0 ? void 0 : _l.setValue("");
            }
        });
    }
    var handleChange = function (value) {
        levelNameRef.current = value;
    };
    var startPolling = function () {
        // 使用定时器每隔1秒钟请求一次日志数据，并更新到logLines状态
        var timerId = setInterval(function () {
            pullLog(); // 每次请求最新的100行日志
        }, 3000);
        // 将定时器ID保存到状态中，以便后续取消轮询时清除定时器
        timerIdRef.current = timerId;
    };
    var stopPolling = function () {
        // 取消轮询，清除定时器
        if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
        }
    };
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { spinning: spinLoading, children: (0, jsx_runtime_1.jsxs)(pro_components_1.ProCard, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Space.Compact, { style: { width: '100%', marginBottom: 12 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Select, { style: {
                                    width: 120,
                                }, onChange: handleChange, defaultValue: notHasLevels ? "" : levels[0].levelName, options: levels.map(function (level) {
                                    return {
                                        value: level.key,
                                        label: level.levelName,
                                    };
                                }) }), (0, jsx_runtime_1.jsx)(antd_1.Input, { defaultValue: "100", ref: inputRef }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return pullLog(); }, children: t('panel.pull') })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(NewEditor_1.MonacoEditor, { className: index_module_css_1.default.icon, ref: editorRef, style: {
                            "height": "370px",
                            "width": "100%",
                        }, options: {
                            readOnly: true,
                            language: 'java',
                            theme: theme === 'dark' ? 'vs-dark' : ''
                        } }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Space, { align: "baseline", size: 16, wrap: true, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { style: { marginRight: '8px' }, children: t('panel.auto') }), (0, jsx_runtime_1.jsx)(antd_1.Switch, { defaultChecked: true, onChange: function (checked, event) {
                                            if (checked) {
                                                startPolling();
                                            }
                                            else {
                                                stopPolling();
                                            }
                                        }, checkedChildren: t('panel.y'), unCheckedChildren: t('panel.n') })] }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: function () {
                                    window.location.href = "/api/game/level/server/download?fileName=server_log.txt&levelName=".concat(levelNameRef.current);
                                }, icon: (0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}), type: 'link', children: t('panel.download.log') })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Space.Compact, { style: {
                            width: '100%',
                            marginBottom: 12
                        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { defaultValue: "", onChange: onchange }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return sendInstruct(command); }, children: t('panel.send') })] }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 8, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: "primary", onClick: function () { sendInstruct("c_save()"); }, children: t('panel.c_save()') }), (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: t('panel.regenerate'), description: "\u8BF7\u4FDD\u5B58\u597D\u6570\u636E", onConfirm: function () { sendInstruct("c_regenerateworld()"); }, onCancel: function () { }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: "primary", danger: true, children: t('panel.regenerate') }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', onClick: function () { sendInstruct("c_rollback(1)"); }, children: t('panel.rollback1') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', onClick: function () { sendInstruct("c_rollback(2)"); }, children: t('panel.rollback2') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', onClick: function () { sendInstruct("c_rollback(3)"); }, children: t('panel.rollback3') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', onClick: function () { sendInstruct("c_rollback(4)"); }, children: t('panel.rollback4') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', onClick: function () { sendInstruct("c_rollback(5)"); }, children: t('panel.rollback5') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', onClick: function () { sendInstruct("c_rollback(6)"); }, children: t('panel.rollback6') })] })] }) }) });
});
