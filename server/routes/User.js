const express = require("express");
const {
  register,
  getAllUsers
} = require("../controllers/User.js");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(register);
router.route("/get-all-users").post(getAllUsers)
// router
//   .route("/task/:taskId")
//   .get(isAuthenticated, updateTask)
//   .delete(isAuthenticated, removeTask);

module.exports = router;