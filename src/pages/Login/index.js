"use strict";
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
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var http_1 = require("../../utils/http");
require("./index.css");
var react_i18next_1 = require("react-i18next");
var mainCss = {
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '400px',
    height: '350px',
    position: 'absolute',
    left: '50%',
    top: '45%',
    transform: 'translate(-50%,-50%)',
};
var Login = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var onFinish = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var loginResponse, loginResponseData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, http_1.http.post("/api/login", values)];
                case 1:
                    loginResponse = _a.sent();
                    loginResponseData = loginResponse.data;
                    if (loginResponseData.code !== 200) {
                        antd_1.message.error("登录失败");
                        return [2 /*return*/];
                    }
                    localStorage.setItem("token", loginResponseData.data.username);
                    localStorage.setItem("user", JSON.stringify(loginResponseData.data));
                    // 3.跳转
                    navigate('/');
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("div", { style: mainCss, children: [(0, jsx_runtime_1.jsx)("h3", { children: t('loginTitle') }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Form, { name: "normal_login", className: "login-form", onFinish: onFinish, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "username", rules: [
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { prefix: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { className: "site-form-item-icon" }), placeholder: "Username" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "password", rules: [
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { prefix: (0, jsx_runtime_1.jsx)(icons_1.LockOutlined, { className: "site-form-item-icon" }), type: "password", placeholder: "Password" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", htmlType: "submit", className: "login-form-button", children: t('web.login') }) })] })] }));
};
exports.default = Login;
