const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");

Router.get("/", (req, res)=>{
    test = instances.admin;
    NewsModel.find({}).then((docs)=>{
      
    res.render("addNews", { posts : docs, test : instances.admin });
    console.log("The news article is  " + instances.username);

    })
});

Router.post("/", (req, res)=>{
    if(req.body.title !== "" &&  req.body.description !== "" && req.body.url !== "" && req.body.imageurl !== "")
    {
        const User = new NewsModel
        ({
            title : req.body.title,
            description : req.body.description,
            url: req.body.url,
            imageurl : req.body.imageurl
        })
        User.save();
        res.redirect("/addNews");
    }
    else
    {
        res.send("News input is invalid.");
    }
});

module.exports = Router;

//The point of this class is to add an user to the user collection