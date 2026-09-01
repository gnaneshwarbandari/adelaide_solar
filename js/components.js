document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // Helper to fetch and inject component HTML
    // ============================================================
    const loadComponent = (selector, filePath) => {
        const target = document.querySelector(selector);

        if (!target) return;

        fetch(filePath)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                return res.text();
            })
            .then(html => {
                target.innerHTML = html;

                // Highlight active nav link based on current page
                if (selector === "#header-placeholder") {
                    highlightActiveNav();
                }
            })
            .catch(err => {
                console.error(`Error loading ${filePath}:`, err);
            });
    };


    // ============================================================
    // Highlight Active Navigation Link
    // ============================================================
    const highlightActiveNav = () => {

        const page =
            window.location.pathname.split("/").pop() || "index.html";

        document
            .querySelectorAll(".navbar-nav .nav-link")
            .forEach(link => {

                if (link.getAttribute("href") === page) {
                    link.classList.add("active");
                }

            });
    };


    // ============================================================
    // Load Shared Components
    // ============================================================
    loadComponent(
        "#header-placeholder",
        "includes/header.html"
    );

    loadComponent(
        "#footer-placeholder",
        "includes/footer.html"
    );

});


// ================================================================
// Close Bootstrap Modal + Open Contact Section in New Tab
// ================================================================
// IMPORTANT:
// This function is intentionally OUTSIDE DOMContentLoaded so that
// inline HTML onclick="closeModalAndOpenContact(...)" can access it.
// ================================================================
function closeModalAndOpenContact(event, url) {

    // Prevent the default link action
    event.preventDefault();

    // Find the currently visible Bootstrap modal
    const modalElement = document.querySelector(".modal.show");

    // Open the contact page in a new tab
    const newTab = window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

    // Close the currently open modal
    if (modalElement) {

        const modalInstance =
            bootstrap.Modal.getInstance(modalElement);

        if (modalInstance) {
            modalInstance.hide();
        }
    }

    // Fallback if browser blocks the new tab
    if (!newTab) {
        console.warn(
            "The browser blocked the new tab. Please allow pop-ups for this website."
        );
    }
}
