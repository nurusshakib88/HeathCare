const express = require('express');
const router = express.Router();
const bloodRequestController = require('../controllers/bloodRequestController');

router.post('/create', bloodRequestController.createBloodRequest);
router.get('/', bloodRequestController.getBloodRequests);
router.post('/comment', bloodRequestController.addComment);

// New route to get notifications for a user
router.get('/notifications/:userId', bloodRequestController.getNotifications);

// Add more routes as needed (update, delete)

module.exports = router;
