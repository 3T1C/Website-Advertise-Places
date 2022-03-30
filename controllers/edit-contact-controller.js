var session = require('./session')

function render(response, webconfig, errorMessage, model) {
    model.getGeneralInfo(function (generalInfo) {
        model.getContact(function(contact) {
            response.render('edit-contact', {
                root            : webconfig.root,
                logged          : true,
                generalInfo     : generalInfo,
                contact         :contact ,
                errorMessage    : errorMessage
            })
        })        
    })
}

exports.get = function(request, response, webconfig, model) {
    if (!session.logged(request)) {
        response.redirect(webconfig.root)
        return
    }        
    render(response, webconfig, false, model)
}

exports.post = function(request, response, webconfig, model) {
    if (!session.logged(request)) {
        response.redirect(webconfig.root)
        return
    }

    model.editContact(request.body.contact, function (errorMessage) {
        if (errorMessage) {
            render(response, webconfig, errorMessage, model)
            return
        }
        response.redirect(webconfig.root + '#contact')        
    })
}