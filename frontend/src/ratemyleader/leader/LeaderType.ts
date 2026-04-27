export type Leader = {
    id?: number;        // just number — Postgres always returns a number, never a string
    fname: string;
    lname: string;
    job_title: string;
}