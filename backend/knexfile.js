// Update with your config settings.
var dados = require ('./banco/data.js');

module.exports = {

    client: 'postgresql',
    connection: {
      database: 'naf',
      user:     'postgres',
      password: dados.mensagem
},
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
