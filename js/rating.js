// ========================================
// Code With Me - Rating System
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------------
    // Get HTML elements
    // ----------------------------------------

    const stars = document.querySelectorAll(
        ".star, .rating-star, [data-rating]"
    );

    const ratingText = document.getElementById("ratingText");

    const reviewInput =
        document.getElementById("review") ||
        document.getElementById("reviewText") ||
        document.querySelector("textarea");

    const submitButton =
        document.getElementById("submitRating");

    const message =
        document.getElementById("ratingMessage");

    let selectedRating = 0;


    // ----------------------------------------
    // Check Supabase
    // ----------------------------------------

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        showMessage(
            "Supabase is not configured yet.",
            "error"
        );

        return;
    }


    // ----------------------------------------
    // Star Rating
    // ----------------------------------------

    stars.forEach(function (star) {

        star.addEventListener("click", function () {

            let rating =
                parseInt(
                    this.getAttribute("data-rating")
                );

            if (!rating) {
                rating =
                    parseInt(
                        this.dataset.rating
                    );
            }

            if (!rating) {
                return;
            }

            selectedRating = rating;

            updateStars();

            updateRatingText();

        });


        // Mouse hover

        star.addEventListener("mouseenter", function () {

            let rating =
                parseInt(
                    this.getAttribute("data-rating")
                );

            if (!rating) {
                rating =
                    parseInt(
                        this.dataset.rating
                    );
            }

            highlightStars(rating);

        });


        // Mouse leave

        star.addEventListener("mouseleave", function () {

            updateStars();

        });

    });


    // ----------------------------------------
    // Update Stars
    // ----------------------------------------

    function updateStars() {

        stars.forEach(function (star) {

            let rating =
                parseInt(
                    star.getAttribute("data-rating")
                );

            if (!rating) {
                rating =
                    parseInt(
                        star.dataset.rating
                    );
            }

            if (rating <= selectedRating) {

                star.style.color = "#f59e0b";

            } else {

                star.style.color = "#d1d5db";

            }

        });

    }


    // ----------------------------------------
    // Highlight Stars on Hover
    // ----------------------------------------

    function highlightStars(rating) {

        stars.forEach(function (star) {

            let starRating =
                parseInt(
                    star.getAttribute("data-rating")
                );

            if (!starRating) {
                starRating =
                    parseInt(
                        star.dataset.rating
                    );
            }

            if (starRating <= rating) {

                star.style.color = "#f59e0b";

            } else {

                star.style.color = "#d1d5db";

            }

        });

    }


    // ----------------------------------------
    // Rating Text
    // ----------------------------------------

    function updateRatingText() {

        if (!ratingText) {
            return;
        }

        ratingText.textContent =
            "You selected " +
            selectedRating +
            " out of 5 stars.";

    }


    // ----------------------------------------
    // Submit Rating
    // ----------------------------------------

    if (submitButton) {

        submitButton.addEventListener(
            "click",
            async function () {

                // Check rating

                if (selectedRating === 0) {

                    showMessage(
                        "Please select a rating first.",
                        "error"
                    );

                    return;
                }


                // Get review

                let review = "";

                if (reviewInput) {
                    review =
                        reviewInput.value.trim();
                }


                // Disable button

                submitButton.disabled = true;

                submitButton.textContent =
                    "Submitting...";


                try {

                    // Insert rating into Supabase

                    const {
                        data,
                        error
                    } = await supabaseClient
                        .from("ratings")
                        .insert([
                            {
                                rating: selectedRating,
                                review: review
                            }
                        ])
                        .select();


                    // Check error

                    if (error) {

                        console.error(
                            "Supabase Error:",
                            error
                        );

                        showMessage(
                            "Unable to submit rating. Please try again.",
                            "error"
                        );

                        submitButton.disabled = false;

                        submitButton.textContent =
                            "Submit Rating";

                        return;
                    }


                    // Success

                    showMessage(
                        "Thank you! Your rating has been submitted successfully.",
                        "success"
                    );


                    // Clear selected stars

                    selectedRating = 0;

                    updateStars();

                    updateRatingText();


                    // Clear review

                    if (reviewInput) {
                        reviewInput.value = "";
                    }


                    // Reset button

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Submit Rating";

                }

                catch (error) {

                    console.error(
                        "Rating Error:",
                        error
                    );

                    showMessage(
                        "Something went wrong. Please try again.",
                        "error"
                    );

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Submit Rating";

                }

            }
        );

    }


    // ----------------------------------------
    // Show Message
    // ----------------------------------------

    function showMessage(text, type) {

        if (!message) {
            alert(text);
            return;
        }

        message.textContent = text;

        if (type === "success") {

            message.style.color = "#16a34a";

        } else {

            message.style.color = "#ef4444";

        }

    }

});
