const express = require('express')
const route = express.Router()

route.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})


module.exports = route