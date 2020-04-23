const express = require("express");
const Router = express.Router();
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");

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
            //   console.log(user.accountType);
              if(user.accountType === true )
              {
                NewsModel.find({}).then((docs)=>{
                res.render("newsBoard", { posts : docs });
                })
            }
            else
              {
                     res.redirect('/')
              }
       })
    })
});

// Danielle delete function for news - 4/23/2020
// delete News
Router.get('/delete/:id', function(req, res) {
  
  const requestedId = req.params.id;
  // update a News
  NewsModel.findByIdAndDelete(requestedId, function(err, data){
      if(err)
      {
          console.error(err);
      }
    })

    res.redirect("/newsBoard");
  });
  

module.exports = Router;