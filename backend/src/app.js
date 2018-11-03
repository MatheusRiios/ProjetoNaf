const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/autenticationController')(app);
require('./controllers/agendaController')(app);

app.listen(3009, _ => console.log('Server iniciado'));
