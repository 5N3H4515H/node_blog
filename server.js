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
const passportAuthenticator = require('./strategy/passportStrategy')
const PORT = process.env.PORT || 8080
const { authorize, notAuthorize } = require('./functions/function')
// routes
const login = require('./routes/auth/login')
const index = require('./routes/index/index')
const signup = require('./routes/auth/signup')
const profile = require('./routes/user/user')
const create = require('./routes/blog/createBlog')
const logout = require('./routes/auth/logout')
const addblog = require('./routes/blog/addBlog')
const allblog = require('./routes/blog/allBlog')
const showblog = require('./routes/blog/showBlog')
const editBlog = require('./routes/blog/editBlog')
const update = require('./routes/blog/updateBlog')


app.use(express.static('public'))

mongoose.connect(process.env.MONGO_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true }) //ei Url ta mone rakhte hbe
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

// route initialization
app.use('/', login)

app.use('/', index)

app.use('/', signup)

app.use('/', profile)

app.use('/', create)

app.use('/', logout)

app.use('/', addblog)

app.use('/', allblog)

app.use('/', showblog)

app.use('/', editBlog)

app.use('/', update)


app.use((req, res) => {
    res.status(404).render('404.ejs', { tabname: "404" })
})

app.listen(PORT, () => {
    console.log('Server listining on Port: ' + PORT)
})