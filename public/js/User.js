var User = function (params) {
    var that = this;
    
    this.name     = params.name;
    this.password = params.password;
    this.email    = params.email;
    this.phone    = params.phone;
    this._id      = params._id;
    this.token    = params.token;

    this.patients = function (cb) {
        Patient.list(function (error, patients) {
            if (error) {
                cb (error, null);
            } else {
                var result = [];
                for (var i in patients) {
                    result.push(patients[i]);
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
                    result.push(consultations[i]);
                }
                cb(null, result);
            }
        });
    };
}

User.find = function (cb) {
    var token =  getCookie('token'),
        id = getCookie('id');
    if (token && id) {
        $.ajax({
            url      : '/user/'+id,
            type     : 'GET',
            dataType : 'JSON',
            data     : {token: token},
            success  : function (data) {
                if (!data.error) {
                    var user = new User(data);
                    cb(null, user);
                } else {
                    cb('Error ao buscar usuário', null);
                }
            }
        });
    }
    else {
        window.location.href = 'login.html'
    }
}