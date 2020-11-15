const express = require('express')
const { restart } = require('nodemon')
const router = express.Router()


router.get('/', (req, res, next) => {
  res.render('index')
})

module.exports = router