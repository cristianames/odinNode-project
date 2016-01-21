var Equipo = require('../modelo/Equipo');
var Usuario = require('../modelo/Usuario');
var Firebase = require("firebase");
var equipos = new Firebase('https://odingrid.firebaseio.com/equipos');

exports.inyectar = function(app) {

    app.get('/api/equipos/:id/', function(req, res) {
        var equipo = new Firebase('https://odingrid.firebaseio.com/equipos/' + req.params.id);
        equipo.once("value", function(snapshot) {
            console.log(snapshot.val());
            res.send(snapshot.val());
        });
    });

    app.get('/api/v1.0/equipos', function (req, res) {
        //console.log(equipos);
        equipos.once("value", function(snapshot) {
            console.log(snapshot.val());
            res.send(snapshot.val());
        });
    });

    app.post('/api/equipos', function (req, res) {
        //console.log(req.body);
        var equipo = Equipo.create(req.body);
        equipos.push().set(equipo);  //Estoy pusheando un equipo en firebase con id autogenerado en lista de equipo
        res.send("Exito!");
    });

    app.delete('/api/equipos/:id/integrantes/:username', function(req, res) {
        var integrantesRef = new Firebase('https://odingrid.firebaseio.com/equipos/' + req.params.id + '/integrantes');
        integrantesRef.once("value", function(snapshot) {
            var integrantes = snapshot.val();
            try {
                integrantes.remove(function(integrante) {
                    return integrante.username == req.params.username;
                });
                integrantesRef.set(integrantes);
                res.send(integrantes);
            } catch (err) {
                res.status(500).send('ERROR! ' + err);
            }
        });
    });

    app.post('/api/equipos/:id/integrantes', function(req, res) {
        try {
            var integrante = Usuario.create(req.body);
            //console.log(integrante);
            var integrantesRef = new Firebase('https://odingrid.firebaseio.com/equipos/' + req.params.id + '/integrantes');

            integrantesRef.once("value", function(snapshot) {
                var integrantes = snapshot.val();

                if (integrantes == null) {
                    integrantes = [];
                }

                var contiene = integrantes.contains(integrante, function (a, b) {
                    return a.username == b.username;
                });

                if (contiene) {
                    res.status(500).send('Ya esta en el equipo');
                    return;
                }

                console.log(integrantes);
                integrantes.push(integrante);
                integrantesRef.set(integrantes);
                res.send(integrante);
            });
        } catch (err) {
            console.log(err);
            res.error('Error interno. Causa: ' + err);
        }
    });
};