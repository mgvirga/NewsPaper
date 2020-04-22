const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const FoodModel = require("../model/food");

Router.get("/", (req, res)=>{
       res.render("home");
});

module.exports = Router;
