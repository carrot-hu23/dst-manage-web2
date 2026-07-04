import { getKv, saveKv } from "../api/clusterApi";

// 用户偏好设置类型
export interface UserPreferences {
  dismissedAlerts: {
    [alertId: string]: boolean;
  };
}

// Hook 返回类型
export interface UseUserPreferencesReturn {
  getPreferences: () => Promise<UserPreferences>;
  isDismissed: (alertId: string) => Promise<boolean>;
  dismissAlert: (alertId: string) => Promise<boolean>;
  resetAlert: (alertId: string) => Promise<boolean>;
  resetAllAlerts: () => Promise<boolean>;
}

const KV_KEY = 'user-preferences';

const getDefaultPreferences = (): UserPreferences => ({
  dismissedAlerts: {},
});

export const useUserPreferences = (): UseUserPreferencesReturn => {
  // 获取用户偏好
  const getPreferences = async (): Promise<UserPreferences> => {
    try {
      const resp = await getKv(KV_KEY);
      if (resp.code === 200 && resp.data) {
        return JSON.parse(resp.data as string);
      }
      return getDefaultPreferences();
    } catch (error) {
      console.error('Failed to get user preferences:', error);
      return getDefaultPreferences();
    }
  };

  // 检查 Alert 是否已被关闭
  const isDismissed = async (alertId: string): Promise<boolean> => {
    try {
      const preferences = await getPreferences();
      return preferences.dismissedAlerts[alertId] === true;
    } catch (error) {
      console.error('Failed to check alert status:', error);
      return false;
    }
  };

  // 关闭 Alert
  const dismissAlert = async (alertId: string): Promise<boolean> => {
    try {
      const preferences = await getPreferences();
      preferences.dismissedAlerts[alertId] = true;
      const resp = await saveKv({
        key: KV_KEY,
        value: JSON.stringify(preferences),
      });
      return resp.code === 200;
    } catch (error) {
      console.error('Failed to dismiss alert:', error);
      return false;
    }
  };

  // 重置单个 Alert
  const resetAlert = async (alertId: string): Promise<boolean> => {
    try {
      const preferences = await getPreferences();
      delete preferences.dismissedAlerts[alertId];
      const resp = await saveKv({
        key: KV_KEY,
        value: JSON.stringify(preferences),
      });
      return resp.code === 200;
    } catch (error) {
      console.error('Failed to reset alert:', error);
      return false;
    }
  };

  // 重置所有 Alert
  const resetAllAlerts = async (): Promise<boolean> => {
    try {
      const preferences = await getPreferences();
      preferences.dismissedAlerts = {};
      const resp = await saveKv({
        key: KV_KEY,
        value: JSON.stringify(preferences),
      });
      return resp.code === 200;
    } catch (error) {
      console.error('Failed to reset all alerts:', error);
      return false;
    }
  };

  return {
    getPreferences,
    isDismissed,
    dismissAlert,
    resetAlert,
    resetAllAlerts,
  };
};
