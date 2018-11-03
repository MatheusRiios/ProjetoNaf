const mongoose = require('../database/configDatabase');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    cpf_cnpj:{
        type: String,
        required: true,   
        unique: true         
    },
    senha:{
        type: String,
        required: true,
        select: false
    },
    createAd:{
        type: Date,
        default: Date.now
    },
    agenda: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agenda',
    }]
})  

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;