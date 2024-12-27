"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var GameArchive_1 = __importDefault(require("../GameArchive"));
var Op_1 = __importDefault(require("../OpBtnGroup"));
var OnlinePlayers_1 = __importDefault(require("../OnlinePlayers"));
var GameLevels_1 = __importDefault(require("../GameLevels"));
var ServerLog_1 = __importDefault(require("../ServerLog"));
var OS_1 = __importDefault(require("../OS"));
var antd_1 = require("antd");
var pro_components_1 = require("@ant-design/pro-components");
exports.default = (function () {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(OS_1.default, {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(antd_1.Row, { gutter: 16, children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, { xs: 24, sm: 24, md: 10, lg: 10, xl: 10, children: [(0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { children: (0, jsx_runtime_1.jsx)(Op_1.default, {}) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { children: (0, jsx_runtime_1.jsx)(GameArchive_1.default, {}) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { children: (0, jsx_runtime_1.jsx)(GameLevels_1.default, {}) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { xs: 24, sm: 24, md: 14, lg: 14, xl: 14, children: [(0, jsx_runtime_1.jsx)(ServerLog_1.default, {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(pro_components_1.ProCard, { children: (0, jsx_runtime_1.jsx)(OnlinePlayers_1.default, {}) })] })] })] }));
});
