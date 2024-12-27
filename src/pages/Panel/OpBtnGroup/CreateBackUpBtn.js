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
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var backupApi_1 = require("../../../api/backupApi");
exports.default = (function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var _a = (0, react_1.useState)(false), createBackupStatus = _a[0], setCreateBackupStatus = _a[1];
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var createBackupOnClick = function () {
        setCreateBackupStatus(true);
        (0, backupApi_1.createBackupApi)(cluster)
            .then(function (response) {
            if (response.code === 200) {
                antd_1.message.success(t('panel.backup.success'));
            }
            else {
                antd_1.message.warning(t('panel.backup.error'));
            }
            setCreateBackupStatus(false);
        })
            .catch(function (error) {
            console.log(error);
            setCreateBackupStatus(false);
        });
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: function () {
                createBackupOnClick();
            }, loading: createBackupStatus, children: t('panel.backup.create') }) }));
});
