var Equipo = require('../modelo/Equipo');
var Firebase = require("firebase");
var publicaciones = new Firebase('https://odingrid.firebaseio.com/equipo');

exports.inyectar = function(app) {

/*    app.get('/api/equipo', function (req, res) {

        publicaciones.once("value", function (data) {
            var lista = data.val();
            res.send(lista);
        });
    });

    app.post('/api/equipo', function (req, res) {
        //console.log(req.body);
        var obj = publicaciones.push().set(req.body);
        res.send("Exito!");
    });*/

}