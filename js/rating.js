document.addEventListener("DOMContentLoaded", function () {

    const stars = document.querySelectorAll(".star");
    const submitButton = document.getElementById("submitRating");
    const reviewInput = document.getElementById("ratingReview");
    const message = document.getElementById("ratingMessage");

    let selectedRating = 0;

    // Star selection
    stars.forEach((star) => {

        star.addEventListener("click", function () {

            selectedRating = Number(this.dataset.rating);

            stars.forEach((s) => {
                const rating = Number(s.dataset.rating);

                if (rating <= selectedRating) {
                    s.classList.add("selected");
                    s.textContent = "★";
                } else {
                    s.classList.remove("selected");
                    s.textContent = "☆";
                }
            });

        });

    });

    // Submit rating
    submitButton.addEventListener("click", async function () {

        if (selectedRating === 0) {
            message.textContent = "Please select a star rating first.";
            message.style.color = "red";
            return;
        }

        const review = reviewInput.value.trim();

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        try {

            const { error } = await supabase
                .from("ratings")
                .insert({
                    rating: selectedRating,
                    review: review || null
                });

            if (error) {
                console.error("Rating error:", error);

                message.textContent =
                    "Rating could not be submitted: " + error.message;

                message.style.color = "red";

                submitButton.disabled = false;
                submitButton.textContent = "Submit Rating";

                return;
            }

            message.textContent =
                "Thank you! Your rating has been submitted.";

            message.style.color = "green";

            selectedRating = 0;

            stars.forEach((star) => {
                star.classList.remove("selected");
                star.textContent = "☆";
            });

            reviewInput.value = "";

            submitButton.textContent = "Submitted ✓";

        } catch (error) {

            console.error(error);

            message.textContent =
                "Something went wrong. Please try again.";

            message.style.color = "red";

            submitButton.disabled = false;
            submitButton.textContent = "Submit Rating";
        }

    });

});
