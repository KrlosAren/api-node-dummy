const mysql = require('mysql')
const { promisify } = require('util')
const { database } = require('./keys')

const conection = mysql.createPool(database)
conection.getConnection((err, con) => {
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

  if (con) conection.releaseConnection()
  console.log('DB is connect');
  return
})

// promisify pool query
conection.query = promisify(conection.query)

module.exports = conection