var Usuario = require('../modelo/Usuario');
var Firebase = require("firebase");
var usuarios = new Firebase('https://odingrid.firebaseio.com/usuarios');

exports.inyectar = function(app) {

    /*    app.get('/api/v1.0/equipo', function (req, res) {

     publicaciones.once("value", function (data) {
     var lista = data.val();
     res.send(lista);
     });
     });
     */
    app.post('/api/vs1.0/uuario', function (req, res) {
        //console.log(req.body);
        var obj = usuarios.push().set(req.body);  //Estoy pusheando un equipo en firebase con id autogenerado en lista de equipo
        res.send("Exito!");
        alert("se creo usuario");
    });

}