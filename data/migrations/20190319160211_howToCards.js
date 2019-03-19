
exports.up = function(knex) {
    return knex.schema.createTable('cards', cards => {
      cards.increments();
  
      cards
        .string('title', 128)
        .notNullable()
        .unique();
      cards.string('step1', 128);
      cards.string('step2', 128);
      cards.string('step3', 128);
      cards.string('step4', 128);
      cards.string('step5', 128);
    
      
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cards');
  };
