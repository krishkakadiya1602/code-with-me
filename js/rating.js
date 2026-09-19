// ==========================================
// WEBSITE RATING SYSTEM
// ==========================================

let selectedRating = 0;


// ==========================================
// SELECT STAR RATING
// ==========================================

function selectRating(rating) {

    selectedRating = rating;

    const stars = document.querySelectorAll(
        "#starContainer button"
    );

    stars.forEach((star, index) => {

        if (index < rating) {
            star.style.color = "gold";
        } else {
            star.style.color = "#ccc";
        }

    });

    document.getElementById("selectedRating").textContent =
        "You selected " + rating + " out of 5 stars";
}


// ==========================================
// SUBMIT RATING TO SUPABASE
// ==========================================

async function submitRating() {

    // Check rating
    if (selectedRating === 0) {

        document.getElementById("ratingMessage").textContent =
            "⚠️ Please select a rating first.";

        return;
    }


    // Get review
    const review =
        document.getElementById("review").value.trim();


    // Insert rating into Supabase
    const { data, error } = await supabaseClient
        .from("ratings")
        .insert([
            {
                rating: selectedRating,
                review: review
            }
        ]);


    // Error
    if (error) {

        console.error("Rating Error:", error);

        document.getElementById("ratingMessage").textContent =
            "❌ Failed to submit rating. Please try again.";

        return;
    }


    // Success
    document.getElementById("ratingMessage").textContent =
        "✅ Thank you! Your rating has been submitted.";


    // Clear review
    document.getElementById("review").value = "";


    // Reset rating
    selectedRating = 0;


    document.getElementById("selectedRating").textContent =
        "Select a rating";


    // Reset stars
    const stars = document.querySelectorAll(
        "#starContainer button"
    );

    stars.forEach(star => {
        star.style.color = "#ccc";
    });

}
