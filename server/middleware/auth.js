const jwt = require("jsonwebtoken");
const User  = require("../models/User.js");
const { config } =  require("dotenv");
config({ path: "./config/config.env"});

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.headers;
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Login First" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    req.user = await User.findById({_id:decoded.userID});

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const isUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Login First" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById({_id:decoded.userID});

    if (decoded.userID === req.body.userID) {
      next();
    } else {
      res.status(401).json({success:false, message:'unauthorized access!'})
    }
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {isAuthenticated, isUser}