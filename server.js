
// Setup empty JS object to act as endpoint for all routes.
projectData = {};

// Require Express & dependencies to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server & Callback to debug
const port = 3030;
const server = app.listen(port,  listening = ()=> {
    console.log('Hello from server');
    console.log(`Server running on localhost: ${port}`);
});

// initializing GET Route 

app.get('/data', (req, res) => {
    console.log('get request received');
    res.send(projectData);
});

// initializing Post route

app.post('/', (req, res) => {
    // the three required data
    // date
    projectData.date = req.body.date;
    // temp --> the returned temperature
    projectData.temperature = req.body.main.temp;
    // feelings --> should be entered by the user
    projectData.feelings = req.body.feelings;

    console.log('post request received');
    res.end();
});

