var Equipo = require('../modelo/Equipo');
var Integrante = require('../modelo/Integrante');
var Firebase = require("firebase");

var equiposRef = new Firebase('https://odingrid.firebaseio.com/equipos');

exports.inyectar = function(app) {

    app.get('/api/equipos/:id/', function(req, res) {
        var equipoRef = new Firebase('https://odingrid.firebaseio.com/equipos/' + req.params.id);
        equipoRef.once("value", function(snapshot) {
            var equipo = Equipo.create(snapshot.val());
            var integrantes = [];
            for (var i in snapshot.val().integrantes) {
                integrantes.push(i);
            }
            equipo.integrantes = integrantes;
            equipo.id = equipoRef.key();
            console.log(equipo);
            res.send(equipo);
        });
    });

    app.get('/api/equipos', function (req, res) {
        //MANDO EQUIPOS SOLO CON EL NOMBRE
        equiposRef.once("value", function(snapshot) {
            var equipos = [];
            for (var i in snapshot.val()) {
                var equipo = Equipo.create(snapshot.val()[i]);
                equipo.id = i;
                equipos.push(equipo);
            }
            //console.log(equipos);
            res.send(equipos);
        });
    });

    app.post('/api/equipos', function (req, res) {
        //console.log(req.body);
        var equipo = Equipo.create(req.body);
        equiposRef.push().set(equipo);  //Estoy pusheando un equipo en firebase con id autogenerado en lista de equipo
        res.send("Exito!");
    });

    app.delete('/api/equipos/:id/integrantes/:username', function(req, res) {
        var integrantesRef = new Firebase('https://odingrid.firebaseio.com/equipos/'
            + req.params.id + '/integrantes/');
        var integranteRef = integrantesRef.child(req.params.username);
        integranteRef.remove();
        res.send("Se ha quitado a " + req.params.username + " del equipo");
    });

    app.post('/api/equipos/:id/integrantes', function(req, res) {
        try {
            var integrante = Integrante.create(req.body);
            //console.log(integrante);
            var integrantesRef = new Firebase('https://odingrid.firebaseio.com/equipos/'
                + req.params.id + '/integrantes');

            integrantesRef.once('value', function(snap) {
                if (snap.hasChild(integrante.username)) {
                    res.status(500).send('Ya esta en el equipo');
                } else {
                    integrantesRef.child(integrante.username).set(true);
                    res.send(integrante.username);
                }
            });
        } catch (err) {
            console.log(err);
            res.error('Error interno. Causa: ' + err);
        }
    });
};