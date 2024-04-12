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
                  <div class="card-body cardColor text-white rounded-bottom">
                    <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>${stateFlower}</p>
                    <p class="pb-2 pt-3 pl-2"><span class="bullet">&#8226;</span>${commonName}</p>
                    <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>${scientificName}</p>
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
                      <img src="images/resultsImages/wildflowers/${flowerImage}" class="card-img-top" alt="${flowerName}"/>
                      <div class="card-body cardColor text-white rounded-bottom">
                        <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>Name: ${flowerName}</p>
                        <p class="pb-2 pt-3 pl-2"><span class="bullet">&#8226;</span>Season: ${flowerSeason}</p>
                        <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>Water Needed: ${flowerWaterNeeded}</p>
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
                      <div class="card-body cardColor text-white rounded-bottom">
                        <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>Name: ${treeName}</p>
                        <p class="pb-2 pt-3 pl-2"><span class="bullet">&#8226;</span>Season: ${treeSeason}</p>
                        <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>Water Needed: ${treeWaterNeeded}</p>
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
                      <div class="card-body cardColor text-white rounded-bottom">
                        <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>Name: ${cropName}</p>
                        <p class="pb-2 pt-3 pl-2"><span class="bullet">&#8226;</span>Season: ${cropSeason}</p>
                        <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>Water Needed: ${cropWaterNeeded}</p>
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
                      <div class="card-body cardColor text-white rounded-bottom">
                        <p class="pb-2 pt-2 pl-2"><span class="bullet">&#8226;</span>Name: ${weedName}</p>
                        <p class="pb-2 pt-3 pl-2"><span class="bullet">&#8226;</span>Description: ${weedDescription}</p>
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