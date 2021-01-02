const express = require('express')
const route = express.Router()


route.get('/profile', (req, res) => {
    res.render('profile.ejs', { tabname: req.user.fname, user: req.user })
})

module.exports = route