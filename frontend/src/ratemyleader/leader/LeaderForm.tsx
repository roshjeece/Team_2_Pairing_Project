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

    const onSubmit = async (data: Leader) => {
        await axiosSaveLeader(data);

    }

    return (
        <>
            <h2>Leader Form</h2>
            <form onSubmit={handleSubmit(data => onSubmit(data))} method={'POST'}>
                <label htmlFor={"fname"} aria-label={"fname"}>First Name:
                </label>
                <input
                    id={"fname"}
                    type={"text"}
                    {...register("fname")}
                />

                <br/>

                <label htmlFor={"lname"} aria-label={"lname"}>Last Name:
                </label>
                <input
                    id={"lname"}
                    type={"text"}
                    {...register("lname")}
                />

                <label htmlFor={"job_title"} aria-label={"job_title"}>Job Title:
                </label>
                <input
                    id={"job_title"}
                    type={"text"}
                    {...register("job_title")}
                />

                <br/>

                <input type={'submit'} value={"Add Leader"}/>

            </form>
        </>
    )
}