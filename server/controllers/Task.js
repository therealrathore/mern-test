const Task = require("../models/Task.js");
const moment = require("moment")
const create = async (req, res) => {
  try {
    const { taskName, description, dateAndTime, userID } = req.body;
    
    const taskRes = await Task.findOne().sort({formID:-1})
   
    let formID;
    
    let formNumber;
    let date = new Date()
    var currentDate = moment(date, 'DD/MM/YYYY').format("DD/MM/YYYY")

    if (!taskRes) {
      formID = 01
      formNumber = `${currentDate}_${formID.toString()}`
    } else {
      formNumber = `${currentDate}_${taskRes?.formID+1}`
      formID = taskRes?.formID+1
      console.log('hi')
    }
    
    const created = await Task.create({ taskName,userID, description, dateAndTime, formNumber, formID });
    res.status(200).json({success:true, message:'Task created successfully!'})
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTask = async(req, res) => {
  try {

    const data = await Task.find().sort({formID:-1})

    res.status(200).json({success:true, data:data})

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  create,
  getAllTask
}