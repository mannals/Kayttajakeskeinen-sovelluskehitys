import promisePool from "../utils/database.mjs";

/**
 * Fetch user from database based on usrname/pswd pair
 * @param {object} userCreds - {username, password}
 * @returns user object
 */
const login = async (username) => {
    try {
        const sql = `SELECT user_id, username, password, email, user_level_id FROM Users WHERE username = ?`;
        const params = [username];
        const result = await promisePool.query(sql, params);
        const [rows] = result;
        console.log('login, user found?', rows[0]);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

/**
* Creates a new user in the database
* 
* @param {object} user data
* @returns {number} - id of the inserted user in db
*/
const addUser = async (user) => {
    try {
      const sql = `INSERT INTO Users (username, email, password, user_level_id)
                  VALUES (?, ?, ?, ?)`;
      // user level id defaults to 2 (normal user)                 
      const params = [user.username, user.email, user.password, 2];
      const result = await promisePool.query(sql, params);
      return result[0].insertId;
    } catch (e) {
      console.error('error', e.message);
      return {error: e.message};
    }
};

/**
 * 
 * @returns array or error object
 */
const listAllUsers = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM Users');
        console.log('rows', rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const findUserById = async (id) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM Users WHERE user_id = ?', [id]);
        console.log('rows', rows);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const updateUser = async (user) => {
    const {user_id, username, password, email} = user;
    const sql = 'UPDATE Users SET username = ?, password = ?, email = ? WHERE user_id = ?';
    const params = [username, password, email, user_id];
    try {
        const rows = await promisePool.query(sql, params);
        console.log('rows', rows);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const removeUser = async (id) => {
    try {
        const sql = [`DELETE FROM Ratings WHERE user_id = ${id};`, `DELETE FROM Likes WHERE user_id = ${id};`, `DELETE FROM Likes WHERE media_id IN (2, 3);`, `DELETE FROM Comments WHERE user_id = ${id};`, `DELETE FROM Comments WHERE media_id = 2;`, `DELETE FROM MediaItemTags WHERE media_id IN (2, 3);`, `DELETE FROM Ratings WHERE media_id = 2;`, `DELETE FROM MediaItems WHERE user_id = ${id};`, `DELETE FROM Users WHERE user_id = ${id};`];
        const [rows] = [];
        for (let line of sql) {
            await promisePool.query(line);
        }
        console.log('rows', rows);
        return 'Deleted successfully';
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
  }
    
};

export {login, listAllUsers, findUserById, addUser, updateUser, removeUser};