import {useEffect, useState} from 'react';
import {Card, Empty, Spin} from 'antd';
import ItemsManager from '../TooManyItemsPlus/ItemsManager';
import {getKv} from '../../api/clusterApi';
import {ProCard} from "@ant-design/pro-components";

export default function RenderCustomCommands() {
    const [data, setData] = useState<Record<string, Record<string, string>>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [hasData, setHasData] = useState<boolean>(false);

    const [tips, setTips] = useState<string | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await getKv('custom-commands');
            if (response.code === 200 && response.data) {
                const jsonString = response.data as string;
                const kvData = JSON.parse(jsonString);
                setTips(kvData['_tips'])
                const itemsData: Record<string, Record<string, string>> = {};
                Object.entries(kvData).forEach(([key, value]) => {
                    if (key !== '_tips') {
                        itemsData[key] = value as Record<string, string>;
                    }
                });
                
                setData(itemsData);
                setHasData(Object.keys(itemsData).length > 0);
            } else {
                setHasData(false);
            }
        } catch (error) {
            console.error('Error loading custom commands:', error);
            if (!(error instanceof SyntaxError)) {
                console.error('加载数据失败');
            }
            setHasData(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <Card>
                <Spin tip="加载中...">
                    <div style={{ height: '300px' }} />
                </Spin>
            </Card>
        );
    }

    if (!hasData) {
        return (
            <ProCard>
                <Empty description="暂无自定义指令数据" />
            </ProCard>
        );
    }

    return (
        <ItemsManager
            dataSource={data}
            isLoading={false}
            filterCategories={[]}
            warningMessage={tips}
        />
    );
}
