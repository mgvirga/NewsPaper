// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const bcrypt = require('bcryptjs');



//get id for edit
Router.get("/:id", (req, res) => {
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
      // find user
       UserModel.findById(decoded.id, { password: 0 }, function (err, user) {
          if (err) {res.redirect('/')}
          if (!user) {res.redirect('/')}

          // check accountType 
          if(user.accountType === true )
          {
            const requestedId = req.params.id;
              NewsModel.findOne({
                _id: requestedId
                }, (err, post) => {
                  if (!err) {
                    res.render("editNews.ejs", {posts:post});
                  }
              });
          }
          else
              {
                     res.redirect('/')
              }
        })
      })
  });
  

// post id for edit News
Router.post('/:id', function(req, res) {
    const requestedId = req.params.id;
    // update a News
    NewsModel.findByIdAndUpdate(requestedId,{$set: {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      imageurl: req.body.imageurl
    }
    }, {new: true}, function(err, data){
      if(err)
      {
        console.error(err);
      }
    })
    // redirect to the newsBoard
    res.redirect("/newsBoard");
  });

module.exports = Router;