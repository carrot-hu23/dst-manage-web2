import React from 'react';
import { Tag, Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EnvironmentOutlined, CloudOutlined } from '@ant-design/icons';
import type { ServerConfigTemplate } from '../../../api/clusterApi';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {ProCard} from "@ant-design/pro-components";

interface ConfigCardProps {
    config: ServerConfigTemplate;
    onEdit: (config: ServerConfigTemplate) => void;
    onDelete: (configId: string) => void;
}

const ConfigCard: React.FC<ConfigCardProps> = ({ config, onEdit, onDelete }) => {
    const getIcon = () => {
        return config.type === '本地' ? <EnvironmentOutlined style={{ fontSize: 24 }} /> : <CloudOutlined style={{ fontSize: 24 }} />;
    };

    const getTypeColor = () => {
        return config.type === '本地' ? 'blue' : 'green';
    };

    const formatTime = (time: string) => {
        return dayjs(time).locale('zh-cn').format('YYYY-MM-DD HH:mm');
    };

    return (
        <ProCard>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ color: '#1890ff' }}>{getIcon()}</div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ fontSize: 16, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {config.name}
                        </div>
                        <Tag color={getTypeColor()} style={{ marginTop: 4 }}>
                            {config.type}
                        </Tag>
                    </div>
                </div>

                {config.type === '本地' && (
                    <div style={{ fontSize: 12, color: '#666' }}>
                        <div>steamcmd: {config.steamcmd ? '已配置' : '未配置'}</div>
                        <div>饥荒路径: {config.force_install_dir ? '已配置' : '未配置'}</div>
                    </div>
                )}

                {config.type === '远程' && (
                    <div style={{ fontSize: 12, color: '#666' }}>
                        <div>IP: {config.ip}</div>
                        <div>端口: {config.port}</div>
                    </div>
                )}

                <div style={{ fontSize: 12, color: '#999' }}>
                    更新时间: {formatTime(config.updatedAt)}
                </div>
            </Space>
            <br/><br/>
            <Space wrap size={16}>
                <Button
                    key="edit"
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(config)}
                >
                    编辑
                </Button>
                <Popconfirm
                    key="delete"
                    title="确认删除"
                    description="确定要删除这个配置模板吗？"
                    onConfirm={() => onDelete(config.id)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button type="link" danger icon={<DeleteOutlined />}>
                        删除
                    </Button>
                </Popconfirm>
            </Space>
        </ProCard>
    );
};

export default ConfigCard;
