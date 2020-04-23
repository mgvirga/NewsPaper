const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : { type: String, required : true },
    username: { type: String, required : true, unique : true },
    email : { type: String, required : true, unique : true },
    password : { type: String, required : true },
    accountType : { type: Boolean, required : true },
});

const UserModel = new mongoose.model("user", UserSchema, "user");

module.exports = UserModel;

//This is the schema for what a user item is using mongoose
