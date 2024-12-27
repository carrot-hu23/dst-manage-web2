"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react/prop-types */
var react_1 = require("react");
var antd_1 = require("antd");
function checkDefault(defaultValue1, defaultValue2) {
    if (defaultValue1 === undefined || defaultValue2 === null) {
        return true;
    }
    return defaultValue1 === defaultValue2;
}
function Select3(_a) {
    var item = _a.item, defaultValue = _a.defaultValue;
    // console.log("label: ", item.label, "name: ", item.name,"defaultValue: ", defaultValue)
    var _b = (0, react_1.useState)(checkDefault(defaultValue, item.default)), isDefault = _b[0], setIsDefault = _b[1];
    (0, react_1.useEffect)(function () {
    }, []);
    return (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: item.label, name: item.name, children: (0, jsx_runtime_1.jsx)(antd_1.Select, { className: isDefault ? '' : 'selected', defaultValue: defaultValue === undefined ? item.default : defaultValue, style: {
                width: 120,
            }, onChange: function (value) {
                setIsDefault(value === item.default);
            }, options: item === null || item === void 0 ? void 0 : item.options.map(function (option) { return ({
                value: option.data,
                label: option.description,
            }); }) }) }, item.label + item.name);
}
exports.default = Select3;
