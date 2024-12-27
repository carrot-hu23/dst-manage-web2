"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
exports.default = (function () {
    var _a = (0, react_1.useState)(false), open = _a[0], setOpen = _a[1];
    var _b = (0, react_1.useState)(false), confirmLoading = _b[0], setConfirmLoading = _b[1];
    var showPopconfirm = function () {
        setOpen(true);
    };
    var handleOk = function () {
        setConfirmLoading(true);
        setTimeout(function () {
            setOpen(false);
            setConfirmLoading(false);
            antd_1.message.success("安装饥荒成功");
        }, 2000);
    };
    var handleCancel = function () {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: "\u5B89\u88C5\u9965\u8352", 
        // description="安装饥荒"
        open: open, onConfirm: handleOk, okButtonProps: {
            loading: confirmLoading,
        }, onCancel: handleCancel, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: showPopconfirm, children: "\u70B9\u51FB\u5B89\u88C5 \u9965\u8352" }) }));
});
