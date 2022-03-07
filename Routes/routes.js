const express = require("express");
const auth = require("../middleware/auth");
const {
  homeController,
  aboutController,
  signup_controller,
  login_post_controller,
  signup_post,
  login_get_controller,
  secret_controller,
  logOut_user,
  upload_get_file,
  upload_post_file,
} = require("../controller/homeController");
const { Router } = require("express");
const route = express.Router();

route.get("/home", homeController);

route.get("/signup", signup_controller);

route.post("/signup", signup_post);

route.get("/about", aboutController);

route.get("/login", login_get_controller);

route.post("/login", login_post_controller);

route.get("/secret", auth, secret_controller);

route.get("/logout", auth, logOut_user);

// route.get("/upload", upload_get_file);

// route.post("/uploads", upload_post_file   ) ;

module.exports = route;
