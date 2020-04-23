// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
let instances = require("../util/userInstance");
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

// get showUser
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
                UserModel.find({}).then((docs)=>{
                res.render("showUser", { posts : docs, val : instances.signedIn });
                })
              }
              else
              {
                     res.redirect('/')
              }
       })
    })
});

// delete User
Router.get('/delete/:id', function(req, res) {
    const requestedId = req.params.id;
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
    console.log("decoded.id " + decoded.id)
    console.log("requestedId " + requestedId);

    if( decoded.id === requestedId)
    {
      // Delete User
      UserModel.findByIdAndDelete(requestedId, function(err, data){
        if(err)
        {
            console.error(err);
        }
      })
        localStorage.removeItem('authtoken'); 
        res.redirect('/')
    }
    else{
      // Delete User
      UserModel.findByIdAndDelete(requestedId, function(err, data){
        if(err)
        {
            console.error(err);
        }
      })
      res.redirect("/showUser")
    }
  })
  });  


module.exports = Router;

//The point of this javascript is to show the users in the database