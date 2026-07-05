import {useEffect, useState} from 'react';
import {Modal, Image, Row, Col, message, Empty, Button} from 'antd';
import {CheckCard} from '@ant-design/pro-components';
import {getModCommandIndexApi, getModCommandFileApi, ModCommandItem} from '../api/modCommandApi';
import {base64ToUtf8} from '../utils/encoding';

interface RemoteImportModalProps {
    open: boolean;
    onCancel: () => void;
    onImport: (data: any) => void;
}

export default function RemoteImportModal({open, onCancel, onImport}: RemoteImportModalProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [modCommands, setModCommands] = useState<ModCommandItem[]>([]);
    const [fetchingFile, setFetchingFile] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<ModCommandItem>(null);

    useEffect(() => {
        if (open) {
            loadModCommands();
        }
    }, [open]);

    const loadModCommands = async () => {
        setLoading(true);
        try {
            const response = await getModCommandIndexApi();
            if (response.data) {
                const decoded = base64ToUtf8(response.data);
                const data = JSON.parse(decoded) as ModCommandItem[];
                setModCommands(data);
            } else {
                message.error('获取模组命令列表失败');
            }
        } catch (error) {
            console.error('Error loading mod commands:', error);
            message.error('获取模组命令列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = async (command: ModCommandItem) => {
        setFetchingFile(true);
        try {
            const response = await getModCommandFileApi(command.file);
            if (response.data) {
                const data = JSON.parse(base64ToUtf8(response.data));
                onImport(data);
            } else {
                message.error('获取模组命令失败');
            }
        } catch (error) {
            console.error('Error importing mod command:', error);
            message.error('导入失败');
        } finally {
            setFetchingFile(false);
        }
    };

    return (
        <Modal
            title="选择远程模组命令"
            open={open}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <div>
                {modCommands.length === 0 && !loading && (
                    <Empty description="暂无可用的模组命令"/>
                )}
                <Row gutter={[16, 16]}>
                    {modCommands.map((cmd) => (
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} key={cmd.file}>
                            <CheckCard
                                style={{width: '100%'}}
                                title={cmd.name}
                                description={cmd.desc}
                                avatar={
                                    <>
                                        <Image
                                            src={cmd.image}
                                            alt={cmd.name}
                                            preview={false}
                                            width={64}
                                            height={64}
                                        />
                                    </>
                                }
                                checked={selectedFile?.file === cmd.file}
                                onChange={(checked) => {
                                    if (checked) {
                                        setSelectedFile(cmd);
                                    }
                                }}
                            />
                        </Col>
                    ))}
                </Row>
                <br/>
                <Button type="primary" loading={fetchingFile} block onClick={()=>{
                    handleSelect(selectedFile);
                }}>
                    导入
                </Button>
            </div>
        </Modal>
    );
}
