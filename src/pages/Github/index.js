"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var alipay_jpg_1 = __importDefault(require("./alipay.jpg"));
var wechatpay_png_1 = __importDefault(require("./wechatpay.png"));
var qqgroup_png_1 = __importDefault(require("./qqgroup.png"));
var TengxunCloudAd1_1 = __importDefault(require("../Ad/TengxunCloudAd1"));
exports.default = (function () {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "\u5E2E\u52A9\u6587\u6863" }), (0, jsx_runtime_1.jsx)("strong", { children: "\u7981\u6B62\u5546\u7528\uFF0C\u5546\u7528\u8BF7\u8054\u7CFB\u672C\u4EBA\u6388\u6743\uFF01\uFF01\uFF01" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("div", { children: ["\u5F00\u6E90\u534F\u8BAE:", (0, jsx_runtime_1.jsx)("a", { target: '_blank', href: 'https://github.com/hujinbo23/dst-admin-go/blob/main/LICENSE', rel: "noreferrer", children: "GPL-3.0 license" })] }), (0, jsx_runtime_1.jsxs)("div", { children: ["github \u5730\u5740:", (0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://github.com/hujinbo23/dst-admin-go", rel: "noreferrer", children: "https://github.com/hujinbo23/dst-admin-go" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(TengxunCloudAd1_1.default, {}) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u8BF7\u4F5C\u8005\u559D\u4E00\u676F\u5496\u5561\uFF1A" }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 32, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Image, { style: { borderRadius: '4px' }, width: 160, src: alipay_jpg_1.default }), (0, jsx_runtime_1.jsx)(antd_1.Image, { style: { borderRadius: '4px' }, width: 160, src: wechatpay_png_1.default })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "QQ\u7FA4\u53CD\u9988" }), (0, jsx_runtime_1.jsx)(antd_1.Image, { style: { borderRadius: '4px' }, width: 160, src: qqgroup_png_1.default })] })] }));
});
