const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

router.get('/', StudentController.getStudents);
router.post('/', StudentController.createStudent);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;
