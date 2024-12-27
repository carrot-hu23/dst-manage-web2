"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react/prop-types */
var react_1 = require("react");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var modApi_1 = require("../../../api/modApi");
var dateUitls_1 = require("../../../utils/dateUitls");
var formatNumber_1 = require("../../../utils/formatNumber");
var Search = antd_1.Input.Search;
var Meta = antd_1.Card.Meta;
var ModCard2 = function (_a) {
    var modinfo = _a.modinfo, addModList = _a.addModList, subscribe = _a.subscribe;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Card, { hoverable: true, style: {
                    width: 156,
                }, cover: (0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://steamcommunity.com/sharedfiles/filedetails/?id=".concat(modinfo.id), rel: "noreferrer", children: (0, jsx_runtime_1.jsx)("img", { alt: "example", style: {
                            height: 160
                        }, src: modinfo.img }) }), children: [(0, jsx_runtime_1.jsx)(Meta, { title: modinfo.name }), (0, jsx_runtime_1.jsx)("div", { style: {
                            fontSize: '12px',
                            paddingTop: '2px',
                            paddingBottom: '2px'
                        }, children: (0, dateUitls_1.timestampToString)(modinfo.time * 1000) }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            fontSize: '12px',
                            paddingBottom: '2px'
                        }, children: [t('mod.subscriptions'), ":\u00A0", (0, formatNumber_1.fShortenNumber)(modinfo.sub)] }), (0, jsx_runtime_1.jsx)(antd_1.Button, { loading: loading, type: "primary", size: 'small', onClick: function () { return subscribe(modinfo.id, modinfo.name, addModList, setLoading); }, children: t('mod.subscribe') })] }, modinfo.id), (0, jsx_runtime_1.jsx)("br", {})] }));
};
exports.default = (function (_a) {
    var addModList = _a.addModList;
    var t = (0, react_i18next_1.useTranslation)().t;
    var i18n = (0, react_i18next_1.useTranslation)().i18n;
    var lang = i18n.language;
    var _b = (0, react_1.useState)([]), modList = _b[0], setModList = _b[1];
    var _c = (0, react_1.useState)(20), pageSize = _c[0], setPageSize = _c[1];
    var _d = (0, react_1.useState)(1), page = _d[0], setPage = _d[1];
    var _e = (0, react_1.useState)(0), total = _e[0], setTotal = _e[1];
    var _f = (0, react_1.useState)(""), text = _f[0], setText = _f[1];
    var _g = antd_1.message.useMessage(), messageApi = _g[0], contextHolder = _g[1];
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    (0, react_1.useEffect)(function () {
        updateModList("", page, pageSize);
    }, []);
    var subscribe = function (modId, modName, addModList, setLoading) {
        messageApi.open({
            type: 'loading',
            content: "".concat(t('mod.subscribing'), " ").concat(modName),
            duration: 0,
        });
        setLoading(true);
        // message.info(`正在订阅 ${modName}`)
        (0, modApi_1.getModInfo)(lang, cluster, modId).then(function (data) {
            data.data.installed = true;
            addModList(function (current) {
                var newData = [];
                current.forEach(function (item) {
                    if (item.modid !== data.data.modid) {
                        newData.push(item);
                    }
                });
                newData.push(data.data);
                return __spreadArray([], newData, true);
            });
            // Dismiss manually and asynchronously
            setTimeout(messageApi.destroy, 1);
            antd_1.message.success("".concat(t('mod.subscribe.ok'), " ").concat(modName));
            setLoading(false);
        }).catch(function (error) {
            setTimeout(messageApi.destroy, 1);
            antd_1.message.warning("".concat(t('mod.subscribe.error'), " ").concat(modName, " \u5931\u8D25"));
            setLoading(false);
            console.log(error);
        });
    };
    var updateModList = function (text, page, pageSize) {
        antd_1.message.info(t('mod.search'));
        (0, modApi_1.searchMod)(lang, cluster, text, page, pageSize).then(function (data) {
            setModList(data.data.data);
            setPage(data.data.page);
            setPageSize(data.data.size);
            setTotal(data.data.total);
        }).catch(function (error) {
            console.log(error);
        });
    };
    var onSearch = function (text) {
        setText(text);
        updateModList(text, 1, pageSize);
    };
    var onShowSizeChange = function (current, pageSize) {
        setPageSize(pageSize);
        updateModList(text, current, pageSize);
    };
    var onChange = function (page) {
        updateModList(text, page, pageSize);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [contextHolder, (0, jsx_runtime_1.jsx)(Search, { placeholder: "input search text", onSearch: onSearch, style: {
                    width: 200,
                } }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Row, { children: modList.map(function (modinfo) { return ((0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 12, sm: 8, md: 6, lg: 4, xl: 4, children: (0, jsx_runtime_1.jsx)(ModCard2, { modinfo: modinfo, addModList: addModList, subscribe: subscribe }) }, modinfo.id)); }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Pagination, { onShowSizeChange: onShowSizeChange, current: page, pageSize: pageSize, onChange: function (i) { return onChange(i); }, total: total })] }));
});
