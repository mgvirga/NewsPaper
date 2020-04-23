const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title : { type: String, required : true },
    description : { type: String, required : true },
    url: { type: String, required : true },
    imageurl : { type: String, required : true },
    date : { type : Date, default : Date.now }
})

const NewsModel = new mongoose.model("news", NewsSchema, "newspaper");

module.exports = NewsModel;

//This is the schema for what a user item is using mongoose