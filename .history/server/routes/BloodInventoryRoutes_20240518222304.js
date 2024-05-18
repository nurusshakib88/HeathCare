const express = require('express');
const router = express.Router();
const bloodInventoryController = require('../controllers/bloodInventoryController');

router.post('/add', bloodInventoryController.addBloodInventory);
router.get('/', bloodInventoryController.getBloodInventory);

// Add more routes as needed (update, delete)

module.exports = router;
