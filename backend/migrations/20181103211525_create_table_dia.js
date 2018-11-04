
exports.up = function(knex, Promise) {
    return knex.schema.createTable('dia', table => {
        table.increments('id').primary()
        table.date('data').notNull()       
  })
};

exports.down = function(knex, Promise) {
  
};
