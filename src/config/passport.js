const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})


passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (!user) {
        return done(null, false, { message: `Este email ${email} no esta registrado` })
      } else {
        user.comparePassword(password, (err, isEqual) => {
          if (isEqual) {
            return done(null, user)
          } else {
            return done(null, false, { message: `La constrasena no es valida` })
          }
        })
      }
    })
  }
))

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } 
  res.status(401).send('Tienes que hacer login para acceder al recurso')
}