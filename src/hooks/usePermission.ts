import { useCallback, useEffect, useState } from "react"

export interface ClusterPermission {
    clusterName: string
    permissions: string[]
}

export interface UsePermissionResult {
    permission: ClusterPermission | null
    has: (permission: string) => boolean
    reload: () => Promise<void>
}

const USER_KEY = "user"

function isAdminFromLocalStorage(): boolean {
    try {
        const raw = localStorage.getItem(USER_KEY)
        if (!raw) return false
        const user = JSON.parse(raw)
        return user?.isAdmin === true || user?.role === "admin"
    } catch {
        return false
    }
}

export function usePermission(clusterName?: string): UsePermissionResult {
    const [permission, setPermission] =
        useState<ClusterPermission | null>(null)

    const isAdmin = isAdminFromLocalStorage()

    const fetchPermission = useCallback(async () => {
        if (!clusterName) {
            setPermission(null)
            return
        }

        try {
            const res = await fetch(
                `/api/user/account/cluster/permission?clusterName=${encodeURIComponent(
                    clusterName
                )}`,
                { credentials: "include" }
            )

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`)
            }

            const json = await res.json()
            const data = json.data
            const permissions = []as string[]
            if (data?.allowAddLevel===true) {
                permissions.push("allowAddLevel")
            }
            if (data?.allowEditingServerIni===true) {
                permissions.push("allowEditingServerIni")
            }
            const perm: ClusterPermission = {
                clusterName: data.clusterName,
                permissions: permissions
            }
            setPermission(perm)
        } catch {
            setPermission(null)
        }
    }, [clusterName])

    useEffect(() => {
        fetchPermission()
    }, [fetchPermission])

    const has = useCallback(
        (p: string): boolean => {
            if (isAdmin) return true
            return permission?.permissions?.includes(p) === true
        },
        [isAdmin, permission]
    )

    return {
        permission,
        has,
        reload: fetchPermission,
    }
}
