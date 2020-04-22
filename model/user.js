const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    title : String,
    name : String, 
    username: String,
    password : String,
    admin : Boolean
});

const UserModel = new mongoose.model("user", UserSchema, "user");

module.exports = UserModel;

//This is the schema for what a user item is using mongoose
