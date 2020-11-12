const express = require('express')
const conection = require('../src/lib/db')


function Links(app) {
  const connection = require('../src/lib/db')
  const router = express.Router()
  app.use('/links', router)

  router.get('/add', (req, res) => {
    res.render('links/add', { title: 'Add links' })
  })

  router.post('/add', async (req, res) => {
    const { title, url, description } = req.body
    const newLink = {
      title,
      url,
      description
    }
    await connection.query('INSERT INTO links set ?', [newLink])
    res.send('enviado')
  })
}

module.exports = Links