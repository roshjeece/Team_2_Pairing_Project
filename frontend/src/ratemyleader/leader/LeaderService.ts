import axios, { type AxiosResponse } from "axios";
import type { Leader } from "./LeaderType.ts";

type SaveLeaders = (leader: Leader) => Promise<Leader>;

export const axiosSaveLeader: SaveLeaders = async (leader: Leader) => {
    return axios
        .post('/api/entity/leader', leader)
        .then((r: AxiosResponse<Leader>) => r.data)
        .catch((error: any) => {
            console.error('Failed to save leader:', error);
            throw error;
        });
};