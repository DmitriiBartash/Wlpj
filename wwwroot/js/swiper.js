hookSlicks();

function hookSlicks() {
    $('.firstSwiper').slick({
        infinite: true,
        speed: 500,
        dots: true,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        // prevArrow: '<button type="button" class="first-slick-prev"></button>',
        // nextArrow: '<button type="button" class="first-slick-next"></button>',

    });

    $('.secondSwiper').slick({
        centerMode: true,
        infinite: true,
        slidesToShow: 4,
        // slidesToScroll: 5,
        // arrows: false,
        centerPadding: '0',
        prevArrow: '<button type="button" class="second-slick-prev"></button>',
        nextArrow: '<button type="button" class="second-slick-next"></button>',
        autoplay: false,
        autoplaySpeed: 2000,

        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });

    $('.secondSwiper').on('afterChange',
        function (event, slick, currentSlide, nextSlide) {
            console.log(nextSlide, " ", currentSlide);
        });
}