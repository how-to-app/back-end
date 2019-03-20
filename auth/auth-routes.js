const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const { authenticate } = require('../auth/authenticate');
const Users = require('../auth/userAuthModel.js')

const secret = process.env.JWT_SECRET ||'where does the rainbow end?' 





//| POST   | /api/register:

authRouter.post('/register', (req, res) => {
    let user = req.body;
  
    const hash = bcrypt.hashSync(user.password, 16) // generates hash for user password
    user.password = hash // overrides user with hash
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


//| POST   | /api/login :

function generateToken(user) { 
    const payload = {
        subject: user.id,  
        username: user.username,
        
    }

    const options = {
        expiresIn: '5d'
    }
   
    return jwt.sign(payload, secret, options)
}


authRouter.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
       
        if (user && bcrypt.compareSync(password, user.password)) {
         const token = generateToken(user) //generates token
          //returns token
          res
            .status(200)
            .json({ message: `Welcome ${user.username}!`, token, username:user.username }); //(token implemented sends token to the client)
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  function restricted(req, res, next) {
    const token = req.headers.authorization
        if(token) {
           jwt.verify(token, secret, (err, decodedToken) => {
               if(err) {
               //record the event    
               res.status(401).json({ message: ' Nice Try!'}) 
               } else { 
                req.decodedJwt = decodedToken
                  next();       
               }
           })
        } else {
            res.status(401).json({ message: 'Access Denied'})
          }
    }





  module.exports = authRouter;



