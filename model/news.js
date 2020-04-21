const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title : String,
    description : String, 
    url: String,
    imageurl : String,
    date : { type : Date, default : Date.now }
})

const NewsModel = new mongoose.model("news", NewsSchema, "newspaper");

module.exports = NewsModel;

//This is the schema for what a user item is using mongoose