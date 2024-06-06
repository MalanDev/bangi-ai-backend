const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name'
});

module.exports = pool.promise();
