const express = require("express");
const User = require("./routes/User.js");
const Task = require("./routes/Task.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", User);
app.use("/api/v1/task", Task);


app.get("/", (req, res) => {
  res.send("Server is working");
});

module.exports = app