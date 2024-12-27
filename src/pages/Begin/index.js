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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable no-unused-vars */
var antd_1 = require("antd");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var Welcome_1 = __importDefault(require("./component/Welcome"));
var Register_1 = __importDefault(require("./component/Register"));
var End_1 = __importDefault(require("./component/End"));
var http_1 = require("../../utils/http");
var mainCss = {
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '400px',
    height: '600px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
};
// eslint-disable-next-line no-unused-vars
var Begin = function (props) {
    var t = (0, react_i18next_1.useTranslation)().t;
    var form = antd_1.Form.useForm()[0];
    var _a = (0, react_1.useState)(0), current = _a[0], setCurrent = _a[1];
    var next = function () {
        console.log(form.getFieldValue());
        form.validateFields().then(function (value) {
            // 验证通过后进入
            // const { name, age } = value;
            // console.log(name, age); // dee 18
            setCurrent(current + 1);
        }).catch(function (err) {
            antd_1.message.error(err.errorFields[0].errors[0]);
        });
    };
    var prev = function () {
        setCurrent(current - 1);
    };
    var getInitData = function () {
        var userInfo = {
            username: form.getFieldValue("username"),
            password: form.getFieldValue("password"),
            displayName: form.getFieldValue("displayName"),
            photoURL: form.getFieldValue("photoURL")
        };
        var dstConfig = {
            steamcmd: form.getFieldValue("steamcmd"),
            force_install_dir: form.getFieldValue("force_install_dir"),
            cluster: form.getFieldValue("cluster"),
            backup: form.getFieldValue("backup"),
            mod_download_path: form.getFieldValue("mod_download_path"),
        };
        var data = {
            userInfo: userInfo,
            // dstConfig
        };
        return data;
    };
    var navigate = (0, react_router_dom_1.useNavigate)();
    var goIndex = function () { return __awaiter(void 0, void 0, void 0, function () {
        var initData, response, responseData, loginResponse, loginResponseData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initData = getInitData();
                    // 1.保存初始化数据
                    console.log('initData', initData);
                    return [4 /*yield*/, http_1.http.post("/api/init", initData)];
                case 1:
                    response = _a.sent();
                    responseData = response.data;
                    if (responseData.code !== 200) {
                        antd_1.message.error("初始化数据失败");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, http_1.http.post("/api/login", initData.userInfo)];
                case 2:
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
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { style: mainCss, children: [current < 1 && ((0, jsx_runtime_1.jsx)(Welcome_1.default, {})), current === 1 && ((0, jsx_runtime_1.jsx)(Register_1.default, { form: form })), current === 2 && ((0, jsx_runtime_1.jsx)(End_1.default, { form: form })), (0, jsx_runtime_1.jsx)("br", {}), current > 0 && ((0, jsx_runtime_1.jsx)(antd_1.Button, { style: {
                        margin: '0 8px',
                    }, onClick: function () { return prev(); }, children: t('Previous') })), current >= 0 && current < 2 && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return next(); }, children: t('Next') })), current === 2 && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: goIndex, children: t('Go') }))] }) }));
};
exports.default = Begin;
