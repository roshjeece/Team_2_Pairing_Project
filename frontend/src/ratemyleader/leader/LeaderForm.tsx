import type {Leader} from "./LeaderType.ts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/src";
import {number, object, string} from "yup";
import {axiosSaveLeader} from "./LeaderService.ts";

const validationSchema = object({
    id: number(),
    fname: string().required("Name field is required."),
    lname: string().required("Name field is required."),
    job_title: string().required("Enter a job title.")
})

export const LeaderForm = () => {

    const {
        register,
        handleSubmit,
    } = useForm<Leader>({
        resolver: yupResolver(validationSchema)
    })

function onSubmit(data: Leader) {
    axiosSaveLeader(data);

}

    return (
        <>
            <h2>Leader Form</h2>
            <form onSubmit={handleSubmit(data => onSubmit(data))} method={'POST'}>
                <label htmlFor="{fname}" aria-label={"fname"}>First Name:
                    <input
                        id={"fname"}
                        type={"text"}
                        {...register("fname")}
                    />
                </label>

                <br/>

                <label htmlFor="{lname}" aria-label={"lname"}>Last Name:
                    <input
                        id={"lname"}
                        type={"text"}
                        {...register("lname")}
                    />
                </label>

                <label htmlFor="{job_title}" aria-label={"job_title"}>Job Title:
                    <input
                        id={"job_title"}
                        type={"text"}
                        {...register("job_title")}
                    />
                </label>
            </form>
        </>
    )}