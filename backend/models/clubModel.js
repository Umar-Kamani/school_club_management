const db = require('../config/db');

const ClubModel = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM clubs');
        return rows;
    },
    async create(data) {
        const [result] = await db.query('INSERT INTO clubs (club_name, description, category) VALUES (?, ?, ?)', [data.club_name, data.description, data.category]);
        return result.insertId;
    },
    async update(id, data) {
        await db.query('UPDATE clubs SET club_name = ?, description = ?, category = ? WHERE club_id = ?', [data.club_name, data.description, data.category, id]);
    },
    async delete(id) {
        await db.query('DELETE FROM clubs WHERE club_id = ?', [id]);
    }
};

module.exports = ClubModel;
