"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
exports.default = (function (_a) {
    var secondaries = _a.secondaries;
    (0, react_1.useEffect)(function () {
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-base font-medium pb-2", children: ["\u5C42\u6570: ", Object.keys(secondaries).length] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    height: 400,
                    overflowY: 'auto',
                }, children: Object.keys(secondaries).map(function (key) { return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(antd_1.Card, { bordered: false, style: {
                                backgroundColor: '#F0F2F5'
                            }, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("span", { children: ["\u4E16\u754CId: ", secondaries[key].id] }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("span", { children: ["\u4E16\u754CIp: ", secondaries[key].__addr, ":", secondaries[key].port] }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("span", { children: ["steam: ", secondaries[key].steamid] }) })] }), (0, jsx_runtime_1.jsx)("br", {})] }, key)); }) })] }));
});
