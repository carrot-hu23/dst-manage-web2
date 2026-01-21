import React, { useEffect } from 'react';
import {Modal, Form, Input, Radio, Button, Space, message, InputNumber} from 'antd';
import type { ServerConfigTemplate } from '../../../api/clusterApi';

interface ConfigFormProps {
    visible: boolean;
    config?: ServerConfigTemplate;
    onCancel: () => void;
    onSubmit: (config: ServerConfigTemplate) => void;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ visible, config, onCancel, onSubmit }) => {
    const [form] = Form.useForm<ServerConfigTemplate>();
    const [configType, setConfigType] = React.useState<'本地' | '远程'>('本地');

    useEffect(() => {
        if (config) {
            form.setFieldsValue(config);
            setConfigType(config.type);
        } else {
            form.resetFields();
            setConfigType('本地');
        }
    }, [visible, config, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const now = new Date().toISOString();

            if (config) {
                const updatedConfig: ServerConfigTemplate = {
                    ...values,
                    id: config.id,
                    createdAt: config.createdAt,
                    updatedAt: now
                };
                onSubmit(updatedConfig);
            } else {
                const newConfig: ServerConfigTemplate = {
                    ...values,
                    id: `config-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    createdAt: now,
                    updatedAt: now
                };
                onSubmit(newConfig);
            }
        } catch (error) {
            message.error('请检查输入是否正确');
        }
    };

    return (
        <Modal
            title={config ? '编辑服务器配置' : '新建服务器配置'}
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    type: '本地',
                }}
            >
                <Form.Item
                    label="配置名称"
                    name="name"
                    rules={[
                        { required: true, message: '请输入配置名称' },
                        { max: 50, message: '配置名称不能超过50个字符' }
                    ]}
                >
                    <Input placeholder="例如：我的本地服务器" />
                </Form.Item>

                <Form.Item
                    label="配置类型"
                    name="type"
                >
                    <Radio.Group onChange={(e) => setConfigType(e.target.value)}>
                        <Radio value="本地">本地</Radio>
                        <Radio value="远程">远程</Radio>
                    </Radio.Group>
                </Form.Item>

                {configType === '本地' && (
                    <>
                        <Form.Item
                            label="steamcmd 路径"
                            name="steamcmd"
                            rules={[{ required: true, message: '请输入 steamcmd 路径' }]}
                        >
                            <Input placeholder="Windows: C:\\Program Files (x86)\\Steam 或 Linux: /home/username/steamcmd" />
                        </Form.Item>

                        <Form.Item
                            label="饥荒路径"
                            name="force_install_dir"
                            rules={[{ required: true, message: '请输入饥荒路径' }]}
                        >
                            <Input placeholder="Windows: C:\\Program Files\\...\\Don't Starve Together Dedicated Server" />
                        </Form.Item>

                        <Form.Item
                            label="ugc_directory"
                            name="ugc_directory"
                        >
                            <Input placeholder="Windows: C:\\Program Files (x86)\\Steam\\steamapps\\workshop（可选）" />
                        </Form.Item>

                        <Form.Item
                            label="备份路径"
                            name="backup"
                            rules={[{ required: true, message: '请输入备份路径' }]}
                        >
                            <Input placeholder="Windows: D:\\dst_backups 或 Linux: /home/username/dst_backups" />
                        </Form.Item>
                    </>
                )}

                {configType === '远程' && (
                    <>
                        <Form.Item
                            label="IP 地址"
                            name="ip"
                            rules={[
                                { required: true, message: '请输入 IP 地址' },
                                { pattern: /^(\d{1,3}\.){3}\d{1,3}$|^\[?[0-9a-fA-F:]+\]?$/, message: '请输入有效的 IP 地址' }
                            ]}
                        >
                            <Input placeholder="例如：123.45.67.89" />
                        </Form.Item>

                        <Form.Item
                            label="端口"
                            name="port"
                            rules={[
                                { required: true, message: '请输入端口' },
                                { type: 'number', min: 1, max: 65535, message: '端口范围 1-65535' }
                            ]}
                        >
                            <InputNumber placeholder="例如：8080" />
                        </Form.Item>

                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password placeholder="请输入密码" />
                        </Form.Item>
                    </>
                )}

                <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                    <Space>
                        <Button onClick={onCancel}>取消</Button>
                        <Button type="primary" onClick={handleSubmit}>
                            保存
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ConfigForm;
