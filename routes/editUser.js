// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const bcrypt = require('bcryptjs');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');



//get id for edit user
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
       UserModel.findById(decoded.id, { password: 0 }, function (err, user) {
          if (err) {res.redirect('/')}
          if (!user) {res.redirect('/')}
          if(user.accountType === true )
          {
            const requestedId = req.params.id;
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
                res.redirect('/logout');

              }
        })
      })
  });
  
// edit News
Router.post('/:id', function(req, res) {

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const requestedId = req.params.id;
    // update a User
    console.log("req.body",req.body)
    UserModel.findByIdAndUpdate(requestedId,{$set: {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      accountType: req.body.accountType
    }
    }, {new: true}, function(err, data){
      if(err)
      {
        console.error(err);
      }

      console.log("new account type: "+data.accountType);
    if(data.accountType == false)
    {
      localStorage.removeItem('authtoken'); 
      res.redirect('/')

    }
    else
    {
      res.redirect("/showUser");
    }
      
    })
    
  });

module.exports = Router;