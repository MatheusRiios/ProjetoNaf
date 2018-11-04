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

    const getServicesByID = (req, res) => {
        const services = req.params.id
        app.db('services')
            .select('id', 'name', 'listadocs')
            .where({ id: services })
            .first()
            .then(services => res.json(services))
            .catch(err => res.status(400).send(err))
    }

    const getDeleteById = (req, res) => {
        const IDservices = req.params.id;        
        app.db('services')
            .where({id: IDservices})
            .del()
            .then(_ => res.status(204).json({
                msg: 'Serviço deletado com sucesso'
            }))
            .catch(err => res.status(404).send(err))

    }


    return { save, get, getServicesByID ,getDeleteById }
}