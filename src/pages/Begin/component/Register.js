"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var Register = function (props) {
    var t = (0, react_i18next_1.useTranslation)().t;
    var onFinish = function (values) {
        console.log('Received values of form: ', values);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: t('Init Account') }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Form
            // eslint-disable-next-line react/prop-types
            , { 
                // eslint-disable-next-line react/prop-types
                form: props.form || {}, name: "normal_login", className: "login-form", onFinish: onFinish, style: {
                    margin: '24px',
                }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "username", rules: [
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { prefix: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { className: "site-form-item-icon" }), placeholder: "\u7528\u6237\u540D" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "password", rules: [
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { prefix: (0, jsx_runtime_1.jsx)(icons_1.LockOutlined, { className: "site-form-item-icon" }), placeholder: "\u5BC6\u7801", maxLength: 20 }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "displayName", rules: [
                            {
                                required: true,
                                message: 'Please input your displayName!',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { prefix: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { className: "site-form-item-icon" }), placeholder: "\u663E\u793A\u540D\u79F0" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "photoURL", rules: [
                            {
                                required: true,
                                message: 'Please input your photoURL!',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { prefix: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { className: "site-form-item-icon" }), placeholder: "\u5934\u50CFurl" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { placement: "top", title: "可以在dst-admin-go目录下的password文件直接修改", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", children: "\u4E0D\u8BB0\u5F97\u5BC6\u7801\u4E86" }) }) })] })] }));
};
exports.default = Register;
