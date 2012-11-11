app.controller.Patient = function () {
    
    this.list = function () {
        app.model.Patient.list(function (error, patients) {
            if (error) {
                app.ui.flash(error);
            } else {
                app.views.Patient.list({
                    data     : {patients : patients},
                    update   : app.controller.Patient.update,
                    remove   : app.controller.Patient.remove,
                    create   : app.controller.Patient.create
                });
            }
        });
    };
    
    this.create = function () {
        app.views.Patient.create({
            data     : {},
            confirm  : function (data) {
                var patient = new app.model.Patient(data);
                
                patient.create(function (error) {
                    if (error) {
                        app.ui.flash(error);
                    } else {
                        app.ui.flash('Paciente cadastrado com sucesso!');
                        app.controller.Patient.list();
                    }
                });
            },
            cancel   : function () {
                app.controller.Patient.list();
            }
        });
    };
    
    this.update = function (patient) {
        app.views.Patient.update({
            data     : {patient : patient},
            confirm  : function (data) {
                patient.name = data.name;
                patient.email = data.email;
                patient.phone = data.phone;
                
                patient.update(function (error) {
                    if (error) {
                        app.ui.flash(error);
                    } else {
                        app.ui.flash('Paciente editado com sucesso!');
                        app.controller.Patient.list();
                    }
                });
            },
            cancel   : function () {
                app.controller.Patient.list();
            }
        });
    };
    
    this.remove = function (patient) {
        app.views.Patient.remove({
            data     : {patient : patient},
            confirm  : function (data) {
                patient.remove(function (error) {
                    if (error) {
                        app.ui.flash(error);
                    } else {
                        app.ui.flash('Paciente excluido com sucesso!');
                        app.controller.Patient.list();
                    }
                });
            },
            cancel   : function () {
                app.controller.Patient.list();
            }
        });
    };
}