import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "database-1.ckehwmmflmjl.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "asmaemna2003",
  database:"appdb",
  port: "3306",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
