const db = require('../utils/db');

const getAllTasks = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tasks', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const createTask = (task) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO tasks (name) VALUES (?)', [task.name], (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId, ...task });
        });
    });
};

const updateTask = (id, task) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE tasks SET name = ? WHERE id = ?', [task.name, id], (err, result) => {
            if (err) reject(err);
            else resolve({ id, ...task });
        });
    });
};

const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};
