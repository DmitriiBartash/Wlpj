let currentSecondSlideNumber = 0;
let isFirstStart = false;
let oldSide = 0;

const slidesCounterBig = 5;
const slidesCounterMedium = 3;
document.addEventListener('DOMContentLoaded', function () {
    $('.testimonials-swiper').slick({
        dots: true,
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    arrows: true,
                    dots: false,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                    dots: false,
                }
            }
        ]
    });

    hookSlicks();
});
//window.addEventListener('resize', function (event) {
//    console.log("resize");
//    $('.testimonials-swiper').slick('unslick');
//    $('.testimonials-swiper').slick({
//        dots: true,
//        slidesToShow: 3,
//        arrows: false,
//        slidesToScroll: 1,
//        cssEase: 'linear',
//        responsive: [
//            {
//                breakpoint: 1100,
//                settings: {
//                    slidesToShow: 5
//                }
//            },
//            {
//                breakpoint: 500,
//                settings: {
//                    slidesToShow: 1,
//                    arrows: true,
//                    dots: false,
//                }
//            },
//            {
//                breakpoint: 800,
//                settings: {
//                    slidesToShow: 2,
//                    arrows: true,
//                    dots: false,
//                }
//            }
//        ]
//    });
//})


function hookSlicks() {
    // hook events
    $('.secondSwiper').on('afterChange', function (slick, direction) {
        currentSecondSlideNumber = $('.secondSwiper').slick('slickCurrentSlide');
        updateSecondSwiper();

        let desiredId = document.querySelector('.slick-center').getAttribute("name");

        let dataJSON =
        {
            "countryID": desiredId,
            "selectedLanguage": selectedLanguage
        }

        $.ajax({
            url: '/Home/LoadSecondSwiper',
            type: 'POST',
            data: JSON.stringify(dataJSON),
            contentType: 'application/json',
            success: function (result) {
                $('#firstSwiperHolder').html(result);
                document.querySelector('#tspan8024').textContent = languageModelJson[selectedLanguage][10]["fromSVG"];
                $('.firstSwiper').slick({
                    infinite: true,
                    speed: 500,
                    dots: true,
                    fade: true,
                    cssEase: 'linear',
                    arrows: false,
                });
            }
        });
    });

    $('.firstSwiper').slick({
        infinite: true,
        speed: 500,
        dots: true,
        fade: true,
        cssEase: 'linear',
        arrows: false,
    });

    if (isFirstStart == false) {
        isFirstStart = true;
        $('.secondSwiper').slick({
            centerMode: true,
            infinite: true,
            slidesToShow: slidesCounterBig,
            // slidesToScroll: 5,
            // arrows: false,
            centerPadding: '0',
            prevArrow: '<button type="button" class="second-slick-prev"></button>',
            nextArrow: '<button type="button" class="second-slick-next"></button>',
            // CHANGE MAIN SWIPER COUNTRIES TIMER
            autoplay: true,
            autoplaySpeed: 2000,

            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: slidesCounterMedium
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    updateSecondSwiper();
}

function updateSecondSwiper() {
    $('.secondSwiper').slick('getSlick').slickGoTo(currentSecondSlideNumber, true);
    document.querySelector('#tspan8024').textContent = languageModelJson[selectedLanguage][10]["fromSVG"];
}
