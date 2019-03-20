const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('../auth/auth-routes.js');
const cardsRouter = require('../cards/cardsRoute.js');



const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan());
server.use(express.json());
server.use('/api', authRouter);
server.use('/api', cardsRouter );


 
server.get('/', (req, res) => {
    res.status(200).json({ message: 'How-To Test Working' });
  });



module.exports = server;