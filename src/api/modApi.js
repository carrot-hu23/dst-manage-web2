"use strict";
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
exports.searchMod = searchMod;
exports.getModInfo = getModInfo;
exports.getMyModInfoList = getMyModInfoList;
exports.deleteModInfo = deleteModInfo;
exports.deleteStepupWorkshopApi = deleteStepupWorkshopApi;
exports.getModInfoFileApi = getModInfoFileApi;
exports.updateModApi = updateModApi;
exports.addModInfoFileApi = addModInfoFileApi;
exports.updateModinfosApi = updateModinfosApi;
exports.getUgcModAcfApi = getUgcModAcfApi;
exports.deleteUgcModAcfFileApi = deleteUgcModAcfFileApi;
var http_1 = require("../utils/http");
function searchMod(lang, cluster, text, page, size) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/mod/search?text=".concat(text, "&page=").concat(page, "&size=").concat(size, "&lang=").concat(lang);
                    return [4 /*yield*/, http_1.http.get(url, {
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function getModInfo(lang, cluster, modId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/mod/".concat(modId, "?lang=").concat(lang);
                    return [4 /*yield*/, http_1.http.get(url, {
                            timeout: 1000 * 60 * 10,
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function deleteModInfo(cluster, modId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/mod/".concat(modId);
                    return [4 /*yield*/, http_1.http.delete(url, {
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function getMyModInfoList(cluster) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = '/api/mod';
                    return [4 /*yield*/, http_1.http.get(url, {
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function deleteStepupWorkshopApi(cluster) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = '/api/mod/setup/workshop';
                    return [4 /*yield*/, http_1.http.delete(url, {
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function updateModinfosApi() {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = '/api/mod/modinfo';
                    return [4 /*yield*/, http_1.http.put(url)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function getModInfoFileApi(cluster, modId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/mod/modinfo/".concat(modId);
                    return [4 /*yield*/, http_1.http.get(url, {
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function updateModApi(cluster, modId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/mod/".concat(modId);
                    return [4 /*yield*/, http_1.http.put(url, {}, {
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function addModInfoFileApi(cluster, data) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/mod/modinfo/file";
                    return [4 /*yield*/, http_1.http.post(url, data, {
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function getUgcModAcfApi(cluster, levelName) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/mod/ugc/acf?levelName=".concat(levelName);
                    return [4 /*yield*/, http_1.http.get(url, {
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function deleteUgcModAcfFileApi(cluster, levelName, workshopId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "/api/mod/ugc?levelName=".concat(levelName, "&workshopId=").concat(workshopId);
                    return [4 /*yield*/, http_1.http.delete(url, {
                            headers: {
                                'Cluster': cluster,
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}