import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// 定义主题类型
type Theme = 'light' | 'dark';

// 定义上下文值的类型
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// 创建主题上下文，提供默认值
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 自定义 Hook
export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// 定义 ThemeProvider2 组件的 props 类型
interface ThemeProviderProps {
    children: ReactNode;
}

// ThemeProvider 组件
export function ThemeProvider2({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        return storedTheme ?? 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const themeContextValue: ThemeContextType = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
