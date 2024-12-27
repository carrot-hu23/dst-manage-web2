"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var ActivePlayerChart_1 = __importDefault(require("./ActivePlayerChart"));
var UserStatistic_1 = __importDefault(require("./UserStatistic"));
var RoleVisits_jsx_1 = __importDefault(require("./RoleVisits.jsx"));
var react_1 = require("react");
var statisticsApi_jsx_1 = require("../../api/statisticsApi.jsx");
var dateUitls_js_1 = require("../../utils/dateUitls.js");
var react_i18next_1 = require("react-i18next");
var i18next_1 = __importDefault(require("i18next"));
var react_router_dom_1 = require("react-router-dom");
var dayjs_1 = __importDefault(require("dayjs"));
var dst_js_1 = require("../../utils/dst.js");
var antd_1 = require("antd");
var pro_components_1 = require("@ant-design/pro-components");
var zh_CN_1 = __importDefault(require("antd/es/locale/zh_CN"));
var en_US_1 = __importDefault(require("antd/es/locale/en_US"));
require("dayjs/locale/zh-cn");
dayjs_1.default.locale('zh-cn');
var RangePicker = antd_1.DatePicker.RangePicker;
exports.default = (function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var currentLocale = i18next_1.default.language.startsWith('zh') ? zh_CN_1.default : en_US_1.default;
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var today = (0, dayjs_1.default)();
    var startOfWeek = today.startOf('week');
    var endOfWeek = today.endOf('week');
    var defaultRange = [startOfWeek, endOfWeek];
    var _a = (0, react_1.useState)([]), selectedRange = _a[0], setSelectedRange = _a[1];
    // 处理日期范围选择变化
    var handleRangeChange = function (dates) {
        if (dates && dates.length === 2) {
            var start = dates[0], end = dates[1];
            setSelectedRange([start, end]);
            count(start.valueOf(), end.valueOf());
        }
        else {
            // 处理用户清空选择的情况
            setSelectedRange([]);
        }
    };
    var _b = (0, react_1.useState)({
        title: '',
        xData: [],
        y1: [],
        y2: []
    }), userChartData = _b[0], setUserChartData = _b[1];
    var _c = (0, react_1.useState)({
        title: t('top10PlayerRankingsOfThisWeek'),
        chartData: [],
    }), topNActive = _c[0], setTopNActive = _c[1];
    var _d = (0, react_1.useState)({
        title: t('roleRatioOfThisTheWeek'),
        chartData: [],
    }), roleRate = _d[0], setRoleRate = _d[1];
    var _e = (0, react_1.useState)([]), timelineList = _e[0], setTimelineList = _e[1];
    function count(start, end) {
        (0, statisticsApi_jsx_1.countActivePlayers)(cluster, "DAY", start, end)
            .then(function (response) {
            var data = response.data;
            setUserChartData({
                title: t('playerActiveOfThisWeek'),
                xData: (0, dateUitls_js_1.translateFormat)(data.data.x),
                y1: data.data.y1,
                y2: data.data.y2,
            });
        })
            .catch(function (ereor) {
            console.error(ereor);
        });
        (0, statisticsApi_jsx_1.countTopNActive)(cluster, 10, start, end)
            .then(function (response) {
            var data = response.data;
            setTopNActive({
                title: t('top10PlayerRankingsOfThisWeek'),
                chartData: data.map(function (item) { return ({ label: item.name, value: item.count }); })
            });
        })
            .catch(function (ereor) {
            console.error(ereor);
        });
        (0, statisticsApi_jsx_1.countRoleRate)(cluster, start, end)
            .then(function (response) {
            var data = response.data;
            setRoleRate({
                title: t('roleRatioOfThisTheWeek'),
                chartData: data.map(function (item) {
                    if (item.role === '') {
                        return ({ label: "other", value: item.count });
                    }
                    if (!(item.role in dst_js_1.dstRolesMap)) {
                        return ({ label: item.role, value: item.count });
                    }
                    return ({ label: dst_js_1.dstRolesMap[item.role], value: item.count });
                })
            });
        })
            .catch(function (ereor) {
            console.error(ereor);
        });
    }
    (0, react_1.useEffect)(function () {
        count((0, dateUitls_js_1.getBeginWeek)(), (0, dateUitls_js_1.getEndWeek)());
        (0, statisticsApi_jsx_1.lastThNRegenerateApi)(cluster, 10)
            .then(function (response) {
            var data = response.data;
            var regenerates = data.map(function (regenerate) {
                var data = new Date(regenerate.CreatedAt);
                return { children: data.toLocaleString() };
            });
            setTimelineList(regenerates);
        })
            .catch(function (ereor) {
            console.error(ereor);
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_1.ConfigProvider, { locale: currentLocale, children: [(0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { wrap: true, size: 16, children: [(0, jsx_runtime_1.jsx)(RangePicker, { defaultValue: defaultRange, format: "YYYY-MM-DD", 
                                // locale="zh-cn" // 可选，设置为中文或其他语言
                                onChange: handleRangeChange, needConfirm: true }), (0, jsx_runtime_1.jsx)(antd_1.Segmented, { options: [t('time.this.week'), t('time.last.week'), t('time.this.month'), t('time.last.month')], onChange: function (value) {
                                    if (value === t('time.last.week')) {
                                        count((0, dayjs_1.default)().subtract(1, 'week').startOf('week').format('YYYY-MM-DD').valueOf(), (0, dayjs_1.default)().subtract(1, 'week').endOf('week').format('YYYY-MM-DD').valueOf());
                                    }
                                    else if (value === t('time.this.month')) {
                                        count((0, dayjs_1.default)().startOf('month').format('YYYY-MM-DD').valueOf(), (0, dayjs_1.default)().endOf('month').format('YYYY-MM-DD').valueOf());
                                    }
                                    else if (value === t('time.last.month')) {
                                        count((0, dayjs_1.default)().subtract(1, 'month').startOf('month').format('YYYY-MM-DD').valueOf(), (0, dayjs_1.default)().subtract(1, 'month').endOf('month').format('YYYY-MM-DD').valueOf());
                                    }
                                    else {
                                        // 本周
                                        count((0, dayjs_1.default)().startOf('week').format('YYYY-MM-DD').valueOf(), (0, dayjs_1.default)().endOf('week').format('YYYY-MM-DD').valueOf());
                                    }
                                } })] }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(UserStatistic_1.default, {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Row, { gutter: [16, 16], children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, children: (0, jsx_runtime_1.jsx)(ActivePlayerChart_1.default, { title: t("playerActiveOfThisWeek"), chartData: userChartData }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, children: (0, jsx_runtime_1.jsx)(RoleVisits_jsx_1.default, { chartData: roleRate.chartData, title: t('roleRatioOfThisTheWeek') }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, children: (0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { title: t("top10PlayerRankingsOfThisWeek"), children: "1" }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, children: (0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { title: t("lastRegenerateLine"), children: (0, jsx_runtime_1.jsx)(antd_1.Timeline, { items: timelineList }) }) })] })] }) }));
});
