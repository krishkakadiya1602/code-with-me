document.addEventListener("DOMContentLoaded", function () {

    const stars = document.querySelectorAll(".star");
    const submitButton = document.getElementById("submitRating");
    const reviewInput = document.getElementById("ratingReview");
    const message = document.getElementById("ratingMessage");

    let selectedRating = 0;


    // ================= STAR SELECTION =================

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


    // ================= SUBMIT RATING =================

    submitButton.addEventListener("click", async function () {

        if (selectedRating === 0) {

            message.textContent =
                "Please select a star rating first.";

            message.style.color = "red";

            return;
        }


        const review = reviewInput.value.trim();


        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";


        try {

            // Send rating to Supabase
            const { error } = await supabase
                .from("ratings")
                .insert({
                    rating: selectedRating,
                    review: review || null
                });


            // Check Supabase error
            if (error) {

                console.error("Rating error:", error);

                message.textContent =
                    "Rating could not be submitted: " +
                    error.message;

                message.style.color = "red";

                submitButton.disabled = false;
                submitButton.textContent = "Submit Rating";

                return;
            }


            // ================= SUCCESS =================

            message.textContent =
                "Thank you! Your rating has been submitted.";

            message.style.color = "green";


            // Reset selected rating
            selectedRating = 0;


            stars.forEach((star) => {

                star.classList.remove("selected");
                star.textContent = "☆";

            });


            // Clear review
            reviewInput.value = "";


            // Change button text
            submitButton.textContent = "Submitted ✓";


        } catch (error) {

            console.error(
                "FULL RATING ERROR:",
                error
            );

            message.textContent =
                "Something went wrong: " +
                error.message;

            message.style.color = "red";

            submitButton.disabled = false;

            submitButton.textContent =
                "Submit Rating";
        }

    });

});
