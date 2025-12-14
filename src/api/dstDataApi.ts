import { http } from "../utils/http";
import {ApiResponse} from "../types";

async function genDstMapApi(levelName: string) {
    const url = `/api/dst/map/gen?levelName=${levelName}`
    const response = await http.get(url)
    return response.data
}

async function getDstMapImageApi(levelName: string) {
    const url = `/api/dst/map/image?levelName=${levelName}`
    const response = await http.get(url)
    return response.data
}

async function hasWalrusHutPlainsApi(levelName: string) {
    const url = `/api/dst/map/has/walrusHut/plains?levelName=${levelName}`
    const response = await http.get(url)
    return response.data
}

async function sessionFileApi(clusterName: string, levelName: string): Promise<ApiResponse<string>> {
    const url = `/api/dst/map//session/file?clusterName=${clusterName}&levelName=${levelName}`
    const response = await http.get(url)
    return response.data
}

export {
    genDstMapApi,
    getDstMapImageApi,
    hasWalrusHutPlainsApi,
    sessionFileApi
}