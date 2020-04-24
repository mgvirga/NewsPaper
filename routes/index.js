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
  instances.signedIn = false;
    res.render("login", { val : instances.admin});
});

// Login User
Router.post('/', function(req, res) {
    UserModel.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) { 
        res.redirect("/login");
      }
      else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.redirect("/login");
        else{
          if(user.accountType == true)
          {            
            var token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });
            localStorage.setItem('authtoken', token)
            instances.signedIn = true;
            res.redirect("/home");
          }
          else{
            // console.log("instance in post index customer "+i);
            instances.signedIn = false;
            res.redirect("/login");
          }
        }

      }
    });
});

  // get method to logout
 Router.get('/logout', (req,res) => {
  localStorage.removeItem('authtoken');
  instances.signedIn = false;
  res.redirect('/home');
})
module.exports = Router;