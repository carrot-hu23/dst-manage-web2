"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var react_1 = __importStar(require("react"));
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var i18next_1 = __importDefault(require("i18next"));
var zh_CN_1 = __importDefault(require("antd/es/locale/zh_CN"));
var en_US_1 = __importDefault(require("antd/es/locale/en_US"));
var dstApi_1 = require("../../api/dstApi");
var home_1 = __importDefault(require("./home"));
var index_module_css_1 = __importDefault(require("./index.module.css"));
var SortWayEnum = {
    1: "降序",
    2: "升序",
};
var SortTypeEnum = {
    connected: "按照人数",
    name: "服务器名称",
    maxconnections: "人数上限",
    v: "游戏版本",
};
var PasswordEnum = {
    '-1': "任意",
    0: "不需要",
    1: "需要",
};
var WordEnum = {
    '-1': "任意",
    1: "单层",
    2: "双层",
    3: "多层",
};
var PlayerPercentEnum = {
    ">0": ">0",
    "<1": "<1",
};
var SeasonsEnum = {
    spring: "春天",
    summer: "夏天",
    autumn: "秋天",
    winter: "冬天",
};
var GameModEnum = {
    relaxed: "轻松",
    endless: "无尽",
    survival: "标准",
    wilderness: "荒野",
    lightsout: "永夜",
    lavaarena: "熔炉",
    quagmire: "暴食",
    OceanFishing: "海钓",
    starvingfloor: "闯关"
};
var DstServerList = function () {
    var currentLocale = i18next_1.default.language.startsWith('zh') ? zh_CN_1.default : en_US_1.default;
    var _a = (0, react_1.useState)([]), selectedRowKeys = _a[0], setSelectedRowKeys = _a[1];
    var onSelectChange = function (newSelectedRowKeys) {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
    };
    var hasSelected = selectedRowKeys.length > 0;
    var _b = (0, react_1.useState)(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    // 对话框的loading
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    // 房间信息
    var _d = (0, react_1.useState)({}), homeInfo = _d[0], setHomeInfo = _d[1];
    var handleOk = function () {
        setIsModalOpen(false);
    };
    var handleCancel = function () {
        setIsModalOpen(false);
        setLoading(true);
    };
    var viewHomeDetail = function (record) {
        console.log(record.__rowId);
        console.log(record.region);
        setIsModalOpen(true);
        (0, dstApi_1.dstHomeDetailApi)({
            rowId: record.__rowId,
            region: record.region
        }).then(function (response) {
            setLoading(false);
            var responseData = JSON.parse(response);
            var success = responseData.success;
            if (success) {
                setHomeInfo(responseData);
            }
            else {
                antd_1.message.warning("请求Klei服务器超时");
                setIsModalOpen(false);
            }
        });
    };
    var columns = [
        {
            title: '房间名',
            dataIndex: 'name',
            key: 'name',
            copyable: true,
            // ellipsis: true,
            width: 300,
            render: function (text, record) {
                return ((0, jsx_runtime_1.jsx)("div", { className: index_module_css_1.default.icon, children: record.name }));
            }
        },
        {
            title: '当前人数',
            key: 'maxconnections',
            valueEnum: PlayerPercentEnum,
            // eslint-disable-next-line no-unused-vars
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsxs)("div", { children: [record.connected, "/", record.maxconnections, (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 20, src: "./assets/dst/players.png" })] })); },
            sorter: function (a, b) { return b.connected - a.connected; },
            align: 'right '
        },
        {
            title: '排序',
            key: 'sort_way',
            dataIndex: 'sort_way',
            valueEnum: SortWayEnum,
            hideInTable: true,
            render: null,
        },
        {
            title: '排序方式',
            key: 'sort_type',
            dataIndex: 'sort_type',
            valueEnum: SortTypeEnum,
            hideInTable: true,
            render: null,
        },
        {
            title: '游戏模式',
            key: 'mode',
            valueEnum: GameModEnum,
            // eslint-disable-next-line no-unused-vars
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsx)("div", { children: record.mode })); },
        },
        {
            title: '季节',
            key: 'season',
            dataIndex: 'season',
            valueEnum: SeasonsEnum,
            // eslint-disable-next-line no-unused-vars
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsxs)("div", { children: [record.season === 'spring' && (
                    // <div>春季</div>
                    (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 28, src: "./assets/dst/spring.png" })), record.season === 'summer' && (
                    // <div>夏季</div>
                    (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 28, src: "./assets/dst/summer.png" })), record.season === 'autumn' && (
                    // <div>秋季</div>
                    (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 28, src: "./assets/dst/autumn.png" })), record.season === 'winter' && (
                    // <div>冬季</div>
                    (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 28, src: "./assets/dst/winter.png" }))] })); },
        },
        {
            disable: true,
            title: '密码',
            key: 'password',
            dataIndex: 'password',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueEnum: PasswordEnum,
            // eslint-disable-next-line no-unused-vars
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsx)("div", { children: record.password === 1 && ((0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 28, src: "./assets/dst/password.png" })
                // <LockOutlined />
                ) })); },
        },
        {
            disable: true,
            title: '模组',
            key: 'mod',
            dataIndex: 'mods',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: {
                "": {
                    key: '1115',
                    text: '任意',
                    status: -1,
                },
                "0": {
                    key: '1113',
                    text: '无模组',
                    status: 0,
                },
                "1": {
                    key: '1114',
                    text: '有模组',
                    status: 1,
                },
            },
            // eslint-disable-next-line no-unused-vars
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsx)("div", { children: record.mods === 1 && ((0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 28, src: "./assets/dst/mods.png" })
                // <LockOutlined />
                ) })); },
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: function (_, record) { return [
                // eslint-disable-next-line react/jsx-key
                ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: function () {
                            viewHomeDetail(record);
                        }, children: "\u67E5\u770B\u8BE6\u60C5" }, record.__rowId) }))
            ]; },
        },
    ];
    return ((0, jsx_runtime_1.jsx)(antd_1.ConfigProvider, { locale: currentLocale, children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, { getContainer: false, open: isModalOpen, footer: null, onOk: handleOk, onCancel: handleCancel, width: 800, children: (0, jsx_runtime_1.jsx)(antd_1.Skeleton, { title: true, loading: loading, active: true, children: (0, jsx_runtime_1.jsx)("div", { style: { height: 600 }, children: (0, jsx_runtime_1.jsx)(home_1.default, { home: homeInfo }) }) }) }), (0, jsx_runtime_1.jsx)(pro_components_1.ProTable, { columns: columns, 
                    // cardBordered
                    request: function () {
                        var args_1 = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args_1[_i] = arguments[_i];
                        }
                        return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (params, sort, filter) {
                            var msg;
                            if (params === void 0) { params = {}; }
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(sort, filter);
                                        console.log('params', params);
                                        return [4 /*yield*/, (0, dstApi_1.dstHomeListApi)(params)];
                                    case 1:
                                        msg = _a.sent();
                                        return [2 /*return*/, {
                                                data: msg.data,
                                                success: true,
                                                total: msg.total
                                            }];
                                }
                            });
                        });
                    }, scroll: {
                        x: 600,
                    }, rowKey: "__rowId", pagination: {
                        pageSize: 10,
                        onChange: function (page) { return console.log(page); },
                    }, headerTitle: "\u9965\u8352\u670D\u52A1\u5668\u5217\u8868", 
                    // toolBarRender={() => [
                    //     <Button key="button" type="primary" disabled={!hasSelected > 0}>
                    //         导出配置
                    //     </Button>,
                    // ]}
                    rowSelection: __assign({ type: 'radio' }, rowSelection), tableAlertRender: function (_a) {
                        var selectedRowKeys = _a.selectedRowKeys, selectedRows = _a.selectedRows, onCleanSelected = _a.onCleanSelected;
                        return false;
                    } })] }) }));
};
exports.default = DstServerList;
