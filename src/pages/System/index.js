"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var DstConfigSetting_1 = __importDefault(require("./DstConfigSetting"));
var TimedTask_1 = __importDefault(require("./TimedTask"));
var WebLinkSetting_1 = __importDefault(require("./WebLinkSetting"));
var AutoGameUpdate_1 = __importDefault(require("./AutoGameUpdate"));
var AutoGameDown_1 = __importDefault(require("./AutoGameDown"));
var AutoModUpdate_1 = __importDefault(require("./AutoModUpdate"));
var System = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var items = [
        {
            key: '1',
            label: t('setting.dstConfig'),
            children: (0, jsx_runtime_1.jsx)(DstConfigSetting_1.default, {}),
        },
        {
            key: '2',
            label: t('setting.timedTask'),
            children: (0, jsx_runtime_1.jsx)(TimedTask_1.default, {}),
        },
        {
            key: '3',
            label: t('setting.autoGameUpdate'),
            children: (0, jsx_runtime_1.jsx)(AutoGameUpdate_1.default, {}),
        },
        {
            key: '4',
            label: t('setting.autoGameDown'),
            children: (0, jsx_runtime_1.jsx)(AutoGameDown_1.default, {}),
        },
        {
            key: '5',
            label: t('setting.autoModUpdate'),
            children: (0, jsx_runtime_1.jsx)(AutoModUpdate_1.default, {}),
        },
        {
            key: '7',
            label: t('setting.webLinkSetting'),
            children: (0, jsx_runtime_1.jsx)(WebLinkSetting_1.default, {}),
        },
    ];
    return ((0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: "1", items: items }));
};
exports.default = System;
