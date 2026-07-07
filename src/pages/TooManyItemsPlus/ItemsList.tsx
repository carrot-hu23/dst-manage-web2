import {Button, message, Space} from "antd";
import {sendCommandApi} from "../../api/commdApi.ts";
import {useParams} from "react-router-dom";
import {useState} from "react";

interface ItemListProps {
    levelName: string,
    items: Record<string, string>
    kuId?: string,
    amount?: number
}

export default function ItemList(itemListProps: ItemListProps) {
    const {cluster} = useParams();
    const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

    function give(levelName: string, prefab: string, amount: number, kuId: string) {
        setLoadingItems(prev => new Set(prev).add(prefab));

        const command = `ThePlayer = UserToPlayer(\"${kuId}\")   c_give(\"${prefab}\", ${amount}) ThePlayer = nil`
        sendCommandApi(cluster || "", levelName, command)
            .then(resp => {
                if (resp.code === 200) {
                    message.success(`成功发送 ${itemListProps.items[prefab]} x${amount}`);
                } else {
                    message.error("发送失败");
                }
            })
            .catch(() => {
                message.error("发送失败");
            })
            .finally(() => {
                setLoadingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(prefab);
                    return newSet;
                });
            });
    }

    const isDisabled = !itemListProps.kuId || !itemListProps.levelName;

    return (
        <Space wrap size={16}>
            {Object.keys(itemListProps.items).map(itemKey => {
                const isLoading = loadingItems.has(itemKey);
                return (
                    <Button
                        key={itemKey}
                        onClick={() => {
                            give(itemListProps.levelName, itemKey, itemListProps.amount || 1, itemListProps.kuId || "")
                        }}
                        loading={isLoading}
                        disabled={isDisabled}
                    >
                        {itemListProps.items[itemKey] !== '未翻译' ? itemListProps.items[itemKey] : itemKey}
                    </Button>
                );
            })}
        </Space>
    );
}