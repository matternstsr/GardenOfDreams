// mattsscripts.js

// Function to fetch data from an external JSON file
fetch('statesData.json')
    .then(response => response.json())
    .then(data => {
        // Your code to work with the data goes here
    })
    .catch(error => console.error('Error fetching data:', error));  

// Function to search for a state
function search() {
    // Get the value of the state input
    var state = document.getElementById("stateInput").value;

    // Filter data based on the searched state
    var filteredData = dummyData.filter(function(item) {
        return item.state.toLowerCase() === state.toLowerCase();
    });

    // Display search results
    displayResults(filteredData);
}

// Function to display search results
function displayResults(data) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (data.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
    } else {
        data.forEach(function(item) {
            var resultHTML = `
                <div class="result">
                    <h2>${item.state}</h2>
                    <p><strong>Common Name:</strong> ${item.commonName}</p>
                    <p><strong>Scientific Name:</strong> ${item.scientificName}</p>
                    <p><strong>State Flower:</strong> ${item.stateFlower}</p>
                    <p><strong>State Plant:</strong> ${item.statePlant}</p>
                    <p><strong>State Tree:</strong> ${item.stateTree}</p>
                    <p><strong>State Crop:</strong> ${item.stateCrop}</p>
                    <p><strong>Common Flowers:</strong> ${item.commonFlowers.join(", ")}</p>
                    <img src="${item.image}" alt="${item.state} Image">
                </div>
            `;
            resultsDiv.innerHTML += resultHTML;
        });
    }
}
