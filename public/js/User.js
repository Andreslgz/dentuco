var User = function (params) {
    var that = this;
    
    this.name     = params.name;
    this.password = params.password;
    this.email    = params.email;
    this.phone    = params.phone;
    this._id      = params._id;
    this.token    = params.token;
    
    this.login = function (cb) {
        $.ajax({
            url      : '/user/' + this._id + '/login',
            type     : 'GET',
            dataType : 'JSON',
            success  : function (data) {
                if (data.error) {
                    cb('Error ao logar usuário', null);
                } else {
                    this.token = data.token;
                    cb(null, that);
                }
            }
        });
    };
    
    this.patients = function (cb) {
        Patient.list(function (error, patients) {
            if (error) {
                cb (error, null);
            } else {
                var result = [];
                for (var i in patients) {
                    if (patients[i].userId === that._id) {
                        result.push(patients[i]);
                    }
                }
                cb(null, result);
            }
        });
    };
    
    this.consultations = function (cb) {
        Consultation.list(function (error, consultations) {
            if (error) {
                cb (error, null);
            } else {
                var result = [];
                for (var i in consultations) {
                    if (consultations[i].userId === that._id) {
                        result.push(consultations[i]);
                    }
                }
                cb(null, result);
            }
        });
    };
}

User.find = function (cb) {
    $.ajax({
        url      : '/user/',
        type     : 'GET',
        dataType : 'JSON',
        success  : function (data) {
            if (!data.error) {
                var user = new app.model.User(data.user);
                cb(null, user);
            } else {
                cb('Error ao buscar usuário', null);
            }
        }
    });
}