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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_i18next_1 = require("react-i18next");
var antd_1 = require("antd");
var lua_json_1 = require("lua-json");
var gameApi_1 = require("../../api/gameApi");
var modApi_1 = require("../../api/modApi");
var ModList_1 = __importDefault(require("./ModList"));
var Workshop_1 = __importDefault(require("./Workshop"));
var UgcAcf_1 = __importDefault(require("./UgcAcf"));
exports.default = (function () {
    var cluster = (0, react_router_dom_1.useParams)().cluster;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _a = (0, react_1.useState)(""), modoverrides = _a[0], setmodoverrides = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    // 模组列表展示数据
    var _c = (0, react_1.useState)([]), modList = _c[0], setmodList = _c[1];
    // 模组默认的配置项 Module default configuration items
    var defaultConfigOptionsRef = (0, react_1.useRef)(new Map());
    // 模组配置项
    var modConfigOptionsRef = (0, react_1.useRef)({});
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var modoverridesResp, modoverrides, modInfoListResp, modList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, (0, gameApi_1.getHomeConfigApi)(cluster)];
                    case 1:
                        modoverridesResp = _a.sent();
                        if (modoverridesResp.code !== 200) {
                            antd_1.message.warning(t('mod.fetch.error'));
                            return [2 /*return*/];
                        }
                        modoverrides = modoverridesResp.data.modData;
                        setmodoverrides(modoverrides);
                        return [4 /*yield*/, (0, modApi_1.getMyModInfoList)(cluster)];
                    case 2:
                        modInfoListResp = _a.sent();
                        if (modInfoListResp.code !== 200) {
                            antd_1.message.warning(t('mod.fetch.error'));
                            return [2 /*return*/];
                        }
                        modList = modInfoListResp.data;
                        if (modList === null) {
                            modList = [];
                        }
                        setmodList(modList);
                        // modInfoListResp.data
                        initModConfigList(modoverrides, modList, setmodList, defaultConfigOptionsRef, modConfigOptionsRef);
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    function initModConfigList(modoverrides, subscribeModList, setModList, defaultConfigOptionsRef, modConfigOptionsRef) {
        var workshopMap = parseModoverrides(modoverrides);
        console.log("workshopMap", workshopMap);
        subscribeModList.push({
            mod_config: {
                author: "kelei",
                description: "禁用本地所有模组，tips: 这个只是个虚拟的模组，只是兼容了下。如果不知道是干什么用的请不要开启！！！ 不支持自定禁用某些模组 \n\n 请勿乱点！！！\n\n 如果要删除，对应模组配置里面的 client_mods_disabled = {\n" +
                    "    configuration_options = {},\n" +
                    "    enabled = true,\n" +
                    "  },",
                name: "client_mods_disabled",
                configuration_options: []
            },
            enable: false,
            update: false,
            modid: "client_mods_disabled",
            installed: true,
            name: "client_mods_disabled",
            img: "https://steamuserimages-a.akamaihd.net/ugc/1829046490069435373/B2073D1E5B13DA00D29D316FC946C154C0854146/?imw=64&imh=64&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
        });
        var modOptions = {};
        subscribeModList.forEach(function (mod) {
            var modid = mod.modid;
            var options = mod.mod_config.configuration_options;
            if (options !== undefined && options !== null) {
                var defaultOptions_1 = {};
                options.forEach(function (item) {
                    if (item.default !== '' && item.name !== "null" && item.name !== undefined) {
                        defaultOptions_1[item.name] = item.default;
                    }
                });
                modOptions[modid] = defaultOptions_1;
            }
            if (workshopMap.has(modid)) {
                mod.enable = true;
                mod.installed = true;
            }
            else {
                mod.enable = false;
                mod.installed = true;
                workshopMap.set(modid, modOptions[modid]);
            }
        });
        var subscribeModMap = subscribeModList.reduce(function (acc, item) {
            acc.set(item.modid, item);
            return acc;
        }, new Map());
        // 如果没有订阅mod
        workshopMap.forEach(function (value, key) {
            if (subscribeModMap.get(key) === undefined) {
                console.log("not subscribe mod: ", key);
                subscribeModList.push({
                    mod_config: {
                        author: "unknown",
                        name: "unknown"
                    },
                    name: "",
                    update: false,
                    modid: key,
                    installed: false,
                    enable: true
                });
            }
        });
        subscribeModList.sort(function (a, b) {
            if (a.enable === b.enable) {
                return 0;
            }
            if (a.enable) {
                return -1; // a在前
            }
            return 1; // b在前
        });
        setModList(subscribeModList || []);
        defaultConfigOptionsRef.current = workshopMap;
        modConfigOptionsRef.current = modOptions;
    }
    function parseModoverrides(modoverrides) {
        console.log(modoverrides);
        try {
            var result_1 = (0, lua_json_1.parse)(modoverrides);
            var keys = Object.keys(result_1);
            var workshopMap_1 = new Map();
            keys.forEach(function (workshopId) {
                workshopMap_1.set(workshopId.replace('workshop-', '').replace('"', '').replace('"', ''), __assign({}, result_1[workshopId].configuration_options));
            });
            console.log("modoverrides 解析对象", workshopMap_1);
            return workshopMap_1;
        }
        catch (error) {
            return new Map();
        }
    }
    var items = [
        {
            key: '1',
            label: t('mod.Setting'),
            children: (0, jsx_runtime_1.jsx)(ModList_1.default, { modList: modList, setModList: setmodList, defaultConfigOptionsRef: defaultConfigOptionsRef, modConfigOptionsRef: modConfigOptionsRef }),
        },
        {
            key: '2',
            label: t('mod.Subscribe'),
            children: (0, jsx_runtime_1.jsx)(Workshop_1.default, { addModList: setmodList }),
        },
        {
            key: '3',
            label: t('mod.UgcMod'),
            children: (0, jsx_runtime_1.jsx)(UgcAcf_1.default, {}),
        },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: "1", items: items }) }) }));
});
