const express = require("express");
const {
  create,getAllTask,getTask,updateTask
} = require("../controllers/Task.js");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

router.route("/create").post(isAuthenticated, create);
router.route("/get-all-task").post(getAllTask)
router.route("/get-task").post(getTask)
router.route("/update").post(isAuthenticated, updateTask)

module.exports = router;