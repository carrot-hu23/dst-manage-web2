"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var index_module_css_1 = __importDefault(require("../index.module.css"));
var Paragraph = antd_1.Typography.Paragraph;
var EmojiList = [
    { name: "faketeeth", code: "󰀆" },
    { name: "farm", code: "󰀇" },
    { name: "chester", code: "󰀃" },
    { name: "grave", code: "󰀊" },
    { name: "trophy", code: "󰀭" },
    { name: "ghost", code: "󰀉" },
    { name: "flex", code: "󰀙" },
    { name: "heart", code: "󰀍" },
    { name: "battle", code: "󰀘" },
    { name: "alchemy", code: "󰀝" },
    { name: "lightbulb", code: "󰀏" },
    { name: "hambat", code: "󰀋" },
    { name: "torch", code: "󰀛" },
    { name: "firepit", code: "󰀤" },
    { name: "fire", code: "󰀈" },
    { name: "shadow", code: "󰀩" },
    { name: "berry", code: "󰀠" },
    { name: "wave", code: "󰀮" },
    { name: "horn", code: "󰀥" },
    { name: "eyeball", code: "󰀅" },
    { name: "pig", code: "󰀐" },
    { name: "sanity", code: "󰀓" },
    { name: "beefalo", code: "󰀁" },
    { name: "salt", code: "󰀨" },
    { name: "eyeplant", code: "󰀣" },
    { name: "tophat", code: "󰀖" },
    { name: "carrot", code: "󰀡" },
    { name: "backpack", code: "󰀞" },
    { name: "redgem", code: "󰀒" },
    { name: "refine", code: "󰀧" },
    { name: "poop", code: "󰀑" },
    { name: "chest", code: "󰀂" },
    { name: "thumbsup", code: "󰀫" },
    { name: "sciencemachine", code: "󰀔" },
    { name: "beehive", code: "󰀟" },
    { name: "web", code: "󰀗" },
    { name: "gold", code: "󰀚" },
    { name: "meat", code: "󰀦" },
    { name: "shovel", code: "󰀪" },
    { name: "hammer", code: "󰀌" },
    { name: "abigail", code: "󰀜" },
    { name: "trap", code: "󰀬" },
    { name: "hunger", code: "󰀎" },
    { name: "egg", code: "󰀢" },
    { name: "arcane", code: "󰀀" },
    { name: "skull", code: "󰀕" },
    { name: "wormhole", code: "󰀯" }
];
exports.default = (function () {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { size: 16, wrap: true, children: EmojiList.map(function (item) { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Paragraph, { className: index_module_css_1.default.icon, copyable: true, style: {
                            fontSize: 24
                        }, children: item.code }, item.name) })); }) }) }) }));
});
