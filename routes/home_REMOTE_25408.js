const express = require("express");
const Router = express.Router();
const NewsModel = require("../model/news");


Router.get("/", (req, res)=>{
       NewsModel.find({}).then((docs)=>{
              console.log(docs);
              res.render("home", { posts : docs });
})
});


module.exports = Router;
