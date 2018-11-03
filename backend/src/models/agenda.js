const mongoose = require('mongoose');

const Agenda = new mongoose.Schema({
    data:{
        type: Date,    
        required: true
    },
    horario:{
        type: String, 
        required: true
    },
    status:{
        type: Boolean,
        default: false        
    }
});

module.exports = mongoose.model('Agenda', Agenda);
