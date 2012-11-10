app.model.Patient = function (params) {
    var that = this;
    
    this.userId   = params.userId;
    this.name     = params.name;
    this.email    = params.email;
    this.phone    = params.phone;
    this._id      = params._id;
    
    this.remove = function (cb) {
        app.ajax.del({
            url      : '/patient/' + this._id,
            callback : function (data) {
                if (!data.error) {
                    delete this;
                    cb(null);
                } else {
                    cb('Error ao excluir paciente');
                }
            }
        });
    };
    
    this.update = function (cb) {
        app.ajax.put({
            url      : '/patient/' + this._id,
            data     : {
                userId : this.userId,
                name   : this.name,
                email  : this.email,
                phone  : this.phone
            },
            callback : function (data) {
                if (!data.error) {
                    cb(null, that);
                } else {
                    cb('Error ao editar paciente', null);
                }
            }
        });
    };
    
    this.create = function (cb) {
        app.ajax.post({
            url      : '/patient',
            data     : {
                userId : this.userId,
                name   : this.name,
                email  : this.email,
                phone  : this.phone
            },
            callback : function (data) {
                if (!data.error) {
                    that._id = data.patient._id;
                    cb(null, that);
                } else {
                    cb('Error ao cadastrar paciente', null);
                }
            }
        });
    };
    
    this.consultations = function (cb) {
        app.model.Consultation.list(function (error, consultations) {
            if (error) {
                cb (error, null);
            } else {
                var result = [];
                for (var i in consultations) {
                    if (consultations[i].patientId === that._id) {
                        result.push(consultations[i]);
                    }
                }
                cb(null, result);
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

app.model.Patient.list = function (cb) {
    app.ajax.get({
        url      : '/patients',
        callback : function (data) {
            if (!data.error) {
                var consultations = []
                
                for (var i in data.consultations) {
                    consultations.push(new app.model.Consultation(data.consultations[i]));
                }
                
                cb(null, consultations);
            } else {
                cb('Error ao listar pacientes', null);
            }
        }
    });
}

app.model.Patient.find = function (id, cb) {
    app.ajax.get({
        url      : '/patient/' + id,
        callback : function (data) {
            if (!data.error) {
                var patient = new app.model.Patient(data.patient);
                cb(null, patient);
            } else {
                cb('Error ao buscar paciente', null);
            }
        }
    });
}