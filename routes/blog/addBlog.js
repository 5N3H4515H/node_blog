const express = require('express')
const route = express.Router()
const { authorize } = require('../../functions/function')
const schema = require('../../model/schema')

route.post('/addblog', authorize, (req, res) => {
    console.log('asda')
    schema.findOne({ alias: req.body.blog_title.toLowerCase().replace(/\s+/g, '') }, (err, data) => {
        if (data) {
            req.flash('warning', "Title Already Exist")
            res.redirect('/create')
        }
        else {
            schema({
                name: req.body.blog_title,
                alias: req.body.blog_title.toLowerCase().replace(/\s+/g, ''),
                body: req.body.blog_body
            }).save((err, data) => {
                console.log("Dataset added")
                req.flash('msg', "Dataset created")
                res.redirect('/create')
            })
        }
    })

})

module.exports = route