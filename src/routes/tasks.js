const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// GET
router.get('/', tasksController.getTasks);

// POST
router.post('/', tasksController.createTask);

// PUT
router.put('/:id', tasksController.updateTask);

// DELETE
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
