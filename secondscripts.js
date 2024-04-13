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

      if (categoryData) {
        Object.keys(categoryData).forEach(plant => {
          if (plant === plantName) {
            const plantData = categoryData[plant];
            const imageURL = plantData.image;
            
            let secondPageInfo =
                '<div class="row">' +
                '<div class="col-auto">' +
                `<img class="secondPageImg p-4" src="images/resultsImages/${category}/${imageURL}" alt="${plant}">` +
                '</div>' +
                '<div class="col-8">' +
                '<p class="pb-2 pt-4 pl-2 text-white">Additional information here</p>' +
                '</div>' +
                '</div>';

            $(pageBackground).append(secondPageInfo);
          }
        });
      }
  })
  .catch(error => {
      console.error('Error fetching JSON data:', error);
  });
});