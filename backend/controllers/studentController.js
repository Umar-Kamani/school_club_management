const StudentModel = require('../models/studentModel');

const StudentController = {
    async getStudents(req, res) {
        try {
            const students = await StudentModel.getAll();
            res.json(students);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async createStudent(req, res) {
        try {
            const id = await StudentModel.create(req.body);
            res.status(201).json({ message: 'Student created', id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async updateStudent(req, res) {
        try {
            const { id } = req.params;
            await StudentModel.update(id, req.body);
            res.json({ message: 'Student updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async deleteStudent(req, res) {
        try {
            const { id } = req.params;
            await StudentModel.delete(id);
            res.json({ message: 'Student deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = StudentController;
