"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resources = void 0;
var en_json_1 = __importDefault(require("./lang/en.json"));
var zh_json_1 = __importDefault(require("./lang/zh.json"));
exports.resources = {
    "en": {
        translation: en_json_1.default
    },
    "zh": {
        translation: zh_json_1.default
    }
};
