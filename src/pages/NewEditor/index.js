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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonacoEditor = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var monaco = __importStar(require("monaco-editor"));
exports.MonacoEditor = react_1.default.forwardRef(function (props, ref) {
    var editorRef = react_1.default.useRef();
    var monacoRef = react_1.default.useRef();
    (0, react_1.useImperativeHandle)(ref, function () { return (monacoRef); });
    (0, react_1.useEffect)(function () {
        if (editorRef.current) {
            // 向window环境注入monaco编辑器需要的work方法
            // @ts-ignore
            // window.MonacoEnvironment = {
            //     getWorkerUrl: function () {
            //         return "data:text/javascript;charset=utf-8,".concat(encodeURIComponent("\n                      self.MonacoEnvironment = {\n                        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min//'\n                      };\n                      importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs/base/worker/workerMain.js');"));
            //     }
            // };
            if (monacoRef.current) {
                return;
            }
            monacoRef.current = monaco.editor.create(editorRef.current, __assign({ language: 'lua', folding: true, theme: 'vs', automaticLayout: true, scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8
                }, minimap: {
                    enabled: true
                }, formatOnPaste: true, renderValidationDecorations: 'on', readOnly: false }, props.options));
        }
    }, [editorRef]);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { ref: editorRef, style: props.style }), (0, jsx_runtime_1.jsx)("span", { style: {
                    marginLeft: '12px',
                    color: 'red'
                } })] });
});
