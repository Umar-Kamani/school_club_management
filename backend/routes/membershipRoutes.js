const express = require('express');
const router = express.Router();
const MembershipController = require('../controllers/membershipController');

router.get('/', MembershipController.getMemberships);
router.post('/', MembershipController.joinClub);
router.delete('/:id', MembershipController.leaveClub);

module.exports = router;
