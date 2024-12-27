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
exports.usePlayerListStore = void 0;
var zustand_1 = require("zustand");
exports.usePlayerListStore = (0, zustand_1.create)(function (set) { return ({
    playerList: [],
    // 获取 playList
    getPlayerList: function () { return set(function (state) { return state.playerList; }); },
    // 更新 playList（例如添加新歌曲）
    setPlayerList: function (newPlayerList) { return set(function (state) { return ({
        playerList: __spreadArray([], newPlayerList, true),
    }); }); },
}); });
