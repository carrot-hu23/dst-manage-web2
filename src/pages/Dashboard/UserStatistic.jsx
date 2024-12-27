import {Col, Row, Statistic} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";

import {countActivePlayers} from "../../api/statisticsApi.jsx";
import {ProCard} from "@ant-design/pro-components";
import {useTranslation} from "react-i18next";

export default () => {
    const {cluster} = useParams()
    const {t} = useTranslation()
    const [thisDayUsers, setThisDayUsers] = useState(0);
    const [thisMonthUsers, setThisMonthUsers] = useState(0);

    useEffect(()=>{

        countActivePlayers(cluster, "DAY", dayjs().startOf('day').add(-1, "day").valueOf(), dayjs().startOf('day').valueOf())
            .then(response => {
                const {data} = response
                if (data.data.y1 !== null && data.data.y1 !== undefined) {
                    // const sum = data.data.y1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    const sum = data?.data?.y1[1]
                    setThisDayUsers(sum)
                }

            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    useEffect(()=>{
        countActivePlayers(cluster, "DAY", dayjs().startOf('month').valueOf(), dayjs().endOf('month').valueOf())
            .then(response => {
                const {data} = response
                if (data.data.y1 !== null && data.data.y1 !== undefined) {
                    const sum = data.data.y1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    setThisMonthUsers(sum)
                }

            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <ProCard>
                        <Statistic
                            title={t('dashboard.today.player')}
                            value={thisDayUsers}
                            precision={0}
                            valueStyle={{
                                color: '#2784ff',
                            }}
                        />
                    </ProCard>
                </Col>
                <Col span={12}>
                    <ProCard>
                        <Statistic
                            title={t('dashboard.month.player')}
                            value={thisMonthUsers}
                            precision={0}
                            valueStyle={{
                                color: '#edc82d',
                            }}
                        />
                    </ProCard>
                </Col>
            </Row>
        </>
    )
}