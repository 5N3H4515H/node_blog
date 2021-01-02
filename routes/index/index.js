const express = require('express')
const route = express.Router()
const { notAuthorize } = require('../../functions/function')


route.get('/', notAuthorize, (req, res) => {
    res.render('index.ejs', { tabname: "Blogger Hub" })
})

module.exports = route