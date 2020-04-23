// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
var moment = require('moment');
let instances = require("../util/userInstance");
moment().format();
const bcrypt = require('bcryptjs');
const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');


// get the login
Router.get("/", (req, res)=>{
    res.render("login"
    );
});

// Login User
Router.post('/', function(req, res) {
    UserModel.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) { 
        res.redirect("/");
      }
      else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.redirect("/");
        else{
          if(user.accountType == true)
          {
            var token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });
            localStorage.setItem('authtoken', token)
            res.redirect("/home");
          }
          else{
            res.redirect("/");
          }
        }
        
      }
    });
});

  // get method to logout
 Router.get('/logout', (req,res) => {
  localStorage.removeItem('authtoken');
  res.redirect('/');
})
module.exports = Router;

//This is the home page where the user logs in