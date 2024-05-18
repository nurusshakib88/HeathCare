const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

router.post('/add', donorController.addDonor);
router.get('/', donorController.getDonors);

// Add more routes as needed (update, delete)

module.exports = router;
