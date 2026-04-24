export const AddReviewPage = () => {

    return(

        <>
            <h1>
                Review Page
            </h1>

            <h2>Enter Rating</h2>

            <div>
            <fieldset>
            <label htmlFor= "radio1">
                <input id="radio1" type="radio" name="1" value="1"/>1
            </label>

            <label htmlFor = "radio2">
                <input id="radio1" type="radio" name="2" value="2"/>2
            </label>

            <label htmlFor="radio3" >
                <input id="radio3" type="radio" name="3" value="3"/>3
            </label>
        </fieldset>
            </div>

            <input
                type="text"
                placeholder="Description"
            />

            <button>Submit Review</button>



        </>
    )
}