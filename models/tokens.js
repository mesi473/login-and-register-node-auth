const mongoose = require('mongoose');
const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now()
    }
})
module.exports = tokenModel = mongoose.model('token',tokenSchema);