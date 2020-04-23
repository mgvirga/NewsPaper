// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
let instances = require("../util/userInstance");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.js');


// get signup
Router.get("/", (req, res)=>{
    // test = instances.admin;
    UserModel.find({}).then((docs)=>{
    res.render("signup", { posts : docs });
    })
});

// signup user 
Router.post('/', function(req, res) {
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // create a User
    UserModel.create({
      name: req.body.name,
      username : req.body.username,
      email : req.body.email,
      password : hashedPassword,
      accountType: false
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.redirect("/");
    }); 
  });
  
module.exports = Router;