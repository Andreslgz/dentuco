app.model.Consultation = function (params) {
    var that = this;
    
    this.userId      = params.userId;
    this.patientId   = params.patientId;
    this.description = params.description;
    this.dateStart   = params.dateStart;
    this.dateFinish  = params.dateFinish;
    this._id         = params._id;
    
    this.remove = function (cb) {
        app.ajax.del({
            url      : '/consultation/' + this._id,
            callback : function (data) {
                if (!data.error) {
                    delete this;
                    cb(null);
                } else {
                    cb('Error ao excluir consulta');
                }
            }
        });
    };
    
    this.update = function (cb) {
        app.ajax.put({
            url      : '/consultation/' + this._id,
            data     : {
                userId      : this.userId,
                patientId   : this.patientId,
                description : this.description,
                dateStart   : this.dateStart,
                dateFinish  : this.dateFinish
            },
            callback : function (data) {
                if (!data.error) {
                    cb(null, that);
                } else {
                    cb('Error ao editar consulta', null);
                }
            }
        });
    };
    
    this.create = function (cb) {
        app.ajax.post({
            url      : '/consultation',
            data     : {
                userId      : this.userId,
                patientId   : this.patientId,
                description : this.description,
                dateStart   : this.dateStart,
                dateFinish  : this.dateFinish
            },
            callback : function (data) {
                if (!data.error) {
                    that._id = data.patient._id;
                    cb(null, that);
                } else {
                    cb('Error ao cadastrar consulta', null);
                }
            }
        });
    };
    
    this.patient = function (cb) {
        app.model.Patient.find(this.patientId, function (error, patient) {
            if (error) {
                cb(error, null);
            } else {
                cb(null, patient);
            }
        });
    };
    
    this.user = function (cb) {
        app.model.User.find(this.userId, function (error, user) {
            if (error) {
                cb(error, null);
            } else {
                cb(null, user);
            }
        });
    };
}

app.model.Consultation.list = function (cb) {
    app.ajax.get({
        url      : '/consultations',
        callback : function (data) {
            if (!data.error) {
                var consultations = []
                
                for (var i in data.consultations) {
                    consultations.push(new app.model.Consultation(data.consultations[i]));
                }
                
                cb(null, consultations);
            } else {
                cb('Error ao listar consultas', null);
            }
        }
    });
}

app.model.Consultation.find = function (id, cb) {
    app.ajax.get({
        url      : '/consultation/' + id,
        callback : function (data) {
            if (!data.error) {
                var consultation = new app.model.Consultation(data.consultation);
                cb(null, consultation);
            } else {
                cb('Error ao buscar consulta', null);
            }
        }
    });
}