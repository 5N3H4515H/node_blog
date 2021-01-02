const express = require('express')
const route = express.Router()
const schema = require('../../model/schema')


route.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    schema.findById(id, (err, data) => {
        res.render('content.ejs', { blog: data, user: req.user, tabname: data.id })
    })
})

module.exports = route