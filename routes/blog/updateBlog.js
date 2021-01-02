const express = require('express')
const route = express.Router()
const schema = require('../../model/schema')

route.post('/update/:id', (req, res) => {
    const id = req.params.id;
    schema.findByIdAndUpdate(
        id,
        {
            name: req.body.blog_title,
            alias: req.body.blog_title.toLowerCase().replace(/\s+/g, ''),
            body: req.body.blog_body
        },
        (err, data) => {
            if (data) {
                res.redirect(`/blog/${data.id}`)
            }
        }
    )
})

module.exports = route