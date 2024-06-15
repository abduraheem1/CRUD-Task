const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
