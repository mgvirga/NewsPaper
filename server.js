//bulk of libraries necessary for backend
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");


const db = mongoose.connect("mongodb://localhost:27017/groceryManager", { useNewUrlParser: true })

//defining js file for routing
const login = require("./routes/index");
const addItem = require("./routes/addItem");
const addUser = require("./routes/addUser");
const showUser = require("./routes/showUser");
const showItem = require("./routes/showItem");

app.set("view engine", "ejs");

app.use(bodyParser.json({ type : "application/json" }))
app.use(bodyParser.text({ type : "text/html" }))
app.use(bodyParser.urlencoded({ extended : true }))


//defining ejs files for routing
app.use("/", login);
app.use("/addItem", addItem);
app.use("/addUser", addUser);
app.use("/showUser", showUser);
app.use("/showItem", showItem);

app.listen(3000, ()=>{
    console.log("Server Started...")
});


//This is the bulk of hte backend pulling from mongoose