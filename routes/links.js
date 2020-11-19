const express = require('express')
const pool = require('../src/lib/db')
const { timeago } = require('../src/util/helpers')
const { isLoggedIn } = require('../src/lib/auth')

function link(app) {
  const router = express.Router()
  app.use('/links', router)

  router.get('/add', isLoggedIn, (req, res, next) => {
    res.render('links/add', { title: 'Add links' })
  })

  router.post('/add', isLoggedIn, async (req, res, next) => {
    const { url, url_description, title } = req.body
    const newLink = {
      title,
      url,
      url_description,
      user_id: req.user.id
    }
    await pool.query('INSERT INTO links set ?', [newLink])
    req.flash('success', 'Link has been saved')
    res.redirect('/links')
  })


  router.get('/', isLoggedIn, async (req, res, next) => {
    const listLinks = await pool.query('SELECT * FROM links WHERE user_id=?', [req.user.id])
    const data = listLinks.map(link => {
      return {
        id: link.id,
        title: link.title,
        url: link.url,
        description: link.url_description,
        time: timeago(link.create_at)
      }
    })
    res.render('links/listLinks.pug', { Links: data, title: 'Links User' })
  })

  router.get('/delete/:id', isLoggedIn, async (req, res, next) => {
    const { id } = req.params
    await pool.query('DELETE FROM links WHERE id= ?', [id])
    req.flash('success', 'Link has been deleted')
    res.redirect('/links')
  })

  router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const data = await pool.query('SELECT * FROM links WHERE id =? ', [id])
    res.render('links/edit', { link: data })
  })

  router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req
    const { title, url, url_description } = req.body
    const editLink = {
      title,
      url,
      url_description
    }
    await pool.query('UPDATE links set ? WHERE id = ?', [editLink, id])
    req.flash('success', 'Link has been updated')
    res.redirect('/links')
  })
}

// module.exports = router
module.exports = link