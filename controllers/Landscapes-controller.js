var Landscapes = require('../model/Landscapes');

exports.landscapes_detail = function(request, response, next){
    async.parallel({
        landscapes: function(callback) {

            Landscapes.findById(req.params.id)              
              .exec(callback);
        },
        landscape_instance: function(callback) {

          LandscapeInstance.find({ 'landscapes': req.params.id })
          .exec(callback);
        },
    },function(err, results) {
        if (err) { return next(err); }
        if (results.landscapes==null) { // No results.
            var err = new Error('The Landscapes not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('landscape_detail', { detail: results.landscapes.detail, landscapes:  results.landscapes, landscape_instances: results.book_instance } );
    });
}