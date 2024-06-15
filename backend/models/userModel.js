const db = require('../utils/db');
const bcrypt = require('bcrypt');

const findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const createUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [user.email, hashedPassword], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, email: user.email });
        });
    });
};

module.exports = {
    findUserByEmail,
    createUser
};
