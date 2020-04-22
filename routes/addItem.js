const express = require("express");
const Router = express.Router();
const FoodModel = require("../model/food");
let instances = require("../util/userInstance");

Router.get("/", (req, res)=>{
    test = instances.admin;
    FoodModel.find({}).then((docs)=>{
      
    res.render("addItem", { posts : docs });
    })
});

Router.post("/", (req, res)=>{
    if(req.body.grocery_Item !== "" && req.body.cost !== "" && req.body.expiration_Date !== "")
    {
        const Food = new FoodModel
        ({
            grocery_Item : req.body.grocery_Item,
            cost : req.body.cost,
            expiration_Date : req.body.expiration_Date,
        });
        console.log("user has been added");
        Food.save();
        res.redirect("/addItem");
    }
    else
    {
        res.send("user input is invalid.");
    }
});

module.exports = Router;

//The point of this class is to add an item to the item collection
