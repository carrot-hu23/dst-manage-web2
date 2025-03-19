export interface Player {
    key: "",
    name: string,
    kuId: string,
    role: string,
    day: string
}

export interface HomeLevel {
    name?: string,
    clusterIni?: object,
    levels: Level[]
}

export interface Level {
    levelName: string
    is_master: boolean
    uuid: string
    leveldataoverride: string
    modoverrides: string
    server_ini: ServerIni
}

export interface ServerIni {
    server_port: number
    is_master: boolean
    name: string
    id: number
    encode_user_path: boolean
    authentication_port: number
    master_server_port: number
}