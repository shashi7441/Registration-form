const jwt = require("jsonwebtoken");
const Student = require("../model/student");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(";;;;;;;;;;;;;;;;", token);

    const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
    console.log("''''''$$''';;;;;", verifyUser);

    const user = Student.findOne({ _id: verifyUser._id });
    // console.log(";;;;;;;;;;;;;;;;;;;;", user);

    // res.render("secret");

    // req.token = token;
    // req.user = user;

    next();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = auth;
