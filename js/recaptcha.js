const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzEovwkvHgPSx073Ip3yVP0dqWINYyzgbqzCMx4g_mO2FcDslhJj1vM83s4aiES2eax/exec";
const RECAPTCHA_SITE_KEY =
    "6LdmlWEtAAAAAJTSnVYo4nhXiWupAvw7LisPub1X";
const form = document.getElementById("quoteForm");
const submitButton = form.querySelector("button[type='submit']");
const resultAlert = document.getElementById("quoteResult");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    resultAlert.classList.add("d-none");
    resultAlert.innerHTML = "";
    // Prevent duplicate clicks
    submitButton.disabled = true;
    submitButton.innerHTML =
        `<span class="spinner-border spinner-border-sm me-2"></span>Submitting...`;
    try {
        // Validate Email
        const email = document.getElementById("quote-email").value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("Please enter a valid email address.");
        }
        // Validate Australian Phone
        const phone = document
            .getElementById("quote-phone")
            .value
            .replace(/\s+/g, "");
        if (!/^(\+61|0)\d{9}$/.test(phone)) {
            throw new Error("Please enter a valid Australian phone number.");
        }
        // Get reCAPTCHA Token
        const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, {
            action: "quote"
        });
        const payload = {
            name: document.getElementById("quote-name").value.trim(),
            email: email,
            phone: phone,
            service: document.getElementById("quote-service").value,
            message: document.getElementById("quote-message").value.trim(),
            website: document.getElementById("website").value,
            recaptchaToken: token
        };
        // Timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, 15000);
        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload),
            redirect: "follow",
            signal: controller.signal
        });
        clearTimeout(timeout);
        if (!response.ok) {
            throw new Error("Unable to submit your request.");
        }
        const text = await response.text();
        console.log("Apps Script Response:", text);
        const result = JSON.parse(text);
        resultAlert.classList.remove("d-none");
        if (result.success) {
            resultAlert.className =
                "alert alert-success mt-3";
            resultAlert.innerHTML =
                `<strong>✔ Thank you!</strong><br>
                    Your quote request has been submitted successfully.
                    <br>
                    Our Adelaide Solar team will contact you within one business day.`;
            form.reset();
        } else {
            resultAlert.className =
                "alert alert-danger mt-3";
            resultAlert.innerHTML =
                result.message || "Unable to submit your request.";
        }
    } catch (err) {
        console.error(err);
        resultAlert.classList.remove("d-none");
        resultAlert.className =
            "alert alert-danger mt-3";
        if (err.name === "AbortError") {
            resultAlert.innerHTML =
                "Request timed out. Please try again.";
        } else {
            resultAlert.innerHTML =
                err.message || "Something went wrong. Please try again.";
        }
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = "Request My Quote";
        resultAlert.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});