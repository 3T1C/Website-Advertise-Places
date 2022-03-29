var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var LandscapesSchema = new Schema({
    name: {type: String},
    detail: {
        type: String
    }
});
landscapesTable = mongoose.model('landscapes', LandscapesSchema);

// export model
// module.exports = mongoose.model('landscapes', LandscapesSchema)

module.exports = {
    fetchData:function(callback){
        var landscapesData = landscapesTable.find({});
        landscapesData.exec(function(err, data){
            if(err) throw err
            return callback(data)
        })
    }
}