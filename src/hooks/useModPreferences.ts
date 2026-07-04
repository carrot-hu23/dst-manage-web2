import { getKv, saveKv } from "../api/clusterApi";

// 模组偏好配置类型
export interface ModPreferences {
  [modid: string]: {
    [optionName: string]: any;
  };
}

// Hook 返回类型
export interface UseModPreferencesReturn {
  getAllPreferences: () => Promise<ModPreferences>;
  getModPreference: (modid: string) => Promise<{ [optionName: string]: any } | null>;
  saveModPreference: (modid: string, config: { [optionName: string]: any }) => Promise<boolean>;
  applyPreference: (modid: string, preferences: ModPreferences) => { [optionName: string]: any } | null;
  deleteModPreference: (modid: string) => Promise<boolean>;
}

const KV_KEY = 'mod-preferences';

const getDefaultPreferences = (): ModPreferences => ({});

export const useModPreferences = (): UseModPreferencesReturn => {
  // 获取所有模组偏好配置
  const getAllPreferences = async (): Promise<ModPreferences> => {
    try {
      const resp = await getKv(KV_KEY);
      if (resp.code === 200 && resp.data) {
        return JSON.parse(resp.data as string);
      }
      return getDefaultPreferences();
    } catch (error) {
      console.error('Failed to get mod preferences:', error);
      return getDefaultPreferences();
    }
  };

  // 获取单个模组的偏好配置
  const getModPreference = async (modid: string): Promise<{ [optionName: string]: any } | null> => {
    try {
      const preferences = await getAllPreferences();
      return preferences[modid] || null;
    } catch (error) {
      console.error('Failed to get mod preference:', error);
      return null;
    }
  };

  // 保存单个模组的偏好配置
  const saveModPreference = async (modid: string, config: { [optionName: string]: any }): Promise<boolean> => {
    try {
      const preferences = await getAllPreferences();
      preferences[modid] = config;
      const resp = await saveKv({
        key: KV_KEY,
        value: JSON.stringify(preferences),
      });
      return resp.code === 200;
    } catch (error) {
      console.error('Failed to save mod preference:', error);
      return false;
    }
  };

  // 应用偏好配置到模组
  const applyPreference = (modid: string, preferences: ModPreferences): { [optionName: string]: any } | null => {
    try {
      if (preferences && preferences[modid]) {
        return preferences[modid];
      }
      return null;
    } catch (error) {
      console.error('Failed to apply preference:', error);
      return null;
    }
  };

  // 删除单个模组的偏好配置
  const deleteModPreference = async (modid: string): Promise<boolean> => {
    try {
      const preferences = await getAllPreferences();
      delete preferences[modid];
      const resp = await saveKv({
        key: KV_KEY,
        value: JSON.stringify(preferences),
      });
      return resp.code === 200;
    } catch (error) {
      console.error('Failed to delete mod preference:', error);
      return false;
    }
  };

  return {
    getAllPreferences,
    getModPreference,
    saveModPreference,
    applyPreference,
    deleteModPreference,
  };
};
