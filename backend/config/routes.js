module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
        
    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getUserByID)
        
    app.route('/services')
        .post(app.api.services.save)
        .put(app.api.user.save)
        .get(app.api.services.get)
}