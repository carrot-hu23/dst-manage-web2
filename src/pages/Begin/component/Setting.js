"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var installSteamcmd_1 = __importDefault(require("./installSteamcmd"));
var installDst_1 = __importDefault(require("./installDst"));
var Setting = function (props) {
    function importConfig() {
        // ~/steamcmd
        // ~/dst
        // ~/.klei/DoNotStarveTogether/
        // MyDediServer
        // ~/.klei/DoNotStarveTogether/
        var values = {
            steamcmd: '~/steamcmd',
            force_install_dir: '~/dst',
            cluster: 'MyDediServer',
            backup: '~/.klei/DoNotStarveTogether',
            mod_download_path: '~/.klei/DoNotStarveTogether/mod'
        };
        props.form.setFieldsValue(values);
    }
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u8BBE\u7F6E steamcmd \u5B89\u88C5\u8DEF\u5F84" }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { layout: "vertical", labelAlign: 'left', 
                // eslint-disable-next-line react/prop-types
                form: props.form, style: {
                    margin: '24px',
                }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "steamcmd\u5B89\u88C5\u8DEF\u5F84", name: "steamcmd", rules: [
                            {
                                required: true,
                                message: 'Please input steam cmd install path',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "steamcmd\u5B89\u88C5\u8DEF\u5F84" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u9965\u8352\u670D\u52A1\u5668\u5B89\u88C5\u8DEF\u5F84", name: "force_install_dir", rules: [
                            {
                                required: true,
                                message: 'Please input dontstarve_dedicated_server_nullrenderer.exe path',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "steamcmd \u9965\u8352\u8054\u673A\u7248\u5B89\u88C5\u8DEF\u5F84" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u670D\u52A1\u5668\u623F\u95F4\u6587\u4EF6\u540D\u5B57", name: "cluster", rules: [
                            {
                                required: true,
                                message: 'Please input dontstarve_dedicated_server name',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u670D\u52A1\u5668\u623F\u95F4\u6587\u4EF6\u540D\u5B57" }) })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(installSteamcmd_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(installDst_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { placement: "top", title: "导入 qinming99/dst-admin 安装位置", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: function () { return importConfig(); }, children: "\u4E00\u952E\u5BFC\u5165dst-admin" }) }) })] });
};
exports.default = Setting;
