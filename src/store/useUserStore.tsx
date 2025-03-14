// src/store/userStore.ts
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

// 用户信息类型定义
interface UserInfo {
    displayName: string;
    photoURL: string;
    role: string;
    username: string;
    permission?: {
        allowAddLevel?: string,
        allowEditingServerIni?: string
    }
}

interface UserState {
    userInfo: UserInfo | null;
    isLoggedIn: boolean;
    login: (userData: UserInfo) => void;
    logout: () => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userInfo: null,
            isLoggedIn: false,

            // 登录方法
            login: (userData) => set({
                userInfo: userData,
                isLoggedIn: true
            }),

            // 退出方法
            logout: () => set({
                userInfo: null,
                isLoggedIn: false
            }),
        }),
        {
            name: 'user-storage', // 存储键名
            storage: createJSONStorage(() => localStorage),

            // 可选：仅持久化必要字段
            partialize: (state) => ({
                userInfo: state.userInfo,
                isLoggedIn: state.isLoggedIn
            }),
        }
    )
);

export default useUserStore;