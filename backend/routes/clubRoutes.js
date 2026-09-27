const express = require('express');
const router = express.Router();
const ClubController = require('../controllers/clubController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Club:
 *       type: object
 *       properties:
 *         club_id:
 *           type: integer
 *           description: Unique ID of the club
 *           example: 1
 *         club_name:
 *           type: string
 *           description: Name of the club
 *           example: Chess Club
 *         description:
 *           type: string
 *           description: Description of the club
 *           example: A club for chess enthusiasts
 *         category:
 *           type: string
 *           description: Category of the club
 *           example: Academic
 */

/**
 * @swagger
 * /api/clubs:
 *   get:
 *     summary: Get all clubs
 *     tags:
 *       - Clubs
 *     responses:
 *       200:
 *         description: Successfully retrieved all clubs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Club'
 *       500:
 *         description: Internal server error
 */
router.get('/', ClubController.getClubs);

/**
 * @swagger
 * /api/clubs:
 *   post:
 *     summary: Create a new club
 *     tags:
 *       - Clubs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - club_name
 *               - description
 *               - category
 *             properties:
 *               club_name:
 *                 type: string
 *                 example: Chess Club
 *               description:
 *                 type: string
 *                 example: A club for chess enthusiasts
 *               category:
 *                 type: string
 *                 example: Academic
 *     responses:
 *       201:
 *         description: Club created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Club created
 *                 id:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Internal server error
 */
router.post('/', ClubController.createClub);

/**
 * @swagger
 * /api/clubs/{id}:
 *   put:
 *     summary: Update a club
 *     tags:
 *       - Clubs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Club ID
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
 *               - club_name
 *               - description
 *               - category
 *             properties:
 *               club_name:
 *                 type: string
 *                 example: Chess Club
 *               description:
 *                 type: string
 *                 example: A club for chess enthusiasts
 *               category:
 *                 type: string
 *                 example: Academic
 *     responses:
 *       200:
 *         description: Club updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Club updated
 *       500:
 *         description: Internal server error
 */
router.put('/:id', ClubController.updateClub);

/**
 * @swagger
 * /api/clubs/{id}:
 *   delete:
 *     summary: Delete a club
 *     tags:
 *       - Clubs
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Club ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Club deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Club deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', ClubController.deleteClub);

module.exports = router;
