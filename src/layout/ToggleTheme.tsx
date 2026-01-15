// @ts-ignore
import {useTheme} from "../hooks/useTheme";
import {MoonOutlined, SunOutlined} from "@ant-design/icons";

export default () => {
    const {theme, toggleTheme} = useTheme();
    return (
        <>
            <div>
                {theme === 'dark' && (<>
                    <div
                        onClick={toggleTheme}
                    >
                        <MoonOutlined />
                    </div>
                </>)}
                {theme !== 'dark' && (
                    <>
                        <div
                            onClick={toggleTheme}
                        >
                            <SunOutlined />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}