const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
	//example of other method:
	// describe('GET /', () => {
	//     it('should return 200 OK', () => {
	//       return request(server)
	//         .get('/')
	//         .then(res => {
	//           expect(res.status).toBe(200);
	//         });
	//     });

	// Test: GET (http status code)
	it('should return 200 OK using the squad', async () => {
		//uses the squad
		const res = await request(server).get('/');

		expect(res.status).toBe(200);
	});

	// Test: GET (http status code) for /api/cards:
	it('should return 200 OK', async () => {
		const res = await request(server).get('/api/cards');

		expect(res.status).toBe(200);
	});

	//TEST: trying to test /register:
	describe('POST - Register', () => {
		it.skip('should respond with status code 201 created', async () => {
            const data = { username: 'user', password: 'pass', email: 'user@email.com' };
            
			const statusCode = 201;
			const res = await request(server).post('/api/register').send({ data });
			expect(res.status).toBe(statusCode);
		});
	});

	//TEST: Return of JSON
	it('should return JSON', async () => {
		const res = await request(server).get('/');

		expect(res.type).toBe('application/json');
	});

	// TEST: Object
	const id = {
		title: 'How to dance like a total fool',
		step1: 'Acquire music.',
		step2: 'Turn it up.',
		step3: 'Begin to move around like a fool.',
		step4: 'Continue until you feel like youve danced enough.',
		step5: 'Stop dancing. Your task is complete. You are a dancing fool',
		likes: 250,
		image: 'http://www.netanimations.net/Moving-animated-picture-of-dancin-dude.gif',
		username: 'buffaloBill'
	};

	describe('present in data object?', () => {
		it('should return turn it up', () => {
			expect(id.step2).toBe('Turn it up.');
		});

		it('username present', () => {
			expect(id.username).toBe('buffaloBill');
        });
        
        it('should return title of object', () => {
			expect(id.title).toBe('How to dance like a total fool');
		});
    });
    

    //TEST: Get by :id
    describe('GET - by :id', () => {
        it("should respond with status code 200 OK", async () => {
          const data = { 
          id: 2,
          title: 'How to dance like a total fool',
          step1: 'Acquire music.',
          step2: 'Turn it up.',
          step3: 'Begin to move around like a fool.',
          step4: 'Continue until you feel like youve danced enough.',
          step5: 'Stop dancing. Your task is now complete. You are a dancing fool.',
          likes: 250,
          image: 'http://www.netanimations.net/Moving-animated-picture-of-dancin-dude.gif',
          username: 'buffaloBill'
         }

          const statusCode = 200;

          const res = await request(server)
            .get('/api/cards/3')
            .send({data});
          expect(res.status).toBe(statusCode);
       })
    })
}); //main

// })//main
