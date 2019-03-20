
exports.up = function(knex) {
    return knex.schema.createTable('cards', cards => {
      cards.increments();
  
      cards
        .string('title', 128)
        .notNullable()
        .unique();
      cards.string('step1', 255);
      cards.string('step2', 255);
      cards.string('step3', 255);
      cards.string('step4', 255);
      cards.string('step5', 255);
      cards.string('likes', 128)
    
      
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cards');
  };
