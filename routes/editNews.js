// Danielle added page to edit news
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const NewsModel = require("../model/news");
let instances = require("../util/userInstance");


//get id for edit
Router.get("/:id", (req, res) => {
    const requestedId = req.params.id;
    console.log(req.body);
    NewsModel.findOne({
      _id: requestedId
    }, (err, post) => {
      if (!err) {
        res.render("editNews.ejs", {posts:post});
      }
    });
  });
  

// edit News
Router.post('/:id', function(req, res) {
    const requestedId = req.params.id;
    console.log("id", requestedId)
    // update a News
    console.log("req.body",req.body)
    NewsModel.findByIdAndUpdate(requestedId,{$set: {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      imageurl: req.body.imageurl
    }
    }, {new: true}, function(err, data){
      if(err)
      {
        console.error(err);
      }
      console.log("data",data);
    })
    // redirect to the dashboard
    // const string = encodeURIComponent('Success adding News');
    res.redirect("/newsBoard");
  });

module.exports = Router;