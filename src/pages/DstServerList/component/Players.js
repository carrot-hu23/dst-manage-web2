"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dst_1 = require("../../../utils/dst");
var index_module_css_1 = __importDefault(require("../index.module.css"));
var data = [
    {
        "eventlevel": 0,
        "name": "wanda",
        "netid": "",
        "prefab": "wanda",
        "colour": "FFA54F"
    },
];
// eslint-disable-next-line react/prop-types
var Players = function (_a) {
    var players = _a.players;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: 'scrollbar', style: {
                height: 400,
                overflowY: 'auto',
            }, children: (0, jsx_runtime_1.jsx)(antd_1.List, { itemLayout: "horizontal", dataSource: players || data, renderItem: function (item) { return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { actions: [(0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://steamcommunity.com/profiles/".concat(item.netid), style: {
                                background: 'url(./assets/dst_button_normal.png)'
                            }, rel: "noreferrer", children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 22, src: './assets/dst/steam_btn.png' }) }, "list-loadmore-edit")], children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 36.8, src: dst_1.dstRoles[item.prefab] || dst_1.dstRoles.mod }), description: (0, jsx_runtime_1.jsx)("div", { style: {
                                color: "#".concat(item.colour),
                                marginTop: '4px',
                                fontSize: 16
                            }, children: (0, jsx_runtime_1.jsx)("span", { className: index_module_css_1.default.icon, children: item.name }) }) }) })); } }) }) }));
};
exports.default = Players;
