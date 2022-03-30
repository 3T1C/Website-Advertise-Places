var session = require('./session')

exports.get = function (request, response, webconfig, model) {
    var logged = session.logged(request)
    model.getGeneralInfo(function (generalInfo) {
        model.getContact(function (contact) {
            response.render('home', {
                root: '',
                logged: logged,
                generalInfo: generalInfo,
                contact : contact
            })
        })
    })
}