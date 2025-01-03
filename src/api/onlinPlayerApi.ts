// @ts-ignore
import { http } from "../utils/http";

async function getOnlinePlayersApi(cluster: string,levelName: string) {
    const url = `/api/game/8level/players?levelName=${levelName}`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

async function getAllOnlinePlayersApi(cluster: string) {
    const url = `/api/game/8level/players/all`
    const response = await http.get(url,{
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    getOnlinePlayersApi,
    getAllOnlinePlayersApi,
}