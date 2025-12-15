$(document).ready(function () {

    /* Sticky navbar & scroll button */
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
    });

    /* Toggle menu */
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    /* Typing animation */
    new Typed(".typing", {
        strings: ["Developer", "Designer", "Innovator", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    new Typed(".typing-2", {
        strings: ["Developer", "Designer", "Innovator", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    /* Accomplishments carousel */
    $('.carousel').owlCarousel({
        loop: true,
        margin: 25,

        autoplay: true,
        autoplayTimeout: 3000,      // ⏱️ 3 seconds
        autoplayHoverPause: false,
        smartSpeed: 800,

        nav: true,
        dots: true,
        slideBy: 1,

        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],

        responsive: {
            0: {
                items: 1,
                nav: true
            },
            768: {
                items: 2,
                nav: true
            },
            1024: {
                items: 3,
                nav: true
            }
        }
    });

});
