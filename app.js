require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 4000;
const app = express();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const studentRoute = require("./Routes/routes");
const Path = require("path");
const auth = require("./middleware/auth");
require("./database/db");

// app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(express.static(Path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());
app.use("/", studentRoute);

app.listen(port, () => {
  console.log(`server live at port ${port}`);
});
