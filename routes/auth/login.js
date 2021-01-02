const express = require('express')
const route = express.Router()
const { notAuthorize } = require('../../functions/function')
const passport = require('passport')

route.post('/login', notAuthorize, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: "/",
    failureFlash: true
}))

module.exports = route