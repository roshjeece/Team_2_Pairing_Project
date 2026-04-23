import type {Review} from "./ReviewType.ts";
import axios, {type AxiosResponse} from "axios";

type GetReviews = () => Promise<Review[]>;
type SaveReview = (review: Review) => Promise<Review>;
type GetOneReview = (id: number) => Promise<Review>;

export const getAllReviews: GetReviews = async () =>
    (axios
        .get('/api/entity/review')
        .then((r: AxiosResponse <Review[]>) => r.data)
        .catch());

export const saveReview: SaveReview = (review: Review) => (
    axios
        .post('/api/entity/review', review)
        .then((r: AxiosResponse <Review>)=> r.data)
        .catch());

export const axiosGetOneReview: GetOneReview = async (id: number) =>
    (axios
        .get('/api/entity/review/' + id)
        .then((r: AxiosResponse <Review>) => r.data)
        .catch());