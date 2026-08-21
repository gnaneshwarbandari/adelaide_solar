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

})(jQuery);