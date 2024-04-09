import fetch from 'node-fetch';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// Route for handling GET requests to '/'
app.get('/', async (req, res) => {
    try {
        // Fetch data from the Plant Care Garden API
        const response = await fetch('https://api.plantcaregarden.com/v1/plant/identify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accessKey': 'd0d822e051a814408b87c4b77131a6c1f9ef250cc5583f349f387cb51e15427f'
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();

        // Send the fetched data to the client-side
        res.send(`
            <h1>Welcome to the Plant Identification Proxy Server!</h1>
            <h2>Available Climate Options:</h2>
            <ul>
                ${Object.keys(data.plants.climate)
                    .filter(key => data.plants.climate[key] !== null)
                    .map(key => `<li>${key}</li>`).join('')}
            </ul>
        `);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
