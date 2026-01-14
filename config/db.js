import mysql from "mysql2/promise";

// MySQL connection pool without dotenv
export const db = mysql.createPool({
  host: "localhost",          // MySQL host
  user: "root",               // MySQL username
  password: "root",           // MySQL password
  database: "test_db",        // MySQL database name
  port: 3306,                 // MySQL port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
