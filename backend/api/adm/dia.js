module.exports = app => {
    const { existeOrError, naoExistOrError, valoresIguais } = app.api.validacoes;

    const save = (req , res) => {
        const dia = { ... req.body }
        if(req.params.id){
            dia.id = req.params.id
        }

        try{
            existeOrError(dia.data, 'Dia não foi informado');
        }catch(err) {
            return res.status(400).send(err)
        }

        if(dia.id){
            app.db('dia')
                .update(dia)
                .where( { id: dia.id } )
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('dia')
                .insert(dia)                
                .then(_ => res.status(204).send())
                .catch(err => console.log(err))
                console.log(dia)
        }
    }

    const get = (req, res) => {
        app.db('dia')
            .select('id','data')
            .then(dias => res.json(dias))
            .catch(err => console.log(err))
    }

    const deleteByID = (req, res) => {
        const idDia = req.params.id
        app.db('dia')
            .where({ 'id' :  idDia})
            .del()
            .then(() => res.status(200).send('Deletado com sucesso'))
            .catch(err => console.log(err))
    }



    return { save, get, deleteByID}
}