const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "puls@r1159",
  database: "my_database",
  waitForConnections: true,
  connectionLimit: 10, // Number of connections in the pool
  queueLimit: 0, // No limit on the queue
});

module.exports = pool;