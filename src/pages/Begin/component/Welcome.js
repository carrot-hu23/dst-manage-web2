"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_i18next_1 = require("react-i18next");
var Welcome = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: t('Welcome to dst-admin-web management platform') }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { src: "/assets/illustrations/illustration_login3.png", alt: "login" }) })] }));
};
exports.default = Welcome;
