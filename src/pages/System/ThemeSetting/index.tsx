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
import { useTranslation } from 'react-i18next';
import { useThemeConfigStore, type ThemeData } from '../../../store/useThemeConfigStore';


type Color = Extract<GetProp<ColorPickerProps, 'value'>, { cleared: any }>;

const defaultData: ThemeData = {
    borderRadius: 6,
    colorPrimary: '#4850F5',
    Button: {
        colorPrimary: '#4850F5',
    },
};


const ThemeSetting: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { themeConfig, setThemeConfig, resetThemeConfig } = useThemeConfigStore();

    const handleReset = () => {
        resetThemeConfig();
        form.setFieldsValue(defaultData);
        message.success(t('setting.theme.reset.ok'));
    };

    return (
        <div style={{ padding: '24px' }}>
            <Space>
                <Input placeholder={t('setting.theme.testInput.placeholder')} />
                <Button type="primary">{t('setting.theme.previewButton')}</Button>
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
                    label={t('setting.theme.colorPrimary')}
                    trigger="onChangeComplete"
                    getValueFromEvent={(color: Color) => color?.toHexString() || '#1677ff'}
                >
                    <ColorPicker presets={[{
                        label: t('setting.theme.presetLabel'),
                        colors: ['#1B6EFC', '#2886FD', "#DD3127", '#E7531D', '#F2A520', '#42B7BA','#61B826', '#234FE5', '#5D33C8'],
                    }]} defaultValue="#1677ff" />
                </Form.Item>
                <Form.Item name="borderRadius" label={t('setting.theme.borderRadius')}>
                    <InputNumber min={0} max={30} />
                </Form.Item>
                <Form.Item label={t('setting.theme.buttonGroup')}>
                    <Form.Item name={['Button', 'algorithm']} valuePropName="checked" label={t('setting.theme.algorithm')}>
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        name={['Button', 'colorPrimary']}
                        label={t('setting.theme.colorPrimary')}
                        trigger="onChangeComplete"
                        getValueFromEvent={(color: Color) => color?.toHexString() || '#00B96B'}
                    >
                        <ColorPicker  presets={[{
                            label: t('setting.theme.presetLabel'),
                            colors: ['#1B6EFC', '#2886FD', "#DD3127", '#E7531D', '#F2A520', '#42B7BA','#61B826', '#234FE5', '#5D33C8'],
                        }]}/>
                    </Form.Item>
                </Form.Item>
                <Form.Item name="submit" wrapperCol={{ offset: 4, span: 20 }}>
                    <Space>
                        <Button type="primary">{t('cluster.save')}</Button>
                        <Button onClick={handleReset}>{t('setting.theme.reset')}</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ThemeSetting;
