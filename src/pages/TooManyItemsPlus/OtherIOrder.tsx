import {sendCommandApi} from "../../api/commdApi.ts";
import {Button, message, Space} from "antd";
import {useParams} from "react-router-dom";
import {ProCard} from "@ant-design/pro-components";

export default function OtherIOrder(){

    const {cluster} = useParams()

    function send(command:string) {
        sendCommandApi(cluster || "", "Master", command)
            .then(resp =>{
                if (resp.code === 200) {
                    message.success("发送成功")
                } else {
                    message.warning("发送失败")
                }
            })
    }

    return(
        <ProCard>
            <br/>
            <Space wrap size={16}>
                <Button type={'primary'} onClick={() => send('TheWorld:PushEvent(\\"ms_nextcycle\\")')}>跳过一天</Button>
                <Button type={'primary'} onClick={() => send('TheWorld:PushEvent(\\"ms_nextphase\\")')}>跳过时钟</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_setseason\\", \\"summer\\")')}>进入夏季</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_setseason\\", \\"winter\\")')}>进入冬季</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_setseason\\", \\"spring\\")')}>进入春季</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_setseason\\", \\"autumn\\")')}>进人秋季</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_forceprecipitation\\")')}>开始下雨</Button>
                <Button type={'primary'}
                        onClick={() => send('TheWorld:PushEvent(\\"ms_forceprecipitation\\", false)')}>停止下雨</Button>
            </Space>
            <br/>
            <br/>
        </ProCard>
    )
}