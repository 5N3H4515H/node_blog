const express = require('express')
const route = express.Router()
const { notAuthorize } = require('../../functions/function')
const user = require('../../model/user')

route.post('/signup', (req, res) => {
    user({
        fname: req.body.fname,
        lname: req.body.lname,
        adrs: req.body.adrs,
        cno: req.body.cno,
        mail: req.body.email,
        password: req.body.pwd1
    }).save((err, data) => {
        if (data) {
            req.flash('msg', "Sign Up Successful")
            res.redirect('/')
        }
    })
})

route.get('/signup', notAuthorize, (req, res) => {
    res.render('signup.ejs', { tabname: "Sign Up" })
})


module.exports = route