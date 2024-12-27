"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var pro_components_1 = require("@ant-design/pro-components");
var rc_resize_observer_1 = __importDefault(require("rc-resize-observer"));
var react_i18next_1 = require("react-i18next");
require("./index.css");
var useTheme_1 = require("../../../../hooks/useTheme");
var Divider = pro_components_1.StatisticCard.Divider;
// eslint-disable-next-line react/prop-types
var BackupStatistic = function (_a) {
    var size = _a.size, data = _a.data;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _b = (0, react_1.useState)(false), responsive = _b[0], setResponsive = _b[1];
    var theme = (0, useTheme_1.useTheme)().theme;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(rc_resize_observer_1.default, { onResize: function (offset) {
                setResponsive(offset.width < 596);
            }, children: (0, jsx_runtime_1.jsxs)(pro_components_1.StatisticCard.Group
            // className={theme === 'dark' ? 'dark' : ''}
            , { 
                // className={theme === 'dark' ? 'dark' : ''}
                direction: responsive ? 'column' : 'row', children: [(0, jsx_runtime_1.jsx)(pro_components_1.StatisticCard, { statistic: {
                            title: t('backup.backup.number'),
                            value: size,
                        } }), (0, jsx_runtime_1.jsx)(Divider, { type: responsive ? 'horizontal' : 'vertical' }), (0, jsx_runtime_1.jsx)(pro_components_1.StatisticCard, { statistic: {
                            title: t('backup.backup.size'),
                            value: data > 1 ? "".concat(data, " GB") : "".concat(data * 1024, " MB"),
                        } })] }) }, "resize-observer") }));
};
exports.default = BackupStatistic;
