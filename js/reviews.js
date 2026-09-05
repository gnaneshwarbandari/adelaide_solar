document.addEventListener("DOMContentLoaded", function () {

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzyWxvoqMNcyRSImA4STSVb1dpLVWiBH0ErRJuEhlgypU6xlgcaN1vlqxNAaUKo5CT7ZQ/exec";

    const reviewsContainer = document.getElementById("reviews-container");
    const ratingValue = document.getElementById("google-rating-value");
    const ratingStars = document.getElementById("google-rating-stars");

    if (!reviewsContainer) {
        console.error("Reviews container not found.");
        return;
    }

    fetch(WEB_APP_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load Google reviews.");
            }
            return response.json();
        })
        .then(data => {

            reviewsContainer.innerHTML = "";

            // Limit total reviews to 5 
            const reviews = (data.reviews || []).slice(0, 5);

            if (!data.reviews || reviews.length === 0) {
                reviewsContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <p class="text-muted">
                            Customer reviews are currently unavailable.
                        </p>
                    </div>
                `;
                return;
            }

            // Calculate average rating from returned reviews
            const totalRating = reviews.reduce(
                (sum, review) => sum + (Number(review.rating) || 0),
                0
            );

            const averageRating = totalRating / reviews.length;

            if (ratingValue) {
                ratingValue.textContent = averageRating.toFixed(1);
            }

            if (ratingStars) {
                const roundedRating = Math.round(averageRating);

                ratingStars.textContent =
                    "★".repeat(roundedRating) +
                    "☆".repeat(5 - roundedRating);
            }

            // Create review cards
            reviews.forEach(review => {

                const col = document.createElement("div");
                col.className = "col-md-6 col-lg-4";

                const card = document.createElement("article");
                card.className = "google-review-card h-100";

                // Header
                const header = document.createElement("div");
                header.className = "review-card-header";

                const reviewerInfo = document.createElement("div");
                reviewerInfo.className = "reviewer-info";

                // Avatar
                const avatar = document.createElement("div");
                avatar.className = "reviewer-avatar";

                const authorName =
                    review.author_name || "Google Customer";

                avatar.textContent =
                    authorName.trim().charAt(0).toUpperCase();

                // Reviewer details
                const reviewerDetails = document.createElement("div");

                const name = document.createElement("strong");
                name.className = "reviewer-name";
                name.textContent = authorName;

                const source = document.createElement("small");
                source.className = "review-source";

                const googleIcon = document.createElement("i");
                googleIcon.className = "fab fa-google me-1";

                source.appendChild(googleIcon);
                source.appendChild(
                    document.createTextNode(" Google Review")
                );

                reviewerDetails.appendChild(name);
                reviewerDetails.appendChild(source);

                reviewerInfo.appendChild(avatar);
                reviewerInfo.appendChild(reviewerDetails);

                // Rating
                const rating = document.createElement("div");
                rating.className = "review-rating";

                const reviewRating =
                    Number(review.rating) || 5;

                rating.textContent =
                    "★".repeat(reviewRating);

                header.appendChild(reviewerInfo);
                header.appendChild(rating);

                // Review text
                const reviewTextWrapper =
                    document.createElement("div");

                reviewTextWrapper.className =
                    "review-text-wrapper";

                const reviewText =
                    document.createElement("p");

                reviewText.className = "review-text";

                const reviewContent =
                    review.text || "Great experience.";

                reviewText.textContent = reviewContent;

                reviewTextWrapper.appendChild(reviewText);

                // Read more
                if (reviewContent.length > 200) {

                    reviewText.classList.add(
                        "review-truncated"
                    );

                    const readMore =
                        document.createElement("button");

                    readMore.type = "button";
                    readMore.className =
                        "review-read-more";

                    readMore.textContent = "Read more";

                    readMore.addEventListener(
                        "click",
                        function () {

                            const expanded =
                                reviewText.classList.toggle(
                                    "review-expanded"
                                );

                            readMore.textContent =
                                expanded
                                    ? "Show less"
                                    : "Read more";
                        }
                    );

                    reviewTextWrapper.appendChild(
                        readMore
                    );
                }

                // Footer
                const footer =
                    document.createElement("div");

                footer.className =
                    "review-card-footer";

                const date =
                    document.createElement("small");

                date.textContent =
                    review.relative_time_description || "";

                footer.appendChild(date);

                // Build card
                card.appendChild(header);
                card.appendChild(reviewTextWrapper);
                card.appendChild(footer);

                col.appendChild(card);

                reviewsContainer.appendChild(col);
            });

        })
        .catch(error => {

            console.error(
                "Google Reviews Error:",
                error
            );

            reviewsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted">
                        Customer reviews are temporarily unavailable.
                    </p>
                </div>
            `;
        });

});
