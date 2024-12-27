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
var react_router_dom_1 = require("react-router-dom");
var react_1 = __importStar(require("react"));
var pro_components_1 = require("@ant-design/pro-components");
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var i18next_1 = __importDefault(require("i18next"));
var zh_CN_1 = __importDefault(require("antd/es/locale/zh_CN"));
var en_US_1 = __importDefault(require("antd/es/locale/en_US"));
var playerLogApi_jsx_1 = require("../../api/playerLogApi.jsx");
var dst_js_1 = require("../../utils/dst.js");
var playerApi_jsx_1 = require("../../api/playerApi.jsx");
var index_module_css_1 = __importDefault(require("../DstServerList2/index.module.css"));
var HiddenText_jsx_1 = __importDefault(require("../Home/HiddenText/HiddenText.jsx"));
var playerActionEnum = {
    "[LeaveAnnouncement]": '离开房间',
    "[JoinAnnouncement]": '加入房间',
    "[Say]": '聊天',
    "[DeathAnnouncement]": '死亡',
    "[ResurrectAnnouncement]": '复活',
};
exports.default = (function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var currentLocale = i18next_1.default.language.startsWith('zh') ? zh_CN_1.default : en_US_1.default;
    var actionRef = (0, react_1.useRef)();
    var _a = (0, react_1.useState)(1), currentPage = _a[0], setCurrentPage = _a[1];
    var _b = (0, react_1.useState)(10), pageSize = _b[0], setPageSize = _b[1];
    var _c = (0, react_1.useState)([]), data = _c[0], setData = _c[1];
    var _d = (0, react_1.useState)([]), selectedRowKeys = _d[0], setSelectedRowKeys = _d[1];
    var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: function (selectedRowKeys, selectedRows) {
            console.log("selectedRowKeys: ".concat(selectedRowKeys), 'selectedRows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        },
    };
    var columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            copyable: true,
            render: function (text, record) {
                return ((0, jsx_runtime_1.jsx)("div", { className: index_module_css_1.default.icon, children: record.name }));
            }
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            ellipsis: true,
            valueEnum: dst_js_1.dstRolesMap,
            // eslint-disable-next-line no-unused-vars
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 36.8, src: dst_js_1.dstRoles[record.role] || dst_js_1.dstRoles.mod }) })); }
        },
        {
            title: 'KuId',
            dataIndex: 'kuId',
            key: 'kuId',
            ellipsis: true,
            // <Text>{`${record.kuId.slice(0, 3)}***${record.kuId.slice(record.kuId.length - 2)}`}</Text>
            render: function (text, record, _, action) { return (0, jsx_runtime_1.jsx)(HiddenText_jsx_1.default, { text: record.kuId }); }
        },
        {
            title: 'SteamId',
            dataIndex: 'steamId',
            key: 'steamId',
            // ellipsis: true,
            align: 'left',
            // <span>{`${record.steamId.slice(0, 5)}***${record.steamId.slice(record.steamId.length - 2)}  `}</span>
            // eslint-disable-next-line no-unused-vars
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 4, children: [(0, jsx_runtime_1.jsx)(HiddenText_jsx_1.default, { text: record.steamId }), (0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://steamcommunity.com/profiles/".concat(record.steamId), style: {
                                background: 'url(./assets/dst/icon_button_normal.png)'
                            }, rel: "noreferrer", children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 22, src: './assets/dst/steam_btn.png' }) })] }) })); }
        },
        {
            title: 'Date',
            dataIndex: 'CreatedAt',
            key: 'CreatedAt',
            valueType: 'dateTime',
            search: false
        },
        {
            title: 'Ip',
            dataIndex: 'ip',
            key: 'ip',
            valueType: 'string',
            search: false,
            render: function (text, record, _, action) { return (0, jsx_runtime_1.jsx)(HiddenText_jsx_1.default, { text: record.ip }); }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            valueEnum: playerActionEnum,
            // eslint-disable-next-line no-unused-vars
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsxs)("div", { children: [record.action === '[JoinAnnouncement]' && (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "magenta", children: "\u52A0\u5165" }), record.action === '[LeaveAnnouncement]' && (0, jsx_runtime_1.jsx)(antd_1.Tag, { children: "\u79BB\u5F00" }), record.action === '[DeathAnnouncement]' && (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "red", children: "\u6B7B\u4EA1" }), record.action === '[ResurrectAnnouncement]' && (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "green", children: "\u590D\u6D3B" }), record.action === '[Say]' && (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: "gold", children: "\u804A\u5929" })] })); }
        },
        {
            title: 'ActionDesc',
            search: false,
            dataIndex: 'actionDesc',
            key: 'actionDesc',
            render: function (text, record) { return ((0, jsx_runtime_1.jsx)("div", { className: index_module_css_1.default.icon, style: { wordWrap: 'break-word', wordBreak: 'break-word' }, children: text })); },
        },
        {
            title: '操作',
            key: 'index',
            search: false,
            render: function (text, record, _, action) { return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: "\u662F\u5426\u62C9\u9ED1", onConfirm: function () {
                        (0, playerApi_jsx_1.addBlackListPlayerListApi)(cluster, [record.kuId])
                            .then(function (resp) {
                            if (resp.code === 200) {
                                antd_1.message.success("拉黑成功");
                            }
                        });
                    }, onCancel: function () {
                    }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', type: 'primary', danger: true, children: t('player.log.block') }) }) })); }
        },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.ConfigProvider, { locale: currentLocale, children: (0, jsx_runtime_1.jsx)(pro_components_1.ProTable, { scroll: {
                    x: 500,
                }, 
                // cardBordered
                columns: columns, actionRef: actionRef, rowSelection: rowSelection, request: function () {
                    var args_1 = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args_1[_i] = arguments[_i];
                    }
                    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (params, sort, filter) {
                        var resp;
                        if (params === void 0) { params = {}; }
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, playerLogApi_jsx_1.getPlayerLog)(cluster, params)];
                                case 1:
                                    resp = _a.sent();
                                    setData(resp.data);
                                    return [2 /*return*/, {
                                            data: resp.data.data,
                                            success: true,
                                            total: resp.data.total
                                        }];
                            }
                        });
                    });
                }, rowKey: "ID", pagination: {
                    current: currentPage,
                    pageSize: pageSize,
                    total: data.total,
                    onChange: setCurrentPage,
                    showSizeChanger: true,
                    onShowSizeChange: function (current, size) { return setPageSize(size); },
                    // pageSizeOptions: [5, 10, 20 ,50, 100]
                }, headerTitle: t('player.log.title'), toolBarRender: function () { return [
                    (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", danger: true, onClick: function () {
                            (0, playerLogApi_jsx_1.deleteLogs)("", {
                                ids: selectedRowKeys
                            }).then(function (resp) {
                                var _a;
                                if (resp.code === 200) {
                                    antd_1.message.success("删除成功");
                                    (_a = actionRef.current) === null || _a === void 0 ? void 0 : _a.reload();
                                }
                            });
                        }, children: t('player.log.delete') })
                ]; } }) }) }));
});
