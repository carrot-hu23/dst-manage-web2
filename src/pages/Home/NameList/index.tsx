import {useEffect, useState, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {
    Button,
    Input,
    Form,
    Skeleton,
    message,
    Typography,
    Row,
    Col,
    Space,
    Upload,
    Card
} from 'antd';
import {
    PlusOutlined,
    UploadOutlined,
    DownloadOutlined,
    DeleteOutlined,
    SearchOutlined,
    SortAscendingOutlined,
    SortDescendingOutlined
} from '@ant-design/icons';
import {useParams} from "react-router-dom";
import type {PlayerListResponse, ApiResponse} from "../../../type";

const {Title, Paragraph} = Typography;
const {TextArea} = Input;

interface NameListProps {
    title: string;
    tips: string;
    getApi: (cluster: string) => Promise<ApiResponse<PlayerListResponse>>;
    saveApi: (cluster: string, list: PlayerListResponse) => Promise<ApiResponse<void>>;
}

interface ReadTxtFileProps {
    form: any;
}

const ReadTxtFileWithAntd: React.FC<ReadTxtFileProps> = ({form}) => {
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
                style={{}}
            >
                <Button type={'primary'} icon={<UploadOutlined/>}>选择文件</Button>
            </Upload>
        </>
    );
};

const NameList: React.FC<NameListProps> = ({title, tips, getApi, saveApi}) => {

    const {t} = useTranslation();
    const {cluster} = useParams<{ cluster?: string }>();

    const [loading, setLoading] = useState<boolean>(false);
    const [spin, setSpin] = useState<boolean>(false);
    const [batchText, setBatchText] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
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

    const handleExport = () => {
        const list = form.getFieldValue("list") || [];
        const content = list.join('\n');
        const blob = new Blob([content], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'namelist.txt';
        a.click();
        URL.revokeObjectURL(url);
        message.success('导出成功');
    };

    const handleBatchAdd = () => {
        if (!batchText.trim()) {
            message.warning('请输入内容');
            return;
        }
        const lines = batchText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line !== '');

        let list = form.getFieldValue("list") || [];
        form.setFieldsValue({
            list: [...list, ...lines]
        });
        setBatchText('');
        message.success(`已添加 ${lines.length} 条记录`);
    };

    const handleSort = () => {
        const list = form.getFieldValue("list") || [];
        let sortedList = [...list];

        if (sortOrder === 'asc') {
            setSortOrder('desc');
            sortedList.sort((a, b) => b.localeCompare(a));
        } else {
            setSortOrder('asc');
            sortedList.sort((a, b) => a.localeCompare(b));
        }

        form.setFieldsValue({
            list: sortedList
        });
    };

    const getFilteredFields = (fields: any[]) => {
        if (!searchText.trim()) {
            return fields;
        }

        const list = form.getFieldValue("list") || [];
        return fields.filter((field) => {
            const value = list[field.name];
            return value && value.toLowerCase().includes(searchText.toLowerCase());
        });
    };

    return (
        <>
            <div>
                <Skeleton loading={loading} active avatar>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form
                                form={form}
                                onFinish={onFinish}
                                layout={'vertical'}
                            >
                                {/* 标题和帮助文档 */}
                                <div>
                                    <Title level={4} style={{margin: 0}}>
                                        {title}
                                    </Title>
                                    <div style={{
                                        paddingTop: '8px',
                                        paddingBottom: '8px',
                                    }}>
                                        {lines.map((line, index) => (
                                            <Paragraph key={index} style={{margin: '4px 0'}}>
                                                {line}
                                            </Paragraph>
                                        ))}
                                    </div>
                                </div>

                                {/* 操作按钮 */}
                                <Space wrap size={12} style={{marginBottom: '16px'}}>
                                    <Button type="primary" htmlType="submit" loading={spin}>
                                        保存
                                    </Button>
                                    <ReadTxtFileWithAntd form={form}/>
                                    <Button icon={<DownloadOutlined/>} onClick={handleExport}>
                                        导出文件
                                    </Button>
                                </Space>

                                {/* KuID 列表 */}
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
                                    {(fields, {remove}) => {
                                        const filteredFields = getFilteredFields(fields);
                                        return (
                                            <>
                                                <Card
                                                    title={
                                                        <div style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            gap: '12px'
                                                        }}>
                                                            <span>KuID 列表 ({filteredFields.length}/{fields.length})</span>
                                                            <Space size={8}>
                                                                <Input
                                                                    placeholder="搜索 KuID"
                                                                    prefix={<SearchOutlined/>}
                                                                    value={searchText}
                                                                    onChange={(e) => setSearchText(e.target.value)}
                                                                    style={{width: '200px'}}
                                                                    allowClear
                                                                />
                                                                <Button
                                                                    icon={sortOrder === 'asc' ? <SortAscendingOutlined/> :
                                                                        <SortDescendingOutlined/>}
                                                                    onClick={handleSort}
                                                                    title={sortOrder === 'asc' ? '升序' : '降序'}
                                                                >
                                                                    {sortOrder === 'asc' ? '升序' : '降序'}
                                                                </Button>
                                                            </Space>
                                                        </div>
                                                    }
                                                >
                                                <div
                                                    className={'scrollbar'}
                                                    style={{
                                                        height: 'calc(100vh - 620px)',
                                                        minHeight: '300px',
                                                        overflowY: 'auto',
                                                    }}
                                                >
                                                    {filteredFields.length === 0 ? (
                                                        <div style={{
                                                            textAlign: 'center',
                                                            padding: '20px',
                                                            color: '#999'
                                                        }}>
                                                            {searchText ? '未找到匹配的数据' : '暂无数据'}
                                                        </div>
                                                    ) : (
                                                        filteredFields.map((field) => (
                                                            <div
                                                                key={field.key}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    padding: '8px 0',
                                                                    // borderBottom: '1px solid #f0f0f0',
                                                                }}
                                                            >
                                                                <Form.Item
                                                                    {...field}
                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            whitespace: true,
                                                                            message: "请输入 KuID",
                                                                        },
                                                                    ]}
                                                                    style={{flex: 1, margin: 0}}
                                                                >
                                                                    <Input
                                                                        placeholder="请输入 KU_xxx"
                                                                        style={{width: '100%'}}
                                                                    />
                                                                </Form.Item>
                                                                <Button
                                                                    type="text"
                                                                    danger
                                                                    icon={<DeleteOutlined/>}
                                                                    onClick={() => remove(field.name)}
                                                                    style={{marginLeft: '12px'}}
                                                                >
                                                                    删除
                                                                </Button>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </Card>
                                            <br/>
                                            {/* 批量粘贴添加 */}
                                            <div>
                                                <Title
                                                    style={{
                                                        margin: 0,
                                                        paddingBottom: 8
                                                    }}
                                                    level={5}
                                                >
                                                    批量粘贴添加
                                                </Title>

                                                <div>
                                                    <TextArea
                                                        value={batchText}
                                                        onChange={(e) => setBatchText(e.target.value)}
                                                        placeholder="每行一个 KuID，支持批量粘贴"
                                                        rows={6}
                                                        style={{
                                                            marginBottom: 8
                                                        }}
                                                    />
                                                    <Button
                                                        type="primary"
                                                        icon={<PlusOutlined/>}
                                                        onClick={handleBatchAdd}
                                                    >
                                                        解析添加
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    );
                                    }}
                                </Form.List>
                            </Form>
                        </Col>
                    </Row>
                </Skeleton>
            </div>
        </>
    );
};

export default NameList;
