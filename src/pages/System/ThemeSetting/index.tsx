import React from 'react';
import {
    Button,
    ColorPicker,
    Divider,
    Form,
    InputNumber,
    Space,
    Switch,
    message, Input,
} from 'antd';
import type { ColorPickerProps, GetProp } from 'antd';
import { useThemeConfigStore, type ThemeData } from '../../../store/useThemeConfigStore';


type Color = Extract<GetProp<ColorPickerProps, 'value'>, { cleared: any }>;

const defaultData: ThemeData = {
    borderRadius: 6,
    colorPrimary: '#1677ff',
    Button: {
        colorPrimary: '#1677ff',
    },
};


const ThemeSetting: React.FC = () => {
    const [form] = Form.useForm();
    const { themeConfig, setThemeConfig, resetThemeConfig } = useThemeConfigStore();

    const handleReset = () => {
        resetThemeConfig();
        form.setFieldsValue(defaultData);
        message.success('Theme reset to default');
    };

    return (
        <div style={{ padding: '24px' }}>
            <Space>
                <Input placeholder="Test input" />
                <Button type="primary">Preview Button</Button>
            </Space>
            <Divider />
            <Form
                form={form}
                onValuesChange={(_, allValues) => {
                    setThemeConfig({
                        ...allValues,
                    });
                }}
                name="theme"
                initialValues={themeConfig}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item
                    name="colorPrimary"
                    label="Primary Color"
                    trigger="onChangeComplete"
                    getValueFromEvent={(color: Color) => color?.toHexString() || '#1677ff'}
                >
                    <ColorPicker presets={[{
                        label: '主题色',
                        colors: ['#1B6EFC', '#2886FD', "#DD3127", '#E7531D', '#F2A520', '#42B7BA','#61B826', '#234FE5', '#5D33C8'],
                    }]} defaultValue="#1677ff" />
                </Form.Item>
                <Form.Item name="borderRadius" label="Border Radius">
                    <InputNumber min={0} max={30} />
                </Form.Item>
                <Form.Item label="Button">
                    <Form.Item name={['Button', 'algorithm']} valuePropName="checked" label="Algorithm">
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        name={['Button', 'colorPrimary']}
                        label="Primary Color"
                        trigger="onChangeComplete"
                        getValueFromEvent={(color: Color) => color?.toHexString() || '#00B96B'}
                    >
                        <ColorPicker  presets={[{
                            label: '主题色',
                            colors: ['#1B6EFC', '#2886FD', "#DD3127", '#E7531D', '#F2A520', '#42B7BA','#61B826', '#234FE5', '#5D33C8'],
                        }]}/>
                    </Form.Item>
                </Form.Item>
                <Form.Item name="submit" wrapperCol={{ offset: 4, span: 20 }}>
                    <Space>
                        <Button type="primary">Save</Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ThemeSetting;
