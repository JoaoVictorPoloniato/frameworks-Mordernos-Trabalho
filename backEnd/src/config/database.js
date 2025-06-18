const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'g3',
  password: 'G3@12345', 
  database: 'db_3',
})

module.exports = pool
