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
            key: '3',
            label: '可视化失败问题',
            children: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: (0, jsx_runtime_1.jsxs)(Paragraph, { children: [(0, jsx_runtime_1.jsxs)(Paragraph, { children: ["\u5982\u679C\u914D\u7F6E\u4E3A return ", ",\u8BF7\u624B\u52A8\u7C98\u8D34\u914D\u7F6E"] }), (0, jsx_runtime_1.jsxs)(Paragraph, { children: ["\u5982\u679C\u914D\u7F6E\u4E0D\u4E3A return ", ",\u8BF7\u53BB\u6389\u914D\u7F6E\u91CC\u9762\u7684\u6362\u884C\u7B26 \\n\uFF0C\u754C\u9762\u5C55\u793A\u4F1A\u6709\u4E2A \\ \u7B26\u53F7\uFF0C\u53BB\u6389\u5408\u5E76\u6210\u4E00\u884C"] })] }) }),
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
