// @ts-ignore
import { http } from "../utils/http";

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

async function hasWalrusHutPlainsApi() {
    const url = `/api/dst/map/has/walrusHut/plains`
    const response = await http.get(url)
    return response.data
}

export {
    genDstMapApi,
    getDstMapImageApi,
    hasWalrusHutPlainsApi
}