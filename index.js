const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');
const Links = require('./routes/links');


const PORT = process.env.PORT || 3000;

//middleware
app.use(morgan('combined'))
app.use(bodyParser.json())

// config
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'pug')

// routes
Links(app)
app.get('/', (req, res, next) => {
  res.render('index', { title: 'Link App', message: 'Cargando' });
});


// static
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
