const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const FoodModel = require("../model/food");
let instances = require("../util/userInstance");

Router.get("/", (req, res)=>{
    test = instances.admin;
    UserModel.find({}).then((docs)=>{
    res.render("showUser", { posts : docs, test : instances.admin });
    console.log("The name of this user is " + instances.username);
    })
});

module.exports = Router;

//The point of this javascript is to show the users in the database