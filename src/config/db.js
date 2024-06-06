const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'bn6vws8zpfpngkxypnmh-mysql.services.clever-cloud.com',
  user: 'urmjk4uuterpxmkr',
  password: 'oY1X6uFV193RbUUQD07U',
  database: 'bn6vws8zpfpngkxypnmh',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
