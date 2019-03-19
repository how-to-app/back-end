const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('cards');
}

function getById(id) {
  return db('cards')
    .where({ id })
    .first();
}

function insert(card) {
  return db('cards')
    .insert(card)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('cards')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('cards')
    .where('id', id)
    .del();
}
