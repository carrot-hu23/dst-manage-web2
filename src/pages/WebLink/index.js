"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var EmbeddedPage_1 = __importDefault(require("../System/EmbeddedPage"));
var WebLinkApi_1 = require("../../api/WebLinkApi");
exports.default = (function () {
    // "https://dstserverlist.top/"
    var _a = (0, react_1.useState)([]), links = _a[0], setLinks = _a[1];
    (0, react_1.useEffect)(function () {
        (0, WebLinkApi_1.getWebLinkListApi)("")
            .then(function (resp) {
            setLinks(resp.data || []);
        }).catch(function (erorr) {
            console.log(erorr);
        });
    }, []);
    var items = links.map(function (link) { return ({
        key: link.url,
        label: link.title,
        children: (0, jsx_runtime_1.jsx)("div", { style: {
                width: '100%',
                height: '640px'
            }, children: (0, jsx_runtime_1.jsx)(EmbeddedPage_1.default, { url: link.url, width: link.width, height: link.height, title: link.title }) }),
    }); });
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: "1", items: items }) });
});
