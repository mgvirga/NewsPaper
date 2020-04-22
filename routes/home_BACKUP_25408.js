const express = require("express");
const Router = express.Router();
<<<<<<< HEAD
// Danielle add for authentication
const UserModel = require("../model/user");
const jwt = require('jsonwebtoken');
const config = require('../config.js');


Router.get("/", (req, res)=>{
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
                     res.render("home");
              }
              else
              {
                     res.redirect('/')
              }
       });
    });
=======
const NewsModel = require("../model/news");


Router.get("/", (req, res)=>{
       NewsModel.find({}).then((docs)=>{
              console.log(docs);
              res.render("home", { posts : docs });
})
>>>>>>> 2c2d19886d4363f3890b986d0309ea874778a8bf
});


module.exports = Router;
