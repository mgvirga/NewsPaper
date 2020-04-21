//bulk of libraries necessary for backend
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const request = require('request');
const PORT = 3000;
const db = mongoose.connect("mongodb://localhost:27017/groceryManager", { useNewUrlParser: true, useUnifiedTopology: true })

const city = "alpharetta";

const weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";


//defining js file for routing
const login = require("./routes/index");
const addItem = require("./routes/addItem");
const addUser = require("./routes/addUser");
const showUser = require("./routes/showUser");
const showItem = require("./routes/showItem");
const showWeather = require("./routes/weather");
const submitQuery = require("./routes/submitQuery");

app.set("view engine", "ejs");

app.use(bodyParser.json({ type : "application/json" }));
app.use(bodyParser.text({ type : "text/html" }));
app.use(bodyParser.urlencoded({ extended : true }));

//defining ejs files for routing
app.use("/", login);
app.use("/addItem", addItem);
app.use("/addUser", addUser);
app.use("/showUser", showUser);
app.use("/showItem", showItem);
app.use("/weather", showWeather);
app.use("/submitQuery", submitQuery);

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
