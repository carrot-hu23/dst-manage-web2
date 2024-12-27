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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var icons_1 = require("@ant-design/icons");
var axios_1 = __importDefault(require("axios"));
var react_i18next_1 = require("react-i18next");
var backupApi_1 = require("../../../api/backupApi");
var Statistic_1 = __importDefault(require("./Statistic"));
var CreateBackUpBtn_1 = __importDefault(require("../../Panel/OpBtnGroup/CreateBackUpBtn"));
var MyUploadFile = function (_a) {
    var reload = _a.reload;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _b = (0, react_1.useState)([]), fileList = _b[0], setFileList = _b[1];
    var _c = (0, react_1.useState)(false), uploading = _c[0], setUploading = _c[1];
    var handleUpload = function () {
        var formData = new FormData();
        fileList.forEach(function (file) {
            formData.append('file', file);
        });
        setUploading(true);
        // 发送上传请求
        // 这里使用了axios库，你可以使用你喜欢的库
        axios_1.default.post('/api/game/backup/upload', formData)
            .then(function (response) {
            var _a;
            console.log(response.data);
            if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.code) === 200) {
                antd_1.message.success("上传成功");
            }
            setFileList([]);
            setUploading(false);
            reload();
        })
            .catch(function (error) {
            console.log(error);
            setUploading(false);
        });
    };
    var handleRemove = function (file) {
        var index = fileList.indexOf(file);
        var newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };
    var handleBeforeUpload = function (file) {
        setFileList(__spreadArray(__spreadArray([], fileList, true), [file], false));
        return false;
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Upload, { fileList: fileList, beforeUpload: handleBeforeUpload, onRemove: handleRemove, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)(icons_1.UploadOutlined, {}), children: t('backup.select.File') }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: handleUpload, disabled: fileList.length === 0 || uploading, loading: uploading, children: uploading ? t('backup.uploading') : t('backup.upload') })] }) }));
};
var Backup = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var actionRef = (0, react_1.useRef)();
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    // 选中的备份文件
    var _b = (0, react_1.useState)({}), selectBackup = _b[0], setSelectBackup = _b[1];
    var _c = (0, react_1.useState)([]), selectedRowKeys = _c[0], setSelectedRowKeys = _c[1];
    var _d = (0, react_1.useState)([]), backupData = _d[0], setBackupData = _d[1];
    var _e = (0, react_1.useState)(false), isDeleteModalOpen = _e[0], setIsDeleteModalOpen = _e[1];
    var _f = (0, react_1.useState)(false), isEditModalOpen = _f[0], setIsEditModalOpen = _f[1];
    var _g = (0, react_1.useState)({}), deleteBackup = _g[0], setDeleteBackup = _g[1];
    var _h = (0, react_1.useState)(false), confirmLoading = _h[0], setConfirmLoading = _h[1];
    var inputRef = (0, react_1.useRef)("");
    var updateBackupData = function () {
        (0, backupApi_1.getBackupApi)(cluster)
            .then(function (data) {
            var backupList = data.data || [];
            // eslint-disable-next-line no-plusplus
            for (var i = 0; i < backupList.length; i++) {
                backupList[i].key = i;
            }
            backupList.sort(function (a, b) {
                return b.createTime < a.createTime ? -1 : 1;
            });
            setBackupData(backupList);
            setData(backupList);
            setLoading(false);
        });
    };
    (0, react_1.useEffect)(function () {
        updateBackupData();
    }, []);
    var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: function (selectedRowKeys, selectedRows) {
            console.log("selectedRowKeys: ".concat(selectedRowKeys), 'selectedRows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys);
            setSelectBackup(selectedRows);
        },
    };
    var deleteSelectBackup = function () {
        var length = selectBackup.length;
        if (length < 1) {
            antd_1.message.warning("请选择存档");
            return;
        }
        var fileNames = selectBackup.map(function (item) { return item.fileName; });
        (0, backupApi_1.deleteBackupApi)(cluster, fileNames)
            .then(function (data) {
            console.log(data);
            antd_1.message.success(t("backup.delete.ok"));
            setSelectBackup([]);
            setSelectedRowKeys([]);
            updateBackupData();
        });
    };
    var deletBackupItem = function (value) {
        setConfirmLoading(true);
        var oldBackupData = backupData;
        var newBackupData = oldBackupData.filter(function (item) { return value.key !== item.key; });
        var newData = data.filter(function (item) { return value.key !== item.key; });
        (0, backupApi_1.deleteBackupApi)(cluster, [value.fileName])
            .then(function (data) {
            if (data.code === 200) {
                setTimeout(function () {
                    antd_1.message.success(t("backup.delete.ok"));
                    setConfirmLoading(false);
                    setIsDeleteModalOpen(false);
                    setBackupData(newBackupData);
                    setData(newData);
                }, 100);
            }
        });
    };
    var renameBackupItem = function (value) {
        setConfirmLoading(true);
        var data = {
            fileName: value.fileName,
            newName: "".concat(inputRef.current.input.value, ".zip")
        };
        (0, backupApi_1.renameBackupApi)(cluster, data)
            .then(function (data) {
            if (data.code === 200) {
                setTimeout(function () {
                    antd_1.message.success(t("backup.rename.ok"));
                    updateBackupData();
                }, 1000);
            }
        }).catch(function (error) {
            antd_1.message.error(t("backup.rename.error"));
        }).finally(function () {
            setConfirmLoading(false);
            setIsEditModalOpen(false);
        });
    };
    var restoreArchive = function (fileName) {
        (0, backupApi_1.restoreBackupApi)(cluster, fileName)
            .then(function (data) {
            if (data.code === 200) {
                antd_1.message.success(t("backup.restore.ok"));
            }
        }).catch(function (error) {
            console.log(error);
            antd_1.message.error(t("backup.restore.error"));
        });
    };
    var columns = [
        {
            title: t('backup.fileName'),
            dataIndex: 'fileName',
            key: 'fileName',
            render: function (text) { return (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", children: text }); },
            editable: true,
        },
        {
            title: t('backup.fileSize'),
            dataIndex: 'fileSize',
            key: 'fileSize',
            render: function (fileSize) { return (0, jsx_runtime_1.jsx)("span", { children: "".concat((fileSize / 1024 / 1024).toFixed(2), " MB") }); },
            sorter: function (a, b) { return b.fileSize - a.fileSize; },
        },
        {
            title: t('backup.createTime'),
            dataIndex: 'createTime',
            key: 'createTime',
            render: function (createTime) { return (0, jsx_runtime_1.jsx)("span", { children: new Date(createTime).toLocaleString() }); },
            sorter: function (a, b) { return b.createTime - a.createTime; },
        },
        {
            title: t('backup.action'),
            key: 'action',
            render: function (_, record) { return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { size: "middle", children: [(0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: t('backup.restore.title'), description: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: t('backup.restore.desc') }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(CreateBackUpBtn_1.default, {})] }), onConfirm: function () {
                            restoreArchive(record.fileName);
                        }, onCancel: function () {
                        }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", children: t('backup.restore') }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: function () {
                            setIsEditModalOpen(true);
                            setDeleteBackup(record);
                        }, children: t('backup.edit') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: function () {
                            window.location.href = "/api/game/backup/download?fileName=".concat(record.fileName);
                        }, children: t('backup.download') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", danger: true, onClick: function () {
                            setIsDeleteModalOpen(true);
                            setDeleteBackup(record);
                        }, children: t('backup.delete') })] })); },
        },
    ];
    var HeaderTitle = function () { return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { wrap: true, children: [(0, jsx_runtime_1.jsx)(MyUploadFile, { reload: updateBackupData }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", danger: true, onClick: deleteSelectBackup, children: t('backup.delete') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: updateBackupData, children: t('backup.refresh') }), (0, jsx_runtime_1.jsx)(CreateBackUpBtn_1.default, {})] })); };
    var EditModal = function () { return ((0, jsx_runtime_1.jsxs)(antd_1.Modal, { title: t('backup.edit.title'), open: isEditModalOpen, confirmLoading: confirmLoading, getContainer: false, onOk: function () {
            renameBackupItem(deleteBackup);
        }, onCancel: function () {
            setIsEditModalOpen(false);
        }, children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("div", { children: [t('backup.cur.filename'), ": "] }), (0, jsx_runtime_1.jsx)("div", { children: deleteBackup.fileName }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, placeholder: t('backup.newBackupName'), ref: inputRef })] })); };
    var DeletetModal = function () { return ((0, jsx_runtime_1.jsxs)(antd_1.Modal, { title: t('backup.delete.title'), open: isDeleteModalOpen, confirmLoading: confirmLoading, getContainer: false, onOk: function () {
            deletBackupItem(deleteBackup);
        }, onCancel: function () {
            setIsDeleteModalOpen(false);
        }, children: [(0, jsx_runtime_1.jsx)("p", { children: t('backup.cur.filename') }), (0, jsx_runtime_1.jsx)("p", { children: deleteBackup.fileName || "" })] })); };
    var backupDataSize = (backupData
        .map(function (backup) { return backup.fileSize; })
        // eslint-disable-next-line no-restricted-globals
        .reduce(function (prev, curr) { return !isNaN(Number(curr)) ? prev + curr : prev; }, 0) / 1024 / 1024 / 1024).toFixed(4);
    var _j = (0, react_1.useState)(1), currentPage = _j[0], setCurrentPage = _j[1];
    var _k = (0, react_1.useState)(10), pageSize = _k[0], setPageSize = _k[1];
    var _l = (0, react_1.useState)([]), data = _l[0], setData = _l[1];
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var dataSource = data.slice(startIndex, endIndex);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(DeletetModal, {}), (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: "Tips: ".concat(t('backup.tips1')), type: "info", showIcon: true }), (0, jsx_runtime_1.jsx)(Statistic_1.default, { size: backupData.length, data: backupDataSize }), (0, jsx_runtime_1.jsx)(HeaderTitle, {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Table, { ref: actionRef, rowSelection: rowSelection, scroll: {
                    x: 600,
                }, columns: columns, dataSource: dataSource, pagination: {
                    current: currentPage,
                    pageSize: pageSize,
                    total: data.length,
                    onChange: setCurrentPage,
                    showSizeChanger: true,
                    onShowSizeChange: function (current, size) { return setPageSize(size); },
                } }), (0, jsx_runtime_1.jsx)(EditModal, {})] }));
};
exports.default = Backup;
