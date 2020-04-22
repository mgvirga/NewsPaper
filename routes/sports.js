const express = require("express");
const Router = express.Router();
const request = require('request');

var sportsUrl = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=5cf8d127c7e34870ae319350ab2ac918';



function getSports(url) {
    // Setting URL and headers for request
    var options = {
        url: sportsUrl,
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
    var dataPromise = getSports();
    // Get user details after that get followers from URL
    dataPromise.then(JSON.parse)
            .then(function(result) {
        res.render('sports',{ result, title: 'reuters' })
                    
    })
})

    
module.exports = Router;
