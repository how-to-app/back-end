const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const { authenticate } = require('../auth/authenticate');
const Users = require('../auth/userAuthModel.js')

const secret = process.env.JWT_SECRET ||'where does the rainbow end?' 





//| POST   | /api/register:

authRouter.post('/api/register', (req, res) => {
    let user = req.body;
  
    const hash = bcrypt.hashSync(user.password, 16) // generates hash for user password
    user.password = hash // override user with hash
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });



