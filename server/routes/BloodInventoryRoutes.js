const express = require('express');
const router = express.Router();
const bloodInventoryController = require('../controllers/bloodInventoryController');

router.post('/inventory', bloodInventoryController.addBloodInventory);
router.get('/inventory', bloodInventoryController.getBloodInventory); // Public route
router.put('/inventory/:id', bloodInventoryController.updateBloodInventory);
router.delete('/inventory/:id', bloodInventoryController.deleteBloodInventory);

// Add more routes as needed (update, delete)
module.exports = router;
