CRUD TASK FOR EXPERTS CLOUD

A simple task manager application built using Node.js, Express.js, and MySQL with a front-end in HTML, CSS, and JavaScript.

Prerequisites

Node.js (v14 or higher)
npm 
MySQL

Node.js packages:
express
dotenv
jsonwebtoken
bycript
mysql2

Setup Instructions

1. Clone the Repository
git clone https://github.com/abduraheem1/CRUD-Task.git
cd CRUD-Task

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env file in the root directory and add the following content, replacing with your actual database credentials:

DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_DATABASE=crud
JWT_SECRET=jwt_secret

4. Set Up the Database

Make sure your MySQL server is running and execute the following SQL commands to create the database and table:

CREATE DATABASE IF NOT EXISTS crud;
USE crud;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

5. Start the Application

Start the server using the following command:

node backend/server.js

The server will be running on http://localhost:3000

Usage

Open your web browser and go to http://localhost:3000
You can add, view, edit, and delete tasks using the interface.
Access secured routes after logging in with a valid username and password.
Default User for Authentication
To access the secured routes, use the default user credentials first register with an email address and then sign in with that email address

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id 
Include the JWT token in the Authorization header for secured routes. (if using postman)