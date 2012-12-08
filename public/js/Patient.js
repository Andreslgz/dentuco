var Patient = function (params) {
    var that = this;
    
    this.userId   = params.userId;
    this.name     = params.name;
    this.email    = params.email;
    this.phone    = params.phone;
    this._id      = params._id;
    
    this.remove = function (cb) {
        $.ajax({
            url      : '/patient/' + this._id,
            type     : 'DEL',
            dataType : 'JSON',
            success  : function (data) {
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
        $.ajax({
            url      : '/patient/' + this._id,
            type     : 'PUT',
            dataType : 'JSON',
            data     : {
                userId : this.userId,
                name   : this.name,
                email  : this.email,
                phone  : this.phone
            },
            success  : function (data) {
                if (!data.error) {
                    cb(null, that);
                } else {
                    cb('Error ao editar paciente', null);
                }
            }
        });
    };
    
    this.create = function (cb) {
        $.ajax({
            url      : '/patient',
            type     : 'POST',
            dataType : 'JSON',
            data     : {
                username : getCookie('id'),
                token    : getCookie('token'),
                name     : this.name,
                email    : this.email,
                phone    : this.phone
            },
            success  : function (data) {
            	console.log(data.error);
                if (!data.error) {
                    that._id = data.patient._id;
                    cb(null, that);
                } else {
                    cb('Error ao cadastrar paciente', null);
                }
            }
        });
    };
}

Patient.list = function (cb) {
    $.ajax({
        url      : '/patients',
        type     : 'GET',
        dataType : 'JSON',
        data     : {
            username : getCookie('id'),
            token    : getCookie('token')
        },
        success  : function (data) {
            if (!data.error) {
                var patients = []
                
                for (var i in data.patients) {
                	console.log(data.patients[i]);
                    patients.push(new Patient(data.patients[i]));
                }
                
                cb(null, patients);
            } else {
                cb('Error ao listar pacientes', null);
            }
        }
    });
}