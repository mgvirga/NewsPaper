const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const FoodModel = require("../model/food");
let instances = require("../util/userInstance");

Router.get("/", (req, res)=>{
    test = instances.admin;
    UserModel.find({}).then((docs)=>{
      
    res.render("addUser", { posts : docs, test : instances.admin });
    console.log("The name of this user is " + instances.username);

    })
});

Router.post("/", (req, res)=>{
    if(req.body.title !== "" &&  req.body.name !== "" && req.body.username !== "" && req.body.password !== "")
    {
        const User = new UserModel
        ({
            title : req.body.title,
            name : req.body.name,
            username: req.body.username,
            password : req.body.password,
            admin : req.body.admin
        })
        User.save();
        res.redirect("/addUser");
    }
    else
    {
        res.send("user input is invalid.");
    }
});

module.exports = Router;

//The point of this class is to add an user to the user collection