// @ts-ignore
import {http} from "../utils/http";

async function sendCommandApi(cluster: string, levelName: string, command: string) {
    const url = `/api/game/8level/command`
    const response = await http.post(url, {
        levelName,
        command
    }, {
        headers: {
            'Cluster': cluster,
        }
    })
    return response.data
}

export {
    sendCommandApi,
}