
const request = require('supertest');
const server = require('./server.js');


describe('server.js', () => {

// describe('GET /', () => {
//     it('should return 200 OK', () => {
//       return request(server)
//         .get('/')
//         .then(res => {
//           expect(res.status).toBe(200);
//         });
//     });

    // Test: GET (http status code)
    it('should return 200 OK using the squad', async () => { //uses the squad
      const res = await request(server).get('/');

    expect(res.status).toBe(200);

    });

   
// Test: GET (http status code) for /api/cards
      it('should return 200 OK', async () => {
          const res = await request(server).get('/api/cards')

      expect(res.status).toBe(200); 
      })



      it('should return 201 CREATED', async () => {
        const res = await request(server).post('/register')

    expect(res.status).toBe(201); 
    })
}) //main

// })//main
