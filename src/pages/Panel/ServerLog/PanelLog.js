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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_1 = __importStar(require("react"));
var react_i18next_1 = require("react-i18next");
var NewEditor_1 = require("../../NewEditor");
var level_1 = require("../../../api/level");
var useTheme_1 = require("../../../hooks/useTheme");
exports.default = (function () {
    var editorRef = (0, react_1.useRef)();
    var inputRef = (0, react_1.useRef)(null);
    var theme = (0, useTheme_1.useTheme)().theme;
    var t = (0, react_i18next_1.useTranslation)().t;
    (0, react_1.useEffect)(function () {
        (0, level_1.readPanelLogApi)(100)
            .then(function (resp) {
            if (resp.code === 200) {
                var logs_1 = "";
                var lines = resp.data || [];
                lines.reverse();
                lines.forEach(function (line) {
                    logs_1 += "".concat(line, "\n");
                });
                editorRef.current.current.setValue(logs_1);
                editorRef.current.current.revealLine(editorRef.current.current.getModel().getLineCount());
            }
            else {
                editorRef.current.current.setValue("");
            }
        });
    }, []);
    function pullLog() {
        var _a, _b;
        var lines = (_b = (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.value;
        // setSpinLoading(true)
        (0, level_1.readPanelLogApi)(lines)
            .then(function (resp) {
            if (resp.code === 200) {
                var logs_2 = "";
                var lines_1 = resp.data || [];
                lines_1.reverse();
                lines_1.forEach(function (line) {
                    logs_2 += "".concat(line, "\n");
                });
                editorRef.current.current.setValue(logs_2);
                editorRef.current.current.revealLine(editorRef.current.current.getModel().getLineCount());
            }
            else {
                editorRef.current.current.setValue("");
            }
            // setSpinLoading(false)
        });
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Space.Compact, { style: { width: '100%' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { defaultValue: "100", ref: inputRef }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return pullLog(); }, children: "\u62C9\u53D6" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(NewEditor_1.MonacoEditor, { ref: editorRef, style: {
                    "height": "530px",
                    "width": "100%"
                }, options: {
                    readOnly: true,
                    language: 'go',
                    theme: theme === 'dark' ? 'vs-dark' : ''
                } }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: function () {
                    window.location.href = "/api/game/dst-admin-go/log/download";
                }, icon: (0, jsx_runtime_1.jsx)(icons_1.DownloadOutlined, {}), type: 'link', children: t('Download Log') })] }));
});
