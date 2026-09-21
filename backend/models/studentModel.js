const db = require('../config/db');

const StudentModel = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM students');
        return rows;
    },
    async create(data) {
        const [result] = await db.query('INSERT INTO students (name, email, programme) VALUES (?, ?, ?)', [data.name, data.email, data.programme]);
        return result.insertId;
    },
    async update(id, data) {
        await db.query('UPDATE students SET name = ?, email = ?, programme = ? WHERE student_id = ?', [data.name, data.email, data.programme, id]);
    },
    async delete(id) {
        await db.query('DELETE FROM students WHERE student_id = ?', [id]);
    }
};

module.exports = StudentModel;
