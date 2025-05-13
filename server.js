// packages import
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

// enable CORS
app.use(cors());

// set the port on which our app will run
// important to read from environment variable if deploying
const port = process.env.PORT || 5000;

// basic string route to prevent Glitch error
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// the route we're working with
app.get("/users", (req, res) => {
    // replace with a custom URL as required
    const backendUrl = 'https://ch.tetr.io/api/users/groober/summaries/league';
    
    // return the data without modification, using a custom user agent
    axios.get(backendUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    })
    .then(response => res.send(response.data))
    .catch(error => {
        console.error('Error fetching data:', error.message);
        res.status(500).send({ error: 'Failed to fetch data from TETR.IO API' });
    });
});

// console text when app is running
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
