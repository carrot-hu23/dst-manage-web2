"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react/prop-types */
var pro_components_1 = require("@ant-design/pro-components");
var rc_resize_observer_1 = __importDefault(require("rc-resize-observer"));
var react_1 = require("react");
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var systeminfoApi_1 = require("../../../api/systeminfoApi");
var useTheme_1 = require("../../../hooks/useTheme");
function formatData(data, num) {
    return data.toFixed(num);
}
var Statistic = pro_components_1.StatisticCard.Statistic, Divider = pro_components_1.StatisticCard.Divider;
exports.default = (function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _o = (0, react_1.useState)(false), responsive = _o[0], setResponsive = _o[1];
    var _p = (0, react_1.useState)({}), systeminfo = _p[0], setSysteminfo = _p[1];
    var cpuUsedPercent = formatData(((_a = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.cpu) === null || _a === void 0 ? void 0 : _a.cpuUsedPercent) || 0, 2);
    var cpuPercent = ((_b = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.cpu) === null || _b === void 0 ? void 0 : _b.cpuPercent) || [];
    var cpuCores = (_c = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.cpu) === null || _c === void 0 ? void 0 : _c.cores;
    var memTotal = formatData(((_d = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.mem) === null || _d === void 0 ? void 0 : _d.total) || 0, 2);
    var memUsedPercent = formatData(((_e = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.mem) === null || _e === void 0 ? void 0 : _e.usedPercent) || 0, 2);
    var memUsed = formatData(((_f = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.mem) === null || _f === void 0 ? void 0 : _f.used) || 0, 2);
    var memAvailable = formatData(((_g = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.mem) === null || _g === void 0 ? void 0 : _g.available) || 0, 2);
    var diskTotal = (((_h = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.disk) === null || _h === void 0 ? void 0 : _h.devices) || []).map(function (item) { return Number(item.total); })
        // eslint-disable-next-line no-restricted-globals
        .reduce(function (prev, curr) { return !isNaN(Number(curr)) ? prev + curr : prev; }, 0) / 1024;
    var diskFree = (((_j = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.disk) === null || _j === void 0 ? void 0 : _j.devices) || []).map(function (item) { return Number(item.total - (item.total * item.usage * 0.01)); })
        // eslint-disable-next-line no-restricted-globals
        .reduce(function (prev, curr) { return !isNaN(Number(curr)) ? prev + curr : prev; }, 0) / 1024;
    var diskUsage = formatData((diskTotal - diskFree) / diskTotal * 100, 2);
    (0, react_1.useEffect)(function () {
        (0, systeminfoApi_1.getSystemInfoApi)()
            .then(function (resp) {
            if (resp.code === 200) {
                setSysteminfo(resp.data);
            }
        });
    }, []);
    (0, react_1.useEffect)(function () {
        var timerId = setInterval(function () {
            (0, systeminfoApi_1.getSystemInfoApi)()
                .then(function (resp) {
                if (resp.code === 200) {
                    setSysteminfo(resp.data);
                }
            });
        }, 5000);
        return function () {
            clearInterval(timerId); // 组件卸载时清除定时器
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(rc_resize_observer_1.default, { onResize: function (offset) {
                setResponsive(offset.width < 596);
            }, children: (0, jsx_runtime_1.jsxs)(pro_components_1.StatisticCard.Group, { direction: responsive ? 'column' : 'row', children: [(0, jsx_runtime_1.jsx)(pro_components_1.StatisticCard, { statistic: {
                            title: t('panel.panel'),
                            value: "".concat(formatData(systeminfo.panelMemUsage / 1024, 2), " M"),
                            description: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(_k = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.host) === null || _k === void 0 ? void 0 : _k.os, " /", (_l = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.host) === null || _l === void 0 ? void 0 : _l.kernelArch, "-", (_m = systeminfo === null || systeminfo === void 0 ? void 0 : systeminfo.host) === null || _m === void 0 ? void 0 : _m.platform] })),
                        } }), (0, jsx_runtime_1.jsx)(Divider, { type: responsive ? 'horizontal' : 'vertical' }), (0, jsx_runtime_1.jsx)(pro_components_1.StatisticCard, { statistic: {
                            title: t('panel.memoryUsage'),
                            value: "".concat(formatData(memUsed / 1024 / 1024 / 1024, 2), " GB"),
                            description: (0, jsx_runtime_1.jsx)(Statistic, { title: t('panel.totalMem'), value: "".concat(formatData(memAvailable / 1024 / 1024 / 1024, 2), " / ").concat(formatData(memTotal / 1024 / 1024 / 1024, 2), " GB") }),
                        }, chart: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Progress, { type: "circle", percent: memUsedPercent, strokeColor: memUsedPercent > 70 ? 'red' : '#5BD171', status: 'normal', width: 70, strokeLinecap: "butt", strokeWidth: 8 }) }), chartPlacement: "left" }), (0, jsx_runtime_1.jsx)(pro_components_1.StatisticCard, { statistic: {
                            title: t('panel.cpuUsage'),
                            value: "".concat(cpuUsedPercent, " %"),
                            description: (0, jsx_runtime_1.jsx)(Statistic, { title: t('panel.cpuCores'), value: cpuCores }),
                        }, chart: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { placement: "rightTop", style: {
                                    background: '#fff'
                                }, title: ((0, jsx_runtime_1.jsx)("div", { children: cpuPercent !== undefined && cpuPercent.map(function (value, index) {
                                        // eslint-disable-next-line react/jsx-key
                                        return (0, jsx_runtime_1.jsxs)("div", { children: ["\u6838\u5FC3".concat(index), ": ", formatData(value, 2), "%", (0, jsx_runtime_1.jsx)(antd_1.Progress, { percent: formatData(value, 2), size: "small", strokeColor: '#5BD171', status: "active" })] });
                                    }) })), children: (0, jsx_runtime_1.jsx)(antd_1.Progress, { type: "circle", percent: cpuUsedPercent, strokeColor: cpuUsedPercent > 70 ? 'red' : '', status: 'normal', width: 70, strokeLinecap: "butt", strokeWidth: 8 }) }) }), chartPlacement: "left" }), (0, jsx_runtime_1.jsx)(pro_components_1.StatisticCard, { statistic: {
                            title: t('panel.diskFree'),
                            value: "".concat(formatData(diskFree, 2), " GB"),
                            description: (0, jsx_runtime_1.jsx)(Statistic, { title: t('panel.totalDisk'), value: "".concat(formatData(diskTotal, 2), " GB") }),
                        }, chart: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Progress, { type: "circle", percent: diskUsage, strokeColor: diskUsage > 90 ? 'red' : '', status: 'normal', width: 70, strokeLinecap: "butt", strokeWidth: 8 }) }), chartPlacement: "left" })] }) }, "resize-observer") }));
});
