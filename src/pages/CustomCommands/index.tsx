import {useEffect, useState} from 'react';
import {Form, Input, Button, message, Space, Card, Empty, Dropdown} from 'antd';
import {PlusOutlined, MinusCircleOutlined, UploadOutlined, ExportOutlined, DownOutlined} from '@ant-design/icons';
import {getKv, saveKv} from '../../api/clusterApi';
import {ProCard} from "@ant-design/pro-components";
import RemoteImportModal from '../../components/RemoteImportModal';

export default function CustomCommands() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [remoteImportOpen, setRemoteImportOpen] = useState<boolean>(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await getKv('custom-commands');
            if (response.code === 200 && response.data) {
                const jsonString = response.data as string;
                const data = JSON.parse(jsonString);
                const tips = data._tips || '';

                const categoriesList = Object.entries(data)
                    .filter(([key]) => key !== '_tips')
                    .map(([key, value]) => {
                        const categoryData = value as Record<string, string> | { data?: Record<string, string> };
                        const items = (categoryData as any).data
                            ? Object.entries((categoryData as any).data).map(([itemKey, itemName]) => ({
                                key: itemKey,
                                name: itemName
                            }))
                            : Object.entries(categoryData).map(([itemKey, itemName]) => ({
                                key: itemKey,
                                name: itemName
                            }));
                        return {
                            key,
                            items
                        };
                    });

                form.setFieldValue('tips', tips);
                form.setFieldValue('categories', categoriesList);
            }
        } catch (error) {
            console.error('Error loading custom commands:', error);
            if (!(error instanceof SyntaxError)) {
                message.error('加载数据失败');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const saveData = async () => {
        try {
            const values = await form.validateFields();
            const categoriesMap: Record<string, Record<string, string>> = {};

            values.categories.forEach((cat: {
                key: string;
                items: Array<{ key: string; name: string }>
            }) => {
                const data: Record<string, string> = {};
                cat.items.forEach((item: { key: string; name: string }) => {
                    data[item.key] = item.name;
                });
                categoriesMap[cat.key] = data;
            });

            const savedData = values.tips ? { _tips: values.tips, ...categoriesMap } : categoriesMap;

            await saveKv({
                key: 'custom-commands',
                value: JSON.stringify(savedData)
            });
            message.success('保存成功');
        } catch (error) {
            console.error('Error saving custom commands:', error);
            message.error('保存失败');
        }
    };

    const handleImportJson = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonContent = e.target?.result as string;
                const importedData = JSON.parse(jsonContent);

                handleMergeImportData(importedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                message.error('JSON格式错误，导入失败');
            }
        };
        reader.readAsText(file);
    };

    const handleMergeImportData = (importedData: any) => {
        if (importedData._tips) {
            form.setFieldValue('tips', importedData._tips);
        }

        const currentCategories = form.getFieldValue('categories') || [];
        const newCategories = Object.entries(importedData)
            .filter(([key]) => key !== '_tips')
            .map(([key, items]) => {
                const itemData = (items as any).data || items;
                return {
                    key,
                    items: Object.entries(itemData as Record<string, string>).map(([itemKey, itemName]) => ({
                        key: itemKey,
                        name: itemName
                    }))
                };
            });

        form.setFieldValue('categories', [...currentCategories, ...newCategories]);
        message.success('导入成功');
    };

    const handleExportJson = async () => {
        try {
            const values = await form.validateFields();
            const categoriesMap: Record<string, Record<string, string>> = {};

            values.categories.forEach((cat: {
                key: string;
                items: Array<{ key: string; name: string }>
            }) => {
                const data: Record<string, string> = {};
                cat.items.forEach((item: { key: string; name: string }) => {
                    data[item.key] = item.name;
                });
                categoriesMap[cat.key] = data;
            });

            const exportedData = values.tips ? { _tips: values.tips, ...categoriesMap } : categoriesMap;
            const jsonString = JSON.stringify(exportedData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'dst-custom-commands.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            message.success('导出成功');
        } catch (error) {
            console.error('Error exporting JSON:', error);
            message.error('导出失败');
        }
    };

    return (
        <div>
            <ProCard title="自定义命令管理" loading={loading}>
                <Form form={form} layout="vertical">
                    <Form.Item name="tips" label="提示信息">
                        <Input.TextArea placeholder="请输入提示信息（可选）" rows={2}/>
                    </Form.Item>

                    <Form.List name="categories" initialValue={[]}>
                        {(fields, {add, remove}) => (
                            <>
                                {fields.length === 0 && <Empty description="暂无自定义命令"/>}

                                {fields.map(({key, name, ...restField}) => (
                                    <Card
                                        key={key}
                                        size="small"
                                        style={{marginBottom: '16px'}}
                                        extra={
                                            <Button
                                                type="text"
                                                danger
                                                icon={<MinusCircleOutlined/>}
                                                onClick={() => remove(name)}
                                            >
                                                删除分类
                                            </Button>
                                        }
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'key']}
                                            label="分类Key"
                                            rules={[{required: true, message: '请输入分类Key'}]}
                                        >
                                            <Input placeholder="例如: itemlist_custom"/>
                                        </Form.Item>

                                        <Form.Item label="物品列表">
                                            <Form.List name={[name, 'items']} initialValue={[]}>
                                                {(itemFields, {add: addItem, remove: removeItem}) => (
                                                    <div style={{marginLeft: '16px'}}>
                                                        {itemFields.map(({
                                                                               key: itemKey,
                                                                               name: itemName,
                                                                               ...restItemField
                                                                           }) => (
                                                            <Space key={itemKey} style={{marginBottom: '8px'}}
                                                                   align="baseline">
                                                                <Form.Item
                                                                    {...restItemField}
                                                                    name={[itemName, 'key']}
                                                                    rules={[{required: true, message: '请输入物品Key'}]}
                                                                    style={{marginBottom: 0}}
                                                                >
                                                                    <Input placeholder="物品Key"
                                                                           style={{width: '200px'}}/>
                                                                </Form.Item>

                                                                <Form.Item
                                                                    {...restItemField}
                                                                    name={[itemName, 'name']}
                                                                    rules={[{
                                                                        required: true,
                                                                        message: '请输入物品名称'
                                                                    }]}
                                                                    style={{marginBottom: 0}}
                                                                >
                                                                    <Input placeholder="物品名称"
                                                                           style={{width: '200px'}}/>
                                                                </Form.Item>

                                                                <Button
                                                                    type="text"
                                                                    danger
                                                                    icon={<MinusCircleOutlined/>}
                                                                    onClick={() => removeItem(itemName)}
                                                                />
                                                            </Space>
                                                        ))}

                                                        <Button
                                                            type="dashed"
                                                            onClick={() => addItem({key: '', name: ''})}
                                                            block
                                                            icon={<PlusOutlined/>}
                                                            style={{marginBottom: '16px'}}
                                                        >
                                                            添加物品
                                                        </Button>
                                                    </div>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add({key: '', items: []})}
                                    block
                                    icon={<PlusOutlined/>}
                                    style={{marginBottom: '24px'}}
                                >
                                    添加分类
                                </Button>
                            </>
                        )}
                    </Form.List>

                    <Space wrap>
                        <Button type="primary" onClick={saveData}>
                            保存
                        </Button>

                        <Button icon={<ExportOutlined/>} onClick={handleExportJson}>
                            导出JSON
                        </Button>

                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: 'local',
                                        label: '导入本地JSON',
                                        onClick: () => {
                                            const input = document.createElement('input');
                                            input.type = 'file';
                                            input.accept = '.json';
                                            input.addEventListener('change', (e: Event) => {
                                                const target = e.target as HTMLInputElement;
                                                const file = target.files?.[0];
                                                if (file) {
                                                    handleImportJson(file);
                                                }
                                            });
                                            input.click();
                                        }
                                    },
                                    {
                                        key: 'remote',
                                        label: '选择远程模板',
                                        onClick: () => setRemoteImportOpen(true)
                                    }
                                ]
                            }}
                        >
                            <Button icon={<UploadOutlined/>}>
                                导入 <DownOutlined/>
                            </Button>
                        </Dropdown>
                    </Space>

                    <RemoteImportModal
                        open={remoteImportOpen}
                        onCancel={() => setRemoteImportOpen(false)}
                        onImport={handleMergeImportData}
                    />
                </Form>
            </ProCard>
        </div>
    );
}
