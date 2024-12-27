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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var autoCheckApi_1 = require("../../../api/autoCheckApi");
var DstEmoji_1 = __importDefault(require("../../DstServerList/DstEmoji"));
var index_module_css_1 = __importDefault(require("../../DstServerList/index.module.css"));
var TextArea = antd_1.Input.TextArea;
exports.default = (function (_a) {
    var isGameUpdate = _a.isGameUpdate, isMod = _a.isMod, autoCheck = _a.autoCheck;
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var form = antd_1.Form.useForm()[0];
    var _b = (0, react_1.useState)(false), spin = _b[0], setSpin = _b[1];
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    (0, react_1.useEffect)(function () {
        form.setFieldsValue(autoCheck);
    }, [autoCheck]);
    function saveAutoCheck() {
        setSpin(true);
        var data = form.getFieldValue();
        (0, autoCheckApi_1.saveAutoCheck2Api)(cluster, data)
            .then(function (resp) {
            if (resp.code === 200) {
                antd_1.message.success("保存成功");
                form.setFieldsValue(resp.data);
            }
            else {
                antd_1.message.error("保存失败");
                antd_1.message.warning(resp.msg);
            }
            setSpin(false);
        });
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Spin, { spinning: spin, children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, { title: "\u9965\u8352Emoj", open: open, onCancel: function () { return setOpen(false); }, footer: null, children: (0, jsx_runtime_1.jsx)(DstEmoji_1.default, {}) }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, labelCol: {
                        span: 2,
                    }, 
                    // wrapperCol={{
                    //     span: 16,
                    // }}
                    initialValues: {
                        interval: 20,
                        announcement: ""
                    }, children: [!isGameUpdate && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "世界名", children: autoCheck.levelName }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { tooltip: "uuid 是你存档的世界文件名称", label: "uuid", children: autoCheck.uuid })] }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "开启", name: 'enable', valuePropName: "checked", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: "\u5F00\u542F", unCheckedChildren: "\u5173\u95ED" }) }), isMod && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "公告", name: 'announcement', children: (0, jsx_runtime_1.jsx)(TextArea, { className: index_module_css_1.default.icon, rows: 4, placeholder: "\u8BF7\u8F93\u5165\u516C\u544A\u3002tips: \u53D1\u9001\u516C\u544A\u540E\uFF0C\u9ED8\u8BA4 5s \u540E\u5C06\u6267\u884C\u64CD\u4F5C" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "-", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'link', onClick: function () { return setOpen(true); }, children: "\u67E5\u770Bemoji" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "延迟", name: 'sleep', children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { addonAfter: "\u79D2", style: { width: 120, }, min: 1, placeholder: "\u8BBE\u7F6E\u591A\u5C11\u79D2\u540E\u6267\u884C" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "公告次数", name: 'times', children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { addonAfter: "\u6B21", style: { width: 120, }, min: 1, placeholder: "\u516C\u544A\u6B21\u6570" }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "检测间隔", name: 'interval', children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { addonAfter: "\u5206\u949F", style: { width: 120, }, min: 1, placeholder: "\u68C0\u6D4B\u95F4\u9694\u65F6\u95F4" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "操作", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: function () { return saveAutoCheck(); }, children: "\u4FDD\u5B58" }) })] })] }) }));
});
