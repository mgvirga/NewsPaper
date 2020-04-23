const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
let instances = require("../util/userInstance");
// Danielle add for authentication
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

Router.get("/", (req, res)=>{
    // test = instances.admin;    
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
                UserModel.find({}).then((docs)=>{
                res.render("showUser", { posts : docs });
                })
              }
              else
              {
                     res.redirect('/')
              }
       })
    })
});

// Danielle new delete function for user - 4/23/2020
// delete User working
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
    // console.log("req.accountType " + req.accountType)
    // if(req.accountType === undefined)
    //   {
    //     // localStorage.removeItem('authtoken'); 
    //     res.redirect('/')
    //   }
    //   else
    //   {
    //      // redirect to the login
    //     // const string = encodeURIComponent('Success adding News');
        // res.redirect("/showUser")
    //   }      
  });  


module.exports = Router;

//The point of this javascript is to show the users in the database