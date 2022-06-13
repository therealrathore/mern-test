const app  =  require("./app.js");
const { config } =  require("dotenv");
const connectDatabase  =  require("./config/database.js");
const schedule = require('node-schedule');
const Task = require('./models/Task');
const moment = require("moment");
config({ path: "./config/config.env" });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
