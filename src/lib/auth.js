module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.redirect('/auth/login');
  },

  isLoginIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    }
    return res.redirect('/auth/profile')
  }
}