const express = require('express');
const app = express();
const port = 3000;

app.get('/api/getStates', async (req, res) => {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default(`https://quickstats.nass.usda.gov/api/get_param_values/?key=32C16A33-83A4-3AEF-8784-01182DD4418E&param=state_alpha`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching states:", error);
        res.status(500).json({ error: "Error fetching states" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
