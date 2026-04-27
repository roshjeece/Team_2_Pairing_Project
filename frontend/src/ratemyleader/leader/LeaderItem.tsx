import type { Leader } from "./LeaderType.ts";

type LeaderItemProps = {
    initialLeader: Leader;
}

export const LeaderItem = ({ initialLeader }: LeaderItemProps) => {
    return (
        <li
            aria-label={`Leader ${String(initialLeader.id)}`}  // String() converts number → string safely
            id={String(initialLeader.id)}                      // id attribute also requires a string
        >
            <b>{initialLeader.fname} {initialLeader.lname}</b>
            <p>{initialLeader.job_title}</p>
        </li>
    );
};