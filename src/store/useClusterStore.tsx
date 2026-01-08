// @ts-ignore
import { http } from "../utils/http";
import { create } from 'zustand';
import { StateCreator } from 'zustand';

interface ClusterItem {
    clusterName: string;
    name: string;
    clusterType: string;
    status: boolean;
    [key: string]: any;
}

interface ClusterStore {
    clusters: ClusterItem[];
    getClusters: () => ClusterItem[];
    setClusters: (newClusters: ClusterItem[]) => void;
    reFlushClusters: () => Promise<void>;
}

async function getClusterListApi() {
    const url = '/api/cluster';
    const response = await http.get(url);
    return response.data;
}

const fetchClustersApi = async (): Promise<ClusterItem[]> => {
    const clusterResp = await getClusterListApi();
    if (clusterResp.code === 200) {
        return clusterResp.data || [];
    }
    return [];
}

const store: StateCreator<ClusterStore> = (set, get) => ({
    clusters: [],
    getClusters: () => get().clusters,
    setClusters: (newClusters) => set({ clusters: newClusters }),
    reFlushClusters: async () => {
        const newClusters = await fetchClustersApi();
        set({ clusters: newClusters });
    }
});

export const useClusterStore = create(store);
