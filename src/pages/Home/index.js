"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var ClusterIni_1 = __importDefault(require("./ClusterIni"));
var NameList_1 = __importDefault(require("./NameList"));
var _8level_1 = require("../../api/8level");
exports.default = (function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var tabs = [
        {
            key: '1',
            label: t('cluster.clusterIni'),
            children: (0, jsx_runtime_1.jsx)(ClusterIni_1.default, {})
        },
        {
            key: '3',
            label: t('cluster.adminlist'),
            children: (0, jsx_runtime_1.jsx)(NameList_1.default, { title: t('cluster.adminlist'), getApi: _8level_1.getAdminlistApi, saveApi: _8level_1.saveAdminlistApi, tips: "\u7BA1\u7406\u5458KleilD\u5217\u8868\n\n                \u7BA1\u7406\u5458\u53EF\u4EE5\u5728\u6E38\u620F\u5185\u62E5\u6709\u7BA1\u7406\u6743\u9650\uFF0C\u5305\u62EC\u8E22\u51FA\u73A9\u5BB6\u3001\u5C01\u7981\u73A9\u5BB6\u3001\u56DE\u6863\u3001\u4F7F\u7528\u63A7\u5236\u53F0\u6267\u884C\u6307\u4EE4\u7B49\u3002\n\n                \u652F\u6301KleilD (KU_xXXXXXXx) \u3002\n                " })
        },
        {
            key: '4',
            label: t('cluster.whitelist'),
            children: (0, jsx_runtime_1.jsx)(NameList_1.default, { title: t('cluster.whitelist'), getApi: _8level_1.getWhitelistApi, saveApi: _8level_1.saveWhitelistApi, tips: "\u767D\u540D\u5355KleilD\u5217\u8868\n\n\u52A0\u5165\u767D\u540D\u5355\u7684\u73A9\u5BB6\u5C06\u53EF\u4EE5\u4F7F\u7528\u4FDD\u7559\u680F\u4F4D\u7684\u4F4D\u7F6E,\u907F\u514D\u5176\u4ED6\u73A9\u5BB6\u8FC7\u591A\u5BFC\u81F4\u4E0D\u80FD\u8FDB\u5165\u670D\u52A1\u5668\u3002" })
        },
        {
            key: '5',
            label: t('cluster.blacklist'),
            children: (0, jsx_runtime_1.jsx)(NameList_1.default, { title: t('cluster.blacklist'), getApi: _8level_1.getBlacklistApi, saveApi: _8level_1.saveBlacklistApi, tips: "\u88AB\u5C01\u7981\u73A9\u5BB6\u5217\u8868\n\n\u4FDD\u5B58\u5728\u8BE5\u6587\u4EF6\u5185\u7684ID\u5BF9\u5E94\u7684\u73A9\u5BB6\u5C06\u4E0D\u80FD\u52A0\u5165\u8BE5\u623F\u95F4\u3002\n\n\u652F\u6301KleilD ( KU_xxxxxxxx )\u548CSteamlD\n(7656xXXxxXXXxxxxx)\u3002" })
        },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: "1", items: tabs }) }));
});
