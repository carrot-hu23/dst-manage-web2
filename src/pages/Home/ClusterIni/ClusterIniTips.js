"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var icons_1 = require("@ant-design/icons");
var useTheme_1 = require("../../../hooks/useTheme");
var Title = antd_1.Typography.Title, Paragraph = antd_1.Typography.Paragraph, Text = antd_1.Typography.Text, Link = antd_1.Typography.Link;
exports.default = (function () {
    var theme = (0, useTheme_1.useTheme)().theme;
    var t = (0, react_i18next_1.useTranslation)().t;
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
            label: t('Get cluster_token'),
            children: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: (0, jsx_runtime_1.jsxs)(Paragraph, { children: [(0, jsx_runtime_1.jsx)(Title, { level: 5, children: "\u65B9\u5F0F1: " }), "\u8BBF\u95EE", (0, jsx_runtime_1.jsx)(Link, { href: " https://accounts.klei.com/account/game/servers?game=DontStarveTogether", children: "klei\u7F51\u7AD9" }), "\u767B\u5F55 \u3002\u7136\u540E\u9009\u62E9\u5BFC\u822A \"\u6E38\u620F\", ", (0, jsx_runtime_1.jsx)(Text, { code: true, children: "\u70B9\u51FB \u300A\u9965\u8352\uFF1A\u8054\u673A\u7248\u300B\u7684\u6E38\u620F\u670D\u52A1\u5668 " }), "\uFF0C\u83B7\u53D6\u4EE4\u724C", (0, jsx_runtime_1.jsx)(Title, { level: 5, children: "\u65B9\u5F0F2: " }), (0, jsx_runtime_1.jsx)(Paragraph, { children: "\u5728\u81EA\u5DF1\u7684\u7535\u8111\u4E0A\u542F\u52A8 \u9965\u8352\u8054\u673A\u7248" }), (0, jsx_runtime_1.jsxs)(Paragraph, { children: ["\u4E3B\u754C\u9762\u6309 ~\u952E\uFF0C\u8C03\u51FA\u63A7\u5236\u53F0\uFF0C\u7136\u540E\u8F93\u5165\u4EE5\u4E0B\u6307\u4EE4\uFF0C\u5E76\u6572\u4E0BEnter\u952E\uFF0C\u4EE5\u751F\u6210\u4EE4\u724C", (0, jsx_runtime_1.jsx)(Text, { code: true, children: "TheNet:GenerateClusterToken()" }), "~\u952E\uFF0C\u6CE2\u6D6A\u53F7\u952E\u4E00\u822C\u4F4D\u4E8E\u952E\u76D8\u5DE6\u4E0A\u89D2\uFF0C\u5728ESC\u952E\u7684\u4E0B\u65B9\uFF0Ctab\u952E\u7684\u4E0A\u65B9\uFF0C\u6570\u5B57\u952E1\u7684\u5DE6\u8FB9"] }), (0, jsx_runtime_1.jsx)(Paragraph, { children: "\u4EE4\u724C\u4FDD\u5B58\u5728\u201Ccluster_token.txt\u201D\u7684\u6587\u672C\u6587\u4EF6\u4E2D\uFF0C\u53EF\u4EE5\u5728\u4E2A\u4EBA\u6587\u6863\u4E0B\u627E\u5230\uFF0C\u4F8B\u5982\uFF1A %userprofile%\\Documents\\Klei\\DoNotStarveTogether\\ \u6211\u7684\u8DEF\u5F84\u662F\u4E0B\u9762\u8FD9\u4E2A\uFF0C\u5176\u4E2D 132274880 \u53EF\u80FD\u662F\u7528\u6237id\u4EC0\u4E48\u7684\uFF0C\u6BCF\u4E2A\u4EBA\u53EF\u80FD\u4E0D\u76F8\u540C\uFF1A C:\\Users\\xxx\\Documents\\Klei\\DoNotStarveTogether\\132274880\\cluster_token.txt" })] }) }),
            style: panelStyle,
        },
        {
            key: '2',
            label: t('Server tandem'),
            children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\u5177\u4F53\u8BF7\u53C2\u8003\uFF1A", (0, jsx_runtime_1.jsx)(Link, { href: "https://atjiu.github.io/dstmod-tutorial/#/multi_dedicated_server", children: "https://atjiu.github.io/dstmod-tutorial/#/multi_dedicated_server" })] }), "\u57FA\u672C\u5C31\u662F\u4E3B\u4E16\u754C bind_ip \u586B\u5199 0.0.0.0 master_ip \u586B\u5199 \u5F53\u524D\u670D\u52A1\u5668\u7684\u516C\u7F51ip\u3002\u4ECE\u4E16\u754C bind_ip \u586B\u5199 127.0.0.1\uFF0Cmaster_ip \u586B\u5199\u4E3B\u4E16\u754C\u7684ip"] }),
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
