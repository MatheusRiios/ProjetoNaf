
exports.up = function(knex, Promise) {
    return knex.schema.createTable('services', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('listadocs').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('services')
};
