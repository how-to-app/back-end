const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('../auth/auth-routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan());
server.use(express.json());



//CRUD: 
server.get('/', (req, res) => {
    res.status(200).json({ message: 'How-To Test Working' });
  });



module.exports = server;