const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         student_id:
 *           type: integer
 *           description: Unique ID of the student
 *           example: 1
 *         name:
 *           type: string
 *           description: Full name of the student
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Student email address
 *           example: john.doe@example.com
 *         programme:
 *           type: string
 *           description: Student's academic programme
 *           example: Computer Science
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: Successfully retrieved all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
router.get('/', StudentController.getStudents);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - programme
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               programme:
 *                 type: string
 *                 example: Computer Science
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student created
 *                 id:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Internal server error
 */
router.post('/', StudentController.createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - programme
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               programme:
 *                 type: string
 *                 example: Computer Science
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student updated
 *       500:
 *         description: Internal server error
 */
router.put('/:id', StudentController.updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags:
 *       - Students
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;

