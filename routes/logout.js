// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
var moment = require('moment');
let instances = require("../util/userInstance");
moment().format();
const bcrypt = require('bcryptjs');
const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');


// get method to logout
Router.get('/', (req,res) => {
instances.signedIn = false;
localStorage.removeItem('authtoken');
res.redirect('/login');
})

module.exports = Router;