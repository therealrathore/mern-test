require('dotenv').config()
const User  = require("../models/User.js");
const Task = require("../models/Task.js");
const {createToken} = require("../helper/createToken")
const register = async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username });

    if (user) {
      
      const token = createToken(user)
      return res
        .status(200)
        .json({ success: true, data:user, token:token });
    }

    user = await User.create({ username });
    const token = createToken(user)
    return res
        .status(200)
        .json({ success: true, data:user, token:token });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {

  try {
    const { username } = req.body;

    var user =  await User.aggregate([
            { $sort : { _id : -1 } },
            {
                "$lookup": {
                    "from": "tasks",
                    "let": { "id": { "$toString": "$_id" }},
                    "pipeline": [
                        { "$match": { "$expr": { "$eq": [{ "$toString": "$userID" }, "$$id"] }}}
                    ],
                    "as": "task_info"
                }
            },
            {
                "$unwind": {
                    "path": "$task_info",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {$sort: {"tasks.dateAndTime": -1}},

        ])

    if (user) {
      return res
        .status(200)
        .json({ success: true, data:user });
    } else {
      return res
        .status(404)
        .json({ success: true, message:'Data not found!' });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}

module.exports = {
  register,
  getAllUsers
}
