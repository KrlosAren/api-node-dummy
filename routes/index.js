const express = require('express')


function home(app) {
  const router = express.Router()
  app.use('/home', router)


  router.get('/', (req, res, next) => {
    res.render('components/main.pug', {title: 'Link App'})
  })
}

module.exports = home