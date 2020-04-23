// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const ContactModel = require("../model/contact");
let instances = require("../util/userInstance");

// get submitQuery
Router.get("/", (req, res)=>{
    ContactModel.find({}).then((docs) => {
        res.render("submitQuery", { posts : docs });

    })
});

// post submitQuery
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

