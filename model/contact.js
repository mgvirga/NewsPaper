const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    email : { type: String, required : true },
    query : { type: String, required : true }
});
const ContactModel = new mongoose.model("contact", ContactSchema, "email");

module.exports = ContactModel;
