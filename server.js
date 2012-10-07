/** Dentuco
 *
 * @autor : Rafael Erthal
 * @since : 2012-10
 *
 * @description : Starter do server do dentuco
 */

var express = require('express'),
    app = express(),
    config = require('./config.js'),
    model = require('./models/Models.js')(config);

/*  Configurando o server */
app.configure(function () {
    "use strict";

    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(app.router);
});

/*  Chamando controllers */
//require('./controllers/Controllers.js')(app, model);

/*  Ativando o server */
app.listen(config.host.port);