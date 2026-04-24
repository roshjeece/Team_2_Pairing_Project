import axios from "axios";
import {setupServer} from 'msw/node';
import {http, HttpResponse} from "msw";
import {axiosSaveLeader} from "../LeaderService.ts";
import type {Leader} from "../LeaderType.ts";

describe('Leader Service Test', () => {
    const server = setupServer();
    beforeAll(() => {
        server.listen();
        // axios.defaults.baseURL = "http://localhost:8080";
    });

    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it('should save a leader', async () => {
        const leader: Leader = {
            id: 1,
            fname: "Justina",
            lname: "Cho",
            job_title: "Assistant"
        };

        server.use(
            http.post('/api/entity/leader', () =>
                HttpResponse.json(leader, {status: 201})
            ),
        );

        expect(await axiosSaveLeader()).toStrictEqual(leader)
    })});