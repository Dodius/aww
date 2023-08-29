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

  console.log('// src/portal/services/userService.js  user:', user);

  const [result] = await pool.execute(
    'INSERT INTO `users` (username, avatar) VALUES (?,?)', [user.username, user.avatar]);
  user.id = result.insertId;
  return user;
}

async function updateUserName(userID, newUserName) {                      
  try {
    console.log('// src/portal/services/userService.js  userID:', userID, ' newUserName:', newUserName);
    const [result] = await pool.execute(
      'UPDATE `users` SET username=? WHERE id=?', 
      [newUserName, userID]
    );
    
    return result;
  } catch (error) {
    console.error("Error in updateUserName:", error);
    throw error;  // or handle it  accordingly
  }
}
                
async function updateUserAvatar(userID, newAvatarURL) {                      
  try {
    console.log('// src/portal/services/userService.js  userID:', userID, ' newAvatar:', newAvatarURL);
    const [result] = await pool.execute(
      'UPDATE `users` SET avatar=? WHERE id=?', 
      [newAvatarURL, userID]
    );
    
    return result;
  } catch (error) {
    console.error("Error in updateUserName:", error);
    throw error;  // or handle it  accordingly
  }
}

module.exports = { getUserByUsername, getUserById, createUser, updateUserName, updateUserAvatar };
