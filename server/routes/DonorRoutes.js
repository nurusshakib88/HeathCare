const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

router.post('/add', donorController.addDonor);
router.get('/', donorController.getDonors);
router.put('/:id', donorController.updateDonor);
router.delete('/:id', donorController.deleteDonor);

module.exports = router;
