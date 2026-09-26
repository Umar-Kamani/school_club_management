const express = require('express');
const router = express.Router();
const ClubController = require('../controllers/clubController');
/**
 * @swagger
 * /api/clubs:
 *   get:
 *     summary: Get all clubs
 *     tags:
 *       - Clubs
 *     responses:
 *       200:
 *         description: Successfully retrieved clubs
 */
router.get('/', ClubController.getClubs);
/**
 * @swagger
 * /api/clubs:
 *   post:
 *     summary: Create a club
 *     tags:
 *       - Clubs
 *     responses:
 *       201:
 *         description: Club Created Successfully.
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
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Club updated successfully
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
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Club deleted successfully
 */
router.delete('/:id', ClubController.deleteClub);

module.exports = router;
