// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");

// get home page
Router.get("/", (req, res)=>{
    NewsModel.find({}).then((docs)=>{
        res.render("home", { posts : docs, val : instances.signedIn});
    })
})


module.exports = Router;
