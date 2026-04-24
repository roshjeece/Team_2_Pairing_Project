import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/src";
import type {Review} from "./ReviewType.ts";
import {saveReview} from "./ReviewService.ts";
import {useEffect} from "react";

type ReviewFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const ReviewForm = ({isOpen, onClose, onSuccess}: ReviewFormProps)=> {
    const{
        register,
        handleSubmit,
        reset,
        formState: {errors}
    }=useForm<Review>({
        resolver: yupResolver()
    })

    useEffect(() => {
        if(!isOpen){
            reset();
        }
        },[isOpen]);

    const onSubmit = async (data: Review) => {
        await saveReview(data);
        reset();
        onSuccess?.();
        onClose();
    }
    if(!isOpen) return null;
    return(
        <form onSubmit={handleSubmit(data => onSubmit(data))} method={'POST'}>
            <label htmlFor={'Reviews'}>Create a Review</label>
            <input type="text"
            placeholder="Enter a review"
                   {...register('Review')}
            />
            <button
                onClick={onClose}
            >Cancel
            </button>
            <button>
                Submit
            </button>
        </form>

    )
}