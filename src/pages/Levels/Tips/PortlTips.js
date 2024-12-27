"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var useTheme_1 = require("../../../hooks/useTheme");
var Title = antd_1.Typography.Title, Paragraph = antd_1.Typography.Paragraph, Text = antd_1.Typography.Text, Link = antd_1.Typography.Link;
exports.default = (function () {
    var theme = (0, useTheme_1.useTheme)().theme;
    var token = antd_1.theme.useToken().token;
    var panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
        marginRight: '8px'
    };
    var getTips = function (panelStyle) { return [
        {
            key: '1',
            label: '世界层数问题',
            children: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: (0, jsx_runtime_1.jsxs)(Paragraph, { children: [(0, jsx_runtime_1.jsxs)(Paragraph, { children: ["\u4ECE ", (0, jsx_runtime_1.jsx)(Text, { keyboard: true, children: "1.2.6" }), " \u7248\u672C\u8D77\uFF0C\u4E16\u754C\u5C42\u6570\u4ECE", (0, jsx_runtime_1.jsx)(Text, { keyboard: true, children: "\u4E24\u5C42" }), "\u53D8\u6210", (0, jsx_runtime_1.jsx)(Text, { keyboard: true, children: "\u52A8\u6001\u5C42\u6570" }), "\uFF0C \u4F60\u53EF\u4EE5\u4EFB\u610F\u7684\u6DFB\u52A0\u4E16\u754C\u5C42\u6570\uFF0C\u6765\u5F00", (0, jsx_runtime_1.jsx)(Text, { keyboard: true, children: "\u591A\u5C42\u5B58\u6863" })] }), (0, jsx_runtime_1.jsxs)(Paragraph, { children: ["\u9ED8\u8BA4\u53EA\u6709\u4E00\u4E2A\"\u68EE\u6797\u4E16\u754C\"\uFF0C \u8BF7\u70B9\u51FB ", (0, jsx_runtime_1.jsx)(Text, { code: true, children: "\u6DFB\u52A0\u4E16\u754C" }), "\uFF0C\u6765\u6DFB\u52A0\u4E16\u754C"] }), (0, jsx_runtime_1.jsx)(Paragraph, { children: "\u4F60\u4E5F\u53EF\u4EE5 \u6E38\u620F\u5907\u4EFD/\u4E0A\u4F20\u5B58\u6863/\u5237\u65B0  \u70B9\u51FB\u5BF9\u5E94\u7684\u5B58\u6863 \u6062\u590D\u5B58\u6863\u3002\u9ED8\u8BA4\u517C\u5BB9\u672C\u5730\u6E38\u620F\u7684\u5B58\u6863\u683C\u5F0F" })] }) }),
            style: panelStyle,
        },
        {
            key: '2',
            label: '存档level.json解释',
            children: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: (0, jsx_runtime_1.jsxs)(Paragraph, { children: [(0, jsx_runtime_1.jsx)(Paragraph, { children: "\u6BCF\u4E2A\u5B58\u6863\u90FD\u4F1A\u751F\u6210\u4E00\u4E2Alevel.json\u6587\u4EF6\uFF0C\u8FD9\u4E2A\u6587\u4EF6\u4E3B\u8981\u662F\u6807\u8BB0\u4F60\u7684\u5B58\u6863\u4E16\u754C\u662F\u90A3\u4E2A\u6587\u4EF6" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: "\u4F46\u662F\u7531\u4E8E\u6B64\u9762\u677F\u7684\u91C7\u96C6\u7279\u6B8A\u6027\u95EE\u9898\uFF0C\u4F60\u7684\u4E3B\u4E16\u754C\u7684\u6587\u4EF6\u5FC5\u987B\u4E3A Master (\u5426\u5219\u9762\u677F\u7684\u65E5\u5FD7\u91C7\u96C6\u548C\u7EDF\u8BA1\u90FD\u4F1A\u5931\u6548)" }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: "name: \u754C\u9762\u663E\u793A\u7684\u540D\u79F0" }), (0, jsx_runtime_1.jsx)("li", { children: "file: \u4E16\u754C\u6587\u4EF6\u540D" })] }), (0, jsx_runtime_1.jsx)(Paragraph, { children: "\u4F8B\u5B50: \u6BD4\u5982\u6211\u4E4B\u524D\u7684\u5B58\u6863 \u4E16\u754C \u4E3A Master Caves Master1 Caves1" }), (0, jsx_runtime_1.jsx)("pre", { children: '{"levelList":[{"name":"森林","file":"Master"},{"name":"洞穴","file":"Caves"},{"name":"森林1","file":"Master1"},{"name":"洞穴1","file":"Caves1"}]}' })] }) }),
            style: panelStyle,
        },
        {
            key: '3',
            label: '可视化失败',
            children: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: (0, jsx_runtime_1.jsxs)(Paragraph, { children: [(0, jsx_runtime_1.jsxs)(Paragraph, { children: ["\u5982\u679C\u914D\u7F6E\u4E3A return ", ",\u8BF7\u624B\u52A8\u7C98\u8D34\u914D\u7F6E"] }), (0, jsx_runtime_1.jsxs)(Paragraph, { children: ["\u5982\u679C\u914D\u7F6E\u4E0D\u4E3A return ", ",\u8BF7\u53BB\u6389\u914D\u7F6E\u91CC\u9762\u7684\u6362\u884C\u7B26\uFF0C\\n\uFF0C\u754C\u9762\u5C55\u793A\u4F1A\u6709\u4E2A \\ \u7B26\u53F7\uFF0C\u5982\u6389\u5408\u5E76\u6210\u4E00\u884C"] })] }) }),
            style: panelStyle,
        },
    ]; };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Collapse, { bordered: false, 
            // defaultActiveKey={['1']}
            expandIcon: function (_a) {
                var isActive = _a.isActive;
                return (0, jsx_runtime_1.jsx)(icons_1.CaretRightOutlined, { rotate: isActive ? 90 : 0 });
            }, style: {
                background: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
            }, items: getTips(panelStyle) }) }));
});
