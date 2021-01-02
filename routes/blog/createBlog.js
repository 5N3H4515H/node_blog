const express = require('express')
const route = express.Router()
const { authorize } = require('../../functions/function')

route.get('/create', authorize, (req, res) => {
    res.render('create.ejs', { tabname: "Create Blog", user: req.user })
})

module.exports = route