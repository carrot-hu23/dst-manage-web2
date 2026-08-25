import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message, Popconfirm } from 'antd';

import { useState, useEffect } from 'react';
import { getGameDashboardApi } from '../../../api/gameDashboardApi';
import { useTranslation } from "react-i18next";


const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

const Environment = () => {
    const { t } = useTranslation();
    const [host, setHost] = useState({})
    const [checkLoading, setCheckLoading] = useState(true)
    const [intsalling, setIntsalling] = useState(false)

    const confirm = (e) => {
        console.log(e);
        message.success(t('begin.environment.confirm.success'));
        setIntsalling(true)
    };
    const cancel = (e) => {
        console.log(e);
        message.error(t('begin.environment.confirm.cancel'));
    };

    useEffect(() => {
        // const terminal = newTerminal(config, "", "environmentId")
        getGameDashboardApi()
            .then(reponse => {
                console.log(reponse.data.host)
                setCheckLoading(false)
                setHost(reponse.data.host)
            })
    }, [])

    return (
        <>

            {checkLoading && (
                <div>
                    <h3>{t('begin.environment.checking')}</h3>
                    <Spin indicator={antIcon} />
                </div>
            )
            }

            {!checkLoading && (
                <div>
                    <span>{t('begin.environment.os', {value: host.os})}</span><br /><br />
                    <span>{t('begin.environment.hostname', {value: host.hostname})}</span><br /><br />
                    <span>{t('begin.environment.kernelArch', {value: host.kernelArch})}</span><br /><br />
                    <span>{t('begin.environment.platform', {value: host.platform})}</span><br /><br />
                </div>
            )
            }

            <Popconfirm
                title={t('begin.environment.installDeps.title')}
                description={t('begin.environment.installDeps.description')}
                onConfirm={confirm}
                onCancel={cancel}
                okText={t('panel.y')}
                cancelText={t('panel.n')}
            >
                <a href="#">{t('begin.environment.installDeps.link')}</a>
            </Popconfirm>

            {intsalling && (
                <div>
                    <h4>{t('begin.environment.installing')}</h4>
                    <Spin indicator={antIcon} />

                    {/* <div>
                        <Collapse>
                            <Panel header="查看详细" key="1">
                                <div id='environmentId'></div>
                            </Panel>
                        </Collapse>
                    </div> */}

                </div>
            )
            }
            {/* <div className="container-children" style={{ height: "100%", }}>
                <div id="environmentId" ></div>
            </div> */}
        </>
    )
}

export default Environment