const mysql = require('mysql2');

const config = require('./config')

const connection =  mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

connection.getConnection((err, conn) => {
  // console.log(conn)
  conn.connect((err) => {
    if(err) {
      console.log("連接失敗", err)
    } else {
      console.log("數據庫連接成功")
    }
  })
})

module.exports = connection.promise()