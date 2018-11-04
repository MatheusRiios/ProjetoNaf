module.exports = app =>{

    const save = async (req, res) => {
        const { existeOrError, naoExistOrError, valoresIguais } = app.api.validacoes;
        const services = { ... req.body }
        if(req.params.id){
            services.id = req.params.id
        }

        try{
            existeOrError(services.name, 'Nome não informado')
            existeOrError(services.listadocs, 'Lista de documentos não informado')
            const servicesFromDB = await app.db('services')
                .where({ name: services.name }).first()
            if(!services.id){
                naoExistOrError(servicesFromDB, 'Serviço já cadastrado')
            }
        }catch (msg) {
            console.log(msg)
            return res.status(400).send("msg")
        }

        if(services.id){
            app.db('services')
                .update(services)
                .where( { id: services.id } )
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('services')
                .insert(services)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send())
        }
    }

    const get = (req, res) => {
        app.db('services')
            .select('id', 'name', 'listadocs')
            .then(services => res.json(services))
            .catch(err => res.status(500).send(err))
    }

    return { save, get}
}