import type {Review} from "./ReviewType.ts";
import axios, {type AxiosResponse} from "axios";

type GetReviews = () => Promise<Review[]>;
type SaveReview = (review: Review) => Promise<Review>;

export const getAllReviews: GetReviews = async () =>
    axios
        .get('/api/v1/review')
        .then((r: AxiosResponse <Review[]>) => r.data)
        .catch();

export const saveReview: SaveReview = (review: Review) => (
    axios
        .post('/api/v1/review', review)
        .then((r: AxiosResponse <Review>)=> r.data)
        .catch());
