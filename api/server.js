require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const schoolsRouter = require('./routers/schoolsRouter.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//routes
server.use('/schools', schoolsRouter);

module.exports = server;