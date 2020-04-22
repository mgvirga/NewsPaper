// Danielle added page to edit news
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");
// Danielle add for authentication
const jwt = require('jsonwebtoken');
const config = require('../config.js');

//get id for edit
Router.get("/:id", (req, res) => {

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
            const requestedId = req.params.id;
            console.log(req.body);
            UserModel.findOne({
              _id: requestedId
            }, (err, post) => {
                if (!err) {
                    res.render("editUser.ejs", {posts:post});
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
  

// edit News
Router.post('/:id', function(req, res) {
    const requestedId = req.params.id;
    console.log("id", requestedId)
    // update a News
    console.log("req.body",req.body)
    UserModel.findByIdAndUpdate(requestedId,{$set: {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      accountType: req.body.accountType
    }
    }, {new: true}, function(err, data){
      if(err)
      {
        console.error(err);
      }
      console.log("data",data);
    })
    // redirect to the dashboard
    // const string = encodeURIComponent('Success adding News');
    res.redirect("/showUser");
  });

module.exports = Router;