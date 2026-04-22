import type {Leader} from "./LeaderType.ts";

type LeaderItemProps = {
    initialLeader: Leader;
}

export const LeaderItem = ({initialLeader}: LeaderItemProps) => {
    return (
        <li
            aria-label={`Leader ${initialLeader.id}`}
            id={initialLeader.id}
        >
            <b>{initialLeader.fname}</b>

        </li>

    );
};

