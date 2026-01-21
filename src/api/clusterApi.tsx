import {http} from "../utils/http";

export interface ApiResponse<T = unknown> {
  code: number;
  msg?: string;
  data?: T;
}

export interface ClusterFormValues {
  name: string;
  clusterName?: string;
  clusterType: '本地' | '远程' | '';
  steamcmd?: string;
  force_install_dir?: string;
  ugc_directory?: string;
  backup?: string;
  bin?: 32 | 64 | 100;
  levelType?: 'forest' | 'porkland';
  ip?: string;
  port?: number;
  username?: string;
  password?: string;
  remote?: 'remote1' | 'remote2';
  remoteClusterNameList?: string[];
}

export interface GameArchive {
  clusterName?: string;
  ipConnect?: string;
  version?: string;
  lastVersion?: string;
  mods?: number | string;
  maxPlayers?: number;
  meta?: {
    Clock?: { Cycles?: number; Phase?: number };
    Seasons?: {
      Season?: string;
      ElapsedDaysInSeason?: number;
      RemainingDaysInSeason?: number;
    };
  };
  [key: string]: unknown;
}

export interface Cluster extends ClusterFormValues {
  ID: string;
  clusterPassword?: string;
  status?: boolean;
  gameArchive?: GameArchive;
  [key: string]: unknown;
}

export interface RemoteCluster {
  clusterName: string;
  name: string;
}

export interface RemoteClusterParams {
  ip: string;
  port: number;
  username: string;
  password: string;
  clusterType?: string;
}

export interface KvParams {
   key: string;
   value?: unknown;
 }

export interface ServerConfigTemplate {
  id: string;
  name: string;
  type: '本地' | '远程';
  createdAt: string;
  updatedAt: string;

  // 本地配置字段
  steamcmd?: string;
  force_install_dir?: string;
  ugc_directory?: string;
  backup?: string;

  // 远程配置字段
  ip?: string;
  port?: number;
  username?: string;
  password?: string;
}

async function getClusterList(): Promise<ApiResponse<Cluster[]>> {
    const url = "/api/cluster"
    const response = await http.get(url)
    return response.data
}

async function createCluster(data: ClusterFormValues): Promise<ApiResponse<unknown>> {
    const url  = `/api/cluster`
    const response = await http.post(url, data,{
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function updateCluster(data: Cluster): Promise<ApiResponse<unknown>> {
    const url  = `/api/cluster`
    const response = await http.put(url, data,{
        timeout: 1000 * 60 * 30
    })
    return response.data
}

async function deleteCluster(clusterName: string): Promise<ApiResponse<unknown>> {
    const url  = `/api/cluster?clusterName=${clusterName}`
    const response = await http.delete(url)
    return response.data
}

async function getKv(key: string): Promise<ApiResponse<unknown>> {
    const url = `/api/kv?key=${key}`
    const data = await http.get(url)
    return data.data
}

async function saveKv(params: KvParams): Promise<ApiResponse<unknown>> {
    const url = '/api/kv'
    const data = await http.post(url, params)
    return data.data
}

async function fetchRemoteClusterList(params: RemoteClusterParams): Promise<ApiResponse<RemoteCluster[]>> {
    const url = '/api/cluster/remote'
    const data = await http.post(url, params)
    return data.data
}

async function getServerConfigTemplates(): Promise<ApiResponse<string>> {
    const response = await getKv('server-config-templates')
    return {
        code: 200,
        data: response.data as string
    }
}

async function saveServerConfigTemplates(templates: string): Promise<ApiResponse<unknown>> {
    const response = await saveKv({
        key: 'server-config-templates',
        value: templates,
    })
    return response
}

export  {
    getClusterList,
    createCluster,
    deleteCluster,
    updateCluster,

    getKv,
    saveKv,

    fetchRemoteClusterList,
    getServerConfigTemplates,
    saveServerConfigTemplates,
}
