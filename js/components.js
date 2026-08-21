document.addEventListener("DOMContentLoaded", function () {
    // Helper to fetch and inject component HTML
    const loadComponent = (selector, filePath) => {
        const target = document.querySelector(selector);
        if (!target) return;

        fetch(filePath)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.text();
            })
            .then(html => {
                target.innerHTML = html;
                // Highlight active nav link based on current page
                if (selector === "#header-placeholder") {
                    highlightActiveNav();
                }
            })
            .catch(err => console.error(`Error loading ${filePath}:`, err));
    };

    const highlightActiveNav = () => {
        const page = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
            if (link.getAttribute("href") === page) {
                link.classList.add("active");
            }
        });
    };

    loadComponent("#header-placeholder", "includes/header.html");
    loadComponent("#footer-placeholder", "includes/footer.html");
});