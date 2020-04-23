const router = require('express').Router();
const fetch = require('node-fetch');
let instances = require("../util/userInstance");

router.get('/', (req, res) => {
  res.render('weather', {
    val : instances.signedIn,
    city: null,
    des: null,
    icon: null,
    temp: null, 
  });
});

router.post('/', async (req, res) => {
  const city = req.body.city;
//  const url_api = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=${process.env.API_KEY}';
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        const city = data.name;
        const des = data.weather[0].description;
        const icon = data.weather[0].icon;
        const kelvinTemp = data.main.temp; 
        
        var temp =  Math.round(kelvinTemp - 273.15) * 9/5 + 32;

        console.log(data);

        res.render('weather', {
          city, des, icon, temp, val : instances.signedIn,
        });
        
      });

  } catch (err) {
    res.render('weather', {
      city: 'something wrong',
      des: null,
      icon: null,
      temp: null,    })
  }

})


module.exports = router;