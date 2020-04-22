//bulk of libraries necessary for backend
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const request = require('request');

const db = mongoose.connect("mongodb://localhost:27017/groceryManager", { useNewUrlParser: true })

const city = "alpharetta"

const weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";

//defining js file for routing
const login = require("./routes/index");
const addItem = require("./routes/addItem");
const addUser = require("./routes/addUser");
const showUser = require("./routes/showUser");
const showItem = require("./routes/showItem");
const showWeather = require("./routes/weather")
const home = require("./routes/home");

app.set("view engine", "ejs");

app.use(bodyParser.json({ type : "application/json" }))
app.use(bodyParser.text({ type : "text/html" }))
app.use(bodyParser.urlencoded({ extended : true }))

// to get boostrap working
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//defining ejs files for routing
app.use("/", login);
app.use("/addItem", addItem);
app.use("/addUser", addUser);
app.use("/showUser", showUser);
app.use("/showItem", showItem);
app.use("/weather", showWeather);
app.use("/home", home);


app.listen(3000, ()=>{
    console.log("Server Started...")
});


//This is the bulk of hte backend pulling from mongoose