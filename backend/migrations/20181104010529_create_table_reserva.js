
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reserva', table => {
        table.increments('id').primary()
        table.string('status').notNull()
        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reserva')
};
