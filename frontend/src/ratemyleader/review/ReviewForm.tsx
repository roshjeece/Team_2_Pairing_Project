import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/src";
import type {Review} from "./ReviewType.ts";
import {saveReview} from "./ReviewService.ts";
import {useEffect} from "react";
import {number, object, string} from "yup";
import type {Leader} from "../leader/LeaderType.ts";

type ReviewFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const validationSchema = object({
    id: number(),
    rating: number(),
    description: string(),
    date: string()
})

export const ReviewForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<Review>({
        resolver: yupResolver()
    })


    return (
        <>
            <h2> Enter a rating </h2>
                <form>
                    <fieldset>
                        <label htmlFor="rating1">1</label>
                        <input
                            id="rating1"
                            type="radio"
                            value="1"
                            {...register("rating")}
                        />
                        <label htmlFor="rating2">2</label>
                        <input
                            id="rating2"
                            type="radio"
                            value="2"
                            {...register("rating")}
                        />
                        <label htmlFor="rating3">3</label>
                        <input
                            id="rating3"
                            type="radio"
                            value="3"
                            {...register("rating")}
                        />

                    </fieldset>

                    <input
                        type="text"
                        placeholder="Description"
                    />

                    <button>Submit Review</button>

                </form>
        </>

)
}