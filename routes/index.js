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


Router.get("/", (req, res)=>{
    res.render("login", {});
});

// Login User
Router.post('/', function(req, res) {
    UserModel.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) { res.redirect("/");}
      else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        localStorage.setItem('authtoken', token)
        res.redirect("/showUser");
      }
    });
});

Router.get('/register',  (req, res) => {
    res.render('signup.ejs')
 });
// Register User
Router.post('/register', function(req, res) {
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // create a User
    UserModel.create({
      name: req.body.name,
      username : req.body.username,
      email : req.body.email,
      password : hashedPassword,    
      accountType: true
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      const string = encodeURIComponent('Success Fully Register Please Login');
      res.redirect("/");
    }); 
  });
  
module.exports = Router;

//This is the home page where the user logs in