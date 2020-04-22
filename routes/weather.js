const express = require("express");
const Router = express.Router();
let instances = require("../util/userInstance");
const request = require('request');

const city = "alpharetta"

const weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";

function getWeather(url) {
    // Setting URL and headers for request
    var options = {
        url: weatherUrl,
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
        // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}
// Weather Api Route
Router.get('/',(req,res) => {
    var dataPromise = getWeather();
    // Get user details after that get followers from URL
    dataPromise.then(JSON.parse)
               .then(function(result) {
                    res.render('weather',{ result,title:'Weather' })
                })
})

module.exports = Router;

//The point of this javascript is to show the users the weather