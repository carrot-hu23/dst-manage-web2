// @ts-ignore
import {http} from "../utils/http";
import {Level} from "../types";

async function getLevelListApi() {
    const url = `/api/cluster/level`
    const response = await http.get(url)
    return response.data
}

async function createLevelApi(levelName: string) {
    const url = `/api/cluster/level`
    const response = await http.post(url, levelName, {
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function deleteLevelApi(levelName: string) {
    const url = `/api/cluster/level?levelName=${levelName}`
    const response = await http.delete(url, {
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function updateLevelsApi(levels: Level[]) {
    const url = `/api/cluster/level`
    const response = await http.put(url, levels, {
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function importLevelsApi(levels: Level[]) {
    const url = `/api/cluster/level/import`
    const response = await http.put(url, levels, {
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function getClusterIniApi() {
    const url = '/api/game/8level/clusterIni'
    const response = await http.get(url)
    return response.data
}

async function saveClusterIniApi(data: Record<string, object>) {
    const url = '/api/game/8level/clusterIni'
    const response = await http.post(url, data)
    return response.data
}

export {
    getLevelListApi,
    createLevelApi,
    deleteLevelApi,
    updateLevelsApi,
    getClusterIniApi,
    saveClusterIniApi,
    importLevelsApi
}