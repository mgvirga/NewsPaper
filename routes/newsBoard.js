const express = require("express");
const Router = express.Router();
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");

Router.get("/", (req, res)=>{
    NewsModel.find({}).then((docs)=>{
    res.render("newsBoard", { posts : docs });
    })
});

module.exports = Router;