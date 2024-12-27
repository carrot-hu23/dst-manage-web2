"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var userApi_1 = require("../../api/userApi");
exports.default = (function () {
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var form = antd_1.Form.useForm()[0];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        (0, userApi_1.getUserInfoApi)()
            .then(function (resp) {
            if (resp.code === 200) {
                form.setFieldsValue(resp.data);
            }
            setLoading(false);
        });
    }, []);
    function updateUserInfo() {
        form.validateFields().then(function () {
            var data = form.getFieldsValue();
            (0, userApi_1.updateUserApi)("", data)
                .then(function (resp) {
                if (resp.code === 200) {
                    antd_1.message.success("保存成功");
                }
                else {
                    antd_1.message.error("保存失败", resp.msg);
                }
            });
        }).catch(function (err) {
            // 验证不通过时进入
            antd_1.message.error(err.errorFields[0].errors[0]);
        });
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Typography, { variant: "h4", sx: { mb: 5 }, children: "User Profile" }), (0, jsx_runtime_1.jsxs)(antd_1.Skeleton, { loading: loading, active: true, children: [(0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, initialValues: {}, labelCol: {
                                span: 4,
                            }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5934\u50CFurl", name: "photoURL", children: (0, jsx_runtime_1.jsx)(antd_1.Input, {}) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u7528\u6237\u540D", name: "username", rules: [{ required: true, message: '请输入用户名', },], children: (0, jsx_runtime_1.jsx)(antd_1.Input, {}) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u663E\u793A\u6635\u79F0", name: "displayName", rules: [{ required: true, message: '请输入显示昵称', },], children: (0, jsx_runtime_1.jsx)(antd_1.Input, {}) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5BC6\u7801", name: "password", rules: [{ required: true, message: '请输入密码', },], children: (0, jsx_runtime_1.jsx)(antd_1.Input, {}) })] }), (0, jsx_runtime_1.jsx)(antd_1.Button, { style: { margin: "0 auto", display: "block" }, type: "primary", onClick: function () { updateUserInfo(); }, children: "\u4FDD\u5B58" })] })] }) });
});
