const express = require('express');
const router = express.Router();
const bloodRequestController = require('../controllers/bloodRequestController');

router.post('/create', bloodRequestController.createBloodRequest);
router.get('/', bloodRequestController.getBloodRequests);
router.post('/comment', bloodRequestController.addComment);

// Add more routes as needed (update, delete)

module.exports = router;
