module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)            
    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getUserByID)


    /* Dia */
    app.route('/dia')
        .post(app.api.adm.dia.save)
        .get(app.api.adm.dia.get)
    app.route('/dia/:id')        
        .delete(app.api.adm.dia.deleteByID)

    app.route('/services')
        .post(app.api.services.save)
        .get(app.api.services.get)
    app.route('/services/:id')
        .put(app.api.services.save)
        .delete(app.api.services.getDeleteById)
        .get(app.api.services.getServicesByID)

    app.route('/atendente')
        .post(app.api.atendente.save)
        .get(app.api.atendente.get)
    app.route('/atendente/:id')
        .put(app.api.atendente.save)
        .delete(app.api.atendente.getDeleteById)
        .get(app.api.atendente.getAtendenteByID)

}