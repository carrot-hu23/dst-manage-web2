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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var react_markdown_1 = __importDefault(require("react-markdown"));
var remark_gfm_1 = __importDefault(require("remark-gfm"));
var rehype_raw_1 = __importDefault(require("rehype-raw"));
var react_syntax_highlighter_1 = require("react-syntax-highlighter"); // 代码高亮
// 高亮的主题，还有很多别的主题，可以自行选择
var prism_1 = require("react-syntax-highlighter/dist/esm/styles/prism");
// import 'github-markdown-css';
var useTheme_1 = require("../../hooks/useTheme");
exports.default = (function (_a) {
    var url = _a.url;
    var t = (0, useTheme_1.useTheme)();
    var _b = (0, react_1.useState)(''), mdContent = _b[0], setMdContent = _b[1];
    (0, react_1.useEffect)(function () {
        // url是markdown文件的路径，我在项目中是放到了media文件夹下，示例：url为'/media/xx.md'
        fetch(url)
            .then(function (res) { return res.text(); })
            .then(function (text) { return setMdContent(text); });
    }, []);
    return ((0, jsx_runtime_1.jsx)(react_markdown_1.default, { className: t.theme === 'dark' ? 'markdown-body markdown-body-dark' : 'markdown-body', children: mdContent, remarkPlugins: [remark_gfm_1.default], rehypePlugins: [rehype_raw_1.default], components: {
            code: function (_a) {
                var node = _a.node, inline = _a.inline, className = _a.className, children = _a.children, props = __rest(_a, ["node", "inline", "className", "children"]);
                var match = /language-(\w+)/.exec(className || '');
                return !inline && match ? ((0, jsx_runtime_1.jsx)(react_syntax_highlighter_1.Prism, __assign({ children: String(children).replace(/\n$/, ''), style: prism_1.tomorrow, 
                    // style={dark}
                    language: match[1], PreTag: "div" }, props))) : ((0, jsx_runtime_1.jsx)("code", __assign({ className: className }, props, { children: children })));
            }
        } }));
});
