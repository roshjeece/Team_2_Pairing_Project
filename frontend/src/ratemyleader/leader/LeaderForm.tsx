import type { Leader } from "./LeaderType.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";
import { axiosSaveLeader } from "./LeaderService.ts";

const validationSchema = object({
    id: number(),
    fname: string().required("First Name Is Required"),
    lname: string().required("Last Name Is Required"),
    job_title: string().required("Enter A Job Title")
});

// ADDED: prop type so LeaderPage can refresh the list after a save
type LeaderFormProps = {
    onLeaderSaved?: () => void;
}

export const LeaderForm = ({ onLeaderSaved }: LeaderFormProps) => {
    const {
        register,
        handleSubmit,
        reset,                              // ADDED: clears form after submit
        formState: { errors }
    } = useForm<Leader>({
        resolver: yupResolver(validationSchema) as any
    });

    const onSubmit = async (data: any) => {
        await axiosSaveLeader(data);
        reset();                            // ADDED: clear fields after save
        if (onLeaderSaved) onLeaderSaved(); // ADDED: tell parent to refresh
    };

    return (
        <>
            <h2>Leader Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">

                <label htmlFor="fname">First Name:</label>
                <input
                    id="fname"
                    type="text"
                    {...register("fname")}
                />
                {errors.fname && <span>{errors.fname.message}</span>}

                <br />

                <label htmlFor="lname">Last Name:</label>
                <input
                    id="lname"
                    type="text"
                    {...register("lname")}
                />
                {errors.lname && <span>{errors.lname.message}</span>}

                <br />

                <label htmlFor="job_title">Job Title:</label>
                <input
                    id="job_title"
                    type="text"
                    {...register("job_title")}
                />
                {errors.job_title && <span>{errors.job_title.message}</span>}

                <br />

                <button type="submit">Add Leader</button>

            </form>
        </>
    );
};