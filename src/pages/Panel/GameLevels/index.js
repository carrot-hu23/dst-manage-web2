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
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var lua_json_1 = require("lua-json");
var _8level_1 = require("../../../api/level.jsx");
var useLevelsStore_1 = require("../../../store/useLevelsStore");
function formatData(data, num) {
    return data.toFixed(num);
}
exports.default = (function () {
    var levels = (0, useLevelsStore_1.useLevelsStore)(function (state) { return state.levels; });
    var setLevels = (0, useLevelsStore_1.useLevelsStore)(function (state) { return state.setLevels; });
    (0, react_1.useEffect)(function () {
        var timerId = setInterval(function () {
            (0, _8level_1.getLevelStatusApi)()
                .then(function (resp) {
                if (resp.code === 200) {
                    var levels_1 = resp.data;
                    var items_1 = [];
                    levels_1.forEach(function (level) {
                        var item = {
                            key: level.uuid,
                            uuid: level.uuid,
                            levelName: level.levelName,
                            location: '未知',
                            ps: level.ps,
                            Ps: level.Ps,
                            status: level.status
                        };
                        try {
                            var data = (0, lua_json_1.parse)(level.leveldataoverride);
                            item.location = data.location;
                        }
                        catch (error) {
                            console.log(error);
                        }
                        items_1.push(item);
                    });
                    setLevels(items_1);
                }
            });
        }, 3000);
        return function () {
            clearInterval(timerId); // 组件卸载时清除定时器
        };
    }, []);
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var _a = (0, react_1.useState)(false), spin = _a[0], setSpin = _a[1];
    var t = (0, react_i18next_1.useTranslation)().t;
    var statusOnClick = function (checked, event, levelName, uuid) {
        var prefix;
        if (checked) {
            prefix = t('panel.start.up');
        }
        else {
            prefix = t('panel.start.down');
        }
        setSpin(true);
        (0, _8level_1.startLevelApi)("", uuid, checked).then(function (resp) {
            if (resp.code !== 200) {
                antd_1.message.error("".concat(prefix, " ").concat(levelName, "\u5931\u8D25").concat(resp.msg));
            }
            else {
                antd_1.message.success("".concat(prefix, " ").concat(levelName));
            }
            setSpin(false);
        });
    };
    var columns = [
        {
            title: t('panel.levelName'),
            dataIndex: 'levelName',
            key: 'levelName',
            hideInSearch: true,
            render: function (text, record) { return ((0, jsx_runtime_1.jsx)("div", { style: { wordWrap: 'break-word', wordBreak: 'break-word' }, children: (0, jsx_runtime_1.jsxs)(antd_1.Tooltip, { placement: "rightTop", title: ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { size: 8, children: [(0, jsx_runtime_1.jsx)("span", { children: "\u5185\u5B58: ".concat(formatData((record.Ps !== undefined ? record.Ps.RSS : 0) / 1024, 2), "MB") }), (0, jsx_runtime_1.jsx)("span", { children: "\u865A\u62DF\u5185\u5B58: ".concat(formatData((record.Ps !== undefined ? record.Ps.VSZ : 0) / 1024, 2), "MB") })] }), (0, jsx_runtime_1.jsx)(antd_1.Progress, { percent: record.Ps.memUage, size: 'small' })] }), (0, jsx_runtime_1.jsxs)("div", { children: ["cpu: ", (0, jsx_runtime_1.jsx)(antd_1.Progress, { type: "circle", percent: record.Ps.cpuUage, size: 40 })] })] })), children: [record.status && (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: 'green', children: text }), !record.status && (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: 'default', children: text })] }) })); },
        },
        {
            title: t('panel.mem'),
            dataIndex: 'mem',
            key: 'mem',
            render: function (_, record) { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("span", { children: "".concat(formatData((record.Ps !== undefined ? record.Ps.RSS : 0) / 1024, 2), "MB") }) })); },
        },
        {
            title: t('panel.action'),
            key: 'action',
            hideInSearch: true,
            render: function (_, record) { return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { size: "middle", wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: "\u6E05\u7406 ".concat(record.levelName, " \u4E16\u754C"), description: "\u5C06\u4F1A\u5220\u9664 save session \u6587\u4EF6\u7B49\u5185\u5BB9\uFF0C\u8BF7\u81EA\u884C\u505A\u597D\u5907\u4EFD", onConfirm: function () {
                            var levels = [];
                            levels.push(record.uuid);
                            (0, _8level_1.cleanLevelApi)(cluster, levels)
                                .then(function (resp) {
                                if (resp.code === 200) {
                                    antd_1.message.success("清理成功");
                                }
                                else {
                                    antd_1.message.error("清理失败");
                                }
                            })
                                .catch(function (error) {
                                console.log(error);
                                antd_1.message.error("清理失败");
                            });
                        }, onCancel: function () {
                        }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)(icons_1.ClearOutlined, {}), danger: true, size: 'small', children: t('panel.clear') }) }), (0, jsx_runtime_1.jsx)(antd_1.Switch, { checked: record.status, checkedChildren: t('panel.run'), unCheckedChildren: t('panel.stop'), onClick: function (checked, event) {
                            statusOnClick(checked, event, record.levelName, record.uuid);
                        } })] })); },
        },
    ];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { style: {
                    paddingTop: '16px',
                    padding: '8px'
                }, size: 16, children: [(0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: t('panel.start.all'), onConfirm: function () {
                            setSpin(true);
                            (0, _8level_1.startAllLevelApi)("", true)
                                .then(function (resp) {
                                if (resp.code === 200) {
                                    antd_1.message.success("启动成功");
                                }
                                else {
                                    antd_1.message.error("启动成功");
                                }
                                setSpin(false);
                            });
                        }, onCancel: function () {
                        }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'middle', type: "primary", children: t('panel.start.all') }) }), (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: t('panel.stop.all'), onConfirm: function () {
                            setSpin(true);
                            (0, _8level_1.startAllLevelApi)("", false)
                                .then(function (resp) {
                                if (resp.code === 200) {
                                    antd_1.message.success("关闭成功");
                                }
                                else {
                                    antd_1.message.error("关闭失败");
                                }
                                setSpin(false);
                            });
                        }, onCancel: function () {
                        }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'middle', children: t('panel.stop.all') }) }), (0, jsx_runtime_1.jsx)(antd_1.Popconfirm, { title: "\u4E00\u952E\u6E05\u7406\u4E16\u754C", description: "此操作将会删除存档的 save session 等文件，请做好备份", onConfirm: function () {
                            setSpin(true);
                            (0, _8level_1.cleanAllLevelApi)("", false)
                                .then(function (resp) {
                                if (resp.code === 200) {
                                    antd_1.message.success("清理成功");
                                }
                                else {
                                    antd_1.message.error("清理失败");
                                }
                                setSpin(false);
                            });
                        }, onCancel: function () {
                        }, okText: "Yes", cancelText: "No", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { danger: true, type: "primary", size: 'middle', children: t('panel.delete') }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Spin, { spinning: spin, children: (0, jsx_runtime_1.jsx)(antd_1.Table, { scroll: {
                        x: 300,
                    }, columns: columns, dataSource: levels }) })] }));
});
