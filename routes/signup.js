const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const FoodModel = require("../model/food");
let instances = require("../util/userInstance");

Router.get("/", (req, res)=>{
    test = instances.admin;
    UserModel.find({}).then((docs)=>{
    res.render("sign-up", { posts : docs });
    })
});

module.exports = Router;