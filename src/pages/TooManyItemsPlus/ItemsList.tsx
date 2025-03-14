import {Button, message, Space} from "antd";
import {sendCommandApi} from "../../api/commdApi.ts";
import {useParams} from "react-router-dom";

interface ItemListProps {
    items: Record<string, string>
    kuId?: string,
    amount?: number
}

export default function ItemList(itemListProps: ItemListProps) {
    const {cluster} = useParams()

    function give(prefab: string, amount: number, kuId: string) {
        const command = `ThePlayer = UserToPlayer(\\"${kuId}\\")   c_give(\\"${prefab}\\", ${amount}) ThePlayer = nil`
        sendCommandApi(cluster || "", "Master", command)
            .then(resp =>{
                if (resp.code === 200) {
                    message.success("发送成功")
                } else {
                    message.warning("发送失败")
                }
            })
    }

    return (
        <>
            <Space wrap size={16}>
                {Object.keys(itemListProps.items).map(itemKey => (
                    <Button key={itemKey} type={'primary'} onClick={() => {
                        give(itemKey, itemListProps.amount || 1, itemListProps.kuId || "")
                    }}>
                        {itemListProps.items[itemKey] != '未翻译' ? itemListProps.items[itemKey] : itemKey}
                    </Button>
                ))}
            </Space>
        </>
    )
}