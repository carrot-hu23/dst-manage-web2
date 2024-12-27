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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var zh_CN_1 = __importDefault(require("antd/locale/zh_CN"));
var dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/zh-cn");
var EChartComponent_1 = __importDefault(require("./EChartComponent"));
var statisticsApi_1 = require("../../api/statisticsApi");
var dateUitls_1 = require("../../utils/dateUitls");
var dst_1 = require("../../utils/dst");
dayjs_1.default.locale('zh-cn');
var RangePicker = antd_1.DatePicker.RangePicker;
exports.default = (function () {
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(), chartOptions = _b[0], setChartOptions = _b[1];
    var today = (0, dayjs_1.default)();
    var startOfWeek = today.startOf('week');
    var endOfWeek = today.endOf('week');
    var defaultRange = [startOfWeek, endOfWeek];
    var _c = (0, react_1.useState)([]), selectedRange = _c[0], setSelectedRange = _c[1];
    // 处理日期范围选择变化
    var handleRangeChange = function (dates) {
        if (dates && dates.length === 2) {
            var start = dates[0], end = dates[1];
            setSelectedRange([start, end]);
            countActivePlayersApi(start.valueOf(), end.valueOf(), false);
        }
        else {
            // 处理用户清空选择的情况
            setSelectedRange([]);
        }
    };
    function countActivePlayersApi(start, end, isLoading) {
        if (isLoading) {
            setLoading(true);
        }
        (0, statisticsApi_1.countRoleRate)(cluster, start, end)
            .then(function (response) {
            var data = response.data;
            setChartOptions({
                title: {
                    text: '角色占比',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '角色占比',
                        type: 'pie',
                        radius: '50%',
                        data: data === null || data === void 0 ? void 0 : data.map(function (item) {
                            if (item.role === '') {
                                return ({ name: "other", value: item.count });
                            }
                            if (!(item.role in dst_1.dstRolesMap)) {
                                return ({ name: item.role, value: item.count });
                            }
                            return ({ name: dst_1.dstRolesMap[item.role], value: item.count });
                        }),
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                // color: ['#ff9a9e', '#fad0c4', '#a18cd1', '#a1c4fd'] // 设置饼图的颜色
            });
        })
            .catch(function (error) {
            console.error(error);
        }).finally(function () {
            if (isLoading) {
                setLoading(false);
            }
        });
    }
    (0, react_1.useEffect)(function () {
        countActivePlayersApi((0, dateUitls_1.getBeginWeek)(), (0, dateUitls_1.getEndWeek)(), true);
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.ConfigProvider, { locale: zh_CN_1.default, children: (0, jsx_runtime_1.jsxs)(antd_1.Skeleton, { loading: loading, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            paddingBottom: 8
                        }, children: (0, jsx_runtime_1.jsx)(RangePicker, { defaultValue: defaultRange, format: "YYYY-MM-DD", locale: "zh-cn" // 可选，设置为中文或其他语言
                            , onChange: handleRangeChange, needConfirm: true }) }), (0, jsx_runtime_1.jsx)(EChartComponent_1.default, { options: chartOptions, title: '角色占比' })] }) }) }));
});
