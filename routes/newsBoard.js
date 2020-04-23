// imports
const express = require("express");
const Router = express.Router();
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");
const UserModel = require("../model/user");
const jwt = require('jsonwebtoken');
const config = require('../config.js');

// get newsBoard
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
                res.render("newsBoard", { posts : docs, val : instances.signedIn });
                })
            }
            else
              {
                     res.redirect('/')
              }
       })
    })
});

// delete News
Router.get('/delete/:id', function(req, res) {
  const requestedId = req.params.id;
  // update News
  NewsModel.findByIdAndDelete(requestedId, function(err, data){
      if(err)
      {
          console.error(err);
      }
    })

    res.redirect("/newsBoard");
  });
  

module.exports = Router;