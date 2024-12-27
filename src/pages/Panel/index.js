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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var react_i18next_1 = require("react-i18next");
var antd_1 = require("antd");
var GameOperator_1 = __importDefault(require("./GameOperator"));
var _8level_1 = require("../../api/8level");
var RemoteControl_1 = __importDefault(require("./RemoteControl"));
var useLevelsStore_1 = require("../../store/useLevelsStore");
var Panel = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var setLevels = (0, useLevelsStore_1.useLevelsStore)(function (state) { return state.setLevels; });
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        (0, _8level_1.getLevelStatusApi)()
            .then(function (resp) {
            if (resp.code === 200) {
                var levels = resp.data;
                var items_1 = [];
                levels.forEach(function (level) {
                    var item = {
                        key: level.uuid,
                        uuid: level.uuid,
                        levelName: level.levelName,
                        location: '未知',
                        ps: level.ps,
                        Ps: level.Ps,
                        status: level.status,
                        modoverrides: level.modoverrides
                    };
                    items_1.push(item);
                });
                setLevels(items_1);
            }
            setLoading(false);
        });
    }, []);
    var items = [
        {
            key: '1',
            label: t('panel.panel'),
            children: (0, jsx_runtime_1.jsx)(GameOperator_1.default, {})
        },
        {
            key: '2',
            label: t('panel.remote'),
            children: (0, jsx_runtime_1.jsx)(RemoteControl_1.default, {}),
        },
    ];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Skeleton, { loading: loading, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items }) }) }));
};
exports.default = Panel;
