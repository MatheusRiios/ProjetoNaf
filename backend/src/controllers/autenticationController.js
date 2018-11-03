const router = require('express').Router();

const User = require('../models/users');

router.post('/registroUser', async (req, res) => {
    const {cpf_cnpj} = req.body

    try{
        const user = await User.create(req.body);

        return res.send({
            user
        });
    }catch (err){
        return res.status(400).send({
            error: err
        })
    }
})

module.exports = app => app.use('/autentication', router);