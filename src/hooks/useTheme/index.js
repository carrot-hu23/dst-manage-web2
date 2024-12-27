"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = useTheme;
exports.ThemeProvider2 = ThemeProvider2;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
// 创建主题上下文
var ThemeContext = (0, react_1.createContext)();
// 自定义 Hook
function useTheme() {
    return (0, react_1.useContext)(ThemeContext);
}
// ThemeProvider 组件
function ThemeProvider2(_a) {
    // const [theme, setTheme] = useState('light'); // 默认主题为 'light'
    //
    // // 切换主题
    // const toggleTheme = () => {
    //     setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    // };
    //
    // // 将主题和切换方法传递给子组件
    // const themeContextValue = {
    //     theme,
    //     toggleTheme,
    // };
    var children = _a.children;
    var _b = (0, react_1.useState)(function () {
        var storedTheme = localStorage.getItem('theme');
        return storedTheme || 'dark';
    }), theme = _b[0], setTheme = _b[1];
    (0, react_1.useEffect)(function () {
        localStorage.setItem('theme', theme);
    }, [theme]);
    var toggleTheme = function () {
        setTheme(function (prevTheme) { return (prevTheme === 'light' ? 'dark' : 'light'); });
    };
    var themeContextValue = {
        theme: theme,
        toggleTheme: toggleTheme,
    };
    return ((0, jsx_runtime_1.jsx)(ThemeContext.Provider, { value: themeContextValue, children: children }));
}
