import {setupServer} from 'msw/node';
import type {Review} from "../ReviewType.ts";
import type {Leader} from "../../leader/LeaderType.ts";
import {beforeAll, expect} from "vitest";
import {HttpResponse, http} from "msw";
import {saveReview} from "../ReviewService.ts";
import axios from "axios";


describe('Review Service Tests', () => {


    const server = setupServer();
    beforeAll(() => {
        server.listen();
        axios.defaults.baseURL = "http://localhost:8080";
    });


    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it('should save a review', async () => {

        // LocalDate date = LocalDate.of(2023, 5, 27);
        const currentDate = new Date().toISOString().split('T')[0];

        const leader: Leader= {
            id: 1,
            fname: "Peter",
            lname: "Egyinam",
            job_title: "janitor"
        };


        const expected: Review = {id: 1, leader: leader, rating: 5, description: "good", date: currentDate }

        server.use(
            http.post('http://localhost:8080/api/entity/review', () =>
            HttpResponse.json(expected, {status: 201}),
                ),
        );

        expect(await saveReview(expected)).toStrictEqual(expected);

    });


});


