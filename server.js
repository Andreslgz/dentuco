/** Dentuco
 *
 * @autor : Rafael Erthal
 * @since : 2012-10
 *
 * @description : Starter do server do dentuco
 */

var express = require('express'),
    app = express(),
    config = require('./config.js');
    //model = require('./models/Models.js')(config),
    //controller = require('./controllers/Controllers.js')(model);

/*  Configurando o server */
app.configure(function () {
    "use strict";

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    
    app.use('/', express.static('public'));

    app.use(app.router);
});

/*  Chamando controllers */
//controller.User(app);
//controller.Patient(app);
//controller.Consultation(app);

/*  Ativando o server */
app.listen(config.host.port);