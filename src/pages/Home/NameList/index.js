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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_2 = __importStar(require("react"));
var react_i18next_1 = require("react-i18next");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
require("./index.css");
var formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};
var formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};
exports.default = (function (_a) {
    var title = _a.title, tips = _a.tips, getApi = _a.getApi, saveApi = _a.saveApi;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _b = (0, react_2.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_2.useState)(false), spin = _c[0], setSpin = _c[1];
    var form = antd_1.Form.useForm()[0];
    var lines = tips.split("\n");
    (0, react_2.useEffect)(function () {
        fetchData();
    }, []);
    var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, getApi()];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.data];
                case 3:
                    data = _a.sent();
                    form.setFieldsValue({
                        list: data
                    });
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var saveData = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
        var response, code, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSpin(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, saveApi("", payload)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.code];
                case 3:
                    code = _a.sent();
                    if (code === 200) {
                        antd_1.message.success(t('cluster.save.ok'));
                    }
                    else {
                        antd_1.message.warning(t('cluster.save.error'));
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error fetching data:', error_2);
                    return [3 /*break*/, 6];
                case 5:
                    setSpin(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var onFinish = function (values) {
        console.log('Received values of form:', values);
        saveData(values.list);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: 'scrollbar', style: {
                height: '64vh',
                overflowY: 'auto',
            }, children: [(0, jsx_runtime_1.jsx)(antd_1.Typography, { variant: "h6", sx: { mb: 4 }, children: title }), (0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, active: true, avatar: true, children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 24, md: 24, lg: 16, xl: 16, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, __assign({ form: form, name: "dynamic_form_item" }, formItemLayoutWithOutLabel, { onFinish: onFinish, style: {
                                        maxWidth: 600,
                                    }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.List, { name: "list", rules: [
                                                {
                                                    // eslint-disable-next-line consistent-return
                                                    validator: function (_, names) { return __awaiter(void 0, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            return [2 /*return*/];
                                                        });
                                                    }); },
                                                },
                                            ], children: function (fields, _a, _b) {
                                                var add = _a.add, remove = _a.remove;
                                                var errors = _b.errors;
                                                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [fields.map(function (field, index) { return ((0, react_1.createElement)(antd_1.Form.Item, __assign({}, (index === 0 ? formItemLayout : formItemLayoutWithOutLabel), { label: index === 0 ? '名单' : '', required: false, key: field.key }),
                                                            (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({}, field, { validateTrigger: ['onChange', 'onBlur'], rules: [
                                                                    {
                                                                        required: true,
                                                                        whitespace: true,
                                                                        message: "Please input passenger's name or delete this field.",
                                                                    },
                                                                ], noStyle: true, children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165 Ku_xxx", style: {
                                                                        width: '80%',
                                                                    } }) })),
                                                            (0, jsx_runtime_1.jsx)(icons_1.MinusCircleOutlined, { className: "dynamic-delete-button", onClick: function () { return remove(field.name); } }))); }), (0, jsx_runtime_1.jsxs)(antd_1.Form.Item, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "dashed", onClick: function () { return add(); }, style: {
                                                                        width: '60%',
                                                                    }, icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), children: t('add') }), (0, jsx_runtime_1.jsx)(antd_1.Form.ErrorList, { errors: errors })] })] }));
                                            } }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", htmlType: "submit", children: "Submit" }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {})] })) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { xs: 24, sm: 24, md: 24, lg: 8, xl: 8, children: [">", (0, jsx_runtime_1.jsx)("span", { children: lines.map(function (line, index) { return ((0, jsx_runtime_1.jsxs)("span", { children: [line, (0, jsx_runtime_1.jsx)("br", {})] }, index)); }) })] })] }) })] }) }));
});
