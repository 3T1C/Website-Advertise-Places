var session = require('./session')

exports.get = function (request, response, webconfig, model) {
    var logged = session.logged(request)
    model.getGeneralInfo(function (generalInfo) {
        model.getProducts(function (products) {
            model.getContact(function (contact) {
                response.render('home', {
                    root: '',
                    logged: logged,
                    generalInfo: generalInfo,
                    contact: contact,
                    products : products
                })
            })
        })
    })
}