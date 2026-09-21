const db = require('../config/db');

const MembershipModel = {
    async getAll() {
        const [rows] = await db.query(`
            SELECT m.membership_id, s.name as student_name, c.club_name, m.join_date 
            FROM memberships m
            JOIN students s ON m.student_id = s.student_id
            JOIN clubs c ON m.club_id = c.club_id
        `);
        return rows;
    },
    async create(data) {
        const [result] = await db.query(
            'INSERT INTO memberships (student_id, club_id, join_date) VALUES (?, ?, CURDATE())', 
            [data.student_id, data.club_id]
        );
        return result.insertId;
    },
    async delete(id) {
        await db.query('DELETE FROM memberships WHERE membership_id = ?', [id]);
    }
};

module.exports = MembershipModel;
