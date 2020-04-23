// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const jwt = require('jsonwebtoken');
const config = require('../config.js');

// get home page
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
       UserModel.findById(decoded.id, { password: 0 }, function (err, user) {
              if (err) {res.redirect('/')}
              if (!user) {res.redirect('/')}
              if(user.accountType === true )
              {
                NewsModel.find({}).then((docs)=>{
                    console.log(docs);
                    res.render("home", { posts : docs });
                })
              }
              else
              {
                     res.redirect('/')
              }
       });
    });
})
const NewsModel = require("../model/news");


module.exports = Router;
