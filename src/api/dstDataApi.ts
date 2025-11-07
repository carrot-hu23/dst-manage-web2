import { http } from "../utils/http";
import {ApiResponse} from "../types";

async function genDstMapApi(clusterName: string) {
    const url = `/api/dst/map/gen?clusterName=${clusterName}`
    const response = await http.get(url)
    return response.data
}

async function getDstMapImageApi(clusterName: string) {
    const url = `/api/dst/map/image?clusterName=${clusterName}`
    const response = await http.get(url)
    return response.data
}

async function hasWalrusHutPlainsApi(clusterName: string) {
    const url = `/api/dst/map/has/walrusHut/plains?clusterName=${clusterName}`
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