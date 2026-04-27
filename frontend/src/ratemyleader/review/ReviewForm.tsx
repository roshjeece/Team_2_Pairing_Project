import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import type {Review} from "./ReviewType.ts";
import {saveReview} from "./ReviewService.ts";
import {number, object, string} from "yup";


const validationSchema = object({
    id: number(),
    rating: number(),
    description: string(),
    date: string()
})

export const ReviewForm = () => {
    const {
        register,
        handleSubmit
        // formState: {errors}
    } = useForm<Review>({
        resolver: yupResolver(validationSchema) as any
    })

    const onSubmit = async (data:any) => {
        await saveReview(data)
    };


    return (
        <>
            <h2> Enter a rating </h2>
                <form onSubmit={handleSubmit(onSubmit)} method="POST">
                    <fieldset>
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="date"
                            {...register("date")}

                        />

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
                        id="description"
                        type="text"
                        name="description"
                        placeholder="Description"
                        {...register("description")}
                    />

                    <button type="submit">Submit Review</button>

                </form>
        </>

)
}