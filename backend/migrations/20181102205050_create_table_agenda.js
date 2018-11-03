
exports.up = function(knex, Promise) {
  return knex.schema.createTable('agenda', agenda => {
        agenda.increments('id').primary()
        agenda.date('data').notNull()
        agenda.string('horario').notNull()
        agenda.integer('usersId').references('id')
            .inTable('users').notNull()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('agenda')
};
