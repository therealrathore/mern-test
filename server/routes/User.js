const express = require("express");
const {
  register,
  getAllUsers
} = require("../controllers/User.js");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(register);
router.route("/get-all-users").post(getAllUsers)

module.exports = router;