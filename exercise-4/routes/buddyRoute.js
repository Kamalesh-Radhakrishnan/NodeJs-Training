const express = require('express');
const router = express.Router();

// routing based on get method on buddy objects
const buddyGetController = require('../controllers/buddyController/buddyGetController');
router.get("/getAllBuddies", buddyGetController.getAllBuddies);
router.get("/getBuddy",buddyGetController.getBuddy);

// routing based on post method on buddy objects
const buddyPostController = require('../controllers/buddyController/buddyPostController');
router.post("/addBuddy",buddyPostController.addBuddy);

// routing based on put method on buddy objects
const buddyPutController = require('../controllers/buddyController/buddyPutController');
router.put("/updateBuddy",buddyPutController.updateBuddy);

// routing based on delete method on buddy objects
const buddyDeleteController = require('../controllers/buddyController/buddyDeleteController');
router.delete("/deleteBuddy",buddyDeleteController.deleteBuddy);

// exporting the router object
module.exports = router;