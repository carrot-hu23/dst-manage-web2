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
var react_1 = __importStar(require("react"));
var EChartComponent_1 = __importDefault(require("./EChartComponent"));
var pro_components_1 = require("@ant-design/pro-components");
var dateUitls_js_1 = require("../../utils/dateUitls.js");
exports.default = (function (_a) {
    var chartData = _a.chartData, title = _a.title;
    console.log(chartData);
    var options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['活跃玩家', '加入玩家'],
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: chartData === null || chartData === void 0 ? void 0 : chartData.xData,
            // axisLabel: {
            //     rotate: 45, // 设置 X 轴标签的旋转角度
            //     textStyle: {
            //         color: '#333', // 设置标签颜色
            //         fontSize: 12 // 设置标签字体大小
            //     }
            // }
        },
        yAxis: {
            type: 'value',
            // type: 'dashed' // 设置 y 轴轴线类型，可选值：'solid', 'dashed', 'dotted'
        },
        series: [
            {
                name: '活跃玩家',
                type: 'line',
                smooth: true,
                data: chartData.y1,
                lineStyle: {
                    // color: '#ff0000',
                    width: 3,
                    // type: 'dashed'
                },
                itemStyle: {
                    color: '#edc82d',
                    // borderColor: '#0000ff',
                    borderWidth: 8,
                },
                // symbol: 'circle',
                // symbolSize: 8,
                areaStyle: {
                    color: 'rgba(237,200,45, 0.1)' // 设置折线图区域填充颜色及透明度
                }
            },
            {
                name: '加入玩家',
                type: 'bar',
                data: chartData.y2,
                barWidth: '24%',
                itemStyle: {
                    color: '#2265d0', // 设置柱子的颜色
                    borderRadius: [5, 5, 0, 0]
                },
            },
        ],
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { title: title, children: (0, jsx_runtime_1.jsx)(EChartComponent_1.default, { options: options, title: title }) }) }));
});
