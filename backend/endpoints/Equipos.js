var Equipo = require('../modelo/Equipo');
var Firebase = require("firebase");
var equipos = new Firebase('https://odingrid.firebaseio.com/equipos');

exports.inyectar = function(app) {

   app.get('/api/v1.0/equipo', function (req, res) {

      console.log(equipos);

    });

    app.post('/api/v1.0/equipo', function (req, res) {
        //console.log(req.body);
        var obj = equipos.push().set(req.body);  //Estoy pusheando un equipo en firebase con id autogenerado en lista de equipo
        res.send("Exito!");
    });

}