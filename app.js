//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

var _ = require('lodash');
const postBody = require(__dirname + "/postBody.js")
// Load the core build.
// var _ = require('lodash/core');

//connecting to mongoose server
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-Sanchit:Test1234@cluster0.yu1bxwd.mongodb.net/blogDB", { useNewUrlParser: true })

//Blog Schema
const blogSchema = new mongoose.Schema({
  title: String,
  body: String
})

const Blog = mongoose.model("Blog", blogSchema);


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, resp) {
  Blog.find().then(function (blogs) {
    resp.render("home", { homeContent: homeStartingContent, postContent: blogs })
  })
})
app.post("/", function (req, resp) {
  resp.render("compose")
})


app.get("/about", function (req, resp) {
  resp.render("about", { aboutContent: aboutContent })
})

app.get("/contact", function (req, resp) {
  resp.render("contact", { contactContent: contactContent })
})


//COMPOSE GET and POST
app.get("/compose", function (req, resp) {
  resp.render("compose")
})
app.post("/compose", function (req, resp) {
  const post = {
    title: _.capitalize(req.body.postTitle),
    body: req.body.postBody
  }

  if (post.title && post.body) {
    // posts.push(post);
    var blog = new Blog({
      title: post.title,
      body: post.body
    });
    blog.save().then(function(res){
      if(res){
        resp.redirect("/");
      }
    });
  }
})

app.get("/posts/:postID", function (req, resp) {

  const postID = req.params.postID;

  Blog.findOne({ _id: postID }).then(function (blog) {
    resp.render("post", {
      title: blog.title,
      content: blog.body
    })
  })
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
