import promisePool from '../utils/database.mjs';

const listAllMedia = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findMediaById = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems WHERE media_id = ?', [id]);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addMedia = async (media) => {
  const {user_id, filename, size, mimetype, title, description} = media;
  const sql = `INSERT INTO MediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, size, mimetype, title, description];
  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {media_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateMedia = async (media) => {
  const {user_id, media_id, filename, title, description} = media;
  let sql = `SELECT user_id FROM MediaItems WHERE media_id = ?`;
  let params = media_id;
  try {
    const uid = await promisePool.query(sql, params);
    console.log('user id', uid[0][0].user_id);
    if (uid[0][0].user_id === user_id) {
      sql = `UPDATE MediaItems SET filename = ?, title = ?, description = ? WHERE media_id = ?`;
      params = [filename, title, description, media_id];
      const rows = await promisePool.query(sql, params);
      console.log(rows);
      return {message: 'update successful'}
    } else {
      return {error: 'unauthorized'};
    }
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const removeMedia = async (id) => {
  try {
    const sql = [`DELETE FROM MediaItemTags WHERE media_id = ${id};`, `DELETE FROM Ratings WHERE media_id = ${id};`, `DELETE FROM Likes WHERE media_id = ${id};`, `DELETE FROM Comments WHERE media_id = ${id};`, `DELETE FROM MediaItems WHERE media_id = ${id};`];
    const [rows] = [];
    for (let line of sql) {
      await promisePool.query(line);
    }
    return {message: 'Deleted successfully'};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {listAllMedia, findMediaById, addMedia, updateMedia, removeMedia};