"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var react_i18next_1 = require("react-i18next");
var dst_1 = require("../../../utils/dst");
var _8level_1 = require("../../../api/8level");
var index_module_css_1 = __importDefault(require("../../DstServerList/index.module.css"));
var DstEmoji_1 = __importDefault(require("../../DstServerList/DstEmoji"));
var pro_components_1 = require("@ant-design/pro-components");
var TextArea = antd_1.Input.TextArea;
exports.default = (function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var i18n = (0, react_i18next_1.useTranslation)().i18n;
    var _a = (0, react_1.useState)(i18n.language), lang = _a[0], setLang = _a[1];
    (0, react_1.useEffect)(function () {
        setLang(i18n.language);
        var handleLanguageChange = function (lng) {
            setLang(lng);
        };
        i18n.on("languageChanged", handleLanguageChange);
        // 清理事件监听器
        return function () {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, [i18n]);
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var form = antd_1.Form.useForm()[0];
    var _c = (0, react_1.useState)("survival"), choose = _c[0], setChoose = _c[1];
    var onRadioChange = function (e) {
        setChoose(e.target.value);
    };
    var onFinish = function () {
        form.validateFields().then(function () {
            var body = {
                cluster: form.getFieldValue(),
                token: form.getFieldValue().cluster_token
            };
            body.cluster.cluster_description = body.cluster.cluster_description.replace(/\n/g, "");
            console.log('body:', body);
            (0, _8level_1.saveClusterIniApi)("", body)
                .then(function (resp) {
                if (resp.code === 200) {
                    antd_1.message.success(t('cluster.save.ok'));
                }
                else {
                    antd_1.message.warning(t('cluster.save.error'));
                    antd_1.message.warning(resp.msg);
                }
            });
        }).catch(function (err) {
            // 验证不通过时进入
            antd_1.message.error(err.errorFields[0].errors[0]);
        });
    };
    (0, react_1.useEffect)(function () {
        setLoading(true);
        (0, _8level_1.getClusterIniApi)("")
            .then(function (resp) {
            if (resp.code === 200) {
                form.setFieldsValue(__assign(__assign({}, resp.data.cluster), { cluster_token: resp.data.token }));
            }
            else {
                antd_1.message.warning(t('cluster.fetch.error'));
            }
            setLoading(false);
        });
    }, []);
    var _d = (0, react_1.useState)(false), open = _d[0], setOpen = _d[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "".concat(index_module_css_1.default.antInput), children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, { title: "Emoj", open: open, onCancel: function () { return setOpen(false); }, footer: null, children: (0, jsx_runtime_1.jsx)(DstEmoji_1.default, {}) }), (0, jsx_runtime_1.jsxs)(antd_1.Skeleton, { loading: loading, active: true, children: [(0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, labelCol: {
                                    span: 4,
                                }, wrapperCol: {
                                    span: 18,
                                }, layout: "horizontal", initialValues: {
                                    pvp: false,
                                    vote_enabled: true,
                                    players: 8,
                                    steam_group_only: false,
                                    tick_rate: 15,
                                    max_snapshots: 6,
                                    bind_ip: '127.0.0.1'
                                }, children: [(0, jsx_runtime_1.jsxs)(pro_components_1.ProCard, { title: "".concat(t('cluster.BaseSetting')), tooltip: "房间一些基础的设置，比如房间名称，密码，最大人数等设置", children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.cluster_name'), name: 'cluster_name', tooltip: "已经支持了 + | [] \\ 等特殊字符了", rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入房间名',
                                                    },
                                                ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { rootClassName: index_module_css_1.default.icon, placeholder: "\u8BF7\u8F93\u5165\u623F\u95F4\u540D\u79F0", allowClear: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "-", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'link', onClick: function () { return setOpen(true); }, children: "emoji" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.cluster_description'), name: 'cluster_description', children: (0, jsx_runtime_1.jsx)(TextArea, { className: index_module_css_1.default.icon, rows: 3, placeholder: "\u8BF7\u8F93\u5165\u623F\u95F4\u63CF\u8FF0" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.game_mode'), name: 'game_mode', rules: [
                                                    {
                                                        required: true,
                                                        message: '请选择游戏模式',
                                                    },
                                                ], tooltip: "游戏风格\n" +
                                                    "主要有社交、合作、竞争、疯狂四种。\n" +
                                                    "展示该房间的游戏倾向，是友好社交还是兵戎相见。但不会影响游戏内容。\n", onChange: onRadioChange, children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { children: dst_1.dstGameMod.map(function (item) {
                                                        return (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: item.description, children: (0, jsx_runtime_1.jsxs)(antd_1.Radio, { value: item.name, children: [lang === 'en' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: item.name })), lang === 'zh' && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: item.cn }))] }, item.name) }, item.name);
                                                    }) }) }), choose === 'customization' &&
                                                (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.customization_mode'), tooltip: "\u5F53\u53EA\u6709\u9009\u62E9\u4E86\u201C\u81EA\u5B9A\u4E49\u6A21\u5F0F\u201D \u8FD9\u4E2A\u503C\u624D\u4F1A\u751F\u6548", name: 'customization_mode', children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u81EA\u5B9A\u4E49\u6E38\u620F\u6A21\u5F0F", maxLength: 20 }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.max_players'), tooltip: "\u4EBA\u6570\u8D8A\u591A\uFF0C\u670D\u52A1\u5668\u538B\u529B\u8D8A\u5927\u3002\u5BF9\u4E91\u670D\u800C\u8A00\uFF0C1c2g\u63A8\u83504\u4EBA\uFF0C2c4g\u63A8\u83506-8\u4EBA\u3002", name: 'max_players', children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, {}) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.cluster_password'), name: 'cluster_password', children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { placeholder: "\u6700\u5927\u957F\u5EA620" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.cluster_token'), name: 'cluster_token', rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入令牌',
                                                    },
                                                ], tooltip: "服务器令牌\n" +
                                                    "维持服务器独立运行的凭证，符合要求的令牌才可以开启服务器。创建令牌的玩家将自动成为使用该令牌开启的服务器的管理员。", children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { placeholder: "\u79D1\u96F7token\u4EE4\u724C" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.pvp'), valuePropName: "checked", tooltip: "\u662F\u5426\u5F00\u542F\u73A9\u5BB6\u5BF9\u6218", name: 'pvp', children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close'), defaultChecked: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.vote_enabled'), valuePropName: "checked", tooltip: "\u5F00\u542F\u540E\u53EF\u901A\u8FC7\u6295\u7968\u8FDB\u884C\u8E22\u51FA\u73A9\u5BB6\u3001\u56DE\u6863\u3001\u91CD\u7F6E\u4E16\u754C\u64CD\u4F5C\u3002", name: 'vote_enabled', children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close'), defaultChecked: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.pause_when_nobody'), valuePropName: "checked", tooltip: "\u4E16\u754C\u6CA1\u4EBA\u65F6\u5C06\u81EA\u52A8\u6682\u505C", name: 'pause_when_nobody', children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close'), defaultChecked: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.console_enabled'), valuePropName: "checked", tooltip: "\u5173\u95ED\u540E\u4E16\u754C\u4E0D\u80FD\u4F7F\u7528\u63A7\u5236\u53F0", name: 'console_enabled', children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close'), defaultChecked: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.whitelist_slots'), name: 'whitelist_slots', tooltip: "为白名单内玩家保留的位置数量设置后，该数量的位置只允许白名单内玩家占据，其他玩家共享剩余的位置。\n" +
                                                    "关于保留栏位与白名单，实际保留栏位并不等于设置的保留栏位，而是设置保留栏位与白名单中ID数量两者中较小的那个值。", children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { placeholder: "\u9884\u7559\u4F4D", maxLength: 200 }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.tick_rate'), name: 'tick_rate', tooltip: "客户端与服务器之间每秒通信的次数\n" +
                                                    "性能满足的情况下，通信频率越高，游戏越流畅、体验越好，但会大幅提高服务器的运行压力。取值应为可被60整除的值，如15、20、30、60等。", children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { placeholder: "\u901A\u4FE1\u6B21\u6570", maxLength: 200 }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.offline_cluster'), name: 'offline_cluster', valuePropName: "checked", tooltip: "创建一个离线服务器。此服务器不会在公共服务器列表展示，只有本地用户可以加入，所有steam相关的功能无效", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close') }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.lan_only_cluster'), name: 'lan_only_cluster', valuePropName: "checked", tooltip: "如果设置为true，服务器仅允许同一个局域网的玩家进入", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close') }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.max_snapshots'), name: 'max_snapshots', tooltip: "服务器保留的快照数量上限\n" +
                                                    "默认情况下，服务器会在新的一天开始时对服务器存档，生成一份快照。保留的快照数量决定了可回档的天数上限。\n" +
                                                    "在世界内有玩家存在时，服务器不会清理该世界的快照。", children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { placeholder: "max_snapshots", maxLength: 200 }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.cluster_language'), name: 'cluster_language', tooltip: "服务器内信息使用的语言，如人物台词等。", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "zh" }) })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(pro_components_1.ProCard, { title: t('cluster.ShardSetting'), subTitle: "世界串联", children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.shard_enabled'), valuePropName: "checked", tooltip: "shard_enabled\u3002\u662F\u5426\u4E3A\u591A\u4E16\u754C\u6A21\u5F0F\u3002\n\u5BF9\u4E8E\u9965\u8352\u800C\u8A00\uFF0C\u4E00\u4E2A\u4E16\u754C\u4EE3\u8868\u4E00\u4E2A\u72EC\u7ACB\u7684\u670D\u52A1\u5668\u8FDB\u7A0B\uFF0C\u6240\u4EE5\u5730\u4E0A\u52A0\u5730\u4E0B\u4E00\u5171\u4E24\u4E2A\u4E16\u754C\u4E5F\u662F\u591A\u670D\u52A1\u5668\u6A21\u5F0F\u3002\n\u591A\u4E16\u754C\u65F6\u4F1A\u6839\u636E\u73A9\u5BB6\u8BBE\u7F6E,\u5C06\u67D0\u4E2A\u4E16\u754C\u4F5C\u4E3A\u4E3B\u4E16\u754C\uFF0C\u5176\u4ED6\u4E16\u754C\u4E3A\u4ECE\u4E16\u754C\u3002\n\u4EC5\u5728\u786E\u5B9A\u53EA\u9700\u8981\u5F00\u542F\u5355\u4E16\u754C\u65F6\u5173\u95ED\u3002", name: 'shard_enabled', children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close'), defaultChecked: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.bind_ip'), name: 'bind_ip', tooltip: "bind_ip\u3002\u4ECE\u670D\u52A1\u5668IP\n\u4ECE\u670D\u52A1\u5668\u7684IPv4\u5730\u5740\uFF0C\u4E3B\u670D\u52A1\u5668\u76D1\u542C\u6B64IP\u5E76\u4E0E\u5176\u8FDE\u63A5\u3002\n\u4E3B\u4ECE\u670D\u52A1\u5668\u90FD\u5728\u540C\u4E00\u8BA1\u7B97\u673A\u4E0A\u65F6\uFF0C\u586B127.0.0.1(\u8868\u793A\u672C\u673A);\u5426\u5219\u586B0.0.0.0(\u8868\u793A\u6240\u6709IP ) \u3002\n\u53EA\u9700\u8981\u4E3A\u4E3B\u670D\u52A1\u5668\u8BBE\u7F6E\u6B64\u9879\u3002", children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { placeholder: "bind_ip", maxLength: 200 }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.master_ip'), name: 'master_ip', tooltip: "master_ip\u3002\u4E3B\u670D\u52A1\u5668IP\n\u4E3B\u670D\u52A1\u5668\u7684IPv4\u5730\u5740\uFF0C\u4ECE\u670D\u52A1\u5668\u8BF7\u6C42\u6B64IP\u5E76\u4E0E\u5176\u8FDE\u63A5\u3002\n\u4E3B\u4ECE\u670D\u52A1\u5668\u90FD\u5728\u540C\u4E00\u8BA1\u7B97\u673A\u4E0A\u65F6\uFF0C\u586B127.0.0.1 ;\u5426\u5219\u586B\u4E3B\u670D\u52A1\u5668IP\u53EA\u9700\u8981\u4E3A\u4ECE\u670D\u52A1\u5668\u8BBE\u7F6E\u6B64\u9879", children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { placeholder: "master_ip", maxLength: 200 }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.master_port'), name: 'master_port', tooltip: "世界通信端口\n" +
                                                    "主服务器将监听/从服务器请求与主服务器连接的UDP端口。\n" +
                                                    "主从服务器应设为相同值", children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { placeholder: "master_port", maxLength: 200 }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.cluster_key'), name: 'cluster_key', tooltip: "世界验证密码\n" +
                                                    "多服务器开服时，服务器间的验证密码", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "cluster_key", maxLength: 200 }) })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)(pro_components_1.ProCard, { title: t('cluster.SteamSetting'), children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.steam_group_id'), name: 'steam_group_id', tooltip: "steam群组编号\n" +
                                                    "每个steam群组都有唯一的一串数字与其对应，在这里填写群组编号用于绑定steam群组。\n" +
                                                    "绑定后服务器将在群组成员的大厅中优先显示，并附有红色、黄色或白色小旗子标志。", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "cluster.steam_group_id" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('cluster.steam_group_only'), valuePropName: "checked", name: 'steam_group_only', tooltip: "是否仅允许steam群组成员加入\n" +
                                                    "开启后只有群组成员才可加入，其他玩家不可加入。", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close') }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { valuePropName: "checked", label: t('cluster.steam_group_admins'), name: 'steam_group_admins', tooltip: "是否将steam群组管理员设为游戏管理员\n" +
                                                    "                            开启后，steam群组的管理员将会自动拥有游戏内管理员身份。", children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: t('switch.open'), unCheckedChildren: t('switch.close') }) })] })] }), (0, jsx_runtime_1.jsx)("br", {})] })] }), (0, jsx_runtime_1.jsx)(pro_components_1.FooterToolbar, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: function () { return onFinish(); }, children: t('cluster.save') }) })] }));
});
