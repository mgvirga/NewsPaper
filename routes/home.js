const express = require("express");
const Router = express.Router();
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
              // console.log(user.accountType);
              if(user.accountType === true )
              {
                  // Danielle moved method from below into this if statment
                NewsModel.find({}).then((docs)=>{
                    console.log(docs);
                    res.render("home", { posts : docs });
                })
                    //  res.render("home");
              }
              else
              {
                     res.redirect('/')
              }
       });
    });
})
const NewsModel = require("../model/news");

// Danielle moved this section into if statement above with (user.accountType ==true)
// Router.get("/", (req, res)=>{
//        NewsModel.find({}).then((docs)=>{
//               console.log(docs);
//               res.render("home", { posts : docs });
// })
// });


module.exports = Router;
