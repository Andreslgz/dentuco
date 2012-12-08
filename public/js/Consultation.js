var Consultation = function (params) {
    var that = this;
    
    this.userId      = params.userId;
    this.patientId   = params.patientId;
    this.description = params.description;
    this.dateStart   = params.dateStart;
    this.dateFinish  = params.dateFinish;
    this._id         = params._id;
    
    this.remove = function (cb) {
        $.ajax({
            url      : '/consultation/' + this._id,
            type     : 'DEL',
            dataType : 'JSON',
            success  : function (data) {
                if (!data.error) {
                    delete that;
                    cb(null);
                } else {
                    cb('Error ao excluir consulta');
                }
            }
        });
    };
    
    this.update = function (cb) {
        $.ajax({
            url      : '/consultation/' + this._id,
            type     : 'PUT',
            dataType : 'JSON',
            data     : {
                userId      : this.userId,
                patientId   : this.patientId,
                description : this.description,
                dateStart   : this.dateStart,
                dateFinish  : this.dateFinish
            },
            success  : function (data) {
                if (!data.error) {
                    cb(null, that);
                } else {
                    cb('Error ao editar consulta', null);
                }
            }
        });
    };
    
    this.create = function (cb) {
        $.ajax({
            url      : '/consultation',
            type     : 'POST',
            dataType : 'JSON',
            data     : {
                userId      : this.userId,
                patientId   : this.patientId,
                description : this.description,
                dateStart   : this.dateStart,
                dateFinish  : this.dateFinish
            },
            success  : function (data) {
                if (!data.error) {
                    that._id = data.patient._id;
                    cb(null, that);
                } else {
                    cb('Error ao cadastrar consulta', null);
                }
            }
        });
    };
}

Consultation.list = function (cb) {
    $.ajax({
        url      : '/consultations',
        type     : 'GET',
        dataType : 'JSON',
        success  : function (data) {
            if (!data.error) {
                var consultations = []
                
                for (var i in data.consultations) {
                    consultations.push(new Consultation(data.consultations[i]));
                }
                
                cb(null, consultations);
            } else {
                cb('Error ao listar consultas', null);
            }
        }
    });
};