// @ts-ignore
import { http } from "../utils/http";

async function getMyModInfoList(cluster: string) {
    const url = `/api/mod`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}



export {
    getMyModInfoList
}