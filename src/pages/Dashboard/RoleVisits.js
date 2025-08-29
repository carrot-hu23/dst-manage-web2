"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var index_jsx_1 = require("../../hooks/useTheme");
var pro_components_1 = require("@ant-design/pro-components");
var EChartComponent_jsx_1 = __importDefault(require("./EChartComponent.jsx"));
exports.default = (function (_a) {
    var chartData = _a.chartData, title = _a.title;
    var t = (0, index_jsx_1.useTheme)();
    var data = chartData.map(function (item) { return ({
        name: item.label,
        value: item.value
    }); });
    var option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '2%',
            left: 'left',
            color: t.theme === 'dark' ? '#141414' : '#fff'
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    // borderColor: t.theme === 'dark' ? '#141414' : '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    position: 'center',
                    color: t.theme !== 'dark' ? '#141414' : '#fff'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold',
                    }
                },
                // labelLine: {
                //     show: false
                // },
                data: data
            }
        ]
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { title: title, children: (0, jsx_runtime_1.jsx)(EChartComponent_jsx_1.default, { options: option }) }) }));
});
