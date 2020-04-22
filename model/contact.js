const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    email : String,
    query : String,
});
const ContactModel = new mongoose.model("contact", ContactSchema, "email");

module.exports = ContactModel;
