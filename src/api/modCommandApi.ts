import {http} from "../utils/http";
import {AxiosResponse} from "axios";

export interface ModCommandItem {
    name: string;
    desc: string;
    image: string;
    file: string;
}

export async function getModCommandIndexApi(): Promise<AxiosResponse> {
    const url = '/api/dst-static/dst-mod-command/index.json';
    return await http.get(url);
}

export async function getModCommandFileApi(filename: string): Promise<AxiosResponse> {
    const url = `/api/dst-static/dst-mod-command/${filename}`;
    return await http.get(url);
}
