const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const passport = require('passport')
const passportConfig = require('./src/config/passport')

const MONGO_URL = 'mongodb://127.0.0.1:27017/auth'
const app = express()

const port = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.connection.on('error', (err) => {
  throw err;
  process.exit(1)
})

app.use(session({
  secret: 'Esto es secreto',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: MONGO_URL,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
  req.session.count = req.session.count ? req.session.count + 1 : 1
  res.send(`Hola esto es una aplicacion de Nodejs ${req.session.count}`)
})

const controladorUser = require('./src/controlls/users')
app.post('/signup', controladorUser.postSignUp)
app.post('/login', controladorUser.postLogin)
app.post('/logout', passportConfig.isAuthenticated, controladorUser.logout)

app.get('/userInfo', passportConfig.isAuthenticated, (req, res) => {
  req.json(req.user)
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})