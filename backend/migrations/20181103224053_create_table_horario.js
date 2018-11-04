
exports.up = function(knex, Promise) {
    return knex.schema.createTable('horario', horario => {
        horario.increments('id').primary()
        horario.time('horario').notNull()
        horario.boolean('disponivel').notNull()
        horario.integer('diaId').references('id')
            .inTable('dia').notNull()
  })
};

exports.down = function(knex, Promise) {
  
};
