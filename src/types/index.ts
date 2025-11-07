// 定义返回数据的类型
export interface ApiResponse<T = any> {
    code: number;
    msg: string;
    data: T;
}

export interface Player {
    key: "",
    name: string,
    kuId: string,
    role: string,
    day: string
}

export type Level = {
    levelName: string;
    uuid: string;
    location: "forest" | "cave" | "porkland" | string; // 从 leveldataoverride 解析出来
};