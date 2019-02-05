require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const schoolsRouter = require('./routers/schoolsRouter.js');
const authRouter = require('./routers/authRouter.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//routes
server.get('/', (req, res) => {
    res.send('Api Working');
})

server.use('/schools', schoolsRouter);
server.use('/api', authRouter);

module.exports = server;