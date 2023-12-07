import mysql from 'mysql'
import config from '../helpers/config.js'

const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME
})

connection.connect()

export default connection