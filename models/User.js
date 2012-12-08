/** User
 * @author : Rafael Erthal
 * @since : 2012-10
 *
 * @description : Representação da entidade usuário do sistema
 */

module.exports = function (mongoose) {
    var Schema   = mongoose.Schema,
        objectId = Schema.ObjectId,
        crypto = require('crypto'),
        schema;

    /*  Definindo schema  */
    schema = new Schema({
        name             : {type : String, trim : true, required : true},
        email            : {type : String, trim : true, required : true, unique : true},
        password         : {type : String, trim : true, required : true},
        phone            : {type : String, trim : true}
    });
    
    schema.methods.login = function (password) {
        return this.password === crypto.createHash('sha256').update(password).digest('hex');
    };
    
    schema.methods.validate = function (token) {
        return this.token() === token;
    }
    
    schema.methods.token = function () {
        return crypto.createHash('sha256').update(this.name + '0123456789').digest('hex');
    }

    /*  Exportando o pacote  */
    return schema;
};