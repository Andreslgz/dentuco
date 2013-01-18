/** Consultation
 * @author : Rafael Erthal
 * @since : 2012-10
 *
 * @description : Representação da entidade consulta do sistema
 */

module.exports = function (model) {
    return function (app) {
        
        app.post('/consultation', function (request, response) {
            model.User.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            var consultation = new model.Consultation({
                                userId      : user._id,
                                pacientId   : request.param('pacientId', null),
                                description : request.param('description', null),
                                dateStart   : request.param('dateStart', null),
                                dateFinish  : request.param('dateFinish', null)
                            });

                            consultation.save(function (error) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    response.send({patient : {
                                        pacientId   : consultation.pacientId,
                                        description : consultation.description,
                                        dateStart   : consultation.dateStart,
                                        dateFinish  : consultation.dateFinish,
                                        _id         : consultation._id
                                    }});
                                }
                            });
                        }
                    }
                }
            });
        });
        
        app.get('/consultations', function (request, response) {
            model.User.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            model.Consultation.find({userId : user._id}, function (error, consultations) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    var result = [];
                                    for (var i in consultations) {
                                        result.push({
                                            pacientId   : consultations[i].pacientId,
                                            description : consultations[i].description,
                                            dateStart   : consultations[i].dateStart,
                                            dateFinish  : consultations[i].dateFinish,
                                            _id         : consultations[i]._id
                                        });
                                    }
                                    response.send({consultations : result});
                                }
                            });
                        }
                    }
                }
            });
        });
        
        app.get('/consultation/:id', function (request, response) {
            model.User.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            model.Consultation.findOne({userId : user._id, _id : request.params.id}, function (error, consultation) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    if (consultation === null) {
                                        response.send({error : 'consultation not found'});
                                    } else {
                                        response.send({patient : {
                                            pacientId   : consultation.pacientId,
                                            description : consultation.description,
                                            dateStart   : consultation.dateStart,
                                            dateFinish  : consultation.dateFinish,
                                            _id         : consultation._id
                                        }});
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });
        
        app.del('/consultation/:id', function (request, response) {
            model.User.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            model.Consultation.findOne({userId : user._id, _id : request.params.id}, function (error, consultation) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    if (consultation === null) {
                                        response.send({error : 'consultation not found'});
                                    } else {
                                        consultation.remove(function (error) {
                                            if (error) {
                                                response.send({error : 'internal server error'});
                                            } else {
                                                response.send(null);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });
        
        app.put('/consultation/:id', function (request, response) {
            model.User.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            model.Consultation.findOne({userId : user._id, _id : request.params.id}, function (error, consultation) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    if (consultation === null) {
                                        response.send({error : 'consultation not found'});
                                    } else {
                                        consultation.pacientId  = request.param('pacientId', consultation.pacientId);
                                        consultation.description = request.param('description', consultation.description);
                                        consultation.dateStart = request.param('dateStart', consultation.dateStart);
                                        consultation.dateFinish = request.param('dateFinish', consultation.dateFinish);
                                        patient.save(function (error) {
                                            if (error) {
                                                response.send({error : 'internal server error'});
                                            } else {
                                                response.send({patient : {
                                                    pacientId   : consultation.pacientId,
                                                    description : consultation.description,
                                                    dateStart   : consultation.dateStart,
                                                    dateFinish  : consultation.dateFinish,
                                                    _id         : consultation._id
                                                }});
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });
        
    };
};