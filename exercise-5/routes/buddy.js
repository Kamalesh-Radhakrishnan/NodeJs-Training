const express = require('express');
const router = express.Router();

const buddyGetController = require('../controllers/buddyController/buddyGetController');
router.get("/getAllBuddies", buddyGetController.getAllBuddies);
router.get("/getBuddy",buddyGetController.getBuddy);

const buddyPostController = require('../controllers/buddyController/buddyPostController');
router.post("/addBuddy",buddyPostController.addBuddy);

const buddyPutController = require('../controllers/buddyController/buddyPutController');
router.put("/updateBuddy",buddyPutController.updateBuddy);

const buddyDeleteController = require('../controllers/buddyController/buddyDeleteController');
router.delete("/deleteBuddy",buddyDeleteController.deleteBuddy);

module.exports = router;