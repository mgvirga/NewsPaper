const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
let instances = require("../util/userInstance");

Router.get("/", (req, res)=>{
    test = instances.admin;
    UserModel.find({}).then((docs)=>{
    res.render("signup", { posts : docs });
    })
});

module.exports = Router;