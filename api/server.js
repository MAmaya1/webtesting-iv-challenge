// Imports

const express = require('express');
const helmet = require('helmet');

const server = express();

// Import Routers

const usersRouter = require('../users/users-router');

// Middleware

server.use(express.json());
server.use(helmet());

// Configure Routes

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Good!'});
})

server.use('/api/users', usersRouter);

module.exports = server;