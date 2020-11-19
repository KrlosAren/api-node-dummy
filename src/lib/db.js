// const mysql = require('mysql')
const mysql = require('mysql2')
const { promisify } = require('util')
const { config } = require('../config')

const pool = mysql.createPool({
  database: config.database,
  password: config.password,
  user: config.user,
  host: config.host
})
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('DATABASE CONNECTION WAS CLOSED');
    };
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TO MANY CONNECTIONS');
    }
    if (err.code === 'ECONREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSED');
    }
  }

  
  if (connection) connection.release()
  console.log('DB is connect');
  return
})

// promisify pool query
pool.query = promisify(pool.query)

module.exports = pool