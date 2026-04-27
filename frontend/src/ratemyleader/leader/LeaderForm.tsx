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

//ADDED ERROR VALIDATION FOR TEST
export const LeaderForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Leader>({
        resolver: yupResolver(validationSchema) as any
    });

    const onSubmit = async (data: any) => {
        {
            await axiosSaveLeader(data);
        };
    }

    return (
        <>
            <h2>Leader Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">

                {/* CHANGED: removed aria-label from all labels
                    aria-label on a <label> overrides visible text for screen readers,
                    so getByLabelText("fname") worked but "First Name" was never announced.
                    htmlFor + id pairing is all that's needed — that's what links label to input. */}

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

                {/* CHANGED: <input type="submit"> → <button type="submit">
                    Both carry the implicit button role, but <button> is unambiguous
                    to getByRole and is the semantic standard for clickable actions. */}
                <button type="submit">Add Leader</button>

            </form>
        </>
    );
};