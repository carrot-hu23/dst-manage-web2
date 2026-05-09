import { http } from "../utils/http";
import type { ApiResponse } from "../types";

interface User {
    username: string;
    password: string;
    displayName?: string;
    photoURL?: string;
}

interface LoginResponseData {
    username: string;
    displayName?: string;
    photoURL?: string;
}

async function initApi(user: User): Promise<ApiResponse<LoginResponseData>> {
    const url = "/api/login"
    const response = await http.post<ApiResponse<LoginResponseData>>(url, user)
    return response.data
}

async function isFirstApi(): Promise<ApiResponse> {
    const url = "/api/init"
    const response = await http.get<ApiResponse>(url)
    return response.data
}

async function getNews(): Promise<ApiResponse> {
    const url = "/steam/dst/news"
    const response = await http.get<ApiResponse>(url)
    return response.data
}

export {
    initApi, isFirstApi, getNews
}
