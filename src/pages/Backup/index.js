"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var BackupList_1 = __importDefault(require("./BackupList"));
var SnapshotBackup_1 = __importDefault(require("./SnapshotBackup"));
exports.default = (function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var items = [
        {
            key: '1',
            label: t("backup.BackupList"),
            children: (0, jsx_runtime_1.jsx)(BackupList_1.default, {}),
        },
        {
            key: '2',
            label: t("backup.SnapshotBackup"),
            children: (0, jsx_runtime_1.jsx)(SnapshotBackup_1.default, {}),
        },
    ];
    return ((0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: "1", items: items }));
});
