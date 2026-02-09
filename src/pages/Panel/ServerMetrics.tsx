import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ProCard} from "@ant-design/pro-components";
import {Col, Row, Tag} from "antd";
import {getSystemInfoApi} from "../../api/systeminfoApi";

interface SystemInfo {
    panelMemUsage?: number;
    host?: {
        os?: string;
        kernelArch?: string;
        platform?: string;
    };
    mem?: {
        total: number;
        used: number;
        usedPercent: number;
        available: number;
    };
    cpu?: {
        cpuPercent?: number[];
        cpuUsedPercent: number;
        cores: number;
    };
    disk?: {
        devices?: Array<{
            total: number;
            usage: number;
        }>;
    };
}

const ServerMetrics = () => {
    const {cluster} = useParams<{ cluster?: string }>();
    const [systemInfo, setSystemInfo] = useState<SystemInfo>({});

    useEffect(() => {
        const fetchSystemInfo = async () => {
            try {
                const resp = await getSystemInfoApi();
                if (resp.code === 200 && resp.data) {
                    console.log(resp.data)
                    setSystemInfo(resp.data);
                }
            } catch (error) {
                console.error("Failed to fetch system info:", error);
            }
        };

        fetchSystemInfo();

        const interval = setInterval(fetchSystemInfo, 5000);
        return () => clearInterval(interval);
    }, [cluster]);

    const formatKBToMB = (kb: number) => {
        if (!kb) return "0 MB";
        const mb = kb / 1024;
        return `${mb.toFixed(2)} MB`;
    };

    const formatKBToGB = (kb: number) => {
        if (!kb) return "0 GB";
        const gb = kb / (1024 * 1024 * 1024);
        return `${gb.toFixed(2)} GB`;
    };


    const panelMemUsage = systemInfo.panelMemUsage ? `${formatKBToMB(systemInfo.panelMemUsage)}` : "--";
    const cpuUsage = systemInfo.cpu?.cpuUsedPercent !== undefined ? `${systemInfo.cpu.cpuUsedPercent.toFixed(2)}%` : "0%";
    const cpuCores = systemInfo.cpu?.cores || "--";
    const memUsedPercent = systemInfo.mem?.usedPercent !== undefined ? `${systemInfo.mem.usedPercent.toFixed(2)}%` : "0%";
    const memUsed = systemInfo.mem?.used !== undefined ? formatKBToGB(systemInfo.mem.used) : "0 GB";
    const memTotal = systemInfo.mem?.total !== undefined ? formatKBToGB(systemInfo.mem.total) : "0 GB";

    const diskTotal = (systemInfo?.disk?.devices || []).map((item) => Number(item.total))
        .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024

    const diskFree = (systemInfo?.disk?.devices || []).map((item) => Number(item.total - (item.total * item.usage * 0.01)))
        .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024

    const diskUsage = ((diskTotal - diskFree) / diskTotal * 100).toFixed(2);

    return (
        <Row gutter={[16, 16]}>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <ProCard
                    // style={{borderRadius: 12}}
                    // bordered
                    title="💻 面板"
                    extra={<Tag color="green">{panelMemUsage}</Tag>}
                >
                    <h3>{panelMemUsage}</h3>
                    <span>{systemInfo.host?.os}/{systemInfo.host?.kernelArch}</span>
                </ProCard>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <ProCard
                    // style={{borderRadius: 12}}
                    // bordered
                    title="🧠 内存"
                    extra={<Tag color="blue">{memUsedPercent}</Tag>}
                >
                    <h3>{memUsed}</h3>
                    <span>内存: {memTotal}</span>
                </ProCard>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <ProCard
                    // style={{borderRadius: 12}}
                    // bordered
                    title="⚡ CPU"
                    extra={<Tag color="blue">{cpuUsage}</Tag>}
                >
                    <h3>{cpuUsage}</h3>
                    <span>CPU核数: {cpuCores}</span>
                </ProCard>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <ProCard
                    // style={{borderRadius: 12}}
                    // bordered
                    title="💾 磁盘"
                    extra={<Tag color="orange">{`${diskUsage}%`}</Tag>}
                >
                    <h3>{diskFree?.toFixed(2)} GB</h3>
                    <span>总磁盘: {diskTotal?.toFixed(2)} GB</span>
                </ProCard>
            </Col>
        </Row>
    );
};

export default ServerMetrics;
