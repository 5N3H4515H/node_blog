
const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    adrs: {
        type: String,
        require: true
    },
    cno: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('user', userSchema)