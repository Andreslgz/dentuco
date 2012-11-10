/** Patient
 * @author : Rafael Erthal
 * @since : 2012-10
 *
 * @description : Representação da entidade paciente do sistema
 */

module.exports = function (model) {
    return function (app) {
        
        app.post('/patient', function (request, response) {
            model.user.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            var patient = new model.Patient({
                                userId : user._id,
                                name   : request.param('name', null),
                                email  : request.param('email', null),
                                phone  : request.param('phone', null)
                            });
                            patient.save(function (error) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    response.send({patient : {
                                        name  : patient.name,
                                        email : patient.email,
                                        phone : patient.phone,
                                        _id   : patient._id
                                    }});
                                }
                            });
                        }
                    }
                }
            });
        });
        
        app.get('/patients', function (request, response) {
            model.user.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            model.Patient.find({userId : user._id}, function (error, patients) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    var result = [];
                                    for (var i in patients) {
                                        result.push({
                                            name  : patients[i].name,
                                            email : patients[i].email,
                                            phone : patients[i].phone,
                                            _id   : patients[i]._id
                                        });
                                    }
                                    response.send({patients : result});
                                }
                            });
                        }
                    }
                }
            });
        });
        
        app.get('/patient/:id', function (request, response) {
            model.user.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            model.Patient.findOne({userId : user._id, _id : request.params.id}, function (error, patient) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    if (patient === null) {
                                        response.send({error : 'patient not found'});
                                    } else {
                                        response.send({patient : {
                                            name  : patient.name,
                                            email : patient.email,
                                            phone : patient.phone,
                                            _id   : patient._id
                                        }});
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });
        
        app.del('/patient/:id', function (request, response) {
            model.user.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            model.Patient.findOne({userId : user._id, _id : request.params.id}, function (error, patient) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    if (patient === null) {
                                        response.send({error : 'patient not found'});
                                    } else {
                                        patient.remove(function (error) {
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
        
        app.put('/patient/:id', function (request, response) {
            model.user.findOne({email : request.param('username', null)}, function (error, user) {
                if (error) {
                    response.send({error : 'internal server error'});
                } else {
                    if (user === null) {
                        response.send({error : 'user not found'});
                    } else {
                        if (!user.validate(request.param('token', ''))) {
                            response.send({error : 'user not found'});
                        } else {
                            model.Patient.findOne({userId : user._id, _id : request.params.id}, function (error, patient) {
                                if (error) {
                                    response.send({error : 'internal server error'});
                                } else {
                                    if (patient === null) {
                                        response.send({error : 'patient not found'});
                                    } else {
                                        patient.name  = request.param('name', patient.name);
                                        patient.email = request.param('email', patient.email);
                                        patient.phone = request.param('phone', patient.phone);
                                        patient.save(function (error) {
                                            if (error) {
                                                response.send({error : 'internal server error'});
                                            } else {
                                                response.send({patient : {
                                                    name  : patient.name,
                                                    email : patient.email,
                                                    phone : patient.phone,
                                                    _id   : patient._id
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