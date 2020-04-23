// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");
const jwt = require('jsonwebtoken');
const config = require('../config.js');

// get method for add news
Router.get("/", (req, res)=>{
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
        // find user by id
       UserModel.findById(decoded.id, { password: 0 }, function (err, user) {
              if (err) {res.redirect('/')}
              if (!user) {res.redirect('/')}
            //   console.log(user.accountType);
              if(user.accountType === true )
              {
                NewsModel.find({}).then((docs)=>{     
                    res.render("addNews", { posts : docs, val : instances.signedIn });
                })
              }
              else
              {
                     res.redirect('/')
              }
        })
    })   
});

// post method for add news
Router.post("/", (req, res)=>{
    if(req.body.title !== "" &&  req.body.description !== "" && req.body.url !== "" && req.body.imageurl !== "")
    {
        // create new NewsModel
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