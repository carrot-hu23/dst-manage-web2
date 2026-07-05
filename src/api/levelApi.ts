import {http} from "../utils/http";
import type {
  ClusterIniResponse,
  PlayerListResponse,
  SaveClusterIniRequest,
  ApiResponse,
  LevelData,
  CreateLevelData
} from '../type';

// Level Management APIs (from existing levelApi.ts)
export async function getLevelListApi(): Promise<ApiResponse<LevelData[]>> {
  const url = `/api/cluster/level`;
  const response = await http.get(url);
  return response.data;
}

export async function createLevelApi(level: CreateLevelData): Promise<ApiResponse<LevelData>> {
  const url = `/api/cluster/level`;
  const response = await http.post(url, level, {
    timeout: 1000 * 60 * 30
  });
  return response.data;
}

export async function deleteLevelApi(levelName: string): Promise<ApiResponse<void>> {
  const url = `/api/cluster/level?levelName=${levelName}`;
  const response = await http.delete(url, {
    timeout: 1000 * 60 * 30
  });
  return response.data;
}

export async function updateLevelsApi(levels: { levels: LevelData[] }): Promise<ApiResponse<void>> {
  const url = `/api/cluster/level`;
  const response = await http.put(url, levels, {
    timeout: 1000 * 60 * 30
  });
  return response.data;
}

// Level Config APIs
export async function getLevelConfigApi(cluster: string): Promise<ApiResponse<Record<string, unknown>>> {
  const url = '/api/game/8level/config';
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function saveLevelConfigApi(cluster: string, data: Record<string, unknown>): Promise<ApiResponse<void>> {
  const url = '/api/game/8level/config';
  const response = await http.post(url, data, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

// Whitelist APIs
export async function getWhitelistApi(cluster: string): Promise<ApiResponse<PlayerListResponse>> {
  const url = '/api/game/8level/whitelist';
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function saveWhitelistApi(cluster: string, list: PlayerListResponse): Promise<ApiResponse<void>> {
  const url = '/api/game/8level/whitelist';
  const response = await http.post(url, {
    whitelist: list
  }, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

// Adminlist APIs
export async function getAdminlistApi(cluster: string): Promise<ApiResponse<PlayerListResponse>> {
  const url = '/api/game/8level/adminilist';
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function saveAdminlistApi(cluster: string, list: PlayerListResponse): Promise<ApiResponse<void>> {
  const url = '/api/game/8level/adminilist';
  const response = await http.post(url, {
    adminlist: list
  }, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

// Blacklist APIs
export async function getBlacklistApi(cluster: string): Promise<ApiResponse<PlayerListResponse>> {
  const url = '/api/game/8level/blacklist';
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function saveBlacklistApi(cluster: string, list: PlayerListResponse): Promise<ApiResponse<void>> {
  const url = '/api/game/8level/blacklist';
  const response = await http.post(url, {
    blacklist: list
  }, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

// ClusterIni APIs
export async function getClusterIniApi(cluster: string): Promise<ClusterIniResponse> {
  const url = '/api/game/8level/clusterIni';
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function saveClusterIniApi(
  cluster: string, 
  data: SaveClusterIniRequest
): Promise<ApiResponse<void>> {
  const url = '/api/game/8level/clusterIni';
  const response = await http.post(url, data, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

// Level Status APIs
export async function getLevelStatusApi(cluster: string): Promise<ApiResponse<Record<string, unknown>>> {
  const url = '/api/game/8level/status';
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function startLevelApi(
  cluster: string,
  levelName: string,
  checked: boolean
): Promise<ApiResponse<void>> {
  let url = "";
  if(checked) {
    url = `api/game/8level/start?levelName=${levelName}`;
  } else {
    url = `api/game/8level/stop?levelName=${levelName}`;
  }

  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function startAllLevelApi(
  cluster: string,
  checked: boolean
): Promise<ApiResponse<void>> {
  let url = "";
  if(checked) {
    url = `api/game/8level/start/all`;
  } else {
    url = `api/game/8level/stop/all`;
  }

  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

// Command APIs
export async function sendCommandApi(
  cluster: string,
  levelName: string,
  command: string
): Promise<ApiResponse<void>> {
  const url = `/api/game/8level/command`;
  const response = await http.post(url, {
    levelName,
    command
  }, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

// Clean APIs
export async function cleanLevelApi(
  cluster: string,
  levels: string[]
): Promise<ApiResponse<void>> {
  const queryString = levels.map(item => `level=${encodeURIComponent(item)}`).join('&');
  const url = `/api/game/clean/level?${queryString}`;
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function cleanAllLevelApi(
  cluster: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _levels: string[]
): Promise<ApiResponse<void>> {
  const url = `/api/game/clean/level/all`;
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

// Utility APIs
export async function getFreeUDPPortApi(cluster: string): Promise<ApiResponse<number>> {
  const url = '/api/game/8level/udp/port';
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function readLevelServerLogApi(
  cluster: string,
  levelName: string,
  lines: number
): Promise<ApiResponse<string>> {
  const url = `/api/game/level/server/log?levelName=${levelName}&lines=${lines}`;
  const response = await http.get(url, {
    headers: {
      'Cluster': cluster,
    }
  });
  return response.data;
}

export async function readPanelLogApi(lines: number): Promise<ApiResponse<string>> {
  const url = `/api/game/dst-admin-go/log?lines=${lines}`;
  const response = await http.get(url, {
    headers: {
      'Cluster': "",
    }
  });
  return response.data;
}
