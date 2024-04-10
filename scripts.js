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

  // const ddMenuDiv = document.getElementById("ddMenu");

  // fetch("statesData.json")
  //   .then(response => response.json())
  //   .then(data => {

  //   if (data && data.length > 0) {
  //     ddMenuDiv.innerHTML = '';

  //     data.forEach(stateObject => {
  //       const stateName = stateObject.state;
  //       const dropdownItem = `<a class="dropdown-item text-center text-white" href="#">${stateName}</a>`;
  //       ddMenuDiv.innerHTML += dropdownItem;
  //     });
  //   } else {
  //     console.error("Error: Empty data or error fetching data");
  //   }
  // })
  // .catch(error => console.error('Error fetching data:', error));
  
  const ddMenuDiv = document.getElementById("ddMenu");
  
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
      } else {
        console.error("Error: Empty data or error fetching data");
      }
    })
    .catch(error => console.error('Error fetching data:', error));

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