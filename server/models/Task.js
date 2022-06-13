const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
    formNumber: {
        type: String,
        required: true
    },
    userID:{
        type:String,
        required:true,
    },
    formID:{
        type:Number,
        required:true
    },
    taskName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    dateAndTime:{
        type:Date,
        required:true
    }
},
{
    timestamps: true,
})

taskSchema.index({ dateAndTime: 0 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Task', taskSchema)
