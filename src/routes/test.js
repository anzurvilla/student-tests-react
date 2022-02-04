'use strict';

// Import Router Express
const express = require('express');
const router = express.Router();

// Import the Controller
const TestController = require('../controllers/test');

// Routes
//
// GET route to request all the Tests
router.get('/tests', TestController.get);
// PUT route to request the update of one Test
router.put('/test/:id', TestController.put);

module.exports = router;