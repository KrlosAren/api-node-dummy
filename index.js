const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');
const link = require('./routes/links');


const PORT = process.env.PORT || 3000;

//middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// config
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'pug')

// routes
link(app)
// app.use(require('./routes/index'))
// app.use('/links', require('./routes/links'))


// static
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
