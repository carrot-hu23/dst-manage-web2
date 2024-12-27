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
var TengxunCloudAd3_1 = __importDefault(require("../../Ad/TengxunCloudAd3"));
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
            label: t('Level quantity problem'),
            children: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: (0, jsx_runtime_1.jsxs)(Paragraph, { children: [(0, jsx_runtime_1.jsxs)(Paragraph, { children: ["\u4ECE ", (0, jsx_runtime_1.jsx)(Text, { keyboard: true, children: "1.2.6" }), " \u7248\u672C\u8D77\uFF0C\u4E16\u754C\u5C42\u6570\u4ECE", (0, jsx_runtime_1.jsx)(Text, { keyboard: true, children: "\u4E24\u5C42" }), "\u53D8\u6210", (0, jsx_runtime_1.jsx)(Text, { keyboard: true, children: "\u52A8\u6001\u5C42\u6570" }), "\uFF0C \u4F60\u53EF\u4EE5\u4EFB\u610F\u7684\u6DFB\u52A0\u4E16\u754C\u5C42\u6570\uFF0C\u6765\u5F00", (0, jsx_runtime_1.jsx)(Text, { keyboard: true, children: "\u591A\u5C42\u5B58\u6863" })] }), (0, jsx_runtime_1.jsx)(Paragraph, { children: t('There is only one "Forest World" by default. Please click Add Button to add a level.') }), (0, jsx_runtime_1.jsx)(Paragraph, { children: t('You can also Backup the game/upload the archive/refresh and click on the corresponding archive to restore the archive. Save format compatible with local games by default') })] }) }),
            style: panelStyle,
        },
        {
            key: '2',
            label: t('Cluster level.json explained'),
            children: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: (0, jsx_runtime_1.jsxs)(Paragraph, { children: [(0, jsx_runtime_1.jsx)(Paragraph, { children: t('Each archive cluster will generate a level.json file. This file mainly marks which file your archive level is.') }), (0, jsx_runtime_1.jsx)(Paragraph, { children: t('However, due to the special collection of this panel, your main level file must be Master (otherwise the panel\'s log collection and statistics will be invalid)') }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsxs)("li", { children: ["name: ", t('The name displayed on the interface')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["file: ", t('level file')] })] }), (0, jsx_runtime_1.jsxs)(Paragraph, { children: [t('eg'), ":", t('For example, my previous archive world is Master Caves Master1 Caves1')] }), (0, jsx_runtime_1.jsx)("pre", { children: '{"levelList":[{"name":"森林","file":"Master"},{"name":"洞穴","file":"Caves"},{"name":"森林1","file":"Master1"},{"name":"洞穴1","file":"Caves1"}]}' })] }) }),
            style: panelStyle,
        },
        {
            key: '3',
            label: t('Leveldataovrride view failure problem'),
            children: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: (0, jsx_runtime_1.jsxs)(Paragraph, { children: [(0, jsx_runtime_1.jsx)(Paragraph, { children: t('If the configuration is return {}, please paste the configuration manually') }), (0, jsx_runtime_1.jsx)(Paragraph, { children: t('If the configuration is not return {}, please remove the newline character \\n in the configuration. There will be a \\ symbol in the interface display. Remove it and merge it into one line.') })] }) }),
            style: panelStyle,
        },
    ]; };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Collapse, { bordered: false, 
                // defaultActiveKey={['1']}
                expandIcon: function (_a) {
                    var isActive = _a.isActive;
                    return (0, jsx_runtime_1.jsx)(icons_1.CaretRightOutlined, { rotate: isActive ? 90 : 0 });
                }, style: {
                    background: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
                }, items: getTips(panelStyle) }), (0, jsx_runtime_1.jsx)(TengxunCloudAd3_1.default, {})] }));
});
