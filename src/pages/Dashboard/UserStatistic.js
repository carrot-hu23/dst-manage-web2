"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var dayjs_1 = __importDefault(require("dayjs"));
var statisticsApi_1 = require("../../api/statisticsApi");
var pro_components_1 = require("@ant-design/pro-components");
exports.default = (function () {
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _a = (0, react_1.useState)(0), thisDayUsers = _a[0], setThisDayUsers = _a[1];
    var _b = (0, react_1.useState)(0), thisMonthUsers = _b[0], setThisMonthUsers = _b[1];
    (0, react_1.useEffect)(function () {
        (0, statisticsApi_1.countActivePlayers)(cluster, "DAY", (0, dayjs_1.default)().startOf('day').add(-1, "day").valueOf(), (0, dayjs_1.default)().startOf('day').valueOf())
            .then(function (response) {
            var _a;
            var data = response.data;
            if (data.data.y1 !== null && data.data.y1 !== undefined) {
                // const sum = data.data.y1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                var sum = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.y1[1];
                setThisDayUsers(sum);
            }
        })
            .catch(function (error) {
            console.error(error);
        });
    }, []);
    (0, react_1.useEffect)(function () {
        (0, statisticsApi_1.countActivePlayers)(cluster, "DAY", (0, dayjs_1.default)().startOf('month').valueOf(), (0, dayjs_1.default)().endOf('month').valueOf())
            .then(function (response) {
            var data = response.data;
            if (data.data.y1 !== null && data.data.y1 !== undefined) {
                var sum = data.data.y1.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0);
                setThisMonthUsers(sum);
            }
        })
            .catch(function (error) {
            console.error(error);
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { gutter: 16, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: (0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { children: (0, jsx_runtime_1.jsx)(antd_1.Statistic, { title: "\u4ECA\u65E5\u5728\u7EBF\u4EBA\u6570", value: thisDayUsers, precision: 0, valueStyle: {
                                color: '#2784ff',
                            } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: (0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { children: (0, jsx_runtime_1.jsx)(antd_1.Statistic, { title: "\u672C\u6708\u5728\u7EBF\u4EBA\u6570", value: thisMonthUsers, precision: 0, valueStyle: {
                                color: '#edc82d',
                            } }) }) })] }) }));
});
