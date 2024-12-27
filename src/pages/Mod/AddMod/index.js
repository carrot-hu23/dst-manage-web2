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
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
var icons_1 = require("@ant-design/icons");
var useTheme_1 = require("../../../hooks/useTheme");
var modApi_1 = require("../../../api/modApi");
var NewEditor_1 = require("../../NewEditor");
var Title = antd_1.Typography.Title;
exports.default = (function () {
    var theme = (0, useTheme_1.useTheme)().theme;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(false), spinLoading = _a[0], setSpinLoading = _a[1];
    var _b = (0, react_1.useState)(""), workshopId = _b[0], setWorkshopId = _b[1];
    var editorRef = (0, react_1.useRef)();
    function wrokShopOnChange(e) {
        setWorkshopId(e.target.value);
    }
    function saveModinfo() {
        var data = {
            workshopId: workshopId,
            modinfo: editorRef.current.current.getValue()
        };
        setSpinLoading(true);
        (0, modApi_1.addModInfoFileApi)("", data)
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("添加成功");
            }
            else {
                antd_1.message.error("添加失败");
            }
            setSpinLoading(false);
        });
    }
    (0, react_1.useEffect)(function () {
    }, []);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Container, { maxWidth: "xxl", children: (0, jsx_runtime_1.jsxs)(antd_1.Spin, { spinning: spinLoading, description: "正在添加模组", children: [(0, jsx_runtime_1.jsx)(material_1.Card, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { p: 2 }, dir: "ltr", children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 8, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", icon: (0, jsx_runtime_1.jsx)(icons_1.ArrowLeftOutlined, {}), onClick: function () { return navigate("/dashboard/mod2"); }, children: "\u8FD4\u56DE" }), (0, jsx_runtime_1.jsx)("span", { children: "\u6DFB\u52A0\u6A21\u7EC4" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                                            saveModinfo();
                                        }, children: "\u4FDD\u5B58" })] }) }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(material_1.Card, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { p: 3 }, dir: "ltr", children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, spacing: 3, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { item: true, xs: 12, md: 8, lg: 8, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                                    position: 'relative',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    maxWidth: '100%',
                                                    height: '32px',
                                                    color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
                                                    fontSize: '14px',
                                                }, children: "\u6A21\u7EC4id:" }), (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: wrokShopOnChange, placeholder: '模组id' }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { style: {
                                                    position: 'relative',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    maxWidth: '100%',
                                                    height: '32px',
                                                    color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.88)',
                                                    fontSize: '14px',
                                                }, children: "modinfo.lua \u6587\u4EF6\u5185\u5BB9:" }), (0, jsx_runtime_1.jsx)(NewEditor_1.MonacoEditor, { ref: editorRef, style: {
                                                    "height": "370px",
                                                    "width": "100%",
                                                }, options: {
                                                    language: 'lua',
                                                    theme: theme === 'dark' ? 'vs-dark' : ''
                                                } })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { item: true, xs: 12, md: 4, lg: 4, children: [(0, jsx_runtime_1.jsx)(Title, { level: 4, children: "\u600E\u4E48\u627E\u5230\u672C\u5730\u7535\u8111\u7684\u6A21\u7EC4?" }), (0, jsx_runtime_1.jsx)("div", { children: "\u627E\u5230\u672C\u5730\u7535\u8111 Steam \u5B89\u88C5\u7684\u8DEF\u5F84\uFF0C\\steam\\steamapps\\workshop\\content\\322330 \u8DEF\u5F84" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { children: "\u8FD9\u4E2A\u8DEF\u5F84\u5C31\u662F\u4F60\u672C\u5730\u9965\u8352\u8054\u673A\u7248\u7684mod\u4F4D\u7F6E" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { children: "\u5728 \u6A21\u7EC4id \u54EA\u91CC\u586B\u5199\u6587\u4EF6\u540D \uFF0C\u7136\u540E\u628A modinfo.lua \u6587\u4EF6\u5185\u5BB9\u590D\u5236\u5230\u7B2C\u4E8C\u4E2A\u8F93\u5165\u6846" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { children: "\u70B9\u51FB\u4FDD\u5B58\u5373\u53EF" })] })] }) }) })] }) }) });
});
