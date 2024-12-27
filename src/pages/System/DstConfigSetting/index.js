"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var dstConfigApi_1 = require("../../../api/dstConfigApi");
var onFinishFailed = function (errorInfo) {
    antd_1.message.error("保存配置失败");
    console.log('Failed:', errorInfo);
};
var Title = antd_1.Typography.Title, Paragraph = antd_1.Typography.Paragraph;
exports.default = (function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var i18n = (0, react_i18next_1.useTranslation)().i18n;
    var _a = (0, react_1.useState)('zh'), lang = _a[0], setLang = _a[1];
    (0, react_1.useEffect)(function () {
        var handleLanguageChange = function (lng) {
            setLang(lng);
            setActiveTab(lng === "en" ? "全部" : "默认");
        };
        i18n.on("languageChanged", handleLanguageChange);
        // 清理事件监听器
        return function () {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n]);
    var form = antd_1.Form.useForm()[0];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(lang === 'en' ? '自定义' : '默认'), activeTab = _c[0], setActiveTab = _c[1];
    var handleTabChange = function (value) {
        setActiveTab(value);
    };
    var _d = (0, react_1.useState)({}), data = _d[0], setData = _d[1];
    (0, react_1.useEffect)(function () {
        // 获取配置文件
        (0, dstConfigApi_1.readDstConfigSync)()
            .then(function (data) {
            console.log('dst_config', data);
            form.setFieldsValue(data.data);
            setData(data.data);
            setLoading(false);
        });
    }, [form]);
    var onFinish = function (values) {
        if (values.persistent_storage_root === undefined && data.persistent_storage_root !== "") {
            values.persistent_storage_root = data.persistent_storage_root;
        }
        if (values.conf_dir === undefined && data.conf_dir !== "") {
            values.conf_dir = data.conf_dir;
        }
        if (values.ugc_directory === undefined && data.ugc_directory !== "") {
            values.ugc_directory = data.ugc_directory;
        }
        setData(values);
        (0, dstConfigApi_1.writeDstConfigSync)(values)
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("保存配置成功");
            }
            else {
                antd_1.message.warning(resp.msg);
            }
        });
    };
    var _e = (0, react_1.useState)(false), open = _e[0], setOpen = _e[1];
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Drawer, { title: "Docker \u8DEF\u5F84\u53C2\u8003", placement: "right", onClose: function () { return setOpen(false); }, open: open, children: (0, jsx_runtime_1.jsxs)(antd_1.Typography, { children: [(0, jsx_runtime_1.jsx)(Title, { level: 4, children: "\u8DEF\u5F84\u53C2\u8003:" }), (0, jsx_runtime_1.jsx)(Title, { level: 5, children: "\u5BB9\u5668\u5B58\u6863\u542F\u52A8\u8DEF\u5F84" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: (0, jsx_runtime_1.jsx)("pre", { children: '/root/.klei/DoNotStarveTogether' }) }), (0, jsx_runtime_1.jsx)(Title, { level: 5, children: "\u5BB9\u5668\u5B58\u6863\u5907\u4EFD\u8DEF\u5F84" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: (0, jsx_runtime_1.jsx)("pre", { children: '/app/backup' }) }), (0, jsx_runtime_1.jsx)(Title, { level: 5, children: "\u5BB9\u5668\u5B58\u6863\u6A21\u7EC4\u8DEF\u5F84" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: (0, jsx_runtime_1.jsx)("pre", { children: '/app/mod' }) }), (0, jsx_runtime_1.jsx)(Title, { level: 5, children: "\u5BB9\u5668\u73A9\u5BB6\u65E5\u5FD7\u8DEF\u5F84" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: (0, jsx_runtime_1.jsx)("pre", { children: '/app/dst-db' }) }), (0, jsx_runtime_1.jsx)(Title, { level: 5, children: "\u5BB9\u5668\u670D\u52A1\u65E5\u5FD7\u8DEF\u5F84" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: (0, jsx_runtime_1.jsx)("pre", { children: '/app/dst-admin-go.log' }) }), (0, jsx_runtime_1.jsx)(Title, { level: 5, children: "\u5BB9\u5668\u542F\u52A8\u9965\u8352\u8DEF\u5F84" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: (0, jsx_runtime_1.jsx)("pre", { children: '/app/dst-dedicated-server' }) }), (0, jsx_runtime_1.jsx)(Title, { level: 5, children: "\u5BB9\u5668\u542Fsteamcmd" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: (0, jsx_runtime_1.jsx)("pre", { children: '/app/steamcmd' }) }), (0, jsx_runtime_1.jsx)(Title, { level: 4, children: "\u542F\u52A8\u547D\u4EE4\u53C2\u8003:" }), (0, jsx_runtime_1.jsx)(Paragraph, { children: (0, jsx_runtime_1.jsx)("pre", { children: 'docker run -d -p8082:8082 -v /root/dstsave:/root/.klei/DoNotStarveTogether -v /root/dstsave/backup:/app/backup -v /root/steamcmd:/app/steamcmd -v /root/dst-dedicated-server:/app/dst-dedicated-server  hujinbo23/dst-admin-go:1.2.6' }) })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Alert, { style: { marginBottom: '12px' }, message: t('setting.dstConfig.tips1'), type: "warning", showIcon: true }), (0, jsx_runtime_1.jsx)(antd_1.Form, { onFinish: onFinish, onFinishFailed: onFinishFailed, layout: "vertical", labelAlign: 'left', form: form, children: (0, jsx_runtime_1.jsxs)(antd_1.Skeleton, { loading: loading, active: true, children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 16, wrap: true, children: [lang === 'zh' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Segmented, { value: activeTab, onChange: handleTabChange, options: ['默认', '自定义'] }) })), (0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)("img", { src: "/assets/icons/navbar/docker-svgrepo-com.svg", width: 12, alt: "docker-svgrepo-com" }), size: "small", type: 'primary', onClick: function () {
                                        setOpen(true);
                                    }, children: "docker\u6620\u5C04\u8DEF\u5F84\u53C2\u8003" }), (0, jsx_runtime_1.jsx)("a", { target: '_blank', href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=1616647350', rel: "noreferrer", children: "Dedicated Server\u914D\u7F6E\u9879\u548C\u547D\u4EE4\u884C\u53C2\u6570\u8BE6\u89E3" })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('setting.dstConfig.steamcmd'), name: "steamcmd", rules: [
                                {
                                    required: true,
                                    message: 'Please input steam cmd install path',
                                },
                            ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, {}) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('setting.dstConfig.force_install_dir'), name: "force_install_dir", rules: [
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server_nullrenderer.exe path',
                                },
                            ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, {}) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('setting.dstConfig.backup'), name: "backup", rules: [
                                {
                                    required: true,
                                    message: 'Please input backup path',
                                },
                            ], tooltip: "这个路径是放你创建存档备份的路径", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u6E38\u620F\u5B58\u6863\u5907\u4EFD\u8DEF\u5F84" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('setting.dstConfig.mod_download_path'), name: "mod_download_path", tooltip: "这个路径是面板下载的模组路径和游戏的模组路径没有关系", rules: [
                                {
                                    required: true,
                                    message: 'Please input mod_download_path',
                                },
                            ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u670D\u52A1\u5668\u6587\u4EF6\u5939\u540D" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('setting.dstConfig.cluster'), name: "cluster", rules: [
                                {
                                    required: true,
                                    message: 'Please input cluster',
                                },
                            ], tooltip: "设置此服务器将使用的存档目录的名称\n" +
                                "    服务器将期望在以下位置找到 cluster.ini 文件\n" +
                                "    <persistent_storage_root>/<conf_dir>/<cluster>/cluster.ini\n" +
                                "    默认值为：Cluster_1", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u670D\u52A1\u5668\u6587\u4EF6\u5939\u540D" }) }), activeTab === '自定义' && (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('setting.dstConfig.persistent_storage_root'), name: 'persistent_storage_root', tooltip: "设置游戏配置目录的路径。路径需要是绝对路径。\n" +
                                    "    用户文件的完整路径是\n" +
                                    "    <persistent_storage_root>/<conf_dir>/\n" +
                                    "    <conf_dir> 是通过 -conf_dir 设置的值\n" +
                                    "    该值的默认值取决于平台：\n" +
                                    "        Windows: <你的文档文件夹>/Klei\n" +
                                    "        Mac OSX: <你的主文件夹>/Documents/Klei\n" +
                                    "        Linux: ~/.klei", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "persistent_storage_root" }) }) }), activeTab === '自定义' && (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('setting.dstConfig.conf_dir'), name: 'conf_dir', tooltip: "更改配置目录的名称，不包含斜杠\n" +
                                    "    用户文件的完整路径是\n" +
                                    "    <persistent_storage_root>/<conf_dir>/\n" +
                                    "    <persistent_storage_root> 是通过 -persistent_storage_root 设置的值\n" +
                                    "    默认值为：DoNotStarveTogether", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "conf_dir" }) }) }), activeTab === '自定义' && (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('setting.dstConfig.ugc_directory'), name: 'ugc_directory', tooltip: "专用服务器现在将 v2 mods 存储在 <install_directory>/ugc_mods/<ClusterDirectory>/<ShardDirectory>\n" +
                                    "    （ClusterDirectory 和 ShardDirectory 分别是通过 -cluster 和 -shard 定义的值）\n" +
                                    "    如果你想改变这个，你可以添加命令行参数\n" +
                                    "    -ugc_directory <存储 v2 mods 的目录路径>", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "ugc_directory" }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('setting.dstConfig.bin'), name: "bin", rules: [
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server bin',
                                },
                            ], children: (0, jsx_runtime_1.jsxs)(antd_1.Radio.Group, { children: [(0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 32, children: t('setting.dstConfig.bin.32') }), (0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 64, children: t('setting.dstConfig.bin.64') }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: 'luajit是一种特殊的启动方式，目前只是兼容这种启动方式。环境需要自己安装，详细参考: https://github.com/CN-DST-DEVELOPER/Faster_DST', children: (0, jsx_runtime_1.jsx)(antd_1.Radio, { value: 100, children: "luajit" }) })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: {
                                span: 24,
                            }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { style: { margin: "0 auto", display: "block" }, type: "primary", htmlType: "submit", children: t('setting.dstConfig.save') }) })] }) })] }));
});
