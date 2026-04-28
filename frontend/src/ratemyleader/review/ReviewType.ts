import type {Leader} from "../leader/LeaderType.ts";


export type Review = {
    id?: number | string;
    leader: Leader;
    rating: number;
    description: string;
};