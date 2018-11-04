
exports.up = function(knex, Promise) {
    return knex.schema.createTable('services', agenda => {
        services.increments('id').primary()
        services.string('name').notNull()
        services.string('listadocs').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('services')
};
