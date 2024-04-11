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

//DropDown
  
  const ddMenuDiv = document.getElementById("ddMenu");
  const plantCarouselDiv = document.getElementById("plantCarousel");
  
  fetch("onestate.json")
    .then(response => response.json())
    .then(data => {
      if (data && data.hasOwnProperty("states")) {
        ddMenuDiv.innerHTML = '';
  
        const statesObject = data.states;
  
        for (const stateName in statesObject) {
          const dropdownItem = `<a class="dropdown-item text-center text-white" href="#">${stateName}</a>`;
          ddMenuDiv.innerHTML += dropdownItem;
        }

        for (const stateName in statesObject) {
          const commonName = statesObject[stateName].commonName;
          const scientificName = statesObject[stateName].scientificName;
          const imageSrc = `images/${statesObject[stateName].image}`;

          const plantCard = `
            <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
              <div class="card">
                <img src="${imageSrc}" class="card-img-top" alt="Video thumbnail"/>
                <div class="card-body text-white rounded-bottom">
                  <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>${statesObject[stateName].stateFlower}</p>
                  <p class="pb-2 pt-3 pl-2"><span class="bullet">&#8226;</span>${commonName}</p>
                  <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>${scientificName}</p>
                </div>
              </div>
            </div>
          `;
  
          plantCarouselDiv.innerHTML += plantCard;
        }
  
        startCarousel();
      } else {
        console.error("Error: Empty data or error fetching data");
      }
    })
    .catch(error => console.error('Error fetching data:', error));

//Cards

// States Carousel
  function startCarousel() {
    $('#plantCarousel').slick({
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
  }
});