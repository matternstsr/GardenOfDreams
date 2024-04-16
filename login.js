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
    const plantCarousel = document.getElementById("plantCarousel");
    let currentState = null;
    let carouselStarted = false;
    
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
  
          function generateCards(stateName) {
            const stateData = statesObject[stateName];
            if (!stateData) {
              console.error(`Error: No data found for state ${stateName}`);
              return;
            }
  
            const state_name = stateName.replace(/ /g, '_');
            const stateFlower = stateData.stateFlower;
            const commonName = stateData.commonName;
            const scientificName = stateData.scientificName;
            const imageSrc = `images/${stateData.image}`;
          
            let plantCard = `
              <div class="${state_name} col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                <div class="card">
                  <img src="${imageSrc}" class="card-img-top" alt="Video thumbnail"/>
                  <a class="card-link text-center font-weight-bold pt-2 pb-2" target="_blank" href="second.html?state=${encodeURIComponent(stateName)}&plant=${encodeURIComponent(stateFlower)}&category=stateFlower" data-state-name="${stateName}" data-plant-name="${stateFlower}">Learn More</a>
                  <div class="card-body cardColor text-white rounded-bottom">
                    <p class="pb-2 pt-2 pl-2"><span class="bullet pr-2">&#8226;</span>State Flower: ${stateFlower}</p>
                    <p class="pb-2 pt-3 pl-2"><span class="bullet pr-2">&#8226;</span>Common Name: ${commonName}</p>
                    <p class="pb-2 pt-2 pl-2"><span class="bullet pr-2">&#8226;</span>Scientific Name: ${scientificName}</p>
                  </div>
                </div>
              </div>
            `;
  
            if (stateData.flowers) {
              const flowers = stateData.flowers;
          
              Object.keys(flowers).forEach(flowerName => {
                const flower = flowers[flowerName];
                const flowerSeason = flower.Season;
                const flowerWaterNeeded = flower.WaterNeeded;
                const flowerImage = flower.image;
          
                plantCard += `
                  <div class="${state_name} col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                    <div class="card">
                      <img src="images/resultsImages/flowers/${flowerImage}" class="card-img-top" alt="${flowerName}"/>
                      <a class="card-link text-center font-weight-bold pt-2 pb-2" target="_blank" href="second.html?state=${encodeURIComponent(stateName)}&plant=${encodeURIComponent(flowerName)}&category=flowers" data-state-name="${stateName}" data-plant-name="${flowerName}">Learn More</a>
                      <div class="card-body cardColor text-white rounded-bottom">
                        <p class="pb-2 pt-2 pl-2"><span class="bullet pr-2">&#8226;</span>Flower: ${flowerName}</p>
                        <p class="pb-2 pt-3 pl-2"><span class="bullet pr-2">&#8226;</span>Season: ${flowerSeason}</p>
                        <p class="pb-2 pt-2 pl-2"><span class="bullet pr-2">&#8226;</span>Water Needed: ${flowerWaterNeeded}</p>
                      </div>
                    </div>
                  </div>
                `;
              });
            }
  
            if (stateData.trees) {
              const trees = stateData.trees;
          
              Object.keys(trees).forEach(treeName => {
                const tree = trees[treeName];
                const treeSeason = tree.Season;
                const treeWaterNeeded = tree.WaterNeeded;
                const treeImage = tree.image;
          
                plantCard += `
                  <div class="${state_name} col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                    <div class="card">
                      <img src="images/resultsImages/trees/${treeImage}" class="card-img-top" alt="${treeName}"/>
                      <a class="card-link text-center font-weight-bold pt-2 pb-2" target="_blank" href="second.html?state=${encodeURIComponent(stateName)}&plant=${encodeURIComponent(treeName)}&category=trees" data-state-name="${stateName}" data-plant-name="${treeName}">Learn More</a>
                      <div class="card-body cardColor text-white rounded-bottom">
                        <p class="pb-2 pt-2 pl-2"><span class="bullet pr-2">&#8226;</span>Tree: ${treeName}</p>
                        <p class="pb-2 pt-3 pl-2"><span class="bullet pr-2">&#8226;</span>Season: ${treeSeason}</p>
                        <p class="pb-2 pt-2 pl-2"><span class="bullet pr-2">&#8226;</span>Water Needed: ${treeWaterNeeded}</p>
                      </div>
                    </div>
                  </div>
                `;
              });
            }
  
            if (stateData.crops) {
              const crops = stateData.crops;
          
              Object.keys(crops).forEach(cropName => {
                const crop = crops[cropName];
                const cropSeason = crop.Season;
                const cropWaterNeeded = crop.WaterNeeded;
                const cropImage = crop.image;
  
                plantCard += `
                    <div class="${state_name} col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                      <div class="card">
                        <img src="images/resultsImages/crops/${cropImage}" class="card-img-top" alt="${cropName}"/>
                        <a class="card-link text-center font-weight-bold pt-2 pb-2" target="_blank" href="second.html?state=${encodeURIComponent(stateName)}&plant=${encodeURIComponent(cropName)}&category=crops" data-state-name="${stateName}" data-plant-name="${cropName}">Learn More</a>
                        <div class="card-body cardColor text-white rounded-bottom">
                          <p class="pb-2 pt-2 pl-2"><span class="bullet pr-2">&#8226;</span>Crop: ${cropName}</p>
                          <p class="pb-2 pt-3 pl-2"><span class="bullet pr-2">&#8226;</span>Season: ${cropSeason}</p>
                          <p class="pb-2 pt-2 pl-2"><span class="bullet pr-2">&#8226;</span>Water Needed: ${cropWaterNeeded}</p>
                        </div>
                      </div>
                    </div>
                `;
              });
            }
  
            if (stateData.weeds) {
              const weeds = stateData.weeds;
          
              Object.keys(weeds).forEach(weedName => {
                const weed = weeds[weedName];
                const weedDescription = weed.Description;
                const weedImage = weed.image;
  
                plantCard += `
                  <div class="${state_name} col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                    <div class="card">
                      <img src="images/resultsImages/weeds/${weedImage}" class="card-img-top" alt="${weedName}"/>
                      <a class="card-link text-center font-weight-bold pt-2 pb-2" target="_blank" href="second.html?state=${encodeURIComponent(stateName)}&plant=${encodeURIComponent(weedName)}&category=weeds" data-state-name="${stateName}" data-plant-name="${weedName}">Learn More</a>
                      <div class="card-body cardColor text-white rounded-bottom">
                        <p class="pb-2 pt-2 pl-2"><span class="bullet pr-2">&#8226;</span>Weed: ${weedName}</p>
                        <p class="pb-2 pt-3 pl-2"><span class="bullet pr-2">&#8226;</span>Description: ${weedDescription}</p>
                      </div>
                    </div>
                  </div>
                `;
              });
            }
  
            console.log('Before if:', carouselStarted);
            if (carouselStarted === false) {
              startCarousel();
              carouselStarted = true;
            }
            console.log('After if:', carouselStarted);
            
            $(plantCarousel).slick('slickAdd', plantCard);
          }
  
          function handleDropdownItemClick() {
            const dropdownItemClick = document.querySelectorAll('.dropdown-item');
            dropdownItemClick.forEach(item => {
              item.addEventListener('click', function() {
                const dropdownState = this.textContent;
                let alteredText = dropdownState.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                const stateName = document.querySelector('.stateName'); 
  
                stateName.textContent = alteredText;
  
                if (currentState !== null) {
                  removeCards(currentState);
                }
  
                generateCards(dropdownState);
                $('.slick-slider').slick('slickGoTo', 0);
                currentState = dropdownState;
                document.getElementById('plants_carousel').classList.remove('hidden');
                document.getElementById('plants_carousel').style.display = 'flex';
              });
            });
          }
  
          function removeCards(stateName) {
            let state_name = stateName.replace(/ /g, '_');
            console.log('state_name:', state_name);
            const removeStateCards = document.querySelectorAll(`.${state_name}`);
  
            removeStateCards.forEach(card => {
              card.remove();
            });
          }
  
        handleDropdownItemClick();
        } else {
          console.error("Error: Empty data or error fetching data");
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  
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

  $(document).on('click', '.card-link', function() {
    
    const stateName = $(this).data('state-name');
    const plantName = $(this).data('plant-name');

    console.log(stateName);
    console.log(plantName);
  });

  $(document).ready(function () {
    $('.dropdown').on('show.bs.dropdown', function () {
      $('#dropdownMenuButton').addClass('dropdownMargin2').removeClass('dropdownMargin1');
    });
  
    $('.dropdown').on('hide.bs.dropdown', function () {
      $('#dropdownMenuButton').addClass('dropdownMargin1').removeClass('dropdownMargin2');
    });
  });

});

$(document).ready(function () {
  // Hide the greeting section and logout button by default
  $(".greeting").hide();
  $(".logout").hide();

  // Handle form submission
  $("#loginForm").submit(function (event) {
      event.preventDefault(); // Prevent form from submitting

      // Get username from form input
      var username = $("#username").val();

      // Clear input fields
      $("#username").val('');
      $("#password").val('');

      // Display greeting message
      $("#greetingUsername").text(username);
      $(".greeting").show(); // Show the greeting section
      $(".login-form").hide(); // Hide the login form
      $(".logout").show(); // Show the logout button
      $(".login").hide();

      // Store username in cookie
      document.cookie = "username=" + username + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"; // Set cookie expiration date far in the future
      console.log(document.cookie);
  });

  // Handle logout button click
  $(".logout").click(function() {
    eraseCookie("username"); // Clear username cookie
    $(".greeting").hide(); // Hide greeting section
    $(".login").show(); // Show login form
    $(".logout").hide(); // Hide logout button
    $(".login-form").show();
});

  // Check if user is already logged in
  if (getCookie("username")) {
      var username = getCookie("username");
      $("#greetingUsername").text(username);
      $(".greeting").show(); // Show the greeting section
      $(".login-form").hide(); // Hide the login form
      $(".logout").show(); // Show the logout button
      $(".login").hide();
  }

  // Close modal when login button inside the modal form is clicked
  $("#loginForm button[type='submit']").click(function () {
      $("#loginModal").modal("hide");
  });
});

// Function to delete a cookie by name
function eraseCookie(name) {   
  document.cookie = name + '=; Max-Age=-99999999; path=/';  
}

// Function to get a cookie value by name
function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) == 0) {
          return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      }
  }
  return null;
}