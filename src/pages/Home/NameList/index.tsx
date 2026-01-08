import {useEffect, useState, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {Button, Input, Form, Skeleton, message, Typography, Row, Col, Space, Upload} from 'antd';
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {useParams} from "react-router-dom";
import type { PlayerListResponse, ApiResponse } from "../../../type";

const {Title, Paragraph} = Typography;

interface NameListProps {
    title: string;
    tips: string;
    getApi: (cluster: string) => Promise<ApiResponse<PlayerListResponse>>;
    saveApi: (cluster: string, list: PlayerListResponse) => Promise<ApiResponse<void>>;
}

interface ReadTxtFileProps {
    form: any;
}

const ReadTxtFileWithAntd: React.FC<ReadTxtFileProps> = ({ form }) => {
    const [, setFileLines] = useState<string[]>([]);

    const handleBeforeUpload = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target?.result as string;
            const lines = fileContent
                .split('\n')
                .filter((line) => line.trim() !== '');
            console.log(lines);
            setFileLines(lines);
            let list = form.getFieldValue("list");
            if (!list) {
                list = [];
            }
            form.setFieldsValue({
                list: [...list, ...lines]
            });
        };
        reader.readAsText(file);
        return false;
    }, [form]);

    return (
        <>
            <Upload
                accept={'.txt'}
                beforeUpload={handleBeforeUpload}
                showUploadList={false}
                style={{
                }}
            >
                <Button type={'primary'} icon={<UploadOutlined/>}>选择文件</Button>
            </Upload>
        </>
    );
};

const NameList: React.FC<NameListProps> = ({ title, tips, getApi, saveApi }) => {

    const {t} = useTranslation();
    const {cluster} = useParams<{cluster?: string}>();

    const [loading, setLoading] = useState<boolean>(false);
    const [spin, setSpin] = useState<boolean>(false);
    const [form] = Form.useForm();
    const lines = tips.split("\n");

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getApi(cluster || "");
            const data = response.data;
            form.setFieldsValue({
                list: data
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [cluster, getApi, form]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const saveData = useCallback(async (payload: PlayerListResponse) => {
        setSpin(true);
        try {
            const response = await saveApi("", payload);
            const code = response.code;
            if (code === 200) {
                message.success(t('cluster.save.ok'));
            } else {
                message.warning(t('cluster.save.error'));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setSpin(false);
        }
    }, [saveApi, t]);

    const onFinish = (values: { list: PlayerListResponse }) => {
        console.log('Received values of form:', values);
        saveData(values.list);
    };

    return (
        <>
            <div>
                <Skeleton loading={loading} active avatar>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <Form
                                form={form}
                                onFinish={onFinish}
                                layout={'vertical'}
                            >
                                <Title level={4}>
                                    {title}
                                </Title>
                                {lines.map((line, index) => (
                                    <span key={index}>
                                        <Paragraph>{line}</Paragraph>
                                    </span>
                                ))}
                                <Form.List
                                    name="list"
                                    rules={[
                                        {
                                            validator: async () => {
                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, { add, remove }) => (
                                        <>
                                            <Form.Item>
                                                <Space wrap size={16}>
                                                    <Button type="primary" htmlType="submit" loading={spin}>
                                                        保存
                                                    </Button>
                                                    <Button
                                                        type={'primary'}
                                                        onClick={() => add()}
                                                        icon={<PlusOutlined/>}
                                                    >
                                                        添加
                                                    </Button>
                                                    <ReadTxtFileWithAntd form={form}/>
                                                </Space>
                                            </Form.Item>
                                            <div className={'scrollbar'} style={{
                                            }}>
                                                {fields.reverse().map((field) => (
                                                    <Form.Item
                                                        required={false}
                                                        key={field.key}
                                                    >
                                                        <Form.Item
                                                            {...field}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[
                                                                {
                                                                        required: true,
                                                                        whitespace: true,
                                                                        message: "Please input passenger's name or delete this field.",
                                                                    },
                                                            ]}
                                                            noStyle
                                                        >
                                                            <Input
                                                                placeholder="请输入 Ku_xxx"
                                                                style={{
                                                                    width: '80%',
                                                                }}
                                                            />
                                                        </Form.Item>
                                                        {<MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                        />}
                                                    </Form.Item>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </Form.List>
                                <br/>
                                <br/>
                            </Form>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
        </>
    );
};

export default NameList;
