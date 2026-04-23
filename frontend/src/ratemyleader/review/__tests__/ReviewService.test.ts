import {setupServer} from 'msw/node';
import type {Review} from "../ReviewType.ts";
import type {Leader} from "../../leader/LeaderType.ts";
import {beforeAll, expect} from "vitest";
import {HttpResponse, http} from "msw";
import {axiosGetOneReview, getAllReviews} from "../ReviewService.ts";
import axios from "axios";

describe('Review Service Tests', () => {


    const server = setupServer();
    beforeAll(() => {
        server.listen();
        axios.defaults.baseURL = "http://localhost:8080";
    });

    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it('should get one review', async () => {

        const currentDate = new Date();

        const leader: Leader= {
            id: 1,
            fname: "Chuma",
            lname: "Humphrey",
            job_title: "janitor"
        };


        const expected: Review = {id: 1, leader: leader, rating: 5, description: "good", date: currentDate }

        server.use(
            http.get('/api/entity/review/1', () =>
            HttpResponse.json(expected, {status: 200}),
                ),
        );

        expect(await axiosGetOneReview(1)).toStrictEqual(expected);

        // expect(await getAllReviews()).toStrictEqual(expected);
    });


});

        // const expected: Review[] = [
        //
        //     {id: 1, leader: leader, rating: 5, description: "good", date: currentDate }
        //     // {id: 2, leader: leader, rating: 5, description: "good", date: currentDate }
        //
        // ];
