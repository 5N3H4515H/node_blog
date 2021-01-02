const express = require('express')
const route = express.Router()
const { authorize } = require('../../functions/function')
const schema = require('../../model/schema')

route.get('/edit/:id', authorize, (req, res) => {
    const id = req.params.id;
    schema.findById(id, (err, data) => {
        res.render('edit.ejs', { Data: data, tabname: data.id })
    })
})

module.exports = route