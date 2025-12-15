import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from 'axios'
import { message } from 'antd'

/**
 * 从 hash 中提取 cluster
 * 示例：#/clusterA/page → clusterA
 */
function extractPathSegments(path: string): string | null {
    const match = path.match(/^#\/([^/]+)\/([^/]+)/)
    if (match && match[1]) {
        return match[1]
    }
    return null
}

const http: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: '',
    timeout: 50_000,
})

/**
 * 请求拦截器
 */
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const cluster = extractPathSegments(window.location.hash)
        if (cluster) {
            // Axios v1 headers 是 AxiosHeaders
            config.headers.set('Cluster', cluster)
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

/**
 * 响应拦截器
 */
http.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const status = error.response?.status
        console.log(status)

        if (status === 401 || status === 504) {
            if (status === 504) {
                message.error('服务器异常')
            }

            if (status === 401) {
                message.warning('登录失效')
            }

            localStorage.clear()
            window.location.href = '/#/login'
        }

        return Promise.reject(error)
    }
)

export { http }