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
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var antd_1 = require("antd");
var backupApi_1 = require("../../../api/backupApi");
exports.default = (function () {
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var t = (0, react_i18next_1.useTranslation)().t;
    var form = antd_1.Form.useForm()[0];
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        (0, backupApi_1.getBackupSnapshotsSettingApi)(cluster)
            .then(function (resp) {
            if (resp.code === 200) {
                if (resp.data.interval === 0) {
                    resp.data.interval = 36;
                }
                if (resp.data.maxSnapshots === 0) {
                    resp.data.maxSnapshots = 6;
                }
                form.setFieldsValue(resp.data);
            }
            else {
                antd_1.message.error("获取失败");
            }
            setLoading(false);
        });
    }, []);
    function save() {
        (0, backupApi_1.saveBackupSnapshotsSettingApi)(cluster, form.getFieldsValue())
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success(t('backup.save.ok'));
            }
            else {
                antd_1.message.error(t('backup.save.error'));
            }
        });
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { message: t('backup.tips2'), type: "warning", showIcon: true, closable: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: t('backup.tips3'), type: "info", showIcon: true, closable: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, labelCol: {
                        span: 3,
                    }, initialValues: {
                        interval: 36,
                        maxSnapshots: 8,
                    }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('backup.snapshotBackup.enable'), name: 'enable', valuePropName: "checked", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close') }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('backup.snapshotBackup.c_save()'), name: 'isCSave', tooltip: "开启后，每次创建备份时，都会先存档，但这可能会导致卡顿等情况", valuePropName: "checked", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close') }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('backup.snapshotBackup.interval'), name: 'interval', children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { addonAfter: t('backup.snapshotBackup.interval.minute'), style: { width: 120, }, min: 1, placeholder: "\u68C0\u6D4B\u95F4\u9694\u65F6\u95F4" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('backup.snapshotBackup.maxSnapshots'), name: 'maxSnapshots', children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { style: { width: 120, }, min: 1, placeholder: "\u5FEB\u7167\u6570\u91CF" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t("backup.snapshotBackup.action"), children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: function () {
                                    save();
                                }, children: t("backup.save") }) })] }) })] }));
});
