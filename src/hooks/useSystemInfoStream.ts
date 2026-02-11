import { useEffect, useRef } from "react"

export interface SystemInfo {
    cpu?: {
        cpuUsedPercent: number
        cpuPercent: number[]
        cores: number
    }
    mem?: {
        total: number
        usedPercent: number
        used: number
        available: number
    }
    disk?: {
        devices: Array<{
            total: number
            usage: number
        }>
    }
    host?: {
        os: string
        kernelArch: string
        platform: string
    }
    panelMemUsage?: number
}

export interface UseSystemInfoStreamOptions {
    onData: (data: SystemInfo) => void
    onError?: (err: Event) => void
    onOpen?: () => void
    clusterName: string
}

export function useSystemInfoStream(options: UseSystemInfoStreamOptions) {
    const { onData, onError, onOpen, clusterName } = options

    // 防止 onData 变化导致重复创建 EventSource
    const onDataRef = useRef(onData)
    onDataRef.current = onData

    useEffect(() => {
        const es = new EventSource('/api/game/system/info/stream'+"?clusterName="+clusterName)

        es.addEventListener("open", () => {
            onOpen?.()
        })

        es.addEventListener("message", (e: MessageEvent<string>) => {
            try {
                const data = JSON.parse(e.data)
                if (data.code === 200) {
                    onDataRef.current(data.data)
                }
            } catch (error) {
                console.error("Failed to parse system info:", error)
            }
        })

        es.addEventListener("error", (e) => {
            onError?.(e)
        })

        return () => {
            es.close()
        }
    }, [])
}
