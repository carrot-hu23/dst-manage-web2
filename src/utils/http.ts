import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import {message} from 'antd';

// 创建 axios 实例
const http: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: '',
    timeout: 50000,
});

// 请求拦截器
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
    (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

// 响应拦截器
http.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError): Promise<AxiosError> => {
        const status = error.response?.status;

        console.log(status);

        if (status === 401 || status === 504) {
            if (status === 504) {
                message.error('服务器异常');
            }
            if (status === 401) {
                message.warning('登录失效');
            }

            // 清除本地登录信息
            localStorage.clear();

            // 跳转到登录页
            window.location.href = '/#/login';
        }

        return Promise.reject(error);
    }
);

export {http};