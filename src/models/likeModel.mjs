import promisePool from "../utils/database.mjs";

const getLikesByMedia = async (id) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM Likes WHERE media_id = ?', [id]);
        console.log('rows', rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const getLikesByUser = async (id) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM Likes WHERE user_id = ?', [id]);
        console.log('rows', rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const getSpecificLike = async (id) => {
    try {
        const rows = await promisePool.query(`SELECT * FROM Likes WHERE like_id = ?`, [id]);
        console.log('rows', rows);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    } 
}

const addLike = async (like) => {
    const {media_id, user_id} = like;
    const sql = 'INSERT INTO Likes (media_id, user_id) VALUES (?, ?)';
    const params = [media_id, user_id];
    try {
        const rows = await promisePool.query(sql, params);
        console.log('rows', rows);
        return {like_id: rows[0].insertId};
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const removeLike = async (id) => {
    try {
        const rows = await promisePool.query(`DELETE FROM Likes WHERE like_id = ${id}`);
        console.log('rows', rows);
        return 'Deleted';
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

export {getLikesByMedia, getLikesByUser, getSpecificLike, addLike, removeLike};