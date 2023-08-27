// src/portal/services/userService.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
 
//console.log('+++DB_HOST:',process.env.DB_HOST);  
//console.log('pool:',pool);  

async function getUserByUsername(username) {
  const [rows] = await pool.execute('SELECT * FROM `users` WHERE `username` = ?', [username]);
  return rows[0];
}

async function getUserById(id) {
  const [rows] = await pool.execute('SELECT * FROM `users` WHERE `id` = ?', [id]);
  return rows[0];
}
              
async function createUser(user) {                     // called from authMiddleware.js
  // console.log('DB_HOST:',process.env.DB_HOST);  
  // console.log('DB_USER:', process.env.DB_USER);
  // console.log('DB_PASS:', process.env.DB_PASS);
  // console.log('DB_NAME:', process.env.DB_NAME);
  const [result] = await pool.execute('INSERT INTO `users` (username) VALUES (?)', [user.username]);
  user.id = result.insertId;
  return user;
}

module.exports = { getUserByUsername, getUserById, createUser };
