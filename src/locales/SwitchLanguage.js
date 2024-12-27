"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_i18next_1 = require("react-i18next");
var langs = {
    en: { nativeName: 'English' },
    zh: { nativeName: '中文' }
};
exports.default = (function () {
    var i18n = (0, react_i18next_1.useTranslation)().i18n;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("select", { onChange: function (evt) {
                i18n.changeLanguage(evt.target.value);
                console.log(evt.target.value);
            }, children: Object.keys(langs).map(function (lng) { return ((0, jsx_runtime_1.jsx)("option", { value: lng, label: langs[lng].nativeName, style: { fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' } }, lng)); }) }) }));
});
