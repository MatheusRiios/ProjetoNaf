const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

app.db = db;

consign()
    .then('./config/middlewares.js')
    .then('./api/validacoes.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


app.listen(3009, () => console.log('Servidor iniciado'));