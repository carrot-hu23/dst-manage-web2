import {useEffect, useState} from 'react';
import {Form, Input, Button, message, Space, Card, Empty, Dropdown} from 'antd';
import {PlusOutlined, MinusCircleOutlined, UploadOutlined, ExportOutlined, DownOutlined} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';
import {getKv, saveKv} from '../../api/clusterApi';
import {ProCard} from "@ant-design/pro-components";
import RemoteImportModal from '../../components/RemoteImportModal';

export default function CustomCommands() {
    const {t} = useTranslation();
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
                message.error(t('customCommands.load.error'));
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
            message.success(t('customCommands.save.ok'));
        } catch (error) {
            console.error('Error saving custom commands:', error);
            message.error(t('customCommands.save.error'));
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
                message.error(t('customCommands.import.jsonError'));
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
        message.success(t('customCommands.import.ok'));
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
            message.success(t('customCommands.export.ok'));
        } catch (error) {
            console.error('Error exporting JSON:', error);
            message.error(t('customCommands.export.error'));
        }
    };

    return (
        <div>
            <ProCard title={t('customCommands.title')} loading={loading}>
                <Form form={form} layout="vertical">
                    <Form.Item name="tips" label={t('customCommands.tips.label')}>
                        <Input.TextArea placeholder={t('customCommands.tips.placeholder')} rows={2}/>
                    </Form.Item>

                    <Form.List name="categories" initialValue={[]}>
                        {(fields, {add, remove}) => (
                            <>
                                {fields.length === 0 && <Empty description={t('customCommands.empty')}/>}

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
                                                {t('customCommands.category.delete')}
                                            </Button>
                                        }
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'key']}
                                            label={t('customCommands.category.key.label')}
                                            rules={[{required: true, message: t('customCommands.category.key.required')}]}
                                        >
                                            <Input placeholder={t('customCommands.category.key.placeholder')}/>
                                        </Form.Item>

                                        <Form.Item label={t('customCommands.items.label')}>
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
                                                                    rules={[{required: true, message: t('customCommands.item.key.required')}]}
                                                                    style={{marginBottom: 0}}
                                                                >
                                                                    <Input placeholder={t('customCommands.item.key.placeholder')}
                                                                           style={{width: '200px'}}/>
                                                                </Form.Item>

                                                                <Form.Item
                                                                    {...restItemField}
                                                                    name={[itemName, 'name']}
                                                                    rules={[{
                                                                        required: true,
                                                                        message: t('customCommands.item.name.required')
                                                                    }]}
                                                                    style={{marginBottom: 0}}
                                                                >
                                                                    <Input placeholder={t('customCommands.item.name.placeholder')}
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
                                                            {t('customCommands.item.add')}
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
                                    {t('customCommands.category.add')}
                                </Button>
                            </>
                        )}
                    </Form.List>

                    <Space wrap>
                        <Button type="primary" onClick={saveData}>
                            {t('cluster.save')}
                        </Button>

                        <Button icon={<ExportOutlined/>} onClick={handleExportJson}>
                            {t('customCommands.export.button')}
                        </Button>

                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: 'local',
                                        label: t('customCommands.import.local'),
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
                                        label: t('customCommands.import.remote'),
                                        onClick: () => setRemoteImportOpen(true)
                                    }
                                ]
                            }}
                        >
                            <Button icon={<UploadOutlined/>}>
                                {t('customCommands.import.button')} <DownOutlined/>
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
