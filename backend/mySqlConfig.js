const mysql = require('mysql2');
const dotenv = require('dotenv').config();
const passwordConnectToDatabase = process.env.PASSWORDMYSQL;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: passwordConnectToDatabase,
    database: 'groupomania'
  });

  module.exports = connection;