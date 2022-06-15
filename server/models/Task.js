const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
    formNumber: {
        type: String,
        required: [true, "Form number is required!"]
    },
    userID:{
        type:String,
        required:[true, "User id is required!"],
    },
    formID:{
        type:Number,
        required: [true, "Form id is required!"]
    },
    taskName:{
        type:String,
        required: [true, "Task name is required!"],
    },
    description:{
        type:String,
        required: [true, "Description is required!"],
    },
    dateAndTime:{
        type:Date,
        required: [true, "Date and time is required!"]
    }
},
{
    timestamps: true,
})

taskSchema.index({ dateAndTime: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Task', taskSchema)
