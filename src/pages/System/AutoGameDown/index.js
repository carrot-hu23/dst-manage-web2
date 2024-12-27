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
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var Recovery_1 = __importDefault(require("./Recovery"));
var autoCheckApi_1 = require("../../../api/autoCheckApi");
exports.default = (function () {
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _a = (0, react_1.useState)([]), autoChecks = _a[0], setAutoChecks = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        (0, autoCheckApi_1.autoCheck2Api)(cluster, "LEVEL_DOWN")
            .then(function (resp) {
            if (resp.code === 200) {
                setAutoChecks(resp.data);
            }
            setLoading(false);
        });
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, active: true, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: "1", size: autoChecks.length, items: autoChecks.map(function (autoCheck, index) {
                    return {
                        label: autoCheck.levelName,
                        key: index,
                        children: (0, jsx_runtime_1.jsx)(Recovery_1.default, { autoCheck: autoCheck }, index),
                    };
                }) }) }) }));
});
