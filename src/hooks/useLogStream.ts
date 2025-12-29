import { useEffect, useRef } from "react"

export interface UseLogStreamOptions {
    clusterName: string
    levelName: string
    onLog: (line: string) => void
    onError?: (err: Event) => void
    onOpen?: () => void
}

export function useLogStream(options: UseLogStreamOptions) {
    const { clusterName, levelName, onLog, onError, onOpen } = options

    // 防止 onLog 变化导致重复创建 EventSource
    const onLogRef = useRef(onLog)
    onLogRef.current = onLog

    useEffect(() => {
        if (!clusterName || !levelName) return

        const es = new EventSource(
            `/api/game/log/stream?clusterName=${encodeURIComponent(
                clusterName
            )}&levelName=${encodeURIComponent(levelName)}`
        )

        es.addEventListener("open", () => {
            onOpen?.()
        })

        es.addEventListener("log", (e: MessageEvent<string>) => {
            onLogRef.current(e.data)
        })

        es.addEventListener("error", (e) => {
            onError?.(e)
        })

        return () => {
            es.close()
        }
    }, [clusterName, levelName])
}
