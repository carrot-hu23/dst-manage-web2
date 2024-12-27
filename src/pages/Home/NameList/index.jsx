import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Input, Form, Skeleton, message, Typography, Grid, Row, Col, Space, Upload} from 'antd';
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';

const {Title, Paragraph} = Typography

import './index.css';

export default ({title, tips, getApi, saveApi}) => {
    const {t} = useTranslation()
    const [loading, setLoading] = useState(false);
    const [spin, setSpin] = useState(false);
    const [form] = Form.useForm()
    const lines = tips.split("\n")
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await getApi();
            const data = await response.data;
            form.setFieldsValue({
                list: data
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };

    const saveData = async (payload) => {
        setSpin(true)
        try {
            const response = await saveApi("", payload);
            const code = await response.code;
            if (code === 200) {
                message.success(t('cluster.save.ok'))
            } else {
                message.warning(t('cluster.save.error'))
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setSpin(false)
        }
    }

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        saveData(values.list)
    }

    const ReadTxtFileWithAntd = ({form}) => {
        const [fileLines, setFileLines] = useState([]);
        const handleBeforeUpload = (file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const lines = fileContent
                    .split('\n') // 按行分割
                    .filter((line) => line.trim() !== ''); // 过滤空行（包括只有空格的行）
                console.log(lines)
                setFileLines(lines); // 设置拆分后的每一行内容
                let list = form.getFieldValue("list")
                if (!list){
                    list = []
                }
                form.setFieldsValue({
                    list: [...list, ...lines]
                })
            };
            reader.readAsText(file); // 以文本形式读取文件
            return false; // 阻止自动上传
        };

        return (
            <>
                <Upload
                    accept={'.txt'}
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false} // 隐藏默认文件列表
                    style={{

                    }}
                >
                    <Button type={'primary'} icon={<UploadOutlined/>}>选择文件</Button>
                </Upload>
            </>
        );
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
                                            // eslint-disable-next-line consistent-return
                                            validator: async (_, names) => {
                                                // if (!names || names.length < 1) {
                                                //     return Promise.reject(new Error('At least 1 passengers'));
                                                // }
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, {add, remove}, {errors}) => (
                                        <>
                                           <Form.Item>
                                               <Space wrap size={16}>
                                                   <Button type="primary" htmlType="submit">
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
                                                // height: '64vh',
                                                // overflowY: 'auto',
                                            }}>
                                                {fields.reverse().map((field, index) => (
                                                    <Form.Item
                                                        // label={index === 0 ? '名单' : ''}
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
    )
};