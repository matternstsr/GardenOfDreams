$(document).ready(function() {

// Background

    const backgroundImages = [
        'images/image1.jpeg',
        'images/image2.jpeg',
        'images/image3.jpeg',
        'images/image4.jpeg',
        'images/image5.jpeg'
    ];

    let index = 0;

    function changeBackground() {
        const background = document.getElementById('backgroundPic');
        const path = backgroundImages[index];
        background.style.backgroundImage = `url(${path})`;
        index = (index + 1) % backgroundImages.length;
    }

    changeBackground();
    setInterval(changeBackground, 10000);

    // States Carousel


    $('.plantCarousel').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        centerMode: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ] 
    });
});