/** Consultation
 * @author : Rafael Erthal
 * @since : 2012-10
 *
 * @description : Representação da entidade usuário do sistema
 */

module.exports = function (mongoose) {
    var Schema   = mongoose.Schema,
        objectId = Schema.ObjectId,
        schema;

    /*  Definindo schema  */
    schema = new Schema({
        description      : {type : String, trim : true, required : true},
        userId           : {type : objectId},
        pacientId        : {type : objectId},
        dateStart        : {type : Date},
        dateFinish       : {type : Date}
    });

    /*  Exportando o pacote  */
    return schema;
};