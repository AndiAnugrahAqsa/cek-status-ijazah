import mysql from 'mysql'
import config from '../helpers/config.js'

const connection = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
})

connection.connect()

export default connection