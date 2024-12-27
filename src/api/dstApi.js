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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dstHomeListApi = dstHomeListApi;
exports.dstHomeDetailApi = dstHomeDetailApi;
exports.dstHomeListApi2 = dstHomeListApi2;
exports.dstHomeDetailApi2 = dstHomeDetailApi2;
var http_1 = require("../utils/http");
var dstHomeServerListUrl = "/api/dst/home/server";
var dstHomeServerDetailUrl = "/api/dst/home/server/detail";
function getHomeListApi(params) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = {};
                    if (params.mod !== undefined) {
                        params.mod = parseInt(params.mod, 10);
                    }
                    if (params.password !== undefined) {
                        params.password = parseInt(params.password, 10);
                    }
                    if (params.sort_way !== undefined) {
                        params.sort_way = parseInt(params.sort_way, 10);
                    }
                    if (params.world !== undefined) {
                        params.world = parseInt(params.world, 10);
                    }
                    return [4 /*yield*/, http_1.http.post(dstHomeServerListUrl, __assign({}, __assign({ sort_type: 'connected', sort_way: 1, search_type: 1, mod: -1, pvp: -1, password: -1, world: -1, search_content: params.name, page: params.current, paginate: 10 }, params)), {
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function dstHomeListApi(params) {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseData, fields, data, homelist, temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHomeListApi(params)];
                case 1:
                    response = _a.sent();
                    responseData = JSON.parse(response);
                    fields = responseData.successinfo.fields;
                    data = responseData.successinfo.data;
                    homelist = data.map(function (value) {
                        var info = {};
                        fields.map(function (key, index) {
                            info[key] = value[index];
                            return key;
                        });
                        return info;
                    });
                    temp = {
                        data: homelist,
                        total_count: responseData.successinfo.total_count,
                        total: responseData.successinfo.total,
                        per_page: responseData.successinfo.per_page,
                        current_page: responseData.successinfo.current_page,
                        last_page: responseData.successinfo.last_page,
                        fetch_time_delta: responseData.successinfo.fetch_time_delta
                    };
                    return [2 /*return*/, temp];
            }
        });
    });
}
function dstHomeDetailApi(params) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, http_1.http.post(dstHomeServerDetailUrl, {
                        rowId: params.rowId,
                        region: params.region
                    }, {
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function dstHomeListApi2(params) {
    return __awaiter(this, void 0, void 0, function () {
        var params2, key, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params2 = new URLSearchParams();
                    // 遍历对象的属性并添加到URLSearchParams对象中
                    // eslint-disable-next-line no-restricted-syntax
                    for (key in params) {
                        // eslint-disable-next-line no-prototype-builtins
                        if (params.hasOwnProperty(key) && params[key] !== undefined) {
                            params2.append(key, params[key]);
                        }
                    }
                    url = "/api/dst/home/server2?".concat(params2.toString());
                    return [4 /*yield*/, http_1.http.get(url)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function dstHomeDetailApi2(rowId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/dst/home/server/detail2?rowId=".concat(rowId);
                    return [4 /*yield*/, http_1.http.get(url)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
