const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log(`MongoDB connected:- ${connection.host}:${connection.port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDatabase