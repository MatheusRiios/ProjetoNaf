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

}