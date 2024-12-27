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
var react_i18next_1 = require("react-i18next");
var gameApi_1 = require("../../../api/gameApi");
var modApi_1 = require("../../../api/modApi");
var CreateBackUpBtn_1 = __importDefault(require("./CreateBackUpBtn"));
exports.default = (function () {
    var _a = (0, react_1.useState)(false), updateGameStatus = _a[0], setUpdateStatus = _a[1];
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    var t = (0, react_i18next_1.useTranslation)().t;
    var updateGameOnclick = function () {
        antd_1.message.success(t('panel.updating.game'));
        setUpdateStatus(true);
        (0, gameApi_1.updateGameApi)(cluster)
            .then(function (response) {
            if (response.code === 200) {
                antd_1.message.success(t('panel.update.success'));
            }
            else {
                antd_1.message.warning("".concat(response.msg));
                antd_1.message.warning(t('panel.update.error'));
            }
            setUpdateStatus(false);
        })
            .catch(function (error) {
            console.log(error);
            setUpdateStatus(false);
        });
    };
    function deleteStepupWorkshop() {
        (0, modApi_1.deleteStepupWorkshopApi)()
            .then(function (data) {
            if (data.code === 200) {
                antd_1.message.success("更新模组成功，请重启房间");
            }
            else {
                antd_1.message.warning("更新模组失败");
            }
            setOpen(false);
        });
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 24, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", style: {
                        backgroundColor: 'rgb(82, 196, 26)'
                    }, onClick: function () {
                        updateGameOnclick();
                    }, loading: updateGameStatus, children: t('panel.updateGame') }), (0, jsx_runtime_1.jsx)(CreateBackUpBtn_1.default, {})] }) });
});
var ArchiveList = function () {
    var _a = (0, react_1.useState)(false), open = _a[0], setOpen = _a[1];
    var showDrawer = function () {
        setOpen(true);
    };
    var onClose = function () {
        setOpen(false);
    };
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: showDrawer, children: t('Archive') }), (0, jsx_runtime_1.jsx)(antd_1.Drawer, { title: "\u5B58\u6863\u5217\u8868", onClose: onClose, open: open, children: (0, jsx_runtime_1.jsx)(antd_1.Alert, { style: { marginBottom: '12px' }, message: "\u5728\u8FD9\u91CC\u53EF\u4EE5\u4E0A\u4F20\u81EA\u5DF1\u7684\u5B58\u6863(\u53EA\u652F\u6301zip\u538B\u7F29\u683C\u5F0F)\uFF0C\u4E5F\u53EF\u4EE5\u6062\u590D\u5B58\u6863\uFF0C\u70B9\u51FB\u4E0A\u4F20\u5B58\u6863\u540E\uFF0C\u5728\u70B9\u51FB\u6062\u590D\u5B58\u6863\uFF0C\u5237\u65B0\u9875\u9762", type: "warning", showIcon: true }) })] }));
};
