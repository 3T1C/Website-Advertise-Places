var fetchModel = require('../model/Landscapes')
module.exports = {
    fetchData:function(request, response){
        fetchModel.fetchData(function(data){
            response.render('tiles/detail', {landscapesData:data})
        })
    }
}