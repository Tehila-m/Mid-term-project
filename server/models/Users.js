const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        minlength: 2
    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
        minlength: 2
    },
    phone:{
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10
    }
})

module.exports = mongoose.model('User', usersSchema)