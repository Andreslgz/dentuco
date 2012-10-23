/** Patient
 * @author : Rafael Oliveira
 * @since : 2012-10
 *
 * @description : Representação da entidade paciente do sistema
 */

module.exports = function (mongoose) {
    var Schema   = mongoose.Schema,
        objectId = Schema.ObjectId,
        schema;

    /*  Definindo schema  */
    schema = new Schema({
        name             : {type : String, trim : true, required : true},
        email            : {type : String, trim : true, required : true, unique : true},
        phone            : {type : String, trim : true}
    });

    /*  Exportando o pacote  */
    return schema;
};