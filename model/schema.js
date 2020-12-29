const mongoose = require("mongoose")
const blogSchema = mongoose.Schema({
    name: { //Blog name kmn type er hobe,otar requirement setar jonno
        type: String,
        require: true
    },
    alias: {
        type: String,
        require: true
    },
    body: { //Blog Body kmn type er hobe,otar requirement setar jonno
        type: String,
        require: true
    }
})
module.exports = mongoose.model('schema', blogSchema)