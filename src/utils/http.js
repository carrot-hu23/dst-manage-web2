import axios from "axios";
import {message} from 'antd'

function extractPathSegments(path) {
    const match = path.match(/^#\/([^\/]+)\/([^\/]+)/);
    if (match) {
        // return {
        //     cluster: match[1],
        //     name: match[2]
        // };
        return match[1] ? match[1] : null
    }
    return null;
}

const http = axios.create(
    {
        withCredentials: true,
        baseURL: '',
        timeout: 50000
    }
)

http.interceptors.request.use((config) => {
    const cluster = extractPathSegments(window.location.hash)
    if (cluster !== null) {
        config.headers['Cluster'] = cluster
    }
    return config
}, (error) => Promise.reject(error))


http.interceptors.response.use((response) => response, (error) => {
    const {status} = error.response
    console.log(status);
    if (status === 401 || status === 504) {
        console.log(status);

        if (status === 504) {
            message.error("服务器异常")
        }
        if (status === 401) {
            message.warning("登录失效")
        }
        // 处理 401 响应状态码
        localStorage.clear()

        window.location.href = '/#/login';
        // const navigate = useNavigate();
        // navigate('/login', { replace: true });
    }
    return Promise.reject(error)
})

export {http}