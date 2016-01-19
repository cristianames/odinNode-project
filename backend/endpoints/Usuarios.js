var Usuario = require('../modelo/Usuario');
var Firebase = require("firebase");
var usuarios = new Firebase('https://odingrid.firebaseio.com/usuarios');
var firebase = new Firebase('https://odingrid.firebaseio.com');

exports.inyectar = function(app) {

    /*    app.get('/api/v1.0/equipo', function (req, res) {

     publicaciones.once("value", function (data) {
     var lista = data.val();
     res.send(lista);
     });
     });
     */

    var crearUsuario = function(user){
        console.log("entre a crear usuario");
        alert(user.contrasenia);

    }

    app.post('/api/v1.0/usuario', function (req, res) {
        console.log(req.body);
        var obj = usuarios.push().set(req.body);  //Estoy pusheando un usuario en firebase con id autogenerado en lista de equipo
        res.send("Exito!");
        alert("se creo usuario");

    });



}