const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    grocery_Item : String,
    cost : String, 
    expiration_Date : String,
})

const FoodModel = new mongoose.model("food", FoodSchema, "col1");

module.exports = FoodModel;

//This is the schema for what a food item is using mongoose