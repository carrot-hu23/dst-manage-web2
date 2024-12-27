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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var Paragraph = antd_1.Typography.Paragraph;
function HiddenText(_a) {
    var text = _a.text;
    var _b = (0, react_1.useState)(true), hidden = _b[0], setHidden = _b[1];
    var handleToggle = function () {
        setHidden(!hidden);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: 'dst', children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 8, children: [(0, jsx_runtime_1.jsx)(Paragraph, { copyable: !hidden, children: hidden ? '******' : text }), hidden ? (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleTwoTone, { onClick: handleToggle }) : (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, { onClick: handleToggle })] }) }));
}
exports.default = HiddenText;
