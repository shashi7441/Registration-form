require("dotenv").config();
const Student = require("../model/student");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const { cookie } = require("express/lib/response");
const req = require("express/lib/request");
const res = require("express/lib/response");
const multer = require("multer");

module.exports = {
  homeController: (req, res) => {
    res.render("home");
  },

  aboutController: (req, res) => {
    res.render("about");
  },

  signup_controller: (req, res) => {
    res.render("signup");
  },

  signup_post: async (req, res) => {
    try {
      let password = req.body.password;
      let cpassword = req.body.confirmpassword;
      // var hash = await bcrypt.hash(password, 10);
      if (password === cpassword) {
        const createUser = await new Student({
          username: req.body.username,
          email: req.body.email,
          password: password,
          confirmpassword: cpassword,
        });
        // bcrypt a password  in studentSchema

        const token = await createUser.generateToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now + 30000),
          httpOnly: true,
        });

        const result = await createUser.save();
        res.status(200).redirect("/login");

        // res.redirect("hone");
      } else {
        res.send("password are not matching");
      }
    } catch (e) {
      res.send(e);
    }
  },
  login_get_controller: (req, res) => {
    res.render("login");
  },

  login_post_controller: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const userEmail = await Student.findOne({ email: email });
      const isMatch = await bcrypt.compare(password, userEmail.password);
      const token = await userEmail.generateToken();
      if (isMatch) {
        res.redirect("/home");
      } else {
        res.status(200).send("invalid");
      }
    } catch (e) {
      res.status(400).send(e);
    }
  },

  secret_controller: (req, res) => {
    try {
      console.log(`secret token value is ${req.cookies.jwt}`);
      res.render("secret");
    } catch (e) {
      res.status(404).send(e);
    }
  },
  logOut_user: async (req, res) => {
    try {
      res.clearCookie("jwt");
      // const result = await req.user.save();
      // console.log("%%%%%%", result);

      console.log("logout successfully");
      //  console.log(req.user);

      res.redirect("http://localhost:4000/login");
    } catch (e) {
      res.status(400).send(e);
    }
  },
  // upload_get_file: async (req, res) => {
  //   res.send("please upload a file ");
  // },

  // upload_post_file: async (req, res) => {
  //   try {
  //     const storageEngine = multer.diskStorage({
  //       destination: function (req, file, cb) {
  //         cb(null, "../image");
  //       },
  //       filename: function (req, file, cb) {
  //         cb(null, Date.now() + "--" + file.originalname);
  //       },
  //     });
  //     const upload = multer({storage: storageEngine});
  //     res.send("file upload successfully");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },
};
