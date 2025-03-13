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
    Skeleton, Segmented, InputNumber, Empty, Select, Row, Col
} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {
    createCluster,
    fetchRemoteClusterList,
    getClusterList,
    updateCluster
} from "../../../api/clusterApi";
import {generateUUID} from "../../../utils/dateUitls";
import ClusterCard from "./clusterCard";


export const UpdateServer = ({server, serverList, updateServerList, setOpen}) => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(server)
        form.setFieldValue("password", server.clusterPassword)
        form.setFieldValue("clusterType", server.clusterType)
    }, [server])

    const stringList = serverList.map(server => server.clusterName)

    const [spining, setSpinning] = useState(false)

    const validateName = (_, value) => {
        // 判断是否重复字符串
        if (value && stringList.includes(value)) {
            return Promise.reject(new Error('名称重复'));
        }

        // 判断是否为子串
        for (let i = 0; i < stringList.length; i++) {
            if (value && stringList[i].includes(value)) {
                return Promise.reject(new Error('名称为其他字符串的子串'));
            }
        }

        // 判断是否以英文开头且不含有特殊字符
        const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
        if (value && !regex.test(value)) {
            return Promise.reject(new Error('名称以英文开头且不含有特殊字符'));
        }

        return Promise.resolve();
    };
    const onFinish = () => {
        setSpinning(true)
        console.log('Success:', form.getFieldValue());
        updateCluster(form.getFieldValue())
            .then(resp => {
                if (resp.code === 200) {
                    message.success("更新成功")
                    updateServerList(form.getFieldValue())
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
                    <Alert message="以下路径请使用绝对路径，不支持相对路径，同时不要使用特殊字符" type="warning"
                           showIcon
                           closable/>
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

    const [serverListBak, setServerListBak] = useState([])
    const [serverList, setServerList] = useState([])
    const [openAdd, setOpenAdd] = useState(false)

    const [loading, setLoading] = useState(false)
    const [showAddBtn, setShowAddBtn] = useState(true)

    useEffect(() => {

        const userJson = localStorage.getItem('user');
        let user = JSON.parse(userJson);
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
                    // message.success("获取房间成功")
                    setServerList(resp.data)
                    setServerListBak(resp.data)
                } else {
                    message.error("获取房间失败")
                }
                setLoading(false)
            })
    }, [])

    const updateServerList = (server) => {
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
    const removeServerList = (server) => {
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
                    // message.success("获取房间成功")
                    setServerList(resp.data)
                } else {
                    message.error("获取房间失败")
                }

            })
    }

    const AddServer = ({serverList, reload}) => {

        const [clusterType, setClusterType] = useState('本地')

        const stringList = serverList.map(server => server.clusterName)
        const [spining, setSpinning] = useState(false)

        const validateName = (_, value) => {
            // 判断是否重复字符串
            if (value && stringList.includes(value)) {
                return Promise.reject(new Error('名称重复'));
            }

            // 判断是否为子串
            for (let i = 0; i < stringList.length; i++) {
                if (value && stringList[i].includes(value)) {
                    return Promise.reject(new Error('名称为其他字符串的子串'));
                }
            }

            // 判断是否以英文开头且不含有特殊字符
            const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
            if (value && !regex.test(value)) {
                return Promise.reject(new Error('名称以英文开头且不含有特殊字符'));
            }

            return Promise.resolve();
        }

        const onFinish = (values) => {
            setSpinning(true)
            if (values.clusterType === '远程') {
                values.clusterName = generateUUID()
            }
            console.log('createCluster:', values);
            createCluster(values)
                .then(resp => {
                    if (resp.code === 200) {
                        message.success("创建房间成功")
                        reload()
                    } else {
                        message.error("创建房间成功")
                    }
                    setOpenAdd(false)
                    setSpinning(false)
                })
        };

        const [remote, setRemote] = useState("remote1");
        const onChange = (e) => {
            setRemote(e.target.value);
        };
        const [form] = Form.useForm()

        const [remoteClusterList, setRemoteClusterList] = useState([])
        return (
            <>
                <Spin spinning={spining} tip={"正在创建房间"}>
                    <Alert message="以下路径请使用绝对路径，不支持相对路径，同时不要使用特殊字符" type="warning" showIcon
                           closable/>
                    <br/>
                    <Form
                        form={form}
                        labelCol={{
                            span: 6,
                        }}
                        // onFinish={onFinish}
                        initialValues={{
                            clusterType: '本地',
                            levelType: 'forest'
                        }}
                    >
                        <Form.Item label="类型" name={'clusterType'}>
                            <Segmented options={["本地", "远程"]} block onChange={(v) => {
                                setClusterType(v)
                            }}/>
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
                        {clusterType === '本地' && (<>
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
                            {/*
                        <Form.Item
                                   tooltip={"暂时未实现"}
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
                            tooltip={"暂时未实现"}
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

                        {clusterType === '远程' && (<>
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
                                            <Button type={'primary'} size={'small'} onClick={() => {
                                                console.log(form.getFieldValue())
                                                fetchRemoteClusterList(form.getFieldValue())
                                                    .then(resp => {
                                                        if (resp.code !== 200) {
                                                            message.warning("获取世界失败，请检测ip port 账号密码是否正确")
                                                        } else {
                                                            setRemoteClusterList(resp.data)
                                                        }
                                                    })
                                            }}>获取世界</Button>
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
                        <Form.Item
                            label={"操作"}
                        >
                            <Button type="primary" onClick={() => {
                                form.validateFields().then(value => {
                                    setSpinning(true)
                                    const values = form.getFieldValue()
                                    if (values.clusterType === '远程') {
                                        values.clusterName = generateUUID()
                                    }
                                    // console.log('values:', values);
                                    createCluster(values)
                                        .then(resp => {
                                            if (resp.code === 200) {
                                                message.success("创建房间成功")
                                                reload()
                                            } else {
                                                message.error("创建房间失败")
                                            }
                                        }).finally(() => {
                                        setSpinning(false)
                                    })
                                }).catch(err => {
                                    message.error(err.errorFields[0].errors[0])
                                })
                            }}>
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </>
        )
    }

    return (
        <>
            <Skeleton loading={loading} active>
                <div style={{marginBottom: '16px'}}>
                    <Space size={16} wrap>
                        {showAddBtn && <div>
                            <Button color="primary" onClick={() => setOpenAdd(true)} type={'primary'}>添加房间</Button>
                        </div>}
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
                    top: '8vh'
                }} width={800} title="添加房间" open={openAdd} onOk={() => setOpenAdd(false)}
                       onCancel={() => setOpenAdd(false)}
                       footer={null}>
                    <AddServer serverList={serverList} reload={reload}/>
                </Modal>
            </Skeleton>
        </>
    )
}