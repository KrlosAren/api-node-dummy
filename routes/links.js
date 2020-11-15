const express = require('express')
const pool = require('../src/lib/db')
const { timeago } = require('../src/util/helpers')

function link(app) {
  const router = express.Router()
  app.use('/links', router)

  router.get('/add', (req, res, next) => {
    res.render('links/add', { title: 'Add links' })
  })

  router.post('/add', async (req, res, next) => {
    const { url, url_description, title } = req.body
    const newLink = {
      title,
      url,
      url_description
    }
    await pool.query('INSERT INTO links set ?', [newLink])
    res.redirect('/')
  })


  router.get('/', async (req, res, next) => {
    const listLinks = await pool.query('SELECT * FROM links')
    const data = listLinks.map(link => {
      return {
        title: link.title,
        url: link.url,
        description: link.url_description,
        time: timeago(link.create_at)
      }
    })
    console.log(data);
    res.render('links/listLinks.pug', { Links: data, title: 'Links User' })
  })

  router.delete('/delete/:id', (req, res, next) => {
    console.log(req.params.id);
    res.send('DELETE')
  })

}



// module.exports = router
module.exports = link