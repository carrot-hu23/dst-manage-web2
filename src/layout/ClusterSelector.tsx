import { Select, Grid } from 'antd';
import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useClusterStore } from '../store/useClusterStore';

const { useBreakpoint } = Grid;

export default function ClusterSelector() {
    const { cluster, name } = useParams<{ cluster: string; name: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const { clusters, reFlushClusters } = useClusterStore();

    // 只在当前路由包含 cluster 和 name 参数时才显示
    const shouldShow = cluster && name;

    useEffect(() => {
        if (!shouldShow) return;
        reFlushClusters();
    }, [shouldShow, reFlushClusters]);

    const handleChange = (newClusterName: string) => {
        const selectedCluster = clusters.find(
            (c) => c.clusterName === newClusterName
        );

        if (!selectedCluster) return;

        // 提取当前路径中 /:cluster/:name 后的部分
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const remainingPath = pathSegments.slice(2).join('/');

        // 构造新路径
        const newPath = `/${selectedCluster.clusterName}/${selectedCluster.name}/${remainingPath}`;

        // 使用 replace 模式导航，让各页面组件的 useEffect 自动重新加载数据
        navigate(newPath, { replace: true });
    };

    // 如果不在 cluster 管理页面中，不显示下拉框
    if (!shouldShow) {
        return null;
    }

    // 根据屏幕尺寸确定宽度
    const width = screens.md ? 240 : 240;

    return (
        <Select
            value={cluster}
            onChange={handleChange}
            style={{ width }}
            options={clusters.map((item) => ({
                label: item.name,
                value: item.clusterName,
            }))}
            showSearch
            optionFilterProp="label"
            placeholder="Select Cluster"
        />
    );
}
