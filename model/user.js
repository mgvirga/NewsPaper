const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : String, 
    username: String,
    email : String,
    password : String,
    accountType : Boolean
});

const UserModel = new mongoose.model("user", UserSchema, "user");

module.exports = UserModel;

//This is the schema for what a user item is using mongoose
