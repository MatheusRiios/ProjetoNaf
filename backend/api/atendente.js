module.exports = app =>{

    const save = async (req, res) => {
        const { existeOrError, naoExistOrError, valoresIguais } = app.api.validacoes;

        const atendente = { ... req.body }
        if(req.params.id){
            atendente.id = req.params.id
        }

        try{
            existeOrError(atendente.name, 'Nome não informado')
            const atendenteFromDB = await app.db('atendente')
                .where({ name: atendente.name }).first()
            if(!atendente.id){
                naoExistOrError(atendenteFromDB, 'Atendente já cadastrado')
            }
        }catch (msg) {
            console.log(msg)
            return res.status(400).send("msg")
        }

        if(atendente.id){
            app.db('atendente')
                .update(atendente)
                .where( { id: atendente.id } )
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('atendente')
                .insert(atendente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send())
        }
    }

    const get = (req, res) => {
        app.db('atendente')
            .select('id', 'name')
            .then(atendente => res.json(atendente))
            .catch(err => res.status(500).send(err))
    }

    const getAtendenteByID = (req, res) => {
        const atendente = req.params.id
        app.db('atendente')
            .select('id', 'name')
            .where({ id: atendente })
            .first()
            .then(atendente => res.json(atendente))
            .catch(err => res.status(400).send(err))
    }

    const getDeleteById = (req, res) => {
        const IDatendente = req.params.id;        
        app.db('atendente')
            .where({id: IDatendente})
            .del()
            .then(_ => res.status(204).json({
                msg: 'Atendente deletado com sucesso'
            }))
            .catch(err => res.status(404).send(err))

    }


    return { save, get, getAtendenteByID ,getDeleteById }
}