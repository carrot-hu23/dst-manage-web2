import {Tabs} from "antd";
import LevelExport from "./LevelExport";
import LevelImport from "./LevelImport";

export default ()=>{

    const items = [
        {
            label: '世界配置导出',
            children: <div>
                <LevelExport />
            </div>,
            key: '1',
        },
        {
            label: '世界配置导入',
            children: <LevelImport />,
            key: '2',
            forceRender: true,
        },
    ]

    return(
        <>
            <Tabs items={items} />
        </>
    )
}