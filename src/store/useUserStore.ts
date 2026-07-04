import { create } from 'zustand';
import { message } from 'antd';
import { http } from '../utils/http';

export interface User {
    displayName: string;
    photoURL: string;
    username: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
    initialized: boolean;
    fetchUser: () => Promise<void>;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,
    initialized: false,

    fetchUser: async () => {
        set({ loading: true });

        try {
            const response = await http.get<{
                code: number;
                msg: string;
                data: User;
            }>('/api/user');

            const result = response.data;
            if (result.code === 200 && result.data) {
                set({ user: result.data, loading: false, initialized: true });
            } else {
                set({ user: null, loading: false, initialized: true });
            }
        } catch (err: any) {
            const status = err.response?.status;

            // 401 会被 http 拦截器处理，自动跳转登录页
            // 这里只处理 500 错误
            if (status === 500) {
                message.warning('获取用户信息失败');
            }

            set({ user: null, loading: false, initialized: true });
        }
    },

    clearUser: () => {
        set({ user: null, loading: false, initialized: false });
    },
}));
