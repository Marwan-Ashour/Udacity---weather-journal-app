/* Global Variables */
// US is default country. Parameter is zip code,country code
const url = "http://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiKey = "&APPID=518b8df9d8f97311c6e8b56205eb9008";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();


// get data // fetch data from the api (awiat the fetch)
const getData = async (url = '') => {
    try {
        const res = await fetch(url);
        // convert json data and return result (await conversion)
        const data = await res.json();
        return data;
    } catch (error) {
        // log error code
        console.log('Error', error);
    }
};

// POST Data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        // mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
          // Body data type must match "Content-Type" header
        body: JSON.stringify(data)
        });
};


// Dynamically Update UI
const updateData = async () => {
    const projectData = await getData('/data');
    document.getElementById('date').innerHTML = `${projectData.date}`;
    document.getElementById('temp').innerHTML = `${projectData.temperature}`;
    document.getElementById('content').innerHTML = projectData.feelings;
};

const generateData = async () => {
    const feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
    const response = await fetch(`${url}${zip}${apiKey}`);
    try {
        const data = await response.json();
        data.feelings = feelings;
        data.date = newDate;
        await postData('/', data);
        updateData();
    } catch (error) {
        console.log("error", error);
    };
}

// Event Listener
document.getElementById('generate').addEventListener('click', generateData);


