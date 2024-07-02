const mysql = require('mysql2');
const config = require('./config');
const fs = require('fs');

const sslOptions = {
  ca: fs.readFileSync(process.env.SSL_CA_PATH)
};

const pool = mysql.createPool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  ssl: sslOptions
});

module.exports = pool.promise();