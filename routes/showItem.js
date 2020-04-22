const express = require("express");
const Router = express.Router();
const userModel = require("../model/user");
const FoodModel = require("../model/food");
let instances = require("../util/userInstance");
var moment = require('moment');
moment().format();

Router.get("/", (req, res)=>{
    test = instances.admin;
    FoodModel.find({}).then((docs)=>{
       res.render("showItem", { posts : docs });
   })
});

module.exports = Router;

//The point of this javascript is to show the items in the database