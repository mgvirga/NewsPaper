const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const FoodModel = require("../model/food");
var moment = require('moment');
let instances = require("../util/userInstance");
moment().format();
Router.get("/", (req, res)=>{
    res.render("login", {});
});

Router.post("/", (req, res)=>{
    found = false;
    isAdmin = false;
    UserModel.find({}).then((docs)=>{
        docs.forEach(doc => {       
            console.log(req.body.username + doc.username)
            if(req.body.username == doc.username)
            {
                if(req.body.password == doc.password)
                {
                    found = true;

                    instances.username = req.body.username;
                    console.log("The value of the instance is " + instances.username);
                    instances.password = req.body.password;
                    instances.admin = doc.admin;
                    instances.title = req.body.title;
                    instances.name = req.body.name;
                    if(doc.admin == true)
                    {
                        isAdmin = true;
                    }
                }
            }
        })
        if(found == true)
        {
            if(isAdmin == true)
            {
                res.redirect("/showUser");
            }
            else
            {
                res.redirect("/showItem");
            }
        }
        else
        {
            res.render("login", { });
        }
    console.log(req.body.username + req.body.password)
    });
    console.log(instances.username);
});

module.exports = Router;

//This is the home page where the user logs in