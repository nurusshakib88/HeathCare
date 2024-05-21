// const express = require('express');
// const router = express.Router();
// const bloodRequestController = require('../controllers/bloodRequestController');
// router.post('/create', bloodRequestController.createBloodRequest);
// router.get('/', bloodRequestController.getBloodRequests);
// router.post('/comment', bloodRequestController.addComment);

// // New route to get notifications for a user
// router.get('/notifications/:userId', bloodRequestController.getNotifications);

// // New route to get all blood requests
// router.get('/all', bloodRequestController.getAllBloodRequests);
// router.get('/', bloodRequestController.getAllBloodRequests);

// // Add more routes as needed (update, delete)

// module.exports = router;

const express = require('express');
const router = express.Router();
const bloodRequestController = require('../controllers/bloodRequestController');

router.post('/create', bloodRequestController.createBloodRequest);
router.post('/comment', bloodRequestController.addComment);
router.put('/:id', bloodRequestController.updateBloodRequest);
router.delete('/:id', bloodRequestController.deleteBloodRequest);
router.put('/comment/:id', bloodRequestController.updateComment);
router.delete('/comment/:id', bloodRequestController.deleteComment);
router.get('/all', bloodRequestController.getAllBloodRequests);

module.exports = router;
