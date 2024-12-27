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
var CollapseWithMarkdown_1 = __importDefault(require("./CollapseWithMarkdown"));
var MarkdownRender_1 = __importDefault(require("./MarkdownRender"));
var pro_components_1 = require("@ant-design/pro-components");
exports.default = (function () {
    var _a = (0, react_1.useState)(""), markdownContent = _a[0], setMarkdownContent = _a[1];
    (0, react_1.useEffect)(function () {
        fetch('misc/FQA.md')
            .then(function (response) { return response.text(); })
            .then(function (data) {
            setMarkdownContent(data);
        })
            .catch(function (error) {
            console.error('无法加载config配置文件', error);
        });
    }, []);
    var items = [
        {
            key: '1',
            label: "常见问题",
            children: (0, jsx_runtime_1.jsx)(CollapseWithMarkdown_1.default, { markdownContent: markdownContent }),
        },
        {
            key: '2',
            label: "多层世界教程",
            children: (0, jsx_runtime_1.jsx)(MarkdownRender_1.default, { url: 'misc/DontStarveMultiWorldTotorial.md' }),
        },
        {
            key: '3',
            label: "多台服务器串联",
            children: (0, jsx_runtime_1.jsx)(MarkdownRender_1.default, { url: 'misc/DontStarveServerMultipleMachinesSeriesTutorial.md' }),
        },
        {
            key: '4',
            label: "docker-compose.yml 参考",
            children: (0, jsx_runtime_1.jsx)(MarkdownRender_1.default, { url: 'misc/Docker-compose.md' }),
        },
    ];
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: "1", items: items }) });
});
