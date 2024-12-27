"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLevelsStore = void 0;
var zustand_1 = require("zustand");
exports.useLevelsStore = (0, zustand_1.create)(function (set) { return ({
    levels: [],
    // 获取 playList
    getLevels: function () { return set(function (state) { return state.levels; }); },
    // 更新 playList（例如添加新歌曲）
    setLevels: function (newLevels) {
        set(function (state) { return ({
            levels: __spreadArray([], newLevels, true),
        }); });
    },
}); });
