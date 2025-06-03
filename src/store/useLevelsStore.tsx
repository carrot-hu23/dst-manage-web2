import {create} from 'zustand'


import {StateCreator} from 'zustand'

type Level = Record<string, any> // 替换成你的具体类型

interface LevelsStore {
    levels: Level[]
    getLevels: () => Level[]
    setLevels: (newLevels: Level[]) => void
}

const store: StateCreator<LevelsStore> = (set, get) => ({
    levels: [],
    getLevels: () => get().levels,
    setLevels: (newLevels) => set({levels: newLevels})
})

export const useLevelsStore = create(store)