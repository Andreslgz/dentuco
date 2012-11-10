/** Controllers
 *
 * @autor : Rafael Erthal
 * @since : 2012-10
 *
 * @description : Montagem do namespace da controller
 */

module.exports = function (model) {
    "use strict";
    
    return {
        User         : require('./User.js')(model),
        Patient      : require('./Patient.js')(model),
        Consultation : require('./Consultation.js')(model)
    };
}