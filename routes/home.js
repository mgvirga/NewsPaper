// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const NewsModel = require("../model/news");

// get home page
Router.get("/", (req, res)=>{
    NewsModel.find({}).then((docs)=>{
        console.log(docs);
        res.render("home", { posts : docs });
    })
})


module.exports = Router;
