var session = require('./session')

function render(response, webconfig, errorMessage, model) {
    model.getGeneralInfo(function (generalInfo) {
        response.render('add-about', {
            root            : webconfig.root,
            logged          : true,
            generalInfo     : generalInfo,
            errorMessage    : errorMessage
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

    var productName = request.body.productName
    var imageTmpPath = request.file ? request.file.path : ''

    model.addAbout(0, productName, imageTmpPath, function (errorMessage) {
        if (errorMessage) {
            render(response, webconfig, errorMessage, model)
            return
        }
        response.redirect(webconfig.root + '#abouts')        
    })
}