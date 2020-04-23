//bulk of libraries necessary for backend
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const request = require('request');
const PORT = 3000;
const db = mongoose.connect("mongodb://localhost:27017/project", { useNewUrlParser: true, useUnifiedTopology: true })

const city = "alpharetta";

const weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";


//defining js file for routing
const login = require("./routes/index");
const showUser = require("./routes/showUser");
const showWeather = require("./routes/weather");
const submitQuery = require("./routes/submitQuery");
const addNews = require("./routes/addNews");
const home = require("./routes/home");
const signup = require("./routes/signup");
const newsBoard = require("./routes/newsBoard");
const sports = require("./routes/sports");
const editNews = require("./routes/editNews");
const editUser = require("./routes/editUser");



//Middleware for Weather
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.use(bodyParser.json({ type : "application/json" }));
app.use(bodyParser.text({ type : "text/html" }));
app.use(bodyParser.urlencoded({ extended : true }));

//defining ejs files for routing
app.use("/", login);
app.use("/home", home);
app.use("/login", login);
app.use("/showUser", showUser);
app.use("/weather", showWeather);
app.use("/submitQuery", submitQuery);
app.use("/addNews", addNews);
app.use("/home", home);
app.use("/sign-up", signup);
app.use("/newsBoard", newsBoard);
app.use("/sports", sports);
app.use("/editNews", editNews);
app.use("/editUser", editUser);

//to use bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// import http from 'http';
const http = require('http');

let io = require('socket.io');

const server = http.createServer(app).listen(PORT, () => {
        console.log("server started at port: " + PORT);
    })

// Set up socket.io
io = require('socket.io').listen(server);

// Handle socket traffic
io.sockets.on('connection',  (socket) => {
 
    var list = io.sockets.sockets;
    var users = Object.keys(list);
   
    socket.on('nick', (nick) => {
        socket.nickname = nick;
        socket.emit('userloggedin', users);
    });

    // Relay chat data to all clients
    socket.on('chat', (data) => {
            let payload = {
                message: data.message,
                nick: socket.nickname,
            };

            socket.emit('chat',payload);
            socket.broadcast.emit('chat', payload);

    });
});





//This is the bulk of hte backend pulling from mongoose
