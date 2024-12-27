"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pro_components_1 = require("@ant-design/pro-components");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var useTheme_1 = require("../../../hooks/useTheme");
var preinstallApi_1 = require("../../../api/preinstallApi");
exports.default = (function (_a) {
    var reload = _a.reload;
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var form = antd_1.Form.useForm()[0];
    var _b = (0, react_1.useState)("default"), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(false), spin = _c[0], setSpin = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)([]), preinstalls = _e[0], setPreinstalls = _e[1];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        fetch('/misc/preinstall.json')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setPreinstalls(data);
            setLoading(false);
        }).catch(function (error) {
            console.error('无法加载配置文件', error);
        });
    }, []);
    function save() {
        setSpin(true);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        (0, preinstallApi_1.usePreinstallApi)(cluster, name)
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("设置成功");
                reload();
            }
            else {
                antd_1.message.error("\u8BBE\u7F6E\u5931\u8D25 ".concat(resp.msg));
            }
            setSpin(false);
        });
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, children: (0, jsx_runtime_1.jsxs)(antd_1.Spin, { spinning: spin, tip: "正在替换", children: [(0, jsx_runtime_1.jsx)(antd_1.Form, { form: form, layout: "vertical", children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "template", label: "\u4E16\u754C\u6A21\u677F", children: (0, jsx_runtime_1.jsx)(pro_components_1.CheckCard.Group, { style: { width: '100%' }, onChange: function (value) {
                                    console.log('value', value);
                                    setName(value);
                                }, defaultValue: "default", children: (0, jsx_runtime_1.jsx)(antd_1.Row, { gutter: [16, 16], children: preinstalls.map(function (item, index) { return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(pro_components_1.CheckCard, { style: {
                                                        width: '100%'
                                                    }, avatar: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: item.src, size: "large" }), title: item.name, description: item.description, value: item.value }) }, index) }, index) }); }) }) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: "window\u7248\u672C \u9762\u677F\u548C\u9965\u8352\u5B58\u6863\u4EE5\u53CA\u5907\u4EFD\u8DEF\u5F84\u8BF7\u5728C\u76D8\uFF0C\u5176\u4ED6\u76D8\u5C06\u6CA1\u6709\u64CD\u4F5C\u6743\u9650\u5BFC\u81F4\u5931\u8D25", type: "warning", showIcon: true }), (0, jsx_runtime_1.jsx)(antd_1.Alert, { style: { marginTop: '8px' }, message: "\u6B64\u64CD\u4F5C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u4E16\u754C\u542F\u52A8\u4E0D\u8D77\u6765\uFF0C\u6BD4\u5982\u6A21\u7EC4\u51B2\u7A81\uFF0C\u914D\u7F6E\u6587\u4EF6\u66F4\u65B0\u7B49\u95EE\u9898\u3002\u8BF7\u5148\u505C\u6B62\u6240\u6709\u4E16\u754C\uFF0C\u81EA\u884C\u505A\u597D\u4FDD\u5B58\u5B58\u6863\uFF0C\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u4E4B\u524D\u7684\u5B58\u6863", type: "warning", showIcon: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Alert, { style: { marginTop: '8px' }, message: "\u5982\u679C\u60F3\u66F4\u6539\u9ED8\u8BA4\u7684\u6A21\u677F\uFF0C\u663E\u793A\u6A21\u677F\u9884\u8BBE\u662F\u5728 dist/misc/preinstall.json \u4FEE\u6539\uFF0C \u540C\u65F6\u8BF7\u5728\u9762\u677F\u7684static/preinstall\u76EE\u5F55\u4E0B\uFF0C\u8BBE\u7F6E\u5BF9\u5E94\u7684\u5B58\u6863", type: "info", showIcon: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Space, { size: 8, wrap: true, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return save(); }, children: "\u4FDD\u5B58" }) })] }) }) }));
});
