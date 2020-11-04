const passport = require('passport')
const User = require('../models/user')


exports.postSignUp = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  })

  User.findOne({ email: req.body.email }, (err, isExists) => {
    if (!isExists) {
      return res.status(400).send('Ya esta registrado ese mail')
    }

    newUser.save((err) => {
      if (err) {
        next(err)
      }
      req.logIn(newUser, (err) => {
        if (err) {
          next(err)
        }

        res.send('Usuario ha sido creado exitosamente')
      })
    })
  })
}


exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, isInfo) => {
    if (err) {
      next(err)
    }

    if (!user) {
      return res.status(400).send('Email o constrasena no valido')
    }

    req.logIn(user, (err) => {
      if (err) {
        next(err)
      }

      res.send('Login exitoso')
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
  res.send('Logout exitoso')
}