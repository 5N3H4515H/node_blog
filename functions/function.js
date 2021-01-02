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

module.exports = { authorize, notAuthorize }