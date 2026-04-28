// OVERALL PURPOSE: ReviewForm collects a leader selection, rating (1-5), and description
// from the user and submits it to the review API. Leaders are fetched from the backend
// on mount to populate the dropdown. Form resets after successful submission.

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Review } from "./ReviewType.ts";
import { saveReview } from "./ReviewService.ts";
import { number, object, string } from "yup";
import { useState, useEffect } from "react";
import type { Leader } from "../leader/LeaderType.ts";
import axios from "axios";

// Yup validation — rating and description are required, id and date are optional
const validationSchema = object({
    id: number(),
    rating: number().required("Rating is required"),
    description: string().required("Description is required"),
    date: string().required("Date is required")
});

export const ReviewForm = () => {
    // Holds the list of leaders fetched from the API for the dropdown
    const [leaders, setLeaders] = useState<Leader[]>([]);

    // Holds the leader object the user selected — sent with the review on submit
    const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

    // On mount, fetch all leaders from the backend to populate the dropdown
    useEffect(() => {
        axios.get('/api/entity/leader')
            .then(r => setLeaders(r.data))
            .catch(err => console.error('Failed to fetch leaders:', err));
    }, []);

    // react-hook-form wired to Yup schema — errors tracks validation failures
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Review>({
        resolver: yupResolver(validationSchema) as any
    });

    // Called when form passes validation — merges selected leader into form data
    // then sends to API, resets form fields, and clears selected leader
    const onSubmit = async (data: any) => {
        await saveReview({
            ...data,
            leader: selectedLeader
        });
        reset();
        setSelectedLeader(null);
    };

    return (
        <>
            <h2>Enter a rating</h2>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">

                {/* Dropdown — each option is a leader from the API.
                    When selected, stores the full leader object in state
                    so it can be sent with the review on submit */}
                <label htmlFor="leader">Select Leader:</label>
                <select
                    id="leader"
                    onChange={(e) => {
                        const found = leaders.find(l => l.id === Number(e.target.value));
                        setSelectedLeader(found || null);
                    }}
                >
                    {/*SELECT A LEADER & MAPS THROUGH THEIR FIRST AND LAST NAME*/}
                    <option value="">-- Select a Leader --</option>
                    {leaders.map(leader => (
                        <option key={leader.id} value={leader.id}>
                            {leader.fname} {leader.lname}
                        </option>
                    ))}
                </select>

                <br />
                {/*Adding date */}
                <label htmlFor={'date'}>Date:</label>
                <input
                    id="date"
                    type="date"
                    {...register("date")}
                />
                {errors.date && <span>{errors.date.message}</span>}

                {/* Rating fieldset — renders radio buttons 1 through 5.
                   Added React Hook-Validation to Validate The Radio Buttons */}
                <fieldset>
                    <legend>Leader Rating:</legend>
                    {[1, 2, 3, 4, 5].map(n => (
                        <span key={n}>
                            <label htmlFor={`rating${n}`}>{n}</label>
                            <input
                                id={`rating${n}`}
                                type="radio"
                                value={n}
                                {...register("rating")}
                            />
                            {errors.rating && <span>{errors.rating.message}</span>}
                        </span>

                    ))}
                </fieldset>

                {/* Description free-text input — registered with react-hook-form.
                    Shows error message if left empty on submit */}

                <input
                    id="description"
                    type="text"
                    placeholder="Description"
                    {...register("description")}
                />
                {errors.description && <span>{errors.description.message}</span>}

                <br />

                {/* Reset clears the form fields back to empty.
                    Submit triggers handleSubmit which runs Yup validation first */}
                <button type="reset">Reset</button>
                <button type="submit">Submit Review</button>

            </form>
        </>
    );
};