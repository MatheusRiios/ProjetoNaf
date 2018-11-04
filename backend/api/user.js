const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const { existeOrError, naoExistOrError, valoresIguais } = app.api.validacoes;

    const criptografarSenha = function(senha){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(senha, salt);
    }

    //Método save será utilizado para criar ou alterar um novo usuário 
    const save = async (req, res) => {
        const user = { ... req.body }
        if(req.params.id){
            user.id = req.params.id
        }

        try{
            existeOrError(user.nome, 'Nome não informado')
            existeOrError(user.email, 'Email não informado')
            existeOrError(user.cpf_cnpj, 'CPF ou CNPJ não informado')
            existeOrError(user.senha, 'Senha não informada')

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if(!user.id){
                naoExistOrError(userFromDB, 'Usuário já cadastrado')
            }
        }catch (msg) {
            return res.status(400).send(msg)
        }

        user.senha = criptografarSenha(req.body.senha);

        if(user.id){
            app.db('users')
                .update(user)
                .where( { id: user.id } )
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send())
        }
    }

    const get = (req, res) => {
            app.db('users')
                .select('id', 'nome', 'email', 'cpf_cnpj')
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
    }

    const getUserByID = (req, res) => {
        const user = req.params.id
        app.db('users')
            .select('id', 'nome', 'email', 'cpf_cnpj')
            .where({ id: user })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(400).send(err))
    }

    const getDeleteById = (req, res) => {
        const IDuser = req.params.id;        
        app.db('users')
            .where({id: IDuser})
            .del()
            .then(_ => res.status(204).json({
                msg: 'Usuario deletado com sucesso'
            }))
            .catch(err => res.status(404).send(err))

    }



    return { save, get, getUserByID, getDeleteById }
}