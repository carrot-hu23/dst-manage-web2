import { Form, Input, Tooltip, Button } from 'antd';
import InstallSteamcmd from './installSteamcmd';
import InstallDst from './installDst';
import { useTranslation } from "react-i18next";

const Setting = (props) => {
    const { t } = useTranslation();

    function importConfig() {

        // ~/steamcmd
        // ~/dst
        // ~/.klei/DoNotStarveTogether/
        // MyDediServer
        // ~/.klei/DoNotStarveTogether/
        const values = {
            steamcmd: '~/steamcmd',
            force_install_dir: '~/dst',
            cluster: 'MyDediServer',
            backup: '~/.klei/DoNotStarveTogether',
            mod_download_path: '~/.klei/DoNotStarveTogether/mod'
        };
        props.form.setFieldsValue(values);

    }
    return <>
        <h3>{t('begin.setting.title')}</h3>

        <Form
            layout="vertical"
            labelAlign={'left'}
            // eslint-disable-next-line react/prop-types
            form={props.form}
            style={{
                margin: '24px',
            }}
        >
            <Form.Item
                label={t('begin.setting.steamcmd.label')}
                name="steamcmd"
                rules={[
                    {
                        required: true,
                        message: t('begin.setting.steamcmd.required'),
                    },
                ]}
            >
                <Input placeholder={t('begin.setting.steamcmd.placeholder')} />
            </Form.Item>

            <Form.Item
                label={t('begin.setting.dstPath.label')}
                name="force_install_dir"
                rules={[
                    {
                        required: true,
                        message: t('begin.setting.dstPath.required'),
                    },
                ]}
            >
                <Input placeholder={t('begin.setting.dstPath.placeholder')} />
            </Form.Item>

            <Form.Item
                label={t('begin.setting.cluster.label')}
                name="cluster"
                rules={[
                    {
                        required: true,
                        message: t('begin.setting.cluster.required'),
                    },
                ]}
            >
                <Input placeholder={t('begin.setting.cluster.placeholder')} />
            </Form.Item>

            {/* <Form.Item
                label="游戏存档备份路径"
                name="backup"
                rules={[
                    {
                        required: true,
                        message: 'Please input dontstarve_dedicated_server backup',
                    },
                ]}
            >
                <Input placeholder="游戏存档备份路径" />
            </Form.Item>

            <Form.Item
                label="mod下载路径"
                name="mod_download_path"
                rules={[
                    {
                        required: true,
                        message: 'Please input dontstarve_dedicated_server mod_download_path',
                    },
                ]}
            >
                <Input placeholder="mod下载路径" />
            </Form.Item> */}

        </Form>
        <div>
            <InstallSteamcmd />
        </div>
        <div>
            <InstallDst />
        </div>
            <div>
        <Tooltip placement="top" title={t('begin.setting.importConfig.tooltip')}>
            <Button type="link" onClick={()=>importConfig()}>
                {t('begin.setting.importConfig.button')}
            </Button>
        </Tooltip>
        </div>

    </>

}
export default Setting