const passport = require('passport');
const user = require('./model/user');

const localStrategy = require('passport-local').Strategy;

function passportAuthenticator(passport, user) {
    passport.use(
        new localStrategy({ usernameField: 'email', passwordField: 'pwd1' }, (email, password, done) => {
            user.findOne({ mail: email }, (err, data) => {
                if (err) {
                    return done(err)
                }
                if (!data) {
                    return done(null, false, { message: 'Username not found' })
                }
                else {
                    if (data.password == password) {
                        return done(null, data)
                    }
                    else {
                        return done(null, false, { message: "Incorrect password" })
                    }
                }
            })
        })
    )
    // set the cookie to beowser
    passport.serializeUser((data, done) => {
        done(null, data.id)
    })
    //  when any request come from browser, comes with cookie id=>. then we can find the user from database
    passport.deserializeUser((id, done) => {
        user.findById(id, (err, data) => {
            // set the  object named user=data in the req variale in that route
            done(null, data)
        })
    })
}


module.exports = passportAuthenticator