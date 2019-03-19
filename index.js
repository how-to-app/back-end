require('dotenv').config(); // loads .env variables

const server = require('../back-end/api/server.js');

const port = process.env.PORT || 3700;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});