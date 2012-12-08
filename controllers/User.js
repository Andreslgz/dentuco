/** Patient
 * @author : Rafael Erthal
 * @since : 2012-10
 *
 * @description : Representação da entidade usuário do sistema
 */

module.exports = function (model) {
    return function (app) {
        
        app.post('/user', function (request, response) {
            var user = new model.User({
                name     : request.param('name', null),
                email    : request.param('email', null),
                phone    : request.param('phone', null),
                password : crypto.createHash('sha256').update(request.param('password', null)).digest('hex')
            });
            
            User.save(function (error) {
                if (error) {
                    response.send({error : 'validation error'});
                } else {
                    response.send({user : {
                        name  : user.name,
                        email : user.name,
                        phone : user.phone,
                        _id   : user._id
                    }});
                }
            });
        });
        
        app.get('/users', function (request, response) {
            model.User.find(function (error, users) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    var result = [];
                    for (var i in users) {
                        result.push({
                            name  : users[i].name,
                            email : users[i].name,
                            phone : users[i].phone,
                            _id   : users[i]._id
                        });
                    }
                    response.send({users : result});
                }
            });
        });
        
        app.get('/user/:id', function (request, response) {
            model.User.findOne({email : request.params.id}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        response.send({
                            name  : user.name,
                            email : user.email,
                            phone : user.phone,
                            _id   : user._id
                        });
                    }
                }
            });
        });
        
        app.get('/user/:id/login', function (request, response) {
            model.User.findOne({email : request.params.id}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.login(request.param('password', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            response.send({token : user.token()});
                        }
                    }
                }
            });
        });
        
        app.get('/user/:id/validate', function (request, response) {
            model.User.findOne({email : request.params.id}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            response.send({user : {
                                name  : user.name,
                                email : user.name,
                                phone : user.phone,
                                _id   : user._id
                            }});
                        }
                    }
                }
            });
        });
        
        app.del('/user/:id', function (request, response) {
            model.User.findOne({email : request.params.id}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.login(request.param('password', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            user.remove(function (error) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    response.send(null);
                                }
                            });
                        }
                    }
                }
            });
        });
        
        app.put('/user/:id', function (request, response) {
            model.User.findOne({email : request.params.id}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.login(request.param('password', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            user.name = request.param('name', user.name);
                            user.email = request.param('email', user.email);
                            user.phone = request.param('phone', user.phone);
                            user.password = crypto.createHash('sha256').update(request.param('password', null)).digest('hex');
                            
                            user.save(function (error) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    response.send({user : {
                                        name  : user.name,
                                        email : user.name,
                                        phone : user.phone,
                                        _id   : user._id
                                    }});
                                }
                            });
                        }
                    }
                }
            });
        });
        
    };
};