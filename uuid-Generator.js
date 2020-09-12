var uuid = require('uuid')

module.exports = function(){
    var uniqueID = uuid.v4();
    return uniqueID;
}