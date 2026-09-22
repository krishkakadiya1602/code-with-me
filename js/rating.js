// ========================================
// Code With Me - Rating System
// ========================================

let selectedRating = 0;


// ========================================
// STAR BUTTONS
// ========================================

const starButtons =
    document.querySelectorAll(".star-btn");


starButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedRating =
            Number(
                this.getAttribute("data-rating")
            );


        starButtons.forEach(function (star) {

            const rating =
                Number(
                    star.getAttribute("data-rating")
                );


            if (rating <= selectedRating) {

                star.classList.add("active");

            } else {

                star.classList.remove("active");

            }

        });


        document.getElementById(
            "selectedRating"
        ).textContent =
            "You selected " +
            selectedRating +
            " out of 5 stars.";

    });

});


// ========================================
// SUBMIT RATING
// ========================================

async function submitRating() {

    const message =
        document.getElementById(
            "ratingMessage"
        );


    const review =
        document.getElementById(
            "review"
        ).value.trim();


    // Check rating

    if (selectedRating === 0) {

        message.textContent =
            "Please select a rating first.";

        message.style.color =
            "#dc2626";

        return;

    }


    // Check Supabase

    if (!supabaseClient) {

        message.textContent =
            "Supabase is not configured yet.";

        message.style.color =
            "#dc2626";

        return;

    }


    // Show loading message

    message.textContent =
        "Submitting rating...";

    message.style.color =
        "#2563eb";


    try {

        const {
            error
        } = await supabaseClient
            .from("ratings")
            .insert([
                {
                    rating: selectedRating,
                    review: review || null
                }
            ]);


        if (error) {

            console.error(
                "Supabase rating error:",
                error
            );

            message.textContent =
                "Unable to submit rating. Please try again.";

            message.style.color =
                "#dc2626";

            return;

        }


        // Success

        message.textContent =
            "Thank you for your rating! ⭐";

        message.style.color =
            "#16a34a";


        // Clear review

        document.getElementById(
            "review"
        ).value = "";


        // Reset rating

        selectedRating = 0;


        starButtons.forEach(function (star) {

            star.classList.remove("active");

        });


        document.getElementById(
            "selectedRating"
        ).textContent =
            "Select a rating";


    } catch (error) {

        console.error(
            "Rating error:",
            error
        );


        message.textContent =
            "Something went wrong. Please try again.";

        message.style.color =
            "#dc2626";

    }

}


// ========================================
// VISITOR TRACKING
// ========================================

async function trackVisitor() {

    if (!supabaseClient) {

        return;

    }


    try {

        let visitorId =
            localStorage.getItem(
                "codeWithMeVisitorId"
            );


        if (!visitorId) {

            visitorId =
                "visitor-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2, 10);


            localStorage.setItem(
                "codeWithMeVisitorId",
                visitorId
            );

        }


        const {
            error
        } = await supabaseClient
            .from("visitors")
            .insert([
                {
                    visitor_id:
                        visitorId
                }
            ]);


        if (error) {

            console.log(
                "Visitor tracking:",
                error.message
            );

        }

    } catch (error) {

        console.log(
            "Visitor tracking error:",
            error
        );

    }

}


trackVisitor();
