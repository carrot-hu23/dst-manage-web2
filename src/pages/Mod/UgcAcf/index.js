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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var antd_1 = require("antd");
var modApi_1 = require("../../../api/modApi");
var _8level_1 = require("../../../api/level.jsx");
var dateUitls_1 = require("../../../utils/dateUitls");
exports.default = (function () {
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _a = (0, react_1.useState)([]), acfworkshops = _a[0], setAcfworkshops = _a[1];
    var _b = (0, react_1.useState)(["Master"]), levels = _b[0], setLevels = _b[1];
    var notHasLevels = levels === undefined || levels === null || levels.length === 0;
    var _c = (0, react_1.useState)(notHasLevels ? "" : levels[0]), levelName = _c[0], setLevelName = _c[1];
    var _d = (0, react_1.useState)(false), spin = _d[0], setSpin = _d[1];
    var _e = (0, react_1.useState)(false), loading = _e[0], setLoading = _e[1];
    function init() {
        return __awaiter(this, void 0, void 0, function () {
            var levelStatusResp, levels_1, items_1, UgcModAcfResp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, (0, _8level_1.getLevelStatusApi)()];
                    case 1:
                        levelStatusResp = _a.sent();
                        if (levelStatusResp.code === 200) {
                            levels_1 = levelStatusResp.data;
                            items_1 = [];
                            levels_1.forEach(function (level) {
                                var item = {
                                    key: level.uuid,
                                    uuid: level.uuid,
                                    levelName: level.levelName,
                                };
                                items_1.push(item);
                            });
                            setLevels(items_1);
                        }
                        return [4 /*yield*/, (0, modApi_1.getUgcModAcfApi)(cluster, levelName)];
                    case 2:
                        UgcModAcfResp = _a.sent();
                        if (UgcModAcfResp.code === 200) {
                            setAcfworkshops(UgcModAcfResp.data);
                        }
                        else {
                            antd_1.message.error("获取数据失败");
                        }
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    function queryAcf() {
        setSpin(true);
        (0, modApi_1.getUgcModAcfApi)(cluster, levelName)
            .then(function (resp) {
            if (resp.code === 200) {
                setAcfworkshops(resp.data);
            }
            else {
                antd_1.message.error("获取失败");
            }
            setSpin(false);
        });
    }
    (0, react_1.useEffect)(function () {
        init();
    }, []);
    var handleChange = function (value) {
        console.log(value);
        setLevelName(value);
    };
    var columns = [
        {
            title: '模组图片',
            dataIndex: 'img',
            key: 'img',
            render: function (_, record) { return ((0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 48, src: record.img })); },
        },
        {
            title: '模组名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '模组id',
            dataIndex: 'workshopId',
            key: 'workshopId',
            render: function (_, record) { return ((0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://steamcommunity.com/sharedfiles/filedetails/?id=".concat(record.workshopId), rel: "noreferrer", children: record.workshopId })); }
        },
        {
            title: '最后更新时间',
            dataIndex: 'timeupdated',
            key: 'timeupdated',
            render: function (_, record) { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, dateUitls_1.formatTimestamp)(record.timeupdated) })); }
        },
        {
            title: '最新时间',
            dataIndex: 'timelast',
            key: 'timelast',
            render: function (_, record) { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, dateUitls_1.formatTimestamp)(record.timelast) })); }
        },
        {
            title: '是否需要更新',
            key: 'tags',
            dataIndex: 'tags',
            render: function (_, record) { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [record.timelast > record.timeupdated && ((0, jsx_runtime_1.jsx)(antd_1.Tag, { color: 'red', children: (0, jsx_runtime_1.jsx)("span", { children: "\u662F" }) })), record.timelast <= record.timeupdated && ((0, jsx_runtime_1.jsx)(antd_1.Tag, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u5426" }) }))] })); },
        },
        {
            title: 'Action',
            key: 'action',
            render: function (_, record) { return ((0, jsx_runtime_1.jsx)(antd_1.Space, { size: "middle", children: (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: "Restore the archive", description: "Are you sure to back up this archive?", onConfirm: function () {
                        (0, modApi_1.deleteUgcModAcfFileApi)(cluster, levelName, record.workshopId)
                            .then(function (resp) {
                            if (resp.code === 200) {
                                antd_1.message.success("删除成功，请重启世界");
                            }
                            else {
                                antd_1.message.warning("删除失败");
                            }
                        });
                    }, onCancel: function () { }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", children: "\u5220\u9664\u6A21\u7EC4\u6587\u4EF6" }) }) })); },
        },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Skeleton, { loading: loading, children: [notHasLevels && ((0, jsx_runtime_1.jsx)("span", { children: "\u5F53\u524D\u6682\u65E0\u4E16\u754C" })), !notHasLevels && ((0, jsx_runtime_1.jsx)(antd_1.Spin, { spinning: spin, children: (0, jsx_runtime_1.jsxs)(antd_1.Skeleton, { loading: loading, active: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Alert, { style: {
                                    marginBottom: '4px'
                                }, message: "\u5220\u9664\u65E7\u6A21\u7EC4\u540E\uFF0C\u8BF7\u91CD\u542F\u4E16\u754C\u6765\u4E0B\u8F7D\u65B0\u6A21\u7EC4", type: "info", showIcon: true, closable: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 8, children: [(0, jsx_runtime_1.jsx)("span", { children: t('level') }), (0, jsx_runtime_1.jsx)(antd_1.Select, { style: {
                                            width: 120,
                                        }, onChange: handleChange, defaultValue: notHasLevels ? "" : levels[0].levelName, options: levels.map(function (level) { return ({
                                            value: level.key,
                                            label: level.levelName,
                                        }); }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: function () { return queryAcf(); }, children: t('query') })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Table, { scroll: { x: 500 }, columns: columns, dataSource: acfworkshops })] }) }))] }) }));
});
