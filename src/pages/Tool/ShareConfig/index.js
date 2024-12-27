"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var shareApi_1 = require("../../../api/shareApi");
var HiddenText_1 = __importDefault(require("../../Home/HiddenText/HiddenText"));
exports.default = (function () {
    var _a = (0, react_1.useState)({}), keyCer = _a[0], setKeyCer = _a[1];
    var inputRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), spin = _b[0], setSpin = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        (0, shareApi_1.getKeyCerApi)()
            .then(function (resp) {
            if (resp.code === 200) {
                setKeyCer(resp.data);
            }
            setLoading(false);
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, children: (0, jsx_runtime_1.jsxs)(antd_1.Spin, { spinning: spin, children: [(0, jsx_runtime_1.jsxs)(antd_1.Space.Compact, { style: {
                            width: '100%',
                        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { ref: inputRef, placeholder: "\u8BF7\u8F93\u5165\u4ED6\u4EBA\u5206\u4EAB\u7684\u94FE\u63A5" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                                    (0, shareApi_1.importClusterApi)(inputRef.current.input.value)
                                        .then(function (resp) {
                                        if (resp.code === 200) {
                                            antd_1.message.success("导入成功");
                                        }
                                        else {
                                            antd_1.message.error("导入失败");
                                        }
                                    });
                                }, children: "\u5BFC\u5165\u5B58\u6863" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("h4", { children: "\u6211\u7684\u5206\u4EAB\u94FE\u63A5" }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 8, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Switch, { checked: keyCer.enable === "1", checkedChildren: "\u5F00\u542F", unCheckedChildren: "\u5173\u95ED", onChange: function (checked) {
                                    setSpin(true);
                                    (0, shareApi_1.enableKeyCerApi)(checked)
                                        .then(function (resp) {
                                        if (resp.code === 200) {
                                            setKeyCer(resp.data);
                                        }
                                        setSpin(false);
                                    });
                                } }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: "primary", onClick: function () {
                                    setSpin(true);
                                    (0, shareApi_1.reflushKeyCerApi)()
                                        .then(function (resp) {
                                        if (resp.code === 200) {
                                            setKeyCer(resp.data);
                                        }
                                        setSpin(false);
                                    });
                                }, children: "\u5237\u65B0\u94FE\u63A5" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(HiddenText_1.default, { text: "http://".concat(keyCer.ip, ":").concat(keyCer.port, "/share/cluster?key=").concat(keyCer.key) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: "\u8BF7\u52FF\u968F\u610F\u66B4\u9732\uFF0C\u53EF\u80FD\u5B58\u5728\u5B89\u5168\u95EE\u9898", type: "warning", showIcon: true, closeIcon: true })] }) }) }));
});
