import { create } from 'zustand';

export interface ThemeData {
    borderRadius: number;
    colorPrimary: string;
    Button?: {
        colorPrimary: string;
        algorithm?: boolean;
    };
}

interface ThemeConfigState {
    themeConfig: ThemeData;
    setThemeConfig: (config: ThemeData) => void;
    resetThemeConfig: () => void;
}

const defaultData: ThemeData = {
    borderRadius: 6,
    colorPrimary: '#1677ff',
    Button: {
        colorPrimary: '#1677ff',
    },
};

const loadFromStorage = (): ThemeData => {
    try {
        const stored = localStorage.getItem('themeConfig');
        if (stored) {
            return { ...defaultData, ...JSON.parse(stored) };
        }
    } catch (e) {
        console.error('Failed to parse theme config from localStorage', e);
    }
    return defaultData;
};

export const useThemeConfigStore = create<ThemeConfigState>((set) => ({
    themeConfig: loadFromStorage(),
    setThemeConfig: (config: ThemeData) => {
        set(() => {
            localStorage.setItem('themeConfig', JSON.stringify(config));
            return { themeConfig: config };
        });
    },
    resetThemeConfig: () => {
        set(() => {
            localStorage.setItem('themeConfig', JSON.stringify(defaultData));
            return { themeConfig: defaultData };
        });
    },
}));
