import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Input, Empty, Col, message, Segmented, Space, Row } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { ServerConfigTemplate } from '../../../api/clusterApi';
import { getServerConfigTemplates, saveServerConfigTemplates } from '../../../api/clusterApi';
import ConfigCard from './ConfigCard';
import ConfigForm from './ConfigForm';

const ServerConfig: React.FC = () => {
    const [configList, setConfigList] = useState<ServerConfigTemplate[]>([]);
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [editingConfig, setEditingConfig] = useState<ServerConfigTemplate | undefined>();
    const [filterType, setFilterType] = useState<'全部' | '本地' | '远程'>('全部');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        loadConfigs();
    }, []);

    const loadConfigs = async () => {
        setLoading(true);
        try {
            const response = await getServerConfigTemplates();
            if (response.code === 200) {
                if (response.data !== '') {
                    setConfigList(JSON.parse(response.data) as ServerConfigTemplate[] || []);
                }
            } else {
                message.error('获取配置列表失败');
            }
        } catch (error) {
            console.log(error)
            message.error('获取配置列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingConfig(undefined);
        setFormVisible(true);
    };

    const handleEdit = (config: ServerConfigTemplate) => {
        setEditingConfig(config);
        setFormVisible(true);
    };

    const handleDelete = async (configId: string) => {
        try {
            const newList = configList.filter(c => c.id !== configId);
            const response = await saveServerConfigTemplates(JSON.stringify(newList));
            if (response.code === 200) {
                setConfigList(newList);
                message.success('删除成功');
            } else {
                message.error('删除失败');
            }
        } catch (error) {
            message.error('删除失败');
        }
    };

    const handleSubmit = async (config: ServerConfigTemplate) => {
        try {
            let newList: ServerConfigTemplate[];

            if (editingConfig) {
                newList = configList.map(c => c.id === editingConfig.id ? config : c);
            } else {
                newList = [...configList, config];
            }

            const response = await saveServerConfigTemplates(JSON.stringify(newList));
            if (response.code === 200) {
                setConfigList(newList);
                setFormVisible(false);
                message.success(editingConfig ? '更新成功' : '创建成功');
            } else {
                message.error(editingConfig ? '更新失败' : '创建失败');
            }
        } catch (error) {
            message.error(editingConfig ? '更新失败' : '创建失败');
        }
    };

    const filteredConfigs = configList.filter(config => {
        const matchType = filterType === '全部' || config.type === filterType;
        const matchSearch = searchText === '' ||
            config.name.toLowerCase().includes(searchText.toLowerCase()) ||
            (config.type === '本地' && config.steamcmd?.toLowerCase().includes(searchText.toLowerCase())) ||
            (config.type === '远程' && config.ip?.toLowerCase().includes(searchText.toLowerCase()));
        return matchType && matchSearch;
    });

    return (
        <PageContainer
            title="服务器配置管理"
            extra={[
                <Button
                    key="create"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreate}
                >
                    新建配置
                </Button>
            ]}
        >
            <div>
                <div style={{ marginBottom: 24 }}>
                    <Space size="middle" wrap>
                        <Segmented
                            options={['全部', '本地', '远程']}
                            value={filterType}
                            onChange={(value) => setFilterType(value as '全部' | '本地' | '远程')}
                        />
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="搜索配置名称、IP 或路径"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 300 }}
                            allowClear
                        />
                    </Space>
                </div>

                {filteredConfigs.length === 0 && !loading ? (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无配置模板，点击上方 新建配置 按钮创建"
                    />
                ) : (
                    <Row gutter={[16, 16]}>
                        {filteredConfigs.map(config => (
                            <Col xs={24} sm={12} md={8} key={config.id}>
                                <ConfigCard
                                    config={config}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </Col>
                        ))}
                    </Row>
                )}

                <ConfigForm
                    visible={formVisible}
                    config={editingConfig}
                    onCancel={() => setFormVisible(false)}
                    onSubmit={handleSubmit}
                />
            </div>
        </PageContainer>
    );
};

export default ServerConfig;
