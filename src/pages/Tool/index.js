"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var Assembly_1 = __importDefault(require("./Assembly"));
var Preinstall_1 = __importDefault(require("./Preinstall"));
exports.default = (function () {
    var items = [
        {
            label: '多层选择器',
            children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Assembly_1.default, {}) }),
            key: '1',
        },
        {
            label: '预设模板',
            children: (0, jsx_runtime_1.jsx)(Preinstall_1.default, {}),
            key: '2',
            forceRender: true,
        },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items }) }));
});
