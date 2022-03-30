var session = require('./session')
var Landscapes = require('../model/Landscapes')
exports.get = function(request, response, webconfig){
    var logged = session.logged(request)
    var landscape = Landscapes.find({});
    response.render('tiles/detail', {
        root : webconfig.root,                
        logged: logged,
        landscape      
    })
}
