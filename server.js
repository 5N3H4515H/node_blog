if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressEjsLayouts = require('express-ejs-layouts')
const cookie = require('cookie-session')
const flash = require('express-flash')
const user = require('./model/user')
const schema = require('./model/schema')
const passport = require('passport')
const passportAuthenticator = require('./passportStrategy')
const { query } = require('express')
const PORT = process.env.PORT || 8080


app.use(express.static('public'))
function authorize(req, res, next) {
    if (req.isAuthenticated())
        return next()
    return res.redirect('/login')
}

function notAuthorize(req, res, next) {
    if (req.isAuthenticated())
        return res.redirect('/profile')
    return next()
}
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //ei Url ta mone rakhte hbe
    .then(() => {
        console.log("Database Connected")
    }).catch((err) => {
        console.log(err)
    })

app.use(express.urlencoded({ extended: false }))
app.use(expressEjsLayouts)
app.set('view-engine', 'ejs')
app.set('layout', 'layouts/layout.ejs')

app.use(
    cookie({
        maxAge: 30 * 30 * 1000,
        keys: ["asdsadasdasd"]
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

passportAuthenticator(passport, user)

app.get('/', notAuthorize, (req, res) => {
    res.render('index.ejs', { tabname: "Blogger Hub" })
})

app.post('/signup', (req, res) => {
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

app.get('/signup', notAuthorize, (req, res) => {
    res.render('signup.ejs', { tabname: "Sign Up" })
})

app.post('/login', notAuthorize, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: "/",
    failureFlash: true
}))
app.get('/profile', (req, res) => {
    res.render('profile.ejs', { tabname: req.user.fname, user: req.user })
})
app.get('/create', authorize, (req, res) => {
    res.render('create.ejs', { tabname: "Create Blog", user: req.user })
})

app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})


app.post('/addblog', notAuthorize, (req, res) => {
    schema.findOne({ alias: req.body.blog_title.toLowerCase().replace(/\s+/g, '') }, (err, data) => {
        if (data) {
            req.flash('warning', "Title Already Exist")
            res.redirect('/')
        }
        else {
            schema({
                name: req.body.blog_title,
                alias: req.body.blog_title.toLowerCase().replace(/\s+/g, ''),
                body: req.body.blog_body
            }).save((err, data) => {
                console.log("Dataset added")
                req.flash('msg', "Dataset created")
                res.redirect('/profile')
            })
        }
    })

})

app.get('/showblogs', (req, res) => {
    console.log(req.user)
    schema.find({}, (err, data) => {
        res.render('showblogs.ejs', { user: req.user, blogs: data, tabname: "Show Blogs" })
    })

})

app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    schema.findById(id, (err, data) => {
        res.render('content.ejs', { blog: data, user: req.user, tabname: data.id })
    })
})

app.get('/edit/:id', authorize, (req, res) => {
    const id = req.params.id;
    schema.findById(id, (err, data) => {
        res.render('edit.ejs', { Data: data, tabname: data.id })
    })
})

app.post('/update/:id', (req, res) => {
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

app.get('/blog/:id', (req, res) => {
    res.render('content.ejs')
})

app.use((req, res) => {
    res.status(404).render('404.ejs', { tabname: "404" })
})

app.listen(PORT, () => {
    console.log('Server listining on Port: ' + PORT)
})