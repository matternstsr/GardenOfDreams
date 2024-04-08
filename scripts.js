const backgroundImages = [
    'images/image1.jpeg',
    'images/image2.jpeg',
    'images/image3.jpeg',
    'images/image4.jpeg',
    'images/image5.jpeg'
];

let index = 0;

function changeBackground() {
    const background = document.getElementById('header');
    const path = backgroundImages[index];
    background.style.backgroundImage = `url(${path})`;
    index = (index + 1) % backgroundImages.length;
}

changeBackground();
setInterval(changeBackground, 10000);