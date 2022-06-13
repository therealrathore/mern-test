const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
},
{
    timestamps: true,
  })

module.exports = mongoose.model('User', userSchema)
