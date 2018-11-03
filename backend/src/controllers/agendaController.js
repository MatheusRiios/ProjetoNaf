const router = require('express').Router();
var moment = require('moment');
const Agenda = require('../models/agenda');

router.post('/agendarAtendimento', async (req, res) => {
    try{        
        const agenda = await Agenda.create(req.body);
        return res.send({
            agenda
        });
    }catch (err){
        return res.status(400).send({
            error: err
        })
    }
})



module.exports = app => app.use('/autentication', router);