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
// src/components/EChartComponent.jsx
var react_1 = __importStar(require("react"));
var echarts = __importStar(require("echarts"));
var EChartComponent = function (_a) {
    var options = _a.options, title = _a.title, width = _a.width, height = _a.height;
    var chartRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var chartInstance = echarts.init(chartRef.current);
        chartInstance.setOption(options);
        // Resize chart on window resize
        var handleResize = function () {
            chartInstance.resize();
        };
        window.addEventListener('resize', handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
            chartInstance.dispose();
        };
    }, [options]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: chartRef, style: { width: '100%', height: '400px' } }));
};
exports.default = EChartComponent;
