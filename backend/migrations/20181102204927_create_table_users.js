exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('nome').notNull()
      table.string('cpf_cnpj').notNull()
      table.string('email').notNull()
      table.string('senha').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
