var Firebase = require("firebase");

var Equipo = require('../modelo/Equipo');
var Integrante = require('../modelo/Integrante');
var Propuesta = require('../modelo/Propuesta');

var equiposRef = new Firebase('https://odingrid.firebaseio.com/equipos');

exports.inyectar = function(app) {

    app.get('/api/equipos/:id/', function(req, res) {
        try {
            var equipoRef = new Firebase('https://odingrid.firebaseio.com/equipos/' + req.params.id);
            equipoRef.once("value", function(snapshot) {
                //console.log(snapshot.val());
                var equipo = Equipo.create(snapshot.val());
                equipo.id = equipoRef.key();
                equipo.integrantes = {};
                equipo.propuestas = {};
                for (var i in snapshot.val().integrantes) {
                    equipo.integrantes[i] = i;
                }
                for (var i in snapshot.val().propuestas) {
                    equipo.propuestas[i] = snapshot.val().propuestas[i];
                    equipo.propuestas[i].id = i;

                    var tags = [];
                    for (var tag in equipo.propuestas[i].etiquetas) {
                        tags.push(tag);
                    }
                    equipo.propuestas[i].etiquetas = tags;
                }
                //console.log(equipo);
                res.send(equipo);
            });
        } catch(err) {
            console.log(err);
            res.status(500).send('Error interno. Causa: ' + err);
        }
    });

    app.get('/api/equipos', function (req, res) {
        try {
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
        } catch(err) {
            console.log(err);
            res.status(500).send('Error interno. Causa: ' + err);
        }
    });

    app.post('/api/equipos', function (req, res) {
        try {
            //console.log(req.body);
            var equipo = Equipo.create(req.body);
            var equipoRef = equiposRef.push();
            equipoRef.set(equipo);  //Estoy pusheando un equipo en firebase con id autogenerado en lista de equipo
            equipo.id = equipoRef.key();
            res.send(equipo);
        } catch(err) {
            console.log(err);
            res.status(500).send('Error interno. Causa: ' + err);
        }
    });

    app.delete('/api/equipos/:id/integrantes/:username', function(req, res) {
        try {
            var integranteRef = new Firebase('https://odingrid.firebaseio.com/equipos/'
                + req.params.id + '/integrantes/' + req.params.username);
            integranteRef.remove();
            res.send("Se ha quitado a " + req.params.username + " del equipo");
        } catch(err) {
            console.log(err);
            res.status(500).send('Error interno. Causa: ' + err);
        }
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
            res.status(500).send('Error interno. Causa: ' + err);
        }
    });

    app.post('/api/equipos/:id/propuestas', function(req, res) {
        try {
            var propuesta = Propuesta.create(req.body);
            console.log(propuesta);
            var propuestasRef = new Firebase('https://odingrid.firebaseio.com/equipos/'
                + req.params.id + '/propuestas');
            var propuestaRef = propuestasRef.push();
            propuestaRef.set(propuesta);
            propuesta.id = propuestaRef.key();
            res.send(propuesta);
        } catch (err) {
            console.log(err);
            res.status(500).send('Error interno. Causa: ' + err);
        }
    });

    app.delete('/api/equipos/:id/propuestas/:idPropuesta', function(req, res) {
        try {
            var propuestaRef = new Firebase('https://odingrid.firebaseio.com/equipos/'
                + req.params.id + '/propuestas/' + req.params.idPropuesta);
            propuestaRef.remove();
            res.send("Se ha quitado la propuesta del equipo");
        } catch(err) {
            console.log(err);
            res.status(500).send('Error interno. Causa: ' + err);
        }
    });

    app.put('/api/equipos/:id/propuestas/:idPropuesta', function(req, res) {
        try {
            var propuesta = Propuesta.create(req.body);
            var propuestaRef = new Firebase('https://odingrid.firebaseio.com/equipos/'
                + req.params.id + '/propuestas/' + req.params.idPropuesta);

            propuestaRef.once('value', function (snap) {
                if(!snap.exists) {
                    res.status(500).send('Intentando editar propuesta inexistente');
                    return;
                } else {
                    propuestaRef.set(propuesta);
                    propuesta.id = req.params.idPropuesta;
                    res.send(propuesta);
                }
            })
        } catch(err) {
            console.log(err);
            res.status(500).send('Error interno. Causa: ' + err);
        }
    });
};