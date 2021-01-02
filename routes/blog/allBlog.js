const express = require('express')
const route = express.Router()
const schema = require('../../model/schema')

route.get('/showblogs', (req, res) => {
    console.log(req.user)
    schema.find({}, (err, data) => {
        res.render('showblogs.ejs', { user: req.user, blogs: data, tabname: "Show Blogs" })
    })

})

module.exports = route