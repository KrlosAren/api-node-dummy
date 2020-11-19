const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../lib/db')
const { encryptPassword, matchPassword } = require('../util/utils')

passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const usersDB = await pool.query('SELECT * FROM users WHERE username = ?', [username])
  if (usersDB.length > 0) {
    const user = usersDB[0]
    const matchValuePasword = await matchPassword(password, user.password)
    if (matchValuePasword) {
      done(null, user, req.flash('success', `Welcome ${user.username}`))
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'))
    }
  } else {
    return done(null, false, req.flash('message', 'Username does not exists'))
  }
}))

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const { firstname, lastname, email } = req.body
  // const {username, password } = req.body
  const newUser = {
    username,
    password,
    firstname,
    lastname,
    email
  }
  newUser.password = await encryptPassword(password)
  const result = await pool.query('INSERT INTO users SET ? ', [newUser])
  newUser.id = result.insertId
  return done(null, newUser);

}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const users = await pool.query('SELECT * FROM users WHERE id = ?', [id])
  done(null, users[0])
})

