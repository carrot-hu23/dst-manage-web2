"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var index_module_css_1 = __importDefault(require("../index.module.css"));
var Paragraph = antd_1.Typography.Paragraph;
// eslint-disable-next-line react/prop-types
var HomeOverView = function (_a) {
    var home = _a.home;
    console.log("==========", home.home);
    if (home.DaysInfo === undefined || home.DaysInfo === null) {
        home.DaysInfo = {};
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { style: {
                height: 450,
                overflowY: 'auto',
            }, children: [(0, jsx_runtime_1.jsx)("h3", { className: index_module_css_1.default.icon, children: home.Name }), (0, jsx_runtime_1.jsx)("span", { children: home.Desc }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Form, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u4E16\u754C\u76F4\u8FDE", children: (0, jsx_runtime_1.jsx)(Paragraph, { style: {
                                                color: '#4096ff'
                                            }, copyable: true, children: "c_connect(\"".concat(home.Address, "\", ").concat(home.Port, ")") }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u7248\u672C", children: (0, jsx_runtime_1.jsx)("span", { children: home.Version }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5929\u6570", children: (0, jsx_runtime_1.jsx)("span", { children: home.DaysInfo.Day }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5B63\u8282", children: (0, jsx_runtime_1.jsxs)("span", { children: [home.Season, "(".concat(home.DaysInfo.DaysElapsedInSeason + 1, "/").concat(home.DaysInfo.DaysElapsedInSeason + home.DaysInfo.DaysLeftInSeason, ")")] }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u670D\u4E3B", children: (0, jsx_runtime_1.jsx)("span", { children: home.Host }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u6A21\u5F0F", children: (0, jsx_runtime_1.jsx)("span", { children: home.Intent }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u52A0\u5165", children: (0, jsx_runtime_1.jsx)("span", { children: home.Allownewplayers ? (0, jsx_runtime_1.jsx)("span", { children: "\u5141\u8BB8\u52A0\u5165" }) : (0, jsx_runtime_1.jsx)("span", { children: "\u4E0D\u5141\u8BB8\u52A0\u5165" }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u516C\u7F51", children: (0, jsx_runtime_1.jsx)("span", { children: home.Lanonly ? (0, jsx_runtime_1.jsx)("span", { children: "lan" }) : (0, jsx_runtime_1.jsx)("span", { children: "\u4F4D\u4E0E\u516C\u7F51" }) }) })] })] }) })] }) }));
};
exports.default = HomeOverView;
