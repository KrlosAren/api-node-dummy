const express = require('express')
const passport = require('passport')
const { isLoggedIn, isLoginIn } = require('../src/lib/auth')

function authUser(app) {
  const router = express.Router()
  app.use('/auth', router)

  router.get('/signup', isLoginIn,  (req, res) => {
    res.render('auth/signup')
  })

  router.post('/signup',isLoginIn,  passport.authenticate('local.signup', {
    successRedirect: '/auth/profile',
    failureRedirect: '/auth/signup',
    failureFlash: true
  }))

  router.get('/login', isLoginIn,  (req, res) => {
    res.render('auth/login')
  })

  router.post('/login',isLoginIn, (req, res, next) => {
    passport.authenticate('local.login', {
      successRedirect: '/auth/profile',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next)
  })

  router.get('/profile', isLoggedIn, (req, res) => {
    res.render('auth/profile')
  })

  router.get('/logout',  (req, res) => {
    req.logOut()
    res.redirect('/auth/login')
  })
}

module.exports = authUser