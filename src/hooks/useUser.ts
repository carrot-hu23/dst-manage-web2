import { useCallback, useState } from "react"

export interface User {
    id?: number
    username: string
    role?: string
    isAdmin?: boolean
}

interface UseUserResult {
    user: User | null
    getUser: () => User | null
    isAdmin: boolean
    logout: () => void
}

const USER_KEY = "user"
const TOKEN_KEY = "token"

export function useUser(): UseUserResult {
    const [user, setUser] = useState<User | null>(() => {
        const raw = localStorage.getItem(USER_KEY)
        if (!raw) return null
        try {
            return JSON.parse(raw)
        } catch {
            return null
        }
    })

    const getUser = useCallback((): User | null => {
        const raw = localStorage.getItem(USER_KEY)
        if (!raw) {
            setUser(null)
            return null
        }

        try {
            const parsed: User = JSON.parse(raw)
            setUser(parsed)
            return parsed
        } catch {
            setUser(null)
            return null
        }
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
        setUser(null)
    }, [])

    // ✅ 统一管理员判断
    const isAdmin =
        !!user &&
        (user.isAdmin === true || user.role === "admin")

    return {
        user,
        getUser,
        isAdmin,
        logout,
    }
}
