const express = require('express');
const app = express()

const { response } = require('express')
require('dotenv').config()

const API_KEY = process.env.API_KEY;
const port = 3000;

app.get('/', function(req, res) {
    const address = req.query.address;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${API_KEY}`;
    let options = {
        method: "GET"
    };

    fetch(url, options)
    .then(function(response) {

        return response.json();
    })
    .then(function(jsonData) {
        const {weather, main, name} = jsonData
        
        const {temp, humidity} = main
        const tempConverted = temp - 273.15
        const texT = `Place: ${name}<br>Temperature: ${tempConverted}<br>Humidity: ${humidity}`
        res.send(texT)
    })    
    .catch(error => {
        console.error(error);
        res.status(500).send('Error')
    })
})

    


app.listen(port, function(){
    console.log(`Application running at port ${port}`)
})
