"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var index_module_css_1 = __importDefault(require("./index.module.css"));
exports.default = (function (_a) {
    var text = _a.text;
    return (0, jsx_runtime_1.jsx)("span", { className: index_module_css_1.default.icon, children: text });
});
