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
var react_1 = __importDefault(require("react"));
var react_markdown_1 = __importDefault(require("react-markdown"));
var antd_1 = require("antd");
var react_syntax_highlighter_1 = require("react-syntax-highlighter");
var Panel = antd_1.Collapse.Panel;
var CollapseWithMarkdown = function (_a) {
    var markdownContent = _a.markdownContent;
    var questionsAndAnswers = markdownContent
        .split('### ')
        .filter(function (item) { return item !== ''; })
        .map(function (item) {
        var _a = item.split('\n').filter(function (line) { return line !== ''; }), question = _a[0], answerLines = _a.slice(1);
        var answer = answerLines.join('\n');
        return { question: question, answer: answer };
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Collapse, { accordion: true, children: questionsAndAnswers.map(function (_a, index) {
                var question = _a.question, answer = _a.answer;
                return ((0, jsx_runtime_1.jsx)(Panel, { header: (0, jsx_runtime_1.jsx)("div", { children: question }), children: (0, jsx_runtime_1.jsx)(react_markdown_1.default, { components: {
                            code: function (_a) {
                                var node = _a.node, inline = _a.inline, className = _a.className, children = _a.children, props = __rest(_a, ["node", "inline", "className", "children"]);
                                var match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? ((0, jsx_runtime_1.jsx)(react_syntax_highlighter_1.Prism, __assign({ language: match[1], PreTag: "div", children: String(children).replace(/\n$/, '') }, props))) : ((0, jsx_runtime_1.jsx)("code", __assign({ className: className }, props, { children: children })));
                            },
                        }, children: answer }) }, index));
            }) }) }));
};
exports.default = CollapseWithMarkdown;
