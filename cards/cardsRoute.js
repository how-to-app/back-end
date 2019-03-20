const cardsRouter = require('express').Router();

const { authenticate } = require('../auth/authenticate');

const db = require('../cards/cardsModel.js');

//GET:

cardsRouter.get('/cards', (req, res) => {
	db
		.get()
		.then((cards) => {
			res.status(200).json({ success: true, cards });
		}) //headers
		.catch((err) => {
			res.status(500).json({ success: false, message: 'The card information could not be retrieved.' });
		});
});

// //GET by Id (can be used if needed) 

// cardsRouter.get('/:id/cards', (req, res) => {
// 	const { id } = req.params;

// 	db
// 		.getById(id)
// 		.then((cards) => {
// 			if (cards) {
// 				res.status(201).json({ success: true, cards });
// 			} else {
// 				res.status(404).json({ success: false, message: 'The card with the specified ID does not exist.' });
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).json({ success: false, error: 'This card could not be retrieved.' });
// 		});
// });

//POST:CREATE 

cardsRouter.post('/cards', (req, res) => {
    const { title, step1, step2, step3, step4, step5} = req.body;
    
	if ( !title || !step1 || step2 || step3 || step4 || step5 ) {
		res.status(400).json({ error: 'Please provide the title and corresponding step(s).' });
	} else {
		db
			.insert({ title, step1, step2, step3, step4, step5 })
			.then((card) => {
				res.status(201).json({  message: 'Your title and steps have been saved.', card });
			})
			.catch((err) => {
				res.status(500).json({ error: 'There was an error while saving the card to the database' });
			});
	}
});

//DELETE:

cardsRouter.delete('/:id/cards', (req, res) => {
	const { id } = req.params;
	db
		.remove(id)
		.then((card) => {
			if (card) {
				res.status(204).end();
			} else {
				res.status(404).json({ success: false, message: 'The card with the specified ID does not exist.' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'The card could not be removed.' });
		});
});


//PUT:

cardsRouter.put('/:id/cards', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	db
		.update(id, changes)
		.then((cardUpdate) => {
			if (!cardUpdate) {
				res.status(404).json({ success: false, message: 'The card with the specified ID does not exist.' });
			} else if ( !changes.title && !changes.step1 ) {
				return res.status(400).json({ success: false, message: 'Please provide the title and corresponding step(s).' });
			} else {
				return res.status(200).json({ success: true, changes });
			}
		})
		.catch((err) => {
			res.status(500).json({ success: false, error: 'The post information could not be modified.' });
		})
});





module.exports = cardsRouter;