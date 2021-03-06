require('dotenv').config({ debug: process.env.DEBUG })

const config = {
  dev: process.env.NODE_ENV !== 'production',
  host: process.env.HOST,
  user: process.env.USER_MYSQL,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT || 3000,
}

module.exports = { config }