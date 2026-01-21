import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Form,
    Input,
    Modal,
    Radio,
    message,
    Spin,
    Space,
    Skeleton, Segmented, InputNumber, Empty, Select, Row, Col, Steps
} from 'antd';
import type {RadioChangeEvent} from 'antd/es/radio';
import {CheckCard} from '@ant-design/pro-components';
import {
    createCluster,
    fetchRemoteClusterList,
    getClusterList,
    updateCluster,
    Cluster,
    ClusterFormValues,
    RemoteCluster,
    getServerConfigTemplates,
    ServerConfigTemplate
} from "../../../api/clusterApi";
import {generateUUID} from "../../../utils/dateUitls";
import ClusterCard from "./ClusterCard.tsx";
import {PageContainer} from "@ant-design/pro-components";
import type {RuleObject} from 'antd/es/form';

interface UpdateServerProps {
    server: Cluster;
    serverList: Cluster[];
    updateServerList: (server: Cluster) => void;
    setOpen: (open: boolean) => void;
}

interface AddServerProps {
    serverList: Cluster[];
    reload: () => void;
    onClose?: () => void;
}

interface User {
    displayName?: string;
    email?: string;
    photoURL?: string;
    role?: 'admin' | 'user';
}


export const UpdateServer: React.FC<UpdateServerProps> = ({server, serverList, updateServerList, setOpen}) => {
    const [form] = Form.useForm<ClusterFormValues>()
    useEffect(() => {
        form.setFieldsValue(server)
        form.setFieldValue("password", server.clusterPassword)
        form.setFieldValue("clusterType", server.clusterType)
    }, [server])

    const stringList = serverList.map(server => server.clusterName)

    const [spining, setSpinning] = useState(false)

    const validateName = (_: RuleObject, value: string) => {
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error('名称重复'));
        }

        for (let i = 0; i < stringList.length; i++) {
            if (value && stringList[i].includes(value)) {
                return Promise.reject(new Error('名称为其他字符串的子串'));
            }
        }

        const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
        if (value && !regex.test(value)) {
            return Promise.reject(new Error('名称以英文开头且不含有特殊字符'));
        }

        return Promise.resolve();
    };
    const onFinish = () => {
        setSpinning(true)
        const values = form.getFieldsValue()
        const updateData: Cluster = { ...server, ...values }
        console.log('Success:', updateData);
        updateCluster(updateData)
            .then(resp => {
                if (resp.code === 200) {
                    message.success("更新成功")
                    updateServerList(updateData)
                } else {
                    message.error("更新成功")
                }
                setOpen(false)
                setSpinning(false)
            })
    };
    return (
        <>
            <Spin spinning={spining} tip={"正在更新配置"}>
                {(server?.clusterType === '本地' || server.clusterType === '') && (<>
                    <Alert
                        message={
                            <div>
                                <strong>💡 路径配置说明：</strong>
                                <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                                    <li>请使用绝对路径（Windows: <code>C:\path\to\dir</code> | Linux: <code>/path/to/dir</code>）</li>
                                    <li>路径中不要包含中文、空格或特殊字符</li>
                                </ul>
                            </div>
                        }
                        type="info"
                        showIcon
                        closable
                    />
                    <br/>
                </>)}

                <Form
                    labelCol={{span: 6,}}
                    form={form}
                >
                    <Form.Item label="房间名称"
                               name="name"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input your name!',
                                   },
                               ]}
                    >
                        <Input/>
                    </Form.Item>
                    {(server?.clusterType === '本地' || server.clusterType === '') && (<>
                        <Form.Item label="存档名称"
                                   tooltip={"如果指定的存档不存在，将会新建一个存档。存档名称只支持 英文开头，同时存档不要为子串"}
                                   name="clusterName"
                                   rules={[
                                       {
                                           required: true,
                                           validator: validateName
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="steamcmd 路径"
                                   name="steamcmd"
                                   tooltip={"docker 环境 路径填写 /app/steamcmd"}
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your steamcmd path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="饥荒路径"
                                   tooltip={"docker 环境 路径请填 /app/dst-dedicated-server"}
                                   name="force_install_dir"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your force_install_dir path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="ugc_directory"
                                   name="ugc_directory"
                                   rules={[
                                       {
                                           required: false,
                                           message: 'Please input your ugc_directory path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="备份路径"
                                   name="backup"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your backup path!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="启动方式"
                            name="bin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input dontstarve_dedicated_server bin',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={32}>32</Radio>
                                <Radio value={64}>64</Radio>
                                <Radio value={100}>lua-jit</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </>)}

                    {server?.clusterType === '远程' && (<>
                        <Form.Item label="Ip"
                                   name="ip"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your ip!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="端口"
                                   name="port"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your port!',
                                       },
                                   ]}
                        >
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item label="用户名"
                                   name="username"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your username!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item label="密码"
                                   name="password"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input your password!',
                                       },
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                     </>)}
                     <Form.Item
                         label={"操作"}
                     >
                         <Button type="primary" onClick={() => onFinish()}>
                             保存
                         </Button>
                     </Form.Item>
                 </Form>
             </Spin>
         </>
     )
 }

export default () => {

    const [serverListBak, setServerListBak] = useState<Cluster[]>([])
    const [serverList, setServerList] = useState<Cluster[]>([])
    const [openAdd, setOpenAdd] = useState(false)

    const [loading, setLoading] = useState(false)
    const [showAddBtn, setShowAddBtn] = useState(true)

    useEffect(() => {

        const userJson = localStorage.getItem('user');
        let user: User | null = null;
        try {
            user = JSON.parse(userJson || 'null');
        } catch (e) {
            console.error('Failed to parse user from localStorage', e);
        }
        if (user === null) {
            user = {
                displayName: '',
                email: '',
                photoURL: ''
            }
        }
        if (user.role !== 'admin') {
            setShowAddBtn(false)
        }
        setLoading(true)
        getClusterList()
            .then(resp => {
                if (resp.code === 200) {
                    setServerList(resp.data || [])
                    setServerListBak(resp.data || [])
                } else {
                    message.error("获取房间失败")
                }
                setLoading(false)
            })
    }, [])

    const updateServerList = (server: Cluster) => {
        const oldServerList = serverList
        const newServerList = []
        for (let i = 0; i < oldServerList.length; i++) {
            if (oldServerList[i].ID === server.ID) {
                newServerList.push(server)
            } else {
                newServerList.push(oldServerList[i])
            }
        }
        setServerList(newServerList)
    }
    const removeServerList = (server: Cluster) => {
        const oldServerList = serverList
        const newServerList = []
        for (let i = 0; i < oldServerList.length; i++) {
            if (oldServerList[i].ID !== server.ID) {
                newServerList.push(oldServerList[i])
            }
        }
        setServerList(newServerList)
    }


    const reload = () => {
        getClusterList()
            .then(resp => {
                if (resp.code === 200) {
                    setServerList(resp.data || [])
                } else {
                    message.error("获取房间失败")
                }

            })
    }

    const AddServer: React.FC<AddServerProps> = ({serverList, reload}) => {

        const [currentStep, setCurrentStep] = useState(0)
        const [selectedType, setSelectedType] = useState<'本地' | '远程'>('本地')
        const [newbieMode, setNewbieMode] = useState(true)
        const [configTemplates, setConfigTemplates] = useState<ServerConfigTemplate[]>([])

        const stringList = serverList.map(server => server.clusterName)
        const [spining, setSpinning] = useState(false)

        const validateName = (_: RuleObject, value: string) => {
            if (value && stringList.includes(value)) {
                return Promise.reject(new Error('名称重复'));
            }

            for (let i = 0; i < stringList.length; i++) {
                if (value && stringList[i].includes(value)) {
                    return Promise.reject(new Error('名称为其他字符串的子串'));
                }
            }

            const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
            if (value && !regex.test(value)) {
                return Promise.reject(new Error('名称以英文开头且不含有特殊字符'));
            }

            return Promise.resolve();
        }

        const [remote, setRemote] = useState<"remote1" | "remote2">("remote1");
        const onChange = (e: RadioChangeEvent) => {
            setRemote(e.target.value as "remote1" | "remote2");
        };
        const [form] = Form.useForm<ClusterFormValues>()

        const [remoteClusterList, setRemoteClusterList] = useState<RemoteCluster[]>([])

        const loadConfigTemplates = async () => {
            try {
                const response = await getServerConfigTemplates()
                if (response.code === 200) {
                    if (response.data != '') {
                        const templates = JSON.parse(response.data) as ServerConfigTemplate[]
                        setConfigTemplates(templates)
                    }
                }
            } catch (error) {
                console.error('加载配置模板失败', error)
            }
        }

        useEffect(() => {
            loadConfigTemplates()
        }, [])

        const handleNext = () => {
            form.validateFields(['clusterType']).then(() => {
                setCurrentStep(1)
            })
        }

        const handleFinish = () => {
            form.validateFields().then(values => {
                setSpinning(true)
                if (values.clusterType === '远程') {
                    values.clusterName = generateUUID()
                }
                createCluster(values)
                    .then(resp => {
                        if (resp.code === 200) {
                            message.success("创建房间成功")
                            reload()
                            setOpenAdd(false)
                        } else {
                            message.error("创建房间失败")
                        }
                    }).catch(() => {
                        message.error("创建房间失败")
                    }).finally(() => {
                        setSpinning(false)
                    })
            }).catch(err => {
                message.error(err.errorFields[0].errors[0])
            })
        }

        const handlePrev = () => {
            setCurrentStep(0)
        }

        const handleFetchRemoteClusters = () => {
            const values = form.getFieldsValue()
            fetchRemoteClusterList({
                ip: values.ip || '',
                port: values.port || 0,
                username: values.username || '',
                password: values.password || ''
            })
                .then(resp => {
                    if (resp.code !== 200) {
                        message.warning("获取世界失败，请检测ip port 账号密码是否正确")
                    } else {
                        setRemoteClusterList(resp.data || [])
                    }
                })
        }

        return (
            <div>
                <Spin spinning={spining} tip={"正在创建房间"}>
                    <Steps current={currentStep}>
                        <Steps.Step title="选择类型" />
                        <Steps.Step title="配置信息" />
                    </Steps>

                    <div style={{ marginBottom: 24, marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span>新手模式：</span>
                        <Segmented
                            options={[
                                { label: '开启', value: true },
                                { label: '关闭', value: false }
                            ]}
                            value={newbieMode}
                            onChange={(value) => setNewbieMode(value as boolean)}
                        />
                        <span style={{ color: '#999', fontSize: 12 }}>
                            {newbieMode ? '显示详细说明和示例' : '隐藏详细提示'}
                        </span>
                    </div>

                    {currentStep === 0 && (
                        <div style={{ marginTop: 24 }}>
                            <Form
                                form={form}
                                initialValues={{
                                    clusterType: '本地',
                                }}
                            >
                                <Form.Item name="clusterType" style={{ marginBottom: 0 }}>
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <CheckCard
                                                style={{width: '100%'}}
                                                title="本地服务器"
                                                description="在本地部署饥荒服务器"
                                                avatar={(<>🏠</>)}
                                                checked={selectedType === '本地'}
                                                onChange={() => {
                                                    setSelectedType('本地')
                                                    form.setFieldValue('clusterType', '本地')
                                                }}
                                            />
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <CheckCard
                                                style={{width: '100%'}}
                                                title="远程服务器"
                                                description="连接到远程的饥荒服务器"
                                                avatar={(<>🌐</>)}
                                                checked={selectedType === '远程'}
                                                onChange={() => {
                                                    setSelectedType('远程')
                                                    form.setFieldValue('clusterType', '远程')
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form>
                            {selectedType === '本地' && (
                                <Alert
                                    message={
                                        <div>
                                            <strong>💡 路径配置说明：</strong>
                                            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                                                <li>请先在服务器上安装好 steamcmd 和 饥荒服务器 </li>
                                                <li>请使用绝对路径（Windows: <code>C:\path\to\dir</code> | Linux: <code>/path/to/dir</code>）</li>
                                                <li>路径中不要包含中文、空格或特殊字符</li>
                                                <li>Docker 环境请使用容器内路径</li>
                                            </ul>
                                        </div>
                                    }
                                    type="info"
                                    showIcon
                                    closable
                                />
                            )}
                            {selectedType === '远程' && (
                                <Alert
                                    message={
                                        <div>
                                            <strong>💡 路径配置说明：</strong>
                                            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                                                <li>请保证远程端口开放</li>
                                            </ul>
                                        </div>
                                    }
                                    type="info"
                                    showIcon
                                    closable
                                />
                            )}
                            <br/>
                            <Button type="primary" onClick={handleNext}>
                                下一步
                            </Button>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <>
                            <div style={{ marginTop: 24 }}>
                                <Form
                                    form={form}
                                    labelCol={{
                                        span: 6,
                                    }}
                                >
                                    <Form.Item label="配置模板">
                                        <Select
                                            placeholder="选择配置模板快速填充（可选）"
                                            allowClear
                                            onChange={(value) => {
                                                if (value) {
                                                    const template = configTemplates.find(t => t.id === value)
                                                    if (template) {
                                                        form.setFieldsValue({
                                                            ...template,
                                                            name: undefined
                                                        })
                                                    }
                                                }
                                            }}
                                        >
                                            {configTemplates
                                                .filter(t => t.type === selectedType)
                                                .map(template => (
                                                    <Select.Option key={template.id} value={template.id}>
                                                        {template.name}
                                                    </Select.Option>
                                                ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item label="房间名称"
                                               name="name"
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: 'Please input your name!',
                                                   },
                                               ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    {selectedType === '本地' && (<>
                                        <Form.Item label="存档名称"
                                                   tooltip={"如果指定的存档不存在，将会新建一个存档。存档名称只支持 英文开头，同时存档不要为子串"}
                                                   name="clusterName"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           validator: validateName
                                                       },
                                                   ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label="steamcmd 路径"
                                                   name="steamcmd"
                                                   extra={newbieMode && "SteamCMD 安装目录，用于下载和更新游戏文件"}
                                                   tooltip={newbieMode ? "docker 环境 路径填写 /app/steamcmd" : "docker 环境路径填写 /app/steamcmd"}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '请输入 steamcmd 路径',
                                                       },
                                                   ]}
                                        >
                                            <Input
                                                placeholder={newbieMode ?
                                                    "Windows: C:\\Program Files (x86)\\Steam 或 Linux: /home/username/steamcmd" :
                                                    "请输入路径"
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item label="饥荒路径"
                                                   name="force_install_dir"
                                                   extra={newbieMode && "饥荒专用服务器安装目录"}
                                                   tooltip={newbieMode ? "docker 环境 路径请填 /app/dst-dedicated-server" : "docker 环境路径填写 /app/dst-dedicated-server"}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '请输入饥荒路径',
                                                       },
                                                   ]}
                                        >
                                            <Input
                                                placeholder={newbieMode ?
                                                    "Windows: C:\\Program Files\\...\\Don't Starve Together Dedicated Cluster 或 Linux: /home/.../dontstarve_dedicated_server_nullrenderer" :
                                                    "请输入路径"
                                                }
                                            />
                                        </Form.Item>
                                {/*
                                <Form.Item

                                                   label="persistent_storage_root(暂时未实现)"
                                                   name="persistent_storage_root"
                                                   rules={[
                                                       {
                                                           required: false,
                                                           message: 'Please input your persistent_storage_root path!',
                                                       },
                                                   ]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    label="conf_dir(暂时未实现)"
                                    name="conf_dir"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input your conf_dir path!',
                                        },
                                    ]}
                                >
                                    <Input/>

                                </Form.Item>
                                */}
                                        <Form.Item label="ugc_directory"
                                                   name="ugc_directory"
                                                   extra={newbieMode ? "Workshop/UGC 存储目录（Mod 存放位置），如果不填将使用默认路径" : ""}
                                                   rules={[
                                                       {
                                                           required: false,
                                                       },
                                                   ]}
                                        >
                                            <Input
                                                placeholder={newbieMode ?
                                                    "Windows: C:\\Program Files (x86)\\Steam\\steamapps\\workshop 或 Linux: ~/.steam/steam/steamapps/workshop（可选）" :
                                                    "请输入路径（可选）"
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item label="备份路径"
                                                   name="backup"
                                                   extra={newbieMode && "游戏存档备份目录，建议选择一个有足够空间的磁盘"}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: '请输入备份路径',
                                                       },
                                                   ]}
                                        >
                                            <Input
                                                placeholder={newbieMode ?
                                                    "Windows: D:\\dst_backups 或 Linux: /home/username/dst_backups" :
                                                    "请输入路径"
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="启动方式"
                                            name="bin"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input dontstarve_dedicated_server bin',
                                                },
                                            ]}
                                        >
                                            <Radio.Group>
                                                <Radio value={32}>32</Radio>
                                                <Radio value={64}>64</Radio>
                                                <Radio value={100}>lua-jit</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item
                                            label="世界类型"
                                            name="levelType"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input levelType',
                                                },
                                            ]}
                                        >
                                            <Radio.Group>
                                                <Radio value={'forest'}>森林洞穴</Radio>
                                                <Radio value={'porkland'}>猪镇</Radio>
                                            </Radio.Group>
                                        </Form.Item>

                                    </>)}

                                    {selectedType === '远程' && (<>
                                        <Form.Item label="Ip"
                                                   name="ip"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: 'Please input your ip!',
                                                       },
                                                   ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label="端口"
                                                   name="port"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: 'Please input your port!',
                                                       },
                                                   ]}
                                        >
                                            <InputNumber/>
                                        </Form.Item>
                                        <Form.Item label="用户名"
                                                   name="username"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: 'Please input your username!',
                                                       },
                                                   ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label="密码"
                                                   name="password"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: 'Please input your password!',
                                                       },
                                                   ]}
                                        >
                                            <Input/>
                                        </Form.Item>

                                        <Form.Item
                                            label="远程类型"
                                            name="remote"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please choose remote type!',
                                                },
                                            ]}
                                        >
                                            <Radio.Group onChange={onChange}>
                                                <Radio value={'remote1'}>单房间</Radio>
                                                <Radio value={'remote2'}>多房间</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        {remote === "remote2" && (
                                            <>
                                                <Form.Item
                                                    label={"-"}
                                                >
                                                    <Space size={8} wrap>
                                                        <span>
                                                            请点击获取世界，选择房间添加
                                                        </span>
                                                        <Button type={'primary'} size={'small'} onClick={handleFetchRemoteClusters}>
                                                            获取世界
                                                        </Button>
                                                    </Space>
                                                </Form.Item>
                                                <Form.Item
                                                    label={"世界列表"}
                                                    name={'remoteClusterNameList'}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please choose level !',
                                                        },
                                                    ]}
                                                >
                                                    <Select mode="multiple">
                                                        {remoteClusterList
                                                            .map(cluster => <Select.Option key={cluster.clusterName}
                                                                                           value={cluster.clusterName}>{cluster.name}/{cluster.clusterName}</Select.Option>)}
                                                    </Select>
                                                </Form.Item>
                                            </>
                                        )}

                                    </>)}
                                </Form>
                            </div>
                            <Space>
                                <Button onClick={handlePrev}>
                                    上一步
                                </Button>
                                <Button type="primary" onClick={handleFinish}>
                                    保存
                                </Button>
                            </Space>
                        </>
                    )}
                </Spin>
            </div>
        )
    }

    return (
        <PageContainer title={'房间列表'}
                       extra={showAddBtn ? [
                           <Button key="1" type="primary" onClick={() => setOpenAdd(true)}>
                               添加房间
                           </Button>
                       ] : null}
        >
            <Skeleton loading={loading} active>
                <div style={{marginBottom: '16px'}}>
                    <Space size={16} wrap>
                        <Segmented
                            options={['全部', '本地', '远程',]}
                            onChange={(value) => {
                                if (value === '远程') {
                                    setServerList(serverListBak.filter(server => server.clusterType === '远程'))
                                } else if (value === '本地') {
                                    setServerList(serverListBak.filter(server => server.clusterType === '本地' || server.clusterType === ''))
                                } else {
                                    setServerList(serverListBak)
                                }
                            }}
                        />
                    </Space>
                </div>
                <Row gutter={16}>
                    {serverList.map((cluster, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <ClusterCard cluster={cluster}
                                         showAddBtn={showAddBtn}
                                         serverList={serverList}
                                         updateServerList={updateServerList}
                                         removeServerList={removeServerList}
                            />
                        </Col>
                    ))}
                </Row>
                {serverList?.length === 0 && (
                    <>
                        <Empty description={"当前暂无房间，请点击 添加房间 按钮来创建世界"}/>
                    </>
                )}
                <Modal style={{
                    top: '8vh',
                }} width={900}  title="添加房间" open={openAdd} onOk={() => setOpenAdd(false)}
                       onCancel={() => setOpenAdd(false)}
                       footer={null}>
                    <AddServer serverList={serverList} reload={reload} onClose={() => setOpenAdd(false)}/>
                </Modal>
            </Skeleton>
        </PageContainer>
    )
}
