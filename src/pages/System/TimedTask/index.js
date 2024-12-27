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
var antd_1 = require("antd");
var react_js_cron_1 = require("react-js-cron");
var react_router_dom_1 = require("react-router-dom");
var jobTaskApi_1 = require("../../../api/jobTaskApi");
var clusterLevelApi_1 = require("../../../api/clusterLevelApi");
var Option = antd_1.Select.Option;
var TextArea = antd_1.Input.TextArea;
var jobTaskEnum = {
    "backup": "备份存档",
    "update": "更新游戏",
    "start": "启动世界",
    "stop": "停止世界",
    "startGame": "启动所有世界",
    "stopGame": "停止所有世界",
    "restart": "重启世界",
    "regenerate": "重置世界",
    "script": "shell脚本"
};
exports.default = (function () {
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _a = (0, react_1.useState)(1), currentPage = _a[0], setCurrentPage = _a[1];
    var _b = (0, react_1.useState)(10), pageSize = _b[0], setPageSize = _b[1];
    var _c = (0, react_1.useState)([]), data = _c[0], setData = _c[1];
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    var dataSource = data.slice(startIndex, endIndex);
    var _d = (0, react_1.useState)(false), isOpenAddJobTask = _d[0], setIsOpenAddJobTask = _d[1];
    function getJobTaskList() {
        (0, jobTaskApi_1.getJobTaskListApi)("")
            .then(function (resp) {
            var data = resp.data;
            setData(data || []);
        });
    }
    (0, react_1.useEffect)(function () {
        getJobTaskList();
    }, []);
    var ShowAnnouncement = function (_a) {
        var announcement = _a.announcement;
        if (announcement === null || announcement === undefined) {
            announcement = "";
        }
        var list = announcement.split("\n");
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: list.map(function (item) { return ((0, jsx_runtime_1.jsx)("div", { children: item })); }) }));
    };
    var columns = [
        {
            title: '世界',
            dataIndex: 'levelName',
            key: 'levelName',
        },
        {
            title: 'jobId',
            dataIndex: 'jobId',
            key: 'jobId',
        },
        {
            title: 'corn 表达式',
            dataIndex: 'cron',
            key: 'cron',
        },
        {
            title: '上一次执行时间',
            dataIndex: 'prev',
            key: 'prev',
            render: function (text, record) { return ((0, jsx_runtime_1.jsx)("span", { children: new Date(record.prev).toLocaleString() })); },
        },
        {
            title: '下一次执行时间',
            dataIndex: 'next',
            key: 'next',
            render: function (text, record) { return ((0, jsx_runtime_1.jsx)("span", { children: new Date(record.next).toLocaleString() })); },
        },
        {
            title: '是否有效',
            dataIndex: 'valid',
            key: 'valid',
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [record.valid && (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "green", children: "\u751F\u6548\u4E2D" }), !record.valid && (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "purple", children: "\u5DF2\u5931\u6548" })] })); }
        },
        {
            title: '备注',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: '公告',
            dataIndex: 'announcement',
            key: 'announcement',
            render: function (text, record, _, action) { return (0, jsx_runtime_1.jsx)(ShowAnnouncement, { announcement: record.announcement }); }
        },
        {
            title: '类型',
            dataIndex: 'category',
            key: 'category',
            render: function (text, record, _, action) { return (0, jsx_runtime_1.jsx)(antd_1.Tag, { children: jobTaskEnum[record.category] }); }
        },
        {
            title: '操作',
            key: 'action',
            render: function (_, record) { return ((0, jsx_runtime_1.jsx)(antd_1.Space, { size: "middle", children: (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: "\u5220\u9664\u5B9A\u65F6\u4EFB\u52A1", description: "Are you sure to delete this job task?", onConfirm: function () {
                        (0, jobTaskApi_1.deleteJobTaskApi)("", record.jobId)
                            .then(function (resp) {
                            if (resp.code !== 200) {
                                antd_1.message.error("删除定时任务失败");
                            }
                            else {
                                antd_1.message.success("删除定时任务成功");
                                getJobTaskList();
                            }
                        });
                    }, onCancel: function () {
                    }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", danger: true, children: "\u5220\u9664" }) }) })); },
        },
    ];
    var AddJobTaskModal = function (_a) {
        var isModalOpen = _a.isModalOpen, setIsModalOpen = _a.setIsModalOpen;
        var _b = (0, react_1.useState)([]), levels = _b[0], setLevels = _b[1];
        (0, react_1.useEffect)(function () {
            (0, clusterLevelApi_1.getLevelListApi)()
                .then(function (resp) {
                if (resp.code === 200) {
                    var levels_1 = resp.data;
                    setLevels(levels_1);
                }
            });
        }, []);
        var onChange = function (time, timeString) {
            console.log(time, timeString);
            var converted = react_js_cron_1.converter.getCronStringFromValues('day', // period: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'reboot'
            [], // months: number[] | undefined
            [], // monthDays: number[] | undefined
            [], // weekDays: number[] | undefined
            [time.$H], // hours: number[] | undefined
            [time.$m], // minutes: number[] | undefined
            false // humanizeValue?: boolean
            );
            console.log('cron string:', converted);
        };
        var form = antd_1.Form.useForm()[0];
        var handleOk = function () {
            form.validateFields().then(function () {
                setIsModalOpen(false);
            }).catch(function (err) {
                // 验证不通过时进入
                antd_1.message.error(err.errorFields[0].errors[0]);
            });
            var data = form.getFieldsValue();
            if (activeTab === '默认') {
                data.cron = react_js_cron_1.converter.getCronStringFromValues('day', // period: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'reboot'
                [], // months: number[] | undefined
                [], // monthDays: number[] | undefined
                [], // weekDays: number[] | undefined
                [data.date.$H], // hours: number[] | undefined
                [data.date.$m], // minutes: number[] | undefined
                false // humanizeValue?: boolean
                );
            }
            console.log(data);
            // eslint-disable-next-line no-restricted-syntax
            for (var _i = 0, levels_2 = levels; _i < levels_2.length; _i++) {
                var level = levels_2[_i];
                if (level.uuid === data.levelName) {
                    data.uuid = level.uuid;
                    data.levelName = level.levelName;
                }
            }
            (0, jobTaskApi_1.addJobTaskApi)("", data).then((function (response) {
                if (response.code !== 200) {
                    antd_1.message.error("创建定时任务失败");
                }
                getJobTaskList();
                antd_1.message.success("创建定时任务成功");
            })).catch(function (err) { return console.log(err); });
        };
        var _c = (0, react_1.useState)('默认'), activeTab = _c[0], setActiveTab = _c[1];
        var handleTabChange = function (value) {
            setActiveTab(value);
        };
        return ((0, jsx_runtime_1.jsxs)(antd_1.Modal, { title: "创建任务", open: isModalOpen, onOk: handleOk, onCancel: function () { return setIsModalOpen(false); }, children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { message: "[启动所有世界] [关闭所有世界] [备份存档] [重置世界] 这几个选择世界是没有用的，是针对所有世界的，[启动所有世界]: 先关闭，在启动（可以当作重启）", type: "warning", showIcon: true, closable: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, layout: "horizontal", labelCol: {
                        span: 6,
                    }, initialValues: {
                        times: 1,
                        sleep: 5
                    }, children: [(0, jsx_runtime_1.jsx)(antd_1.Segmented, { block: true, value: activeTab, onChange: handleTabChange, options: ['默认', '自定义'] }), (0, jsx_runtime_1.jsx)("br", {}), activeTab === '默认' && (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "时间", name: 'date', rules: [{ required: true, message: '请选择时间', },], children: (0, jsx_runtime_1.jsx)(antd_1.TimePicker, { onChange: onChange, format: 'HH:mm' }) }) }), activeTab === '自定义' && (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "corn表达式", name: 'cron', rules: [{ required: true, message: '请输入corn表达式', },], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165corn\u8868\u8FBE\u5F0F\uFF08\u4E94\u4F4D\uFF09" }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "类型", name: 'category', rules: [{ required: true, message: '请选择类型', },], children: (0, jsx_runtime_1.jsxs)(antd_1.Select, { children: [(0, jsx_runtime_1.jsx)(Option, { value: "startGame", children: "\u542F\u52A8\u6240\u6709\u4E16\u754C" }), (0, jsx_runtime_1.jsx)(Option, { value: "stopGame", children: "\u5173\u95ED\u6240\u6709\u4E16\u754C" }), (0, jsx_runtime_1.jsx)(Option, { value: "backup", children: "\u5907\u4EFD\u5B58\u6863" }), (0, jsx_runtime_1.jsx)(Option, { value: "update", children: "\u66F4\u65B0\u6E38\u620F" }), (0, jsx_runtime_1.jsx)(Option, { value: "start", children: "\u542F\u52A8\u4E16\u754C" }), (0, jsx_runtime_1.jsx)(Option, { value: "stop", children: "\u505C\u6B62\u4E16\u754C" }), (0, jsx_runtime_1.jsx)(Option, { value: "regenerate", children: "\u91CD\u7F6E\u4E16\u754C" })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "世界", name: 'levelName', rules: [{ required: true, message: '请选择世界', },], children: (0, jsx_runtime_1.jsx)(antd_1.Select, { children: levels.map(function (item, index) {
                                    return (0, jsx_runtime_1.jsx)(Option, { value: item.uuid, children: item.levelName }, index);
                                }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "备注", name: 'comment', children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u5907\u6CE8" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "公告", name: 'announcement', children: (0, jsx_runtime_1.jsx)(TextArea, { rows: 6, placeholder: "\u8BF7\u8F93\u5165\u516C\u544A\u3002tips: \u53D1\u9001\u516C\u544A\u540E\uFF0C\u9ED8\u8BA4 5s \u540E\u5C06\u6267\u884C\u64CD\u4F5C" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "延迟", name: 'sleep', children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { addonAfter: "\u79D2", style: { width: 120, }, placeholder: "\u8BBE\u7F6E\u591A\u5C11\u79D2\u540E\u6267\u884C" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "公告次数", name: 'times', children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { addonAfter: "\u6B21", style: { width: 120, }, placeholder: "\u516C\u544A\u6B21\u6570" }) })] })] }));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 16, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { setIsOpenAddJobTask(true); }, children: "\u521B\u5EFA\u5B9A\u65F6\u4EFB\u52A1" }), (0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://cron.qqe2.com", rel: "noreferrer", children: "\u5728\u7EBF corn \u7F51\u7AD9" })] }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Table, { scroll: {
                    x: 600,
                }, columns: columns, dataSource: dataSource, pagination: {
                    current: currentPage,
                    pageSize: pageSize,
                    total: data.length,
                    onChange: setCurrentPage,
                    showSizeChanger: true,
                    onShowSizeChange: function (current, size) { return setPageSize(size); },
                } }), (0, jsx_runtime_1.jsx)(AddJobTaskModal, { isModalOpen: isOpenAddJobTask, setIsModalOpen: setIsOpenAddJobTask })] }));
});
