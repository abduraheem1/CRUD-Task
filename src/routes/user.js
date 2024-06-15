const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Registration endpoint
router.post('/register', userController.register);

// Login endpoint
router.post('/login', userController.login);

module.exports = router;
