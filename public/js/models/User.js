app.model.User = function (params) {
    var that = this;
    
    this.name     = params.name;
    this.password = params.password;
    this.email    = params.email;
    this.phone    = params.phone;
    this._id      = params._id;
    this.token    = params.token;
    
    this.login = function (cb) {
        app.ajax.get({
            url      : '/user/' + this._id + '/login',
            callback : function (data) {
                if (data.error) {
                    cb('Error ao logar usuário', null);
                } else {
                    this.token = data.token;
                    cb(null, that);
                }
            }
        });
    };
    
    this.validate = function (cb) {
        app.ajax.get({
            url      : '/user/' + this._id + '/validate',
            callback : function (data) {
                if (data.error) {
                    cb(false);
                } else {
                    cb(true);
                }
            }
        });
    };
    
    this.remove = function (cb) {
        app.ajax.del({
            url      : '/user/' + this._id,
            callback : function (data) {
                if (!data.error) {
                    delete this;
                    cb(null);
                } else {
                    cb('Error ao excluir usuário');
                }
            }
        });
    };
    
    this.update = function (cb) {
        app.ajax.put({
            url      : '/user/' + this._id,
            data     : {
                name     : this.name,
                password : this.password,
                email    : this.email,
                phone    : this.phone
            },
            callback : function (data) {
                if (!data.error) {
                    cb(null, that);
                } else {
                    cb('Error ao editar usuário', null);
                }
            }
        });
    };
    
    this.create = function (cb) {
        app.ajax.post({
            url      : '/user',
            data     : {
                name     : this.name,
                password : this.password,
                email    : this.email,
                phone    : this.phone
            },
            callback : function (data) {
                if (!data.error) {
                    that._id = data.user._id;
                    cb(null, that);
                } else {
                    cb('Error ao cadastrar usuário', null);
                }
            }
        });
    };
    
    this.patients = function (cb) {
        app.model.Patient.list(function (error, patients) {
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
        app.model.Consultation.list(function (error, consultations) {
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

app.model.User.list = function (cb) {
    app.ajax.get({
        url      : '/users',
        callback : function (data) {
            if (!data.error) {
                var users = []
                
                for (var i in data.users) {
                    users.push(new app.model.User(data.users[i]));
                }
                
                cb(null, users);
            } else {
                cb('Error ao listar usuários', null);
            }
        }
    });
}

app.model.User.find = function (id, cb) {
    app.ajax.get({
        url      : '/user/' + id,
        callback : function (data) {
            if (!data.error) {
                var user = new app.model.User(data.user);
                cb(null, user);
            } else {
                cb('Error ao buscar usuário', null);
            }
        }
    });
}