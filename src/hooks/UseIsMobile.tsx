import { useState, useEffect } from "react";

// 定义断点常量
const MOBILE_BREAKPOINT = 768;

/**
 * 自定义 Hook：判断当前屏幕宽度是否为移动端
 * @returns 是否为移动端 (boolean)
 */
const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= MOBILE_BREAKPOINT);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        // 添加窗口 resize 事件监听
        window.addEventListener("resize", handleResize);

        // 初始化时立即检查
        handleResize();

        // 清理事件监听器
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isMobile;
};

export default useIsMobile;
