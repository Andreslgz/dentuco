/** Models
 *
 * @autor : Rafael Erthal
 * @since : 2012-10
 *
 * @description : Montagem do namespace da model
 */

module.exports = function (config) {
    "use strict";
    
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://' + config.mongodb.username + ':' + config.mongodb.password + '@' + config.mongodb.url + ':' + config.mongodb.port + '/' + config.mongodb.db);
    
    return {
        User      : mongoose.model('Artist', require('./User.js')(mongoose))
    };
}