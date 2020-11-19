const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');
const link = require('./routes/links');
const { config } = require('./src/config');
const home = require('./routes');
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const pool = require('./src/lib/db')
const cookieParser = require('cookie-parser');
const authUser = require('./routes/auth');
const passport = require('passport')

// inicialization
require('./src/auth/passport')

//middleware
app.use(cookieParser())
app.use(session({
  secret: 'sokamysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore({}, pool)
}))
app.use(flash())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())


// config
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'pug')

// global variables
app.use((req, res, next) => {
  app.locals.success = req.flash('success')
  app.locals.message = req.flash('message')
  console.log(app.locals.message);
  console.log(app.locals.success);
  app.locals.user = req.user
  next()
})

// routes
link(app)
home(app)
authUser(app)
app.get('/', (req, res) => {
  res.redirect('/home')
})


// static
app.use(express.static(path.join(__dirname, 'public')))

app.listen(config.port, () => {
  console.log(`Server is listening in port ${config.port}`);
});
