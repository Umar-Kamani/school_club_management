const express = require('express');
const router = express.Router();
const MembershipController = require('../controllers/membershipController');

/**
 * @swagger
 * /api/memberships:
 *   get:
 *     summary: Get all memberships
 *     tags:
 *       - Memberships
 *     responses:
 *       200:
 *         description: Successfully retrieved all memberships
 *       500:
 *         description: Internal server error
 */
router.get('/', MembershipController.getMemberships);

/**
 * @swagger
 * /api/memberships:
 *   post:
 *     summary: Join a student to a club
 *     tags:
 *       - Memberships
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Membership information
 *             example:
 *               student_id: 1
 *               club_id: 2
 *     responses:
 *       201:
 *         description: Student joined club successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', MembershipController.joinClub);

/**
 * @swagger
 * /api/memberships/{id}:
 *   delete:
 *     summary: Remove a student from a club
 *     tags:
 *       - Memberships
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Membership ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Membership removed
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', MembershipController.leaveClub);

module.exports = router;

