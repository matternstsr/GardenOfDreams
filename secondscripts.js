$(document).ready(function() {
  const pageBackground = document.getElementById("pageBackground");

  const params = new URLSearchParams(window.location.search);
  const stateName = params.get('state');
  const plantName = params.get('plant');
  const category = params.get('category');
  // console.log(stateName);
  // console.log(plantName);
  // console.log(category);

  fetch('onestate.json')
    .then(response => response.json())
    .then(data => {
        const stateData = data.states[stateName];
        const categoryData = stateData[category];
        const capitalStateName = stateName.charAt(0).toUpperCase() + stateName.slice(1).toLowerCase();
        const capitalCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

        if (categoryData) {
            if (category === "stateFlower") {
                const imageURL = stateData.image;

                let secondPageInfo =`
                      <div class="row justify-content-center">
                        <div class="col-auto">
                          <img class="secondPageImg p-4" src="images/${imageURL}" alt="${plantName}"> 
                        </div> 
                        <div class="col-md-8"> 
                          <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>State: ${capitalStateName}</p>  
                          <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>State Flower: ${plantName}</p>  
                          <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>State Plant: ${stateData.statePlant}</p>  
                          <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>State Tree: ${stateData.stateTree}</p>  
                          <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Common Crops: ${stateData.stateCrop.join(', ').replace(/,/g, ', ')}</p>  
                          <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Common Flowers: ${stateData.commonFlowers.join(', ').replace(/,/g, ', ')}</p>  
                          <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Gardening Facts for ${capitalStateName}: ${stateData.gardeningFacts}</p>
                        </div> 
                      </div> 
                    `;

                $(pageBackground).append(secondPageInfo);
                $(secondBackground).css('background-image', `url('images/${imageURL}')`);
            } else if (category === "weeds") {
                Object.keys(categoryData).forEach(plant => {
                  if (plant === plantName) {
                      const plantData = categoryData[plant];
                      const imageURL = plantData.image;

                      let secondPageInfo =`
                        <div class="row justify-content-center">
                          <div class="col-auto">
                              <img class="secondPageImg p-4" src="images/resultsImages/${category}/${imageURL}" alt="${plant}"> 
                          </div> 
                          <div class="col-md-8">
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>State: ${capitalStateName}</p>
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Name: ${plantName}</p>
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Category: ${capitalCategory}</p> 
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>How to control: ${plantData.ControlMethods}</p>
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Desciption: ${plantData.Description}</p> 
                          </div> 
                        </div>
                        `;

                        $(pageBackground).append(secondPageInfo);
                        $(secondBackground).css('background-image', `url('images/resultsImages/${category}/${imageURL}')`);
                    }
                });

            } else {
                Object.keys(categoryData).forEach(plant => {
                    if (plant === plantName) {
                        const plantData = categoryData[plant];
                        const imageURL = plantData.image;

                        let secondPageInfo =`
                          <div class="row justify-content-center">
                            <div class="col-auto">
                            <img class="secondPageImg p-4" src="images/resultsImages/${category}/${imageURL}" alt="${plant}"> 
                            </div> 
                            <div class="col-md-8"> 
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>State: ${capitalStateName}</p>
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Name: ${plantName}</p>
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Category: ${capitalCategory}</p> 
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Season: ${plantData.Season}</p> 
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Soil Type: ${plantData.SoilType}</p> 
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Water Needs: ${plantData.WaterNeeded}</p> 
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Native: ${plantData.Native} native to ${capitalStateName}</p> 
                              <p class="pb-2 pt-4 pl-2 text-white"><span class="bullet pr-2">&#8226;</span>Desciption: ${plantData.Description}</p> 
                            </div> 
                          </div> 
                        `;

                        $(pageBackground).append(secondPageInfo);
                        $(secondBackground).css('background-image', `url('images/resultsImages/${category}/${imageURL}')`);
                    }
                });
            }
        }
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
});