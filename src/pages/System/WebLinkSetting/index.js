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
var WebLinkApi_1 = require("../../../api/WebLinkApi");
exports.default = (function () {
    var _a = (0, react_1.useState)(1), currentPage = _a[0], setCurrentPage = _a[1];
    var _b = (0, react_1.useState)(10), pageSize = _b[0], setPageSize = _b[1];
    var _c = (0, react_1.useState)([]), data = _c[0], setData = _c[1];
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var dataSource = data.slice(startIndex, endIndex);
    var _d = (0, react_1.useState)(false), isOpenAddJobTask = _d[0], setIsOpenAddJobTask = _d[1];
    function getJobTaskList() {
        (0, WebLinkApi_1.getWebLinkListApi)("")
            .then(function (resp) {
            setData(resp.data || []);
        });
    }
    (0, react_1.useEffect)(function () {
        getJobTaskList();
    }, []);
    var columns = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'url',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: 'width',
            dataIndex: 'width',
            key: 'width',
        },
        {
            title: 'height',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: '操作',
            key: 'action',
            render: function (_, record) { return ((0, jsx_runtime_1.jsx)(antd_1.Space, { size: "middle", children: (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: "\u5220\u9664\u94FE\u63A5", description: "Are you sure to delete this job task?", onConfirm: function () {
                        (0, WebLinkApi_1.deleteWebLinkApi)("", record.ID)
                            .then(function (resp) {
                            if (resp.code !== 200) {
                                antd_1.message.error("删除链接失败");
                            }
                            else {
                                antd_1.message.success("删除链接成功");
                                getJobTaskList();
                            }
                        });
                    }, onCancel: function () {
                    }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", danger: true, children: "\u5220\u9664" }) }) })); },
        },
    ];
    var AddWebLinkModal = function (_a) {
        var isModalOpen = _a.isModalOpen, setIsModalOpen = _a.setIsModalOpen;
        var form = antd_1.Form.useForm()[0];
        var handleOk = function () {
            form.validateFields().then(function () {
                setIsModalOpen(false);
            }).catch(function (err) {
                // 验证不通过时进入
                antd_1.message.error(err.errorFields[0].errors[0]);
            });
            var data = form.getFieldsValue();
            (0, WebLinkApi_1.addWebLinkApi)("", data).then((function (response) {
                if (response.code !== 200) {
                    antd_1.message.error("创建web链接失败");
                }
                getJobTaskList();
                antd_1.message.success("创建web链接成功");
            })).catch(function (err) { return console.log(err); });
        };
        return ((0, jsx_runtime_1.jsx)(antd_1.Modal, { title: "创建链接", open: isModalOpen, onOk: handleOk, onCancel: function () { return setIsModalOpen(false); }, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, layout: "horizontal", labelCol: {
                    span: 6,
                }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "标题", name: 'title', rules: [{ required: true, message: '请输入标题', },], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u9898" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "url", name: 'url', rules: [{ required: true, message: '请输入url', },], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165url" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "width", name: 'width', rules: [{ required: true, message: '请输入width', },], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165width" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "height", name: 'height', rules: [{ required: true, message: '请输入height', },], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165height" }) })] }) }));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { size: 16, wrap: true, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () {
                            setIsOpenAddJobTask(true);
                        }, children: "\u6DFB\u52A0\u5916\u90E8\u94FE\u63A5\u7F51\u7AD9" }) }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Table, { scroll: {
                    x: 600,
                }, columns: columns, dataSource: dataSource, pagination: {
                    current: currentPage,
                    pageSize: pageSize,
                    total: data.length,
                    onChange: setCurrentPage,
                    showSizeChanger: true,
                    onShowSizeChange: function (current, size) { return setPageSize(size); },
                } }), (0, jsx_runtime_1.jsx)(AddWebLinkModal, { isModalOpen: isOpenAddJobTask, setIsModalOpen: setIsOpenAddJobTask })] }));
});
