app.controller.Consultation = {
    
    list : function () {
        app.model.Consultation.list(function (error, consultations) {
            if (error) {
                app.ui.flash(error);
            } else {
                app.views.Consultation.list({
                    data     : {consultations : consultations},
                    create   : app.controller.Consultation.create,
                    details  : app.controller.Consultation.details
                });
            }
        });
    },
    
    create : function (dateStart) {
        app.views.Consultation.create({
            data     : {dateStart : dateStart},
            confirm  : function (data) {
                var consultation = new app.model.Consultation(data);
                
                consultation.create(function (error) {
                    if (error) {
                        app.ui.flash(error);
                    } else {
                        app.ui.flash('Consulta cadastrada com sucesso!');
                        app.controller.Consultation.list();
                    }
                });
            },
            cancel   : function () {
                app.controller.Consultation.list();
            }
        });
    },
    
    update : function (consultation) {
        app.views.Consultation.update({
            data     : {consultation : consultation},
            confirm  : function (data) {
                consultation.patientId   = data.patientId;
                consultation.description = data.description;
                consultation.dateStart   = data.dateStart;
                consultation.dateFinish  = data.dateFinish;
                
                consultation.update(function (error) {
                    if (error) {
                        app.ui.flash(error);
                    } else {
                        app.ui.flash('Consulta editada com sucesso!');
                        app.controller.Consultation.list();
                    }
                });
            },
            cancel   : function () {
                app.controller.Consultation.list();
            }
        });
    },
    
    remove : function (consultation) {
        app.views.Consultation.remove({
            data     : {consultation : consultation},
            confirm  : function (data) {
                consultation.remove(function (error) {
                    if (error) {
                        app.ui.flash(error);
                    } else {
                        app.ui.flash('Consulta excluida com sucesso!');
                        app.controller.Consultation.list();
                    }
                });
            },
            cancel   : function () {
                app.controller.Consultation.list();
            }
        });
    },
    
    details : function (consultation) {
        app.views.Consultation.details({
            data : {consultation : consultation},
            update   : app.controller.Consultation.update,
            remove   : app.controller.Consultation.remove
        })
    }
};