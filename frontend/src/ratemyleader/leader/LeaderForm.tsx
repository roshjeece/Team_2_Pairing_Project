import type {Leader} from "./LeaderType.ts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {number, object, string} from "yup";
import {axiosSaveLeader} from "./LeaderService.ts";

// yup validation schema
const validationSchema = object({
    id: number(),
    fname: string().required("First Name Is Required"),
    lname: string().required("Last Name Is Required"),
    job_title: string().required("Enter A Job Title")
});

// prop types, accepts optional callback to notify the parent when a leader is saved
type LeaderFormProps = {
    onLeaderSaved?: () => void;
}

export const LeaderForm = ({onLeaderSaved}: LeaderFormProps) => {
    // initialize RHF with Yup validation and empty default values
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<Leader>({
        mode: "onSubmit",
        resolver: yupResolver(validationSchema) as any,
        defaultValues: {
            fname: "",
            lname: "",
            job_title: ""
        }
    });

    // saves leader, clear fields, notifies parent
    const onSubmit = async (data: any) => {
        try {
            await axiosSaveLeader(data);
            // KEY: use setValue instead of reset() to avoid RHF internal state conflicts
            // caused by parents re-renders triggered by onLeaderSaved
            setValue("fname", "");
            setValue("lname", "");
            setValue("job_title", "");
            if (onLeaderSaved) onLeaderSaved();
        } catch (err) {
            console.error("Save failed:", err);
        }
    };

    return (
        <>
            <h2>Leader Form</h2>
            {/* handleSubmit runs validation before calling onSubmit */}
            <form onSubmit={handleSubmit(onSubmit)} method="POST">

                <label htmlFor="fname">First Name:</label>
                <input
                    id="fname"
                    type="text"
                    {...register("fname")}
                />
                {errors.fname && <span>{errors.fname.message}</span>}

                <br/>

                <label htmlFor="lname">Last Name:</label>
                <input
                    id="lname"
                    type="text"
                    {...register("lname")}
                />
                {errors.lname && <span>{errors.lname.message}</span>}

                <br/>

                <label htmlFor="job_title">Job Title:</label>
                <input
                    id="job_title"
                    type="text"
                    {...register("job_title")}
                />
                {errors.job_title && <span>{errors.job_title.message}</span>}

                <br/>

                <button type="submit">Add Leader</button>

            </form>
        </>
    );
};