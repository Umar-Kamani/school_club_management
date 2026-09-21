const express = require('express');
const router = express.Router();
const ClubController = require('../controllers/clubController');

router.get('/', ClubController.getClubs);
router.post('/', ClubController.createClub);
router.put('/:id', ClubController.updateClub);
router.delete('/:id', ClubController.deleteClub);

module.exports = router;
