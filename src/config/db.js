const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'dpg-cpgj4gcf7o1s738fnljg-a',
  database: 'bangiai',
  password: '1bb6bLisL85HnFznH61SqPLIu04R5QvK',
  port: 5432,
});

module.exports = pool;
