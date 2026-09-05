(function ($) {
    "use strict";

    // Spinner
    const hideSpinner = () => {
        const spinner = $('#spinner');
        if (spinner.length > 0) {
            spinner.removeClass('show');
        }
    };
    setTimeout(hideSpinner, 1);

    // WOW.js Initialization
    if (typeof WOW === 'function') {
        new WOW().init();
    }

    // Sticky Navbar & Back to Top triggers
    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();

        // Sticky Navbar
        if (scrollTop > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
            $('.back-to-top').fadeOut('slow');
        }
    });

    // Back to top button click
    $(document).on('click', '.back-to-top', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Facts counter (CounterUp)
    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // Carousels
    if ($.fn.owlCarousel) {
        $(".header-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            loop: true,
            nav: false,
            dots: true,
            items: 1,
            dotsData: true,
        });

        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: true,
            dots: false,
            loop: true,
            nav: true,
            navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
            responsive: {
                0: { items: 1 },
                768: { items: 2 }
            }
        });
    }

    // Portfolio Isotope Filtering
    if ($.fn.isotope) {
        const $portfolioContainer = $('.portfolio-container');
        if ($portfolioContainer.length) {
            const portfolioIsotope = $portfolioContainer.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            $('#portfolio-flters').on('click', 'li', function () {
                $("#portfolio-flters li").removeClass('active');
                $(this).addClass('active');
                portfolioIsotope.isotope({ filter: $(this).data('filter') });
            });
        }
    }

    // --- ANTI-SPAM & CAPTCHA ENGINE ---
    "use strict";

    let currentCaptchaAnswer = "";
    const pageLoadTime = Date.now();

    // Replace with your copied Google Web App URL
    const GOOGLE_SCRIPT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxtbbdN4mj2rNwYj6jgkgxMQgv9iN3ujTCx7CAo_X4xk0Tfab7XMuNs-cva1FeVdTCE/exec";

    function renderQuoteCaptcha() {
        const canvas = document.getElementById("quoteCaptchaCanvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const useMathEquation = Math.random() > 0.35;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Visual noise
        for (let i = 0; i < 6; i++) {
            ctx.strokeStyle = `rgba(${Math.random()*180}, ${Math.random()*180}, ${Math.random()*220}, 0.2)`;
            ctx.lineWidth = Math.floor(Math.random() * 2) + 1;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        let labelText = "";
        if (useMathEquation) {
            const numA = Math.floor(Math.random() * 12) + 1;
            const numB = Math.floor(Math.random() * 9) + 1;
            const isAdd = Math.random() > 0.4;

            if (isAdd) {
                labelText = `${numA} + ${numB} = ?`;
                currentCaptchaAnswer = (numA + numB).toString();
            } else {
                const high = Math.max(numA, numB);
                const low = Math.min(numA, numB);
                labelText = `${high} - ${low} = ?`;
                currentCaptchaAnswer = (high - low).toString();
            }
        } else {
            const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
            currentCaptchaAnswer = "";
            for (let i = 0; i < 5; i++) {
                currentCaptchaAnswer += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            labelText = currentCaptchaAnswer.split('').join(' ');
        }

        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "#198754";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((Math.random() - 0.5) * 0.12);
        ctx.fillText(labelText, 0, 0);
        ctx.restore();
    }

    $(document).ready(function () {
        renderQuoteCaptcha();

        $(document).on("click", "#refreshQuoteCaptcha, #quoteCaptchaCanvas", function () {
            renderQuoteCaptcha();
            $("#quote-captcha").val("");
        });

        // Form Submission Handler
        $("#quoteForm").on("submit", function (e) {
            e.preventDefault();

            const $form = $(this);
            const $submitBtn = $form.find("button[type='submit']");
            const $resultBox = $("#quoteResult");

            $resultBox.removeClass("d-block alert-success alert-danger alert-warning").addClass("d-none");

            // 1. Anti-Spam Check: Honeypot Validation
            const honeypotVal = $("#website").val();
            if (honeypotVal && honeypotVal.trim() !== "") {
                $resultBox.removeClass("d-none").addClass("d-block alert-danger")
                    .text("Automated submission detected.");
                return false;
            }

            // 2. Anti-Spam Check: Minimum Time Threshold (2.5 seconds)
            if ((Date.now() - pageLoadTime) < 2500) {
                $resultBox.removeClass("d-none").addClass("d-block alert-warning")
                    .text("Please take a moment before submitting.");
                return false;
            }

            // 3. Anti-Spam Check: CAPTCHA Validation
            const userAns = $("#quote-captcha").val().trim();
            if (!userAns || userAns.toLowerCase() !== currentCaptchaAnswer.toLowerCase()) {
                $resultBox.removeClass("d-none").addClass("d-block alert-danger")
                    .text("Incorrect security answer. Please try again.");
                renderQuoteCaptcha();
                $("#quote-captcha").val("").focus();
                return false;
            }

            // --- ALL ANTI-SPAM CHECKS PASSED: POST TO GOOGLE WEBHOOK ---
            const formData = {
                name: $("#quote-name").val().trim(),
                email: $("#quote-email").val().trim(),
                phone: $("#quote-phone").val().trim(),
                service: $("#quote-service").val(),
                message: $("#quote-message").val().trim()
            };

            // Disable button during network request
            $submitBtn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...');

            // Native fetch request using mode: 'no-cors'
            fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
                method: "POST",
                mode: "no-cors", // Bypasses CORS browser block
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                // Note: 'no-cors' returns an opaque response, but data is successfully received by Google Script
                $resultBox.removeClass("d-none").addClass("d-block alert-success")
                    .html('<i class="fas fa-check-circle me-1"></i> Thank you! Your quote request has been sent successfully.');
                $form[0].reset();
                renderQuoteCaptcha();
            })
            .catch((error) => {
                console.error("Submission Error:", error);
                $resultBox.removeClass("d-none").addClass("d-block alert-danger")
                    .text("Unable to connect to server. Please try again.");
            })
            .finally(() => {
                $submitBtn.prop("disabled", false).html("Request My Quote");
            });
        });
    });

})(jQuery);