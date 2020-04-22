const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");
// Danielle add for authentication
const jwt = require('jsonwebtoken');
const config = require('../config.js');

Router.get("/", (req, res)=>{
    // test = instances.admin;
    // Danielle added verification 

    // get token
    var token = localStorage.getItem('authtoken')
    if (!token) {
        res.redirect('/')
    }
    // verify token
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    };
       UserModel.findById(decoded.id, { password: 0 }, function (err, user) {
              if (err) {res.redirect('/')}
              if (!user) {res.redirect('/')}
              console.log(user.accountType);
              if(user.accountType === true )
              {
                NewsModel.find({}).then((docs)=>{     
                    res.render("addNews", { posts : docs, test : instances.admin });
                    // console.log("The news article is  " + instances.username);
                })
              }
              else
              {
                     res.redirect('/')
              }
        })
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
        res.redirect("/newsBoard");
    }
    else
    {
        res.send("News input is invalid.");
    }
});

module.exports = Router;

//The point of this class is to add an user to the user collection