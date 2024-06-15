require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tasksRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend')));

// User routes
app.use('/api/users', userRoutes);

// Task routes
app.use('/api/tasks', tasksRoutes);

//Starting the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
