export interface ClusterItem {
  id: string;
  name: string;
  type: 'local' | 'remote' | 'docker';
  steamcmdPath?: string;
  dstServerPath?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  status: 'connected' | 'disconnected' | 'connecting';
  enabled: boolean;
  createTime: string;
  updateTime: string;
}

export type ClusterType = 'local' | 'remote' | 'docker';

export type ClusterStatus = 'connected' | 'disconnected' | 'connecting';

export interface ClusterFormData {
  name?: string;
  type?: ClusterType;
  steamcmdPath?: string;
  dstServerPath?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
}

// 房间相关类型
export interface WorldConfig {
  id: string;
  name: string;
  port: number;
}

export interface RoomItem {
  id: string;
  name: string;
  folderName: string;
  // 节点信息冗余字段
  clusterId: string;
  clusterName: string;
  clusterType: string;
  clusterHost?: string;
  clusterPort?: number;
  clusterUsername?: string;
  // 房间配置字段
  masterPort: number;
  worldCount: number;
  status: 'running' | 'stopped' | 'error';
  worlds: WorldConfig[];
  createTime: string;
  updateTime: string;
}

export interface CreateRoomFormData {
  name: string;
  folderName: string;
  clusterId: string;
  masterPort: number;
  worldCount: number;
}

// 用户相关类型
export type UserRole = 'admin' | 'user';

export interface UserItem {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  assignedRooms: string[]; // 分配的房间ID列表
  enabled: boolean;
  createTime: string;
  updateTime: string;
}

export interface CreateUserFormData {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  enabled: boolean;
}

export interface UpdateUserFormData {
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  enabled?: boolean;
}

// Level相关类型
export interface LevelServerIni {
  server_port?: number;
  is_master: boolean;
  name?: string;
  id?: number;
  encode_user_path: boolean;
  authentication_port?: number;
  master_server_port?: number;
}

export interface LevelData {
  levelName: string;
  uuid: string;
  leveldataoverride: string;
  modoverrides: string;
  server_ini: LevelServerIni;
}

export interface CreateLevelData {
  levelName: string;
  uuid?: string;
  type: 'forest' | 'cave' | 'porkland';
  leveldataoverride?: string;
  modoverrides?: string;
  server_ini?: LevelServerIni;
}

export interface ApiResponse<T = any> {
  code: number;
  msg?: string;
  data?: T;
}

// ClusterIni 相关类型
export interface ClusterIniFormValues {
  cluster_name: string;
  cluster_description?: string;
  game_mode: string;
  customization_mode?: string;
  max_players?: number;
  cluster_password?: string;
  cluster_token: string;
  pvp?: boolean;
  vote_enabled?: boolean;
  pause_when_nobody?: boolean;
  console_enabled?: boolean;
  whitelist_slots?: number;
  tick_rate?: number;
  offline_cluster?: boolean;
  lan_only_cluster?: boolean;
  max_snapshots?: number;
  cluster_language?: string;
  shard_enabled?: boolean;
  bind_ip?: string;
  master_ip?: string;
  master_port?: number;
  cluster_key?: string;
  steam_group_id?: string;
  steam_group_only?: boolean;
  steam_group_admins?: boolean;
}

export interface ClusterIniResponse {
  code: number;
  msg?: string;
  data: {
    cluster: ClusterIniFormValues;
    token: string;
  };
}

export type PlayerListResponse = string[];

export interface SaveClusterIniRequest {
  cluster: Partial<ClusterIniFormValues>;
  token: string;
}