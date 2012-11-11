app.controller.User = {
    
    login : function () {
        app.views.User.login({
            data     : {},
            confirm  : function (data) {
                var user = new app.model.User(data);
                
                user.login(function (error, user) {
                    if (error) {
                        app.ui.flash(error);
                    } else {
                        app.ui.flash('Bem vindo!');
                        app.user = user;
                        app.views.User.header({
                            data   : {user : user},
                            logout : app.controller.User.logout
                        });
                        app.controller.Consultation.list();
                    }
                });
            }
        });
    },
    
    logout : function () {
        app.user = null;
        app.views.User.header();
        app.controller.User.login();
    }
};