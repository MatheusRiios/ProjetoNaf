const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/apiNaf');

mongoose.Promise = global.Promise;


module.exports = mongoose;