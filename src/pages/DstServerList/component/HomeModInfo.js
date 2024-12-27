"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var modApi_1 = require("../../../api/modApi");
var data = [
    [
        "workshop-1595631294",
        "Smart Minisign",
        "1.1.5",
        "1.1.5",
        true
    ]
];
// eslint-disable-next-line react/prop-types
var HomeModInfo = function (_a) {
    var mods = _a.mods, subscribedModList = _a.subscribedModList, setSubscribedModList = _a.setSubscribedModList;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: 'scrollbar', style: {
                height: 450,
                overflowY: 'auto',
            }, children: (0, jsx_runtime_1.jsx)(antd_1.List, { itemLayout: "horizontal", dataSource: mods || data, renderItem: function (item) { return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { actions: [(0, jsx_runtime_1.jsx)("a", { target: '_blank', href: "https://steamcommunity.com/sharedfiles/filedetails/?id=".concat(item[0].substr(9)), style: {
                                background: 'url(./assets/dst/icon_button_normal.png)'
                            }, rel: "noreferrer", children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "\u70B9\u51FB\u8FDB\u5165\u8BA2\u9605\u9875", children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 22, src: './assets/dst/update.png' }) }) }, "list-loadmore-edit"), 
                        // eslint-disable-next-line react/jsx-key
                        (0, jsx_runtime_1.jsx)("div", { children: item[4] ?
                                (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "\u5FC5\u987B\u5B89\u88C5\u624D\u80FD\u8FDB\u5165", children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, width: 22, src: './assets/dst/apply_skins.png' }) }) : '' }),
                    ], children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta
                    // avatar={<Image preview={false} width={36.8} src={dstRoles[item.prefab] || dstRoles['mod']} />}
                    , { 
                        // avatar={<Image preview={false} width={36.8} src={dstRoles[item.prefab] || dstRoles['mod']} />}
                        description: (0, jsx_runtime_1.jsx)("div", { style: {
                                color: "#".concat(item.colour),
                                marginTop: '4px',
                                fontSize: 16
                            }, children: item[1] }) }) })); } }) }) }));
};
exports.default = HomeModInfo;
