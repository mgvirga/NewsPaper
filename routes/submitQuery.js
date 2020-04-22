const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const ContactModel = require("../model/contact");
let instances = require("../util/userInstance");
// Danielle add for authentication
const jwt = require('jsonwebtoken');
const config = require('../config.js');

Router.get("/", (req, res)=>{
    // test = instances.admin;
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
                ContactModel.find({}).then((docs) => {
                    res.render("submitQuery", { posts : docs });
                })
              }
              else
              {
                     res.redirect('/')
              }
       })
    })
});
Router.post("/", (req, res)=>{
    if(req.body.email !== "" &&  req.body.query !== "" )
    {
        const Contact = new ContactModel
        ({
            email : req.body.email,
            query : req.body.query
        });
        Contact.save();
        res.redirect("/submitQuery");
    }
    else
    {
        res.send("query is invalid.");
    }
});

module.exports = Router;

