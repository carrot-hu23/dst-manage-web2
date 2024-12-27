"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_1 = require("react");
var gameDashboardApi_1 = require("../../../api/gameDashboardApi");
var antIcon = ((0, jsx_runtime_1.jsx)(icons_1.LoadingOutlined, { style: {
        fontSize: 24,
    }, spin: true }));
var Environment = function () {
    var _a = (0, react_1.useState)({}), host = _a[0], setHost = _a[1];
    var _b = (0, react_1.useState)(true), checkLoading = _b[0], setCheckLoading = _b[1];
    var _c = (0, react_1.useState)(false), intsalling = _c[0], setIntsalling = _c[1];
    var confirm = function (e) {
        console.log(e);
        antd_1.message.success('Click on Yes');
        setIntsalling(true);
    };
    var cancel = function (e) {
        console.log(e);
        antd_1.message.error('Click on No');
    };
    (0, react_1.useEffect)(function () {
        // const terminal = newTerminal(config, "", "environmentId")
        (0, gameDashboardApi_1.getGameDashboardApi)()
            .then(function (reponse) {
            console.log(reponse.data.host);
            setCheckLoading(false);
            setHost(reponse.data.host);
        });
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [checkLoading && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u6B63\u5728\u68C0\u6D4B\u5F53\u524D\u670D\u52A1\u5668" }), (0, jsx_runtime_1.jsx)(antd_1.Spin, { indicator: antIcon })] })), !checkLoading && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", { children: ["\u64CD\u4F5C\u7CFB\u7EDF: ", host.os] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("span", { children: ["\u4E3B\u673A: ", host.hostname] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("span", { children: ["\u5185\u6838: ", host.kernelArch] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("span", { children: ["\u5E73\u53F0: ", host.platform] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {})] })), (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: "\u5B89\u88C5centos \u4F9D\u8D56", description: "\u662F\u5426\u5EFA\u7ACBlibcurl-gnutls.so.4\u8F6F\u8FDE\u63A5", onConfirm: confirm, onCancel: cancel, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)("a", { href: "#", children: "CentOS\u9700\u8981\u5EFA\u7ACBlibcurl-gnutls.so.4\u8F6F\u8FDE\u63A5" }) }), intsalling && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u6B63\u5728\u5B89\u88C5" }), (0, jsx_runtime_1.jsx)(antd_1.Spin, { indicator: antIcon })] }))] }));
};
exports.default = Environment;
