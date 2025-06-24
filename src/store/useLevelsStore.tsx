// @ts-ignore
import {http} from "../utils/http";

import {create} from 'zustand'

import {StateCreator} from 'zustand'

type Level = Record<string, any> // 替换成你的具体类型

interface LevelsStore {
    levels: Level[]
    getLevels: () => Level[]
    setLevels: (newLevels: Level[]) => void
    reFlushLevels: (cluster: string) => Promise<void>
}

async function getLevelApi(cluster: string) {
    const url = '/api/cluster/level'
    const response = await http.get(url, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

// 假设这是从 API 获取数据的方法
const fetchLevelApi = async (cluster: string): Promise<Level[]> => {
    const levelResp = await getLevelApi(cluster)
    if (levelResp.code === 200) {
        return levelResp.data
    }
    return []
}

const store: StateCreator<LevelsStore> = (set, get) => ({
    levels: [],
    getLevels: () => get().levels,
    setLevels: (newLevels) => set({levels: newLevels}),
    reFlushLevels: async (cluster: string) => {
        const newLevels = await fetchLevelApi(cluster)
        set({levels: newLevels})
    }
})

export const useLevelsStore = create(store)