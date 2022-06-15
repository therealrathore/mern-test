const express = require("express");
const {
    create,
    getAllTask,
    getTask,
    updateTask,
    getUsersTask
} = require("../controllers/Task.js");

const { isAuthenticated, isUser } = require("../middleware/auth.js");

const router = express.Router();

router.route("/create").post(isAuthenticated, isUser, create);
router.route("/get-all-task").post(getAllTask)
router.route("/get-task").post(getTask)
router.route("/update").post(isAuthenticated, updateTask)
router.route("/get-users-task").post(isAuthenticated, isUser, getUsersTask)

module.exports = router;