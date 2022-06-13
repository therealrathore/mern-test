const express = require("express");
const {
  create,getAllTask,
} = require("../controllers/Task.js");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

router.route("/create").post(create);
router.route("/get-all-task").post(getAllTask)
// router
//   .route("/task/:taskId")
//   .get(isAuthenticated, updateTask)
//   .delete(isAuthenticated, removeTask);

module.exports = router;