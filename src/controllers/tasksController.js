//controller for backend logic
const taskModel = require('../models/taskModel');

const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getAllTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTask = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Task name is required' });

    try {
        const task = await taskModel.createTask({ name });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Task name is required' });

    try {
        const task = await taskModel.updateTask(id, { name });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await taskModel.deleteTask(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
