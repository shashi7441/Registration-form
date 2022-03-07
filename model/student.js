require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "email Already exist "],
    validate(value) {
      if (!validator(value).isEmail()) {
        throw new Error("invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

studentSchema.methods.generateToken = async function () {
  try {
    const token = await jwt.sign(
      { id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (e) {
    console.log(e);
  }
};

studentSchema.pre("save", async function (req, res, next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = this.password;
  }
  next();
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
